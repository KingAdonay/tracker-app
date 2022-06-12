import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        labelStyle={styles.inputLabel}
        style={styles.input}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        labelStyle={styles.inputLabel}
        style={styles.input}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        {
          loading ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <Button
              title={submitButtonText}
              onPress={() => onSubmit({ email, password })}
            />
          )
        }

      </Spacer>

      {
        loading ? (
          <Spacer>
            <ActivityIndicator />
          </Spacer>
        ) : (
          null
        )
      }

    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  inputLabel: {
    color: 'black',
  },
  input: {
    width: 200
  },

});

export default AuthForm;
