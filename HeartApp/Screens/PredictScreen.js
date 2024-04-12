import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,StatusBar,Pressable,ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import axios from 'axios'
export default function PredictScreen() {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('M');
  const [restingBP, setRestingBP] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [fastingBS, setFastingBS] = useState('');
  const [restingECG, setRestingECG] = useState('Normal');
  const [maxHR, setMaxHR] = useState('');
  const [exerciseAngina, setExerciseAngina] = useState('Y');
  const [oldpeak, setOldpeak] = useState('');
  const [stSlope, setStSlope] = useState('Up');
  const [result, setResult] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const predict = async() => {
    setLoading(true);
    const inputValues = {
      Age: parseFloat(age),
      Sex: sex.value,
      RestingBP: parseFloat(restingBP),
      Cholesterol: parseFloat(cholesterol),
      FastingBS: parseFloat(fastingBS),
      RestingECG: restingECG.value,
      MaxHR: parseFloat(maxHR),
      ExerciseAngina: exerciseAngina.value,
      Oldpeak: parseFloat(oldpeak),
      ST_Slope: stSlope.value
    };
    console.log(inputValues)
    try {
      const response = await axios.post("https://heart-guard-ai.onrender.com/predict", { new_record: inputValues }, { headers: { 'Content-Type': 'application/json' } });
      const predictions = response.data;
      const resultText = {
        type: predictions.predicted_chest_pain_type,
        flag: predictions.predicted_patient_has_disease
      };
      setResult(resultText);
      setModalVisible(true);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: `Error: ${error.message}` });
    } finally {
      setLoading(false); 
    }

  };
  return (
    <>
    <StatusBar backgroundColor="#333" barStyle="light-content" /> 
    <ScrollView>
    <View style={styles.container}>
    <View style={styles.form}>
      <Text style={styles.heading}>Heart Disease Prediction</Text>
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Sex:</Text>
      <Dropdown
        data={[
          { label: 'Male', value: 'M' },
          { label: 'Female', value: 'F' },
        ]}
        value={sex}
        labelField="label"
        valueField="value"
        onChange={(value) => setSex(value)}
        placeholder="Select gender"
        style={styles.input}
      />

      <Text style={styles.label}>Resting BP:</Text>
      <TextInput
        style={styles.input}
        value={restingBP}
        onChangeText={setRestingBP}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cholesterol:</Text>
      <TextInput
        style={styles.input}
        value={cholesterol}
        onChangeText={setCholesterol}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Fasting BS:</Text>
      <TextInput
        style={styles.input}
        value={fastingBS}
        onChangeText={setFastingBS}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Resting ECG:</Text>
      <Dropdown
        data={[
          { label: 'Normal', value: 'Normal' },
          { label: 'ST', value: 'ST' },
          { label: 'Lvh', value: 'Lvh' },
        ]}
        value={restingECG}
        labelField="label"
        valueField="value"
        onChange={(value) => setRestingECG(value)}
        placeholder="Select resting ECG"
        style={styles.input}
      />

      <Text style={styles.label}>Max HR:</Text>
      <TextInput
        style={styles.input}
        value={maxHR}
        onChangeText={setMaxHR}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Exercise Angina:</Text>
      <Dropdown
        data={[
          { label: 'Yes', value: 'Y' },
          { label: 'No', value: 'N' },
        ]}
        labelField="label"
        valueField="value"
        value={exerciseAngina}
        onChange={(value) => setExerciseAngina(value)}
        placeholder="Select exercise angina"
        style={styles.input}
      />

      <Text style={styles.label}>Oldpeak:</Text>
      <TextInput
        style={styles.input}
        value={oldpeak}
        onChangeText={setOldpeak}
        keyboardType="numeric"
      />

      <Text style={styles.label}>ST Slope:</Text>
      <Dropdown
        data={[
          { label: 'Up', value: 'Up' },
          { label: 'Flat', value: 'Flat' },
          { label: 'Down', value: 'Down' },
        ]}
        value={stSlope}
        labelField="label"
        valueField="value"
        onChange={(value) => setStSlope(value)}
        placeholder="Select ST slope"
        style={styles.input}
      />

      {/* Result text area */}
      {/* <Text style={styles.label}>Result:</Text>
      <TextInput
        style={[styles.input, styles.result]}
        value={result}
        editable={false}
        multiline={true}
      /> */}

      {/* Submit button */}
      <TouchableOpacity style={styles.button} onPress={predict}>
      {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
        <Text style={styles.buttonText}>Submit</Text>
          )}
      </TouchableOpacity>
    </View>
  </View>
  </ScrollView>


  <BottomModal
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={100}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(false)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
      >
        <ModalContent style={{ width: "100%", height: 250 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <View style={{ marginBottom: 8, marginTop: 50 }}>
              {result.error ? (
                <Text style={styles.modalText}>{result.error}</Text>
              ) : (
                <>
                  <Text style={styles.modalText}>Your Chest Pain Type is Likely to be : {result.type}</Text>
                  <Text style={styles.modalText}>Heart Disease : {result.flag === 0 ? "Yes" : "No"}</Text>
                </>
              )}
              <Pressable
                style={[styles.button, styles.modalButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>OK</Text>
              </Pressable>
            </View>
          )}
        </ModalContent>
      </BottomModal>
    </>
    
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#333',
  justifyContent: 'center',
  alignItems: 'center',
},
form: {
  backgroundColor: '#52AEB1',
  borderRadius: 10,
  padding: 20,
  width: '100%',
},
heading: {
  textAlign: 'center',
  color: '#000',
  fontSize: 24,
  fontWeight:"bold",
  marginBottom: 20,
},
label: {
  color: '#000',
  fontWeight: 'bold',
  marginBottom: 8,
},
input: {
  width: '100%',
  padding: 5,
  marginBottom: 10,
  borderRadius: 5,
  backgroundColor: '#fff',
  color:"#000"
},
result: {
  height: 60,
},
button: {
  backgroundColor: '#000',
  paddingVertical: 10,
  borderRadius: 5,
  alignItems: 'center',
},
buttonText: {
  color: '#fff',
  fontSize: 20,
},
modalView: {
  margin: 100,
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 35,
  alignItems: "center",
  justifyContent: 'center',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
modalText: {
  marginBottom: 15,
  textAlign: "center",
  fontSize: 18,
  fontWeight: "bold",
  color: '#000'
},
modalButton: {
  backgroundColor: '#000',
  marginTop: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
},
});