import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const InfoScreen = () => {

  const parameters = [
    { title: 'Age', description: 'As individuals age, the risk of cardiovascular issues tends to increase.' },
    { title: 'Sex', description: 'Gender plays a role in heart health, with variations in risk factors. For example, men generally face a higher risk of heart disease at a younger age, while women may experience an increased risk after menopause.' },
    { title: 'Resting BP (Blood Pressure)', description: 'Resting blood pressure is a crucial indicator of heart health. High blood pressure, or hypertension, strains the heart and arteries, increasing the risk of heart disease and stroke.' },
    { title: 'Cholesterol', description: 'Cholesterol levels impact heart health, with high levels of LDL ("bad") cholesterol and low levels of HDL ("good") cholesterol increasing the risk of atherosclerosis.' },
    { title: 'Fasting BS (Blood Sugar)', description: 'Elevated fasting blood sugar levels, indicative of diabetes or insulin resistance, are associated with an increased risk of heart disease.' },
    { title: 'Resting ECG (Electrocardiogram)', description: 'Resting ECG provides information about the heart\'s electrical activity. Abnormalities in the ECG can indicate underlying heart conditions.' },
    { title: 'Max HR (Maximum Heart Rate)', description: 'Maximum heart rate is an important parameter during exercise stress testing. It helps evaluate cardiovascular fitness and provides insights into the heart\'s ability to respond to physical stress.' },
    { title: 'Exercise Angina', description: 'Exercise-induced angina, chest pain or discomfort during physical activity, may signal inadequate blood flow to the heart.' },
    { title: 'Oldpeak', description: 'Oldpeak, or the ST depression during exercise, is an ECG change associated with reduced blood flow to the heart.' },
    { title: 'ST Slope', description: 'The ST slope on an ECG measures the upward or downward direction of the ST segment. Abnormal ST slope changes during exercise can suggest myocardial ischemia.' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Information Related to Blood Parameters</Text>
      {parameters.map((param, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card]}
        >
          <View style={styles.cardContent}>
            <Text style={styles.title}>{param.title}</Text>
            <Text style={styles.description}>{param.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:"#52aeb1"
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000000',
    overflow: 'hidden',
  },
  cardEven: {
    marginLeft: '33.33333%',
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  description: {
    fontSize: 16,
    color: '#000000',
  },
});

export default InfoScreen;
