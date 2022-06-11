import React, { useContext } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { connect } from 'react-redux';

const Map = (props) => {
  const { currentLocation, locations } = props;

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }


  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    > 
      <Circle
        center={currentLocation.coords}
        radius={20}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor={currentLocation.coords.speed > 0? "rgba(207, 130, 63, 0.5)": "rgba(158, 158, 255, 0.6)" }
      />
      {
        locations?(<Polyline strokeColor="rgba(24, 173, 24, 0.8)" coordinates={locations.map((loc) => loc.coords)} />)
        :(null)
      }
      
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 500,
  },
});

const mapStateToProps = state =>{
  return {
    currentLocation: state.location.currentLocation, 
    locations: state.location.locations
  }
}

export default connect(mapStateToProps, null)(Map);