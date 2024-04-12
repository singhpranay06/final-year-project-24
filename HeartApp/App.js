import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ModalPortal } from 'react-native-modals';
import StackNavigator from './StackNavigation'
const App = () => {
  return (
   <>
   <StackNavigator/>
   <ModalPortal/>
   </>
  )
}

export default App

const styles = StyleSheet.create({})