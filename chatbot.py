import tkinter as tk
from tkinter import Label, Entry, Text, Button
import requests
import json

class ChatbotUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Heart Disease Prediction")

        self.create_form()

    def create_form(self):
        # Labels and Entry widgets for input
        labels = ['Age','Sex','RestingBP','Cholesterol','FastingBS','RestingECG','MaxHR','ExerciseAngina','Oldpeak','ST_Slope']
        self.entries = {label: Entry(self.root) for label in labels}

        for i, label in enumerate(labels):
            Label(self.root, text=label).grid(row=i, column=0, sticky='e')
            self.entries[label].grid(row=i, column=1, pady=5, padx=5)

        # Result text area
        Label(self.root, text="Result:").grid(row=len(labels), column=0, sticky='e')
        self.result_text = Text(self.root, height=2, width=30)
        self.result_text.grid(row=len(labels), column=1, pady=5, padx=5)

        # Submit button
        submit_button = Button(self.root, text="Submit", command=self.predict)
        submit_button.grid(row=len(labels) + 1, column=1, pady=10)

    def preprocess_input(self):
        # Collect input values from the Entry widgets
        input_values = {label: float(entry.get()) if entry.get() and label not in ['Sex', 'RestingECG', 'ExerciseAngina', 'ST_Slope'] else entry.get()
                    for label, entry in self.entries.items()}
        return input_values

    def predict(self):
        # Preprocess input data
        input_values = self.preprocess_input()

        # Print the collected input data
        print("Collected Input Data:", input_values)

        # Make a request to the Flask API endpoint for prediction
        api_url = 'http://localhost:5000/predict'  # Assuming Flask app is running on localhost:5000
        response = requests.post(api_url, json={'new_record': input_values})

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            try:
                # Attempt to parse the JSON response
                predictions = response.json()
                result_text = f"Predicted Chest Pain Type: {predictions['predicted_chest_pain_type']}, Heart Patient : {predictions['predicted_patient_has_disease']}"
                self.result_text.delete(1.0, tk.END)  # Clear previous result
                self.result_text.insert(tk.END, result_text)
            except json.JSONDecodeError:
                self.result_text.delete(1.0, tk.END)
                self.result_text.insert(tk.END, "Error decoding JSON in the response.")
        else:
            self.result_text.delete(1.0, tk.END)
            self.result_text.insert(tk.END, f"Error: Received a non-OK response with status code {response.status_code}\n{response.text}")

if __name__ == "__main__":
    root = tk.Tk()
    chatbot_ui = ChatbotUI(root)
    root.mainloop()