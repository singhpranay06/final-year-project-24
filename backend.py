# Import necessary libraries
import sys
import pandas as pd
import numpy as np
from flask import Flask, jsonify, request
from sklearn import model_selection
from sklearn.preprocessing import StandardScaler
from keras.models import Sequential, load_model
from keras.layers import Dense
from keras.optimizers import Adam
from keras.utils import to_categorical
from flask import jsonify
import warnings
import tensorflow as tf

# Suppress TensorFlow warnings related to retracing
warnings.filterwarnings("ignore", category=Warning, module="tensorflow")



# Function to preprocess the data
def preprocess_data(url):
    names = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal', 'class']
    cleveland = pd.read_csv(url, names=names)
    data = cleveland[~cleveland.isin(['?'])].dropna(axis=0)
    data = data.apply(pd.to_numeric)
    X = np.array(data.drop(['class'], axis = 1))
    y = np.array(data['class'])
    X_train, X_test, y_train, y_test = model_selection.train_test_split(X, y, test_size=0.2)
    Y_train = to_categorical(y_train, num_classes=None)
    Y_test = to_categorical(y_test, num_classes=None)
    return X_train, Y_train

# Function to create and train the categorical model
def train_categorical_model(X_train, Y_train):
    model = Sequential()
    model.add(Dense(8, input_dim=13, kernel_initializer='normal', activation='relu'))
    model.add(Dense(4, kernel_initializer='normal', activation='relu'))
    model.add(Dense(5, activation='softmax'))
    adam = Adam(lr=0.001)
    model.compile(loss='categorical_crossentropy', optimizer=adam, metrics=['accuracy'])
    model.fit(X_train, Y_train, epochs=100, batch_size=10, verbose=1)
    return model

# Function to save the categorical model
def save_categorical_model(model, filename='categorical_model.h5'):
    model.save(filename)

# Function to load the categorical model
def load_categorical_model(filename='categorical_model.h5'):
    return load_model(filename)

# Function to create and train the binary model
def train_binary_model(X_train, Y_train_binary):
    model = Sequential()
    model.add(Dense(8, input_dim=13, kernel_initializer='normal', activation='relu'))
    model.add(Dense(4, kernel_initializer='normal', activation='relu'))
    model.add(Dense(1, activation='sigmoid'))
    adam = Adam(lr=0.001)
    model.compile(loss='binary_crossentropy', optimizer=adam, metrics=['binary_accuracy'])
    model.fit(X_train, Y_train_binary, epochs=100, batch_size=10, verbose=1)
    return model

# Function to save the binary model
def save_binary_model(model, filename='binary_model.h5'):
    model.save(filename)

# Function to load the binary model
def load_binary_model(filename='binary_model.h5'):
    return load_model(filename)

# Main function to be called from the Flask API with a new record
def process_new_record(new_record):
    # Load pre-trained models
    categorical_model = load_categorical_model()
    binary_model = load_binary_model()

    # Make predictions using the categorical model
    categorical_prediction = np.argmax(categorical_model.predict(new_record), axis=1) + 1  # Adding 1 for class labels

    # Make predictions using the binary model
    binary_prediction = np.round(binary_model.predict(new_record)).astype(int)

    return categorical_prediction, binary_prediction[0][0]

# Flask app initialization
app = Flask(__name__)

# URL for the heart disease dataset
url = "http://archive.ics.uci.edu/ml/machine-learning-databases/heart-disease/processed.cleveland.data"

# Preprocess the data and train the categorical model
X_train, Y_train = preprocess_data(url)
categorical_model = train_categorical_model(X_train, Y_train)

# Save the categorical model
save_categorical_model(categorical_model)

# Train the binary model
Y_train_binary = (Y_train[:, 1] > 0).astype(int)
binary_model = train_binary_model(X_train, Y_train_binary)

# Save the binary model
save_binary_model(binary_model)

# Flask API endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    new_record = np.array(data['new_record'])
    categorical_prediction, binary_prediction = process_new_record(new_record)
    # Convert NumPy arrays to lists for jsonify
    categorical_prediction_list = categorical_prediction.tolist()
    binary_prediction_list = binary_prediction.tolist()

    return jsonify({
        'multiclass_prediction': categorical_prediction_list,
        'binary_prediction': binary_prediction_list
    })

if __name__ == '__main__':
    app.run(debug=True)
    print("Flask server started and listening.")
