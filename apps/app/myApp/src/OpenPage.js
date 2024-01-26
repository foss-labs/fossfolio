import { View, 
         Image, 
         StyleSheet,
         Text,
        } from 'react-native';  
import { Ionicons } from '@expo/vector-icons';
import React from 'react'

const OpenPage = () => {
  return (
    <View style = {styles.container}>
      <Image source={require('../assets/Logo1.png')} style = {styles.image}/>
      <View>
        <Image source={require('../assets/wallpaper1.png')} style = {styles.wallpaper}/>
      </View>
      <View style={styles.text}>
        <Text style = {styles.desc}>Scan, Discover, Thrive. Unveil events effortlessly with <Text style={{ fontWeight: '700' }}>FossFolio</Text></Text>
      </View>
      <View style = {styles.icons}>
      <Ionicons name="ellipse" size={24} style={styles.icon1}/>
      <Ionicons name="ellipse-outline" size={24} style={styles.icon2}/>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
    container:{
flex:1,
alignItems: 'center'
},
image: {
    width: 193,
    height: 43.49,
    position: 'absolute',
    top: 173,
    left: 119
    },
wallpaper:{
    width: 430,
    height: 260,
    top: 315
},
text:{
    width: 364,
    height: 48,
    top: 597,
    
},
desc:{
    fontFamily: 'inter',
    fontWeight: '400',
    lineHeight: 24,
    fontSize: 20,
    textAlign: 'center'
    
},
icon1:{
    color:'#7F56D9',
    width: 10,
    height: 10,
    right: 10
},
icon2:{
    width: 10,
    height: 10,
    left: 10
},
icons:{
    top: 743,
    right: 10,
    flexDirection: 'row'

}
       
        
})

export default OpenPage