import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import { 
    createVehicle, 
    fetchVehicles, 
    nameChanged, 
    driverChanged, 
    typeChanged, 
    plateNumberChanged, 
    secretNumberChanged,
    removeVehicle
} from '../actions';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from "react-navigation";
import { ListItem, Button } from "react-native-elements";
import { Spinner } from '../components/Spinner';
import VehiclesList from '../components/VehiclesList';
import { FontAwesome } from '@expo/vector-icons';


class Vehicles extends Component {
    //const [modalVisible, setModalVisible] = useState(false);
    state = {
        modalVisible: false,
        loaded: false,
        refreshing: false
    }

    componentDidMount() {
        this.props.fetchVehicles();
    }

    onNameChange(text) {
        this.props.nameChanged(text);
    }

    onDriverChange(text) {
        this.props.driverChanged(text);
    }

    onTypeChange(text) {
        this.props.typeChanged(text);
    }

    onPlateNumberChange(text) {
        this.props.plateNumberChanged(text);
    }

    onSecretNumberChange(text) {
        this.props.secretNumberChanged(text);
    }

    handleSubmit() {
        const { name, driver, type, secretNumber, plateNumber, createVehicle, fetchVehicles } = this.props;

        if (name && driver && type && secretNumber && plateNumber) {
            createVehicle(name, type, driver, plateNumber, secretNumber);
            this.setState({ modalVisible: !this.state.modalVisible })
            fetchVehicles();
        } else {
            alert('Please fill all the fields.');
        }
    }

    handleRefresh(){
        const { fetchVehicles } = this.props;
        this.setState({refreshing:false});
        fetchVehicles();
    }

    render() {
        const {
            name,
            type,
            driver,
            plateNumber,
            secretNumber,
            loading,
            vehicles,
            navigation,
            fetchVehicles
        } = this.props;

        const vehiclesNull = [{key:1}]

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }} >
                <NavigationEvents onWillFocus={fetchVehicles}></NavigationEvents>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.setState({ modalVisible: !this.state.modalVisible })
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Add Vehicle</Text>
                            <TextInput
                                placeholder="Name"
                                label="Name"
                                onChangeText={this.onNameChange.bind(this)}
                                value={name}
                                style={styles.input}
                                placeholderTextColor="black"
                            />
                            <TextInput
                                placeholder="Driver Name"
                                label="Name"
                                onChangeText={this.onDriverChange.bind(this)}
                                value={driver}
                                style={styles.input}
                                placeholderTextColor="black"
                            />
                            <TextInput
                                placeholder="Vehicle Type"
                                label="Name"
                                onChangeText={this.onTypeChange.bind(this)}
                                value={type}
                                style={styles.input}
                                placeholderTextColor="black"
                            />
                            <TextInput
                                placeholder="Plate Number"
                                label="Name"
                                onChangeText={this.onPlateNumberChange.bind(this)}
                                value={plateNumber}
                                style={styles.input}
                                placeholderTextColor="black"
                            />
                            <TextInput
                                placeholder="Secret Number"
                                onChangeText={this.onSecretNumberChange.bind(this)}
                                value={secretNumber}
                                style={styles.input}
                                placeholderTextColor="black"
                            />
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Button
                                    style={{ marginHorizontal: 5 }}
                                    type='outline'
                                    title="Submit"
                                    onPress={this.handleSubmit.bind(this)}
                                />
                                <Button
                                    style={{ marginHorizontal: 5 }}
                                    type='outline'
                                    title="Cancel"
                                    onPress={() => { this.setState({ modalVisible: !this.state.modalVisible }) }}
                                    titleStyle={{ color: 'red' }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{
                    height: '94%',
                    backgroundColor: 'white',
                    PaddingTop: 10
                }}>
                    {
                        loading ? (
                            <View style={{ flex: 1, backgroundColor: 'white' }}><Spinner /></View>
                        ) : (null)
                    }
                    {vehicles.length > 0 ? (
                        // <VehiclesList vehicles={vehicles} navigation={navigation} />
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
                                refreshing={this.state.refreshing}
                                onRefresh={this.handleRefresh.bind(this)}
                            />
                            ):(<View style={styles.containerNull}>
                                <Text style={styles.textStyle}>Please add your first vehicle.</Text>
                            </View>)
                        }
                           
                        </>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <FlatList
                                data={vehiclesNull}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => {
                                    return (
                                        <>
                                        {
                                            this.props.no_vehicles== 'no_vehicles'?(<Text style={styles.text}>Please add Vehicles.</Text>
                                            ):(
                                                <Text style={styles.text}>Waiting for network...</Text>
                                            )
                                        }
                                        </>
                                    );
                                }}
                                refreshing={this.state.refreshing}
                                onRefresh={this.handleRefresh.bind(this)}
                            />
                        </View>
                    )}
                </View>
                <Pressable style={styles.buttonOpen} onPress={() => this.setState({
                    modalVisible: true
                })}>
                    <Text style={styles.textStyle}>Add Vehicle</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'black',
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        margin: 22
    },
    modalView: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        marginVertical: 10,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        marginVertical: 5,
        borderRadius: 30,
        alignSelf: 'center',
        backgroundColor: 'blue',
        width: 180,
        height: 30,
        justifyContent: 'center'
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        marginBottom: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    modalText: {
        marginVertical: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    noDataContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    text: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10
    }
});

const mapStateToProps = state => {
    return {
        name: state.track.name,
        type: state.track.type,
        driver: state.track.driver,
        plateNumber: state.track.plateNumber,
        secretNumber: state.track.secretNumber,
        vehicles: state.track.vehicles,
        loading: state.track.loading,
        no_vehicles: state.track.no_vehicles
    }
}

export default connect(mapStateToProps, {
    createVehicle, 
    removeVehicle, 
    fetchVehicles, 
    nameChanged, 
    driverChanged, 
    typeChanged, 
    plateNumberChanged, 
    secretNumberChanged
})(Vehicles);