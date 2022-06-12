import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { fetchWithQuery } from '../actions';
import { NavigationEvents } from "react-navigation";
import { getPreciseDistance } from 'geolib';

class RecentTrip extends Component {


    render() {
        const { locations, navigation } = this.props;

        let initialCoords;
        let topSpeed;

        let locationsLocal;
        let distance;
        let averageSpeed;

        if (locations.length > 0) {
            locationsLocal = locations;
            initialCoords = locations[0].coords;
            topSpeed = locationsLocal.reduce((prev, current) => (prev.coords.speed > current.coords.speed) ? prev : current)
            let sum = 0;
            locationsLocal.map(loc => {
                sum += loc.coords.speed;
            });

            averageSpeed = sum / locationsLocal.length;
            distance = getPreciseDistance(
                { latitude: locationsLocal[0].coords.latitude, longitude: locationsLocal[0].coords.longitude },
                { latitude: locationsLocal[locationsLocal.length - 1].coords.latitude, longitude: locationsLocal[locationsLocal.length - 1].coords.longitude },
                locationsLocal[0].coords.accuracy
            );
        } else {
            locationsLocal = [{
                timestamp: 10000000,
                coords: {
                    speed: 0,
                    heading: 0,
                    accuracy: 5,
                    altitudeAccuracy: 5,
                    altitude: 5,
                    longitude: 9.1450,
                    latitude: 40.4897
                }
            }, {
                timestamp: 10000000,
                coords: {
                    speed: 0,
                    heading: 0,
                    accuracy: 5,
                    altitudeAccuracy: 5,
                    altitude: 5,
                    longitude: 9.1450,
                    latitude: 40.4897
                }
            }];
            initialCoords = locationsLocal[0].coords;

            topSpeed = locationsLocal.reduce((prev, current) => (prev.coords.speed > current.coords.speed) ? prev : current)
            let sum = 0;
            locationsLocal.map(loc => {
                sum += loc.coords.speed;
            });

            averageSpeed = sum / locationsLocal.length;
            distance = getPreciseDistance(
                { latitude: locationsLocal[0].coords.latitude, longitude: locationsLocal[0].coords.longitude },
                { latitude: locationsLocal[locationsLocal.length - 1].coords.latitude, longitude: locationsLocal[locationsLocal.length - 1].coords.longitude },
                locationsLocal[0].coords.accuracy
            );
        }


        return (
            <View style={styles.container}>
                <NavigationEvents onWillFocus={this.props.fetchWithQuery} />
                {
                    locations.length > 0 ? (
                        <View>
                            <MapView
                                initialRegion={{
                                    longitudeDelta: 0.01,
                                    latitudeDelta: 0.01,
                                    ...initialCoords
                                }}
                                style={styles.map}
                            >
                                <Polyline coordinates={locationsLocal.map(loc => loc.coords)}
                                    strokeColor="rgba(24, 173, 24, 0.8)" // fallback for when `strokeColors` is not supported by the map-provider
                                    
                                    strokeWidth={6}
                                />
                                <Marker coordinate={locationsLocal[0].coords} pinColor="green" />
                                <Marker coordinate={locationsLocal[locationsLocal.length - 1].coords} pinColor='red' />
                            </MapView>
                            <ScrollView contentContainerStyle={styles.detailsContainer}>
                                {/* <Text style={{ fontSize: 30, textAlign: 'center', marginVertical: 10, fontWeight: 'bold' }}>{locationsLocal.title}</Text> */}

                                {
                                    topSpeed<30?(
                                        <Text style={styles.speedNormal}>Top speed: {topSpeed > 0 ? topSpeed.toFixed(3) : 0}km/hr</Text>
                                    ): (
                                        <Text style={styles.speedWarning}>Top speed: {topSpeed > 0 ? topSpeed.toFixed(3) : 0}km/hr</Text>
                                    )
                                }
                                <Text style={{ fontSize: 20, marginBottom: 5 }}>AverageSpeed: {averageSpeed > 0 ? averageSpeed.toFixed(3) : 0} km/hr</Text>
                                <Text style={{ fontSize: 20, marginBottom: 5 }}>Estimated Distance: {distance} KM</Text>
                            </ScrollView>
                        </View>
                    ) : (
                        <View style={styles.containerNull}>
                            <Text style={styles.textStyle}>You have no Recent Trip.</Text>
                            <Text style={styles.textStyle}>Add your first trip by going</Text>
                            <Text style={styles.textStyle}>to the Add Trips Screen.</Text>
                        </View>
                    )
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    map: {
        height: 500,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerNull: {
        alignContent: 'center',
        textAlign: 'center',
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 5
    },
    textStyle: {
        fontSize: 20,
        alignSelf: 'center'
    },
    detailsContainer: {
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 20
    }, 
    speedNormal: { fontSize: 20, marginBottom: 5, color:'black' },
    speedWarning:  { fontSize: 20, marginBottom: 5, color:'orange' }
});

const mapStateToProps = state => {
    return {
        locations: state.track.locations,
    }
}

export default connect(mapStateToProps, { fetchWithQuery })(RecentTrip);
