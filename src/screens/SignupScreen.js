import React, { useContext } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { signup, clearErrorMessage, setRole } from '../actions';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';

const SignupScreen = (props) => {
  const { errorMessage, signup, clearErrorMessage, navigation, setRole, loading } = props;

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <Image source={require('../../assets/logo.jpg')} style={styles.image}/>
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
        loading={loading}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
      />
      <Spacer>
        <Button title="Change Role" onPress={() => { setRole('trackee') }} buttonStyle={styles.button} />
      </Spacer>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 15
},
image:{
  width: 80,
  height:100,
  borderRadius: 30
}
});

const mapStateToProps = state =>{
  return {
    errorMessage: state.auth.errorMessage,
    loading: state.auth.loading
  }
}

export default connect(mapStateToProps, {
  signup, clearErrorMessage, setRole
})(SignupScreen);
