import { StyleSheet, Text, View,Image,ScrollView,TouchableOpacity, TextInput, Button, StatusBar } from 'react-native'
import React,{useLayoutEffect} from 'react'
import { useNavigation } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";
const HomeScreen = () => {
    const navigation=useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: "Heart Guard AI",
          headerTitleStyle:{
            color:"#4EADAC"
          },
          headerLeft: () => (
            <Image style={{height:45,width:80}} source={{uri:"https://i.pinimg.com/originals/30/7e/69/307e6906c251d91bb6202b3dd4736d7a.jpg"}}/>
          ),
        });
      }, []);
      const images = [
        "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg",
        "https://images.pexels.com/photos/5215013/pexels-photo-5215013.jpeg ",
        "https://images.pexels.com/photos/5327864/pexels-photo-5327864.jpeg",
      ];
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#52aeb1" barStyle="light-content" />
        <SliderBox
            images={images}
            autoplay
            circleLoop
            inactiveDotColor='#90A4AE'
            ImageComponentStyle={{ width: "100%"}}
            style={styles.slider}
          />
        <View style={styles.hero}>
        <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>HEART GUARD AI - Your Online </Text>
            <Text  style={styles.heroTitle1}>Heart Health Assistant</Text>
            <Text style={styles.heroText}>HEART GUARD AI is your go-to online chatbot for all your cardiac health concerns. Get instant expert information and assistance 24/7 from the comfort of your home.</Text>  
        </View>
      {/* <Image source={require('../assets/hero.png')} style={styles.heroImage} /> */}
    </View>
    <View>
    <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.glowButton} onPress={()=>navigation.navigate("Predict")}>
            <Text style={styles.buttonText}>Predict Heart Diseases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.glowButton} onPress={()=>navigation.navigate("Info")}>
            <Text style={styles.buttonText}>Get Information</Text>
          </TouchableOpacity>
        </View> 
    </View>
    <View style={styles.featuresSection}>
        <Text style={styles.title}>Features</Text>
        <View style={styles.featureGrid}>
          {/* Feature 1 */}
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>24/7 Heart health Assistance</Text>
          </View>
          {/* Feature 2 */}
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>Expert Heart health Information</Text>
          </View>
          {/* Feature 3 */}
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>Personalized Heart Care</Text>
          </View>
          {/* Feature 4 */}
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>Quick and Easy to Use</Text>
          </View>
          {/* Feature 5 */}
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>Cost-Effective Heart Solutions</Text>
          </View>
          {/* Feature 6 */}
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>Instant Heart Advice</Text>
          </View>
          {/* Feature 7 */}
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>Convenient and Accessible</Text>
          </View>
          {/* Feature 8 */}
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>Efficient and Reliable</Text>
          </View>
          {/* Feature 9 */}
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>Cost-Effective Heart Care</Text>
          </View>
          {/* Feature 10 */}
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>Personalized Heart Assistance</Text>
          </View>
        </View>
      </View>
      <View style={styles.newsletterSection}>
      <View style={styles.newsletterContent}>
        <Text style={styles.title}>Subscribe to Newsletter</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#ffffff',
},

title: {
  color: '#fff',
  fontWeight: '900',
},
hero: {
  display:'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 20,
},
heroContent: {
  width: '100%',
  alignItems:"center",
},
heroTitle: {
  color: '#000',
  fontSize: 24,
  fontWeight: '900',
},
heroTitle1: {
  color: '#000',
  fontSize: 24,
  fontWeight: '900',
  marginBottom:10
},
heroText: {
  color: '#000',
  marginTop:5,
  marginBottom: 5,
},
buttonsContainer: {
  flexDirection: 'row',
  justifyContent:'space-between',
  margin:10,
  gap:10
},
glowButton: {
  backgroundColor: '#52AEB1',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  marginVertical: 5,
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
},
heroImage: {
  width: '50%',
  height: 300,
  borderRadius:8
},
featuresSection: {
    backgroundColor: '#f7fafc',
    padding:30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 20,
    marginLeft:10,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%', 
    marginBottom: 20,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    fontSize: 14,
    marginBottom: 10,
  },
  featureText: {
    textAlign: 'center',
    color: '#4a5568',
  },
  newsletterSection: {
    backgroundColor: '#fff',
    paddingVertical: 40,
  },
  newsletterContent: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#52AEB1',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  slider:{
    height:450,
    borderRadius:8,
    margin:10
  }
});

export default HomeScreen;
        