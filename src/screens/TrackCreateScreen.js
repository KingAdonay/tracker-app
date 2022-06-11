//import '../_mockLocation';
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "../components/Map";
import { connect } from 'react-redux';
import { addLocation } from '../actions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = (props) => {
  const {
    recording,
    addLocation,
    isFocused,
    navigation
  } = props;

  const driverData = navigation.getParam('driverData');

  const query = `tracker/${driverData.usersId}/vehicles/${driverData.key}/tracks/${driverData.trackKey}/locations/`;
  const trackQuery = `tracker/${driverData.usersId}/vehicles/${driverData.key}/tracks/${driverData.trackKey}/`;
  AsyncStorage.setItem('trackQuery', trackQuery);

  const callback = useCallback(
    (location) => {
      addLocation(location, recording, query);
    },
    [recording]
  );

  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView style={styles.container} >
      
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm title={driverData.trackTitle} />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
  }
});


const mapStateToProps = state => {
  return {
    driverData: state.track.driverData,
    recording: state.location.recording
  }
}

export default withNavigationFocus(connect(mapStateToProps, {
  addLocation
})(TrackCreateScreen));
