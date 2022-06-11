import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { signin, clearErrorMessage, setRole } from '../actions';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';

const SigninScreen = (props) => {
  const { errorMessage, signin, clearErrorMessage, setRole } = props;

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <Image source={require('../../assets/logo.jpg')} style={styles.image} />
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      //loading={loading}
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
      />
      <Spacer>
        <Button title="Change Role" onPress={() => { setRole(trackee) }} buttonStyle={styles.button} />
      </Spacer>
    </View>
  );
};

SigninScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 15
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 30
  }
});


const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, {
  signin, clearErrorMessage,setRole
})(SigninScreen);

