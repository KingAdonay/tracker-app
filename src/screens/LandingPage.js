import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setRole, tryLocalSignin } from '../actions';

class LandingPage extends Component {
    
    render() {
        const {setRole, tryLocalSignin, navigation}=this.props;

        return (
            <View style={styles.centeredView}>
                <Text style={styles.text}>ADDIS TRACKER</Text>
                <View>
                    <Image source={require('../../assets/logo.jpg')} style={styles.image} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button buttonStyle={styles.button} title="Tracker" type="outline" onPress={()=>{
                       setRole('tracker')
                       tryLocalSignin();

                    }} />
                    <Button buttonStyle={styles.button} title="Trackee" type="outline" 
                    onPress={()=>{
                        setRole('trackee')
                        
                    }} 
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 15
    },
    image: {
        height: 300,
        width: 200,
        borderRadius: 10,
        marginVertical: 20
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24
    },
    buttonContainer:{
        marginTop: 5,
        
    },
    button:{
        width: 100,
        marginTop:5,
        borderWidth:2
    }
})

const mapStateToProps = state => {
    return {
        role: state.auth.role
    }
}

export default connect(mapStateToProps, {tryLocalSignin, setRole})(LandingPage);