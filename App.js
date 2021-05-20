import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "2c005dfe27dd0e9fc6072b0bd1edc0a7";
export default class extends React.Component {
  state = {
    isLoading:true
  };
  getWeather = async (latitude,longitude)=>{
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    console.log(data);
  };
  getLocation = async ()=> {
    try{
      await Location.requestForegroundPermissionsAsync();
      const {
        coords:{latitude,longitude}
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude,longitude);
      this.setState({isLoading:false});
    }catch(error){
      Alert.alert("Can't find you.","sorry");
    }
  };
  componentDidMount(){
    this.getLocation();
  }

  render(){
    const {isLoading}=this.state;
    return isLoading ? <Loading /> : null;
  }
}

