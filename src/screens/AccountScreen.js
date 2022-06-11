import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { signout, setRole, tryLocalSignin } from '../actions';
import Spacer from '../components/Spacer';
import { FontAwesome } from '@expo/vector-icons';

const AccountScreen = (props) => {
  const { signout, tryLocalSignin, role, setRole } = props;
  const tracker = 'tracker';
  const trackee = 'trackee'

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <View style={styles.centeredViewcontainer}>
        <Text style={styles.text}>Settings</Text>
      </View>
      <View style={styles.buttonContainer}>
        {
          role == 'trackee' ? (
            <Spacer>
              <Button title="Change Role" onPress={()=>{
                setRole(tracker)
                tryLocalSignin();
                }} buttonStyle={styles.button} />
            </Spacer>
          ) : (
            <View>
              <Spacer>
                <Button title="Change Role" onPress={()=>{setRole(trackee)}} buttonStyle={styles.button} />
              </Spacer>
              <Spacer>
                <Button title="Sign Out" onPress={signout} buttonStyle={styles.button} />
              </Spacer>
            </View>
          )
        }

      </View>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'column',
    backgroundColor: 'blue',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  centeredViewcontainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  buttonContainer: {
    marginTop: 5,
    alignSelf: 'center'
  },
  button: {
    width: 150,
    marginTop: 5,
    borderWidth: 2
  }
});

const mapStateToProps = state => {
  return {
    role: state.auth.role
  }
}

export default connect(mapStateToProps, {
  signout, setRole, tryLocalSignin
})(AccountScreen);
