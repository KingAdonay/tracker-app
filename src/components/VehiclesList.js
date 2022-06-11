import React, { Component } from 'react';
import { ListItem } from "react-native-elements";
import {FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {connect} from 'react-redux';
import {removeVehicle} from '../actions';

class VehiclesList extends Component {
    render() {
        const {vehicles, navigation} = this.props;
        
        return (
            <>{
                vehicles.length>0 ? (
                    <FlatList
                    data={vehicles}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("TrackList", { _id: item.data._id, name: item.data.name, tracks: item.data.tracks, vehicleKey: item.vehicleKey })
                                }
                            >
                                <ListItem style={{
                                    marginTop: 10, marginHorizontal:5,
                                   borderBottomWidth: 2,
                                   borderBottomColor: 'rgba(213, 237, 255, 0.8)',
                                   borderRadius:2
                                }}>
                                    <ListItem.Content>
                                        <ListItem.Title style={{
                                            fontWeight: '500',
                                            fontSize: 18
                                        }}>{item.data.name}</ListItem.Title>
                                    </ListItem.Content>
                                    <TouchableOpacity onPress={()=>this.props.removeVehicle(item.vehicleKey)}>
                                        {/* <ListItem.Chevron /> */}
                                        <FontAwesome name="trash" size={20} />
                                        {/* <FontAwesomeIcon icon="fa-solid fa-circle-trash"  /> */}
                                    </TouchableOpacity>
                                    
                                </ListItem>
                            </TouchableOpacity>
                        );
                    }}
                />
                ):(<View style={styles.containerNull}>
                    <Text style={styles.textStyle}>Please add your first trip.</Text>
                </View>)
            }
               
            </>
        )
    }
}

const styles =  StyleSheet.create({
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
    }
});

const mapStateToProps = state =>{
    return {
        vehicles: state.track.vehicles
    }
}


export default connect(mapStateToProps, {removeVehicle})(VehiclesList);
