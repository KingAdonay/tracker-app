import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,  TextInput, ScrollView,ActivityIndicator } from 'react-native';
import { Button, ListItem, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationEvents } from "react-navigation";
import { tryLocalSignin, titleChanged, plateNumberChanged, secretNumberChanged, fetchTracks, createTrack } from '../actions';
import { FontAwesome } from "@expo/vector-icons";
import { Spinner } from '../components/Spinner';

class AddTrack extends Component {

    state = {
        modalVisible: false,
        loaded: false
    }

    onTitleChange(text) {
        this.props.titleChanged(text);
    }

    onPlateNumberChange(text) {
        this.props.plateNumberChanged(text);
    }

    onSecretNumberChange(text) {
        this.props.secretNumberChanged(text);
    }

    handleSubmit() {
        const { createTrack, title, plateNumber, secretNumber } = this.props;
        if (title && plateNumber && secretNumber) {
            createTrack(title, plateNumber, secretNumber);
        } else {
            alert('Please fill all the fields.')
        }

    }

    render() {
        const { loading, title, plateNumber, secretNumber, fetchTracks } = this.props;

        //  console.log(driverData[0   ]);
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.centeredViewcontainer}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Image style={styles.image} source={require('../../assets/logo.jpg')}  />
                            <Text style={styles.text}>Add Your Trip</Text>
                            <TextInput
                                placeholder="Trip Title"
                                label="Title"
                                onChangeText={this.onTitleChange.bind(this)}
                                value={title}
                                style={styles.input}
                                placeholderTextColor="black"
                            />
                            <TextInput
                                placeholder="Plate Number"
                                label="Plate Number"
                                onChangeText={this.onPlateNumberChange.bind(this)}
                                value={plateNumber}
                                style={styles.input}
                                placeholderTextColor="black"
                            />
                            <TextInput
                                placeholder="Secret Number"
                                label="Secret Number"
                                onChangeText={this.onSecretNumberChange.bind(this)}
                                value={secretNumber}
                                style={styles.input}
                                placeholderTextColor="black"
                            />
                            <View>
                                {
                                    loading ? (
                                        <ActivityIndicator size="small"  />
                                    ) : (
                                        <Button
                                            type="outline"
                                            buttonStyle={styles.button}
                                            title="Submit"
                                            onPress={this.handleSubmit.bind(this)}
                                        />
                                    )
                                }

                            </View>

                        </View>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'blue',
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    image: {
        width: 80,
        height: 70,
        borderRadius: 30
    },
    centeredViewcontainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        height: 300,
        width: 200,
        borderRadius: 10,
        marginVertical: 20
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20
    },
    buttonContainer: {
        marginTop: 5,
        alignSelf: 'center'
    },
    button: {
        width: 150,
        marginTop: 5,
        borderWidth: 2
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
        }
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        margin: 22
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'black',
        borderRadius: 10,
    },
    buttonClose: {
        borderColor: 'red'
    }
});



const mapStateToProps = state => {
    return {
        role: state.auth.role,
        tracks: state.track.tracks,
        title: state.track.title,
        plateNumber: state.track.plateNumber,
        secretNumber: state.track.secretNumber,
        loading: state.track.loading
    }
}

export default connect(mapStateToProps, { tryLocalSignin, titleChanged, plateNumberChanged, secretNumberChanged, fetchTracks, createTrack })(AddTrack);