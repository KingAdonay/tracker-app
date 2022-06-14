import React, { Component, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { getPreciseDistance } from 'geolib';
import { NavigationEvents } from 'react-navigation';
import { fetchLocations } from '../actions';

class TrackDetailScreen extends Component {

  state = {
    locNew: this.props.fetchLocations
  }

  handleGetLocation() {
    const { navigation } = this.props;
    const vehicleKey = navigation.getParam('vehicleKey');
    const key = navigation.getParam('key');
    this.props.fetchLocations(vehicleKey, key);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchedLocation != this.props.fetchedLocation) {
      console.log('it updated')
      this.setState({ locNew: this.props.fetchedLocation });
    }
  }

  render() {
    const { fetchedLocation, navigation } = this.props;
    const locations = navigation.getParam('locations');
    const title = navigation.getParam('title');
    const vehicleKey = navigation.getParam('vehicleKey');
    const key = navigation.getParam('key');


    let initialCoords;
    let topSpeed;
    let locationsLocal;

    //let locationsArr = [];
    let distance;
    let averageSpeed;

    if (fetchedLocation.length > 0) {

      // Object.entries(locations).forEach(([key, location]) => {
      //   locationsArr.push(location);
      // })

      //locationsLocal = locationsArr;
      initialCoords = fetchedLocation[0].coords;
      topSpeed = fetchedLocation.reduce((prev, current) => (prev.coords.speed > current.coords.speed) ? prev : current)
      let sum = 0;
      fetchedLocation.map(loc => {
        sum += loc.coords.speed;
      });

      averageSpeed = sum / fetchedLocation.length;
      distance = getPreciseDistance(
        { latitude: fetchedLocation[0].coords.latitude, longitude: fetchedLocation[0].coords.longitude },
        { latitude: fetchedLocation[fetchedLocation.length - 1].coords.latitude, longitude: fetchedLocation[fetchedLocation.length - 1].coords.longitude },
        fetchedLocation[0].coords.accuracy
      );

    }

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.handleGetLocation.bind(this)} />
        {
          fetchedLocation.length > 0 ? (
            <>
              <MapView
                initialRegion={{
                  longitudeDelta: 0.01,
                  latitudeDelta: 0.01,
                  ...initialCoords
                }}
                style={styles.map}
              >
                <Polyline coordinates={fetchedLocation.map(loc => loc.coords)}
                  strokeColor="rgba(19, 94, 99, 0.8)" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeWidth={4}
                />
                <Marker coordinate={fetchedLocation[0].coords} pinColor="green" />
                <Marker coordinate={fetchedLocation[fetchedLocation.length - 1].coords} pinColor='red' />
              </MapView>
              <ScrollView>
                <Text style={{ fontSize: 30, textAlign: 'center', marginVertical: 10, fontWeight: 'bold' }}>{title}</Text>
                 <Text style={[(topSpeed.coords.speed > '1') ? styles.speedWarning : styles.speedNormal, { fontSize: 20, marginBottom: 5 }]}>Top speed: {topSpeed.coords.speed >= 0 ? topSpeed.coords.speed.toFixed(3) : 0}km/hr</Text>
                 <Text style={[(averageSpeed >= '1') ? styles.speedWarning : styles.speedNormal, { fontSize: 20, marginBottom: 5 }]}>AverageSpeed: {averageSpeed > 0 ? averageSpeed.toFixed(3) : 0} km/hr</Text>
                <Text style={{ fontSize: 20, marginBottom: 5 }}>Estimated Distance: {distance} KM</Text>
              </ScrollView>
            </>
          ) : (<Text> Not Loading!</Text>)
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  map: {
    height: 500
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
   speedNormal: {
        fontSize: 20,
        marginBottom: 5,
        color: 'black'
    },
    speedWarning: {
        fontSize: 20,
        marginBottom: 5,
        color: 'orange'
    }
});

const mapStateToProps = state => {
  return {
    fetchedLocation: state.location.fetchedLocation,
  }
}

export default connect(mapStateToProps, { fetchLocations })(TrackDetailScreen);
