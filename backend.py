# Import necessary libraries
import sys
import pandas as pd
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn import model_selection
from sklearn.preprocessing import StandardScaler, LabelEncoder
from keras.models import Sequential, load_model
from keras.layers import Dense
from keras.optimizers import Adam
from keras.utils import to_categorical
from flask import jsonify
import warnings
import tensorflow as tf

# Suppress TensorFlow warnings related to retracing
warnings.filterwarnings("ignore", category=Warning, module="tensorflow")


# Flask app initialization
app = Flask(__name__)
CORS(app)

# Define categorical features
categorical_features = ['Sex', 'RestingECG', 'ExerciseAngina', 'ST_Slope']
X_categorical = ['Sex_F', 'Sex_M', 'RestingECG_LVH', 'RestingECG_Normal','RestingECG_ST', 'ExerciseAngina_N', 'ExerciseAngina_Y','ST_Slope_Down', 'ST_Slope_Flat', 'ST_Slope_Up']

# Load pre-trained model
categorical_model = load_model('multi_model.h5')
binary_model = load_model('binary_model.h5')

# Function to preprocess the data for prediction
def preprocess_input_binary(new_record):

    # Assuming new_record is a JSON with both numeric and categorical values
    # Convert it to a DataFrame for processing
    values_only = list(new_record.values())
    columns = ['Age', 'Sex', 'RestingBP', 'Cholesterol', 'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope']
    
    new_record_df = pd.DataFrame([values_only], columns=columns)

    # Convert categorical features to categorical type
    new_record_df[categorical_features] = new_record_df[categorical_features].astype('category')

    # Standardize numerical features
    scaler2 = StandardScaler()
    input_scaled = scaler2.fit_transform(new_record_df.select_dtypes(include=np.number))

    # One-hot encode categorical features
    input_categorical = pd.get_dummies(new_record_df[categorical_features])

    # Ensure all one-hot encoded features are present in the input_final
    for feature in X_categorical:
        if feature not in input_categorical:
            input_categorical[feature] = 0  # Add missing one-hot encoded feature with a default value

    # Reorder the columns to match the order used during training
    input_categorical = input_categorical[X_categorical]

    # Concatenate scaled numerical features with one-hot encoded categorical features
    input_final = np.concatenate([input_scaled, input_categorical], axis=1)

    return input_final


def preprocess_input_multi(new_record):
    # Assuming new_record is a JSON with both numeric and categorical values
    # Convert it to a DataFrame for processing
    new_record_df = pd.DataFrame([new_record])
    new_record_df['HeartDisease'] = 1

    # Convert categorical features to categorical type
    new_record_df[categorical_features] = new_record_df[categorical_features].astype('category')

    # Select only the features used during training (exclude the target variable)
    new_record_for_prediction = new_record_df[['Age', 'Sex', 'RestingBP', 'Cholesterol', 'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope', 'HeartDisease']]

    # Standardize numerical features
    scaler1 = StandardScaler()
    new_record_scaled = scaler1.fit_transform(new_record_for_prediction.select_dtypes(include=np.number))

    # One-hot encode categorical features
    new_record_categorical = pd.get_dummies(new_record_for_prediction[categorical_features])

    # Ensure that the column order and names match the training data
    new_record_categorical = new_record_categorical.reindex(columns=['Sex_F', 'Sex_M', 'RestingECG_LVH', 'RestingECG_Normal',
       'RestingECG_ST', 'ExerciseAngina_N', 'ExerciseAngina_Y',
       'ST_Slope_Down', 'ST_Slope_Flat', 'ST_Slope_Up'], fill_value=0)

    # Concatenate scaled numerical features with one-hot encoded categorical features
    new_record_final = np.concatenate([new_record_scaled, new_record_categorical], axis=1)

    return new_record_final

# Flask API endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    new_record = data['new_record']

    # Preprocess input data for multi class prediction
    input_data_multi = preprocess_input_multi(new_record)
    input_data_multi = input_data_multi.astype(np.float32)

    # Make predictions using the categorical model
    multi_predicted_class = categorical_model.predict(input_data_multi)

    # Decode the predicted class using label encoder
    label_encoder1 = LabelEncoder()
    label_encoder1.fit_transform(['ASY','NAP','ATA','TA'])
    multi_predicted_class_decoded = label_encoder1.inverse_transform(np.argmax(multi_predicted_class, axis=1))

    # Preprocess input data for binary prediction
    input_data_binary = preprocess_input_binary(new_record)
    input_data_binary = input_data_binary.astype(np.float32)
    # Make predictions
    predictions = binary_model.predict(input_data_binary)

    # Threshold the predictions (assuming 0.5 as the threshold)
    binary_predictions = (predictions > 0.45).astype(int)

    # Convert binary predictions back to original labels
    label_encoder2 = LabelEncoder()
    label_encoder2.fit_transform([0,1])
    binary_decoded_prediction = label_encoder2.inverse_transform(binary_predictions.ravel())




    return jsonify({'predicted_chest_pain_type': multi_predicted_class_decoded.tolist(),
                    'predicted_patient_has_disease' : binary_decoded_prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
    print("Flask server started and listening.")
