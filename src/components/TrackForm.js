import React, { useContext } from 'react';
import { Text, Button } from 'react-native-elements';
import { withNavigationFocus } from "react-navigation";
import Spacer from './Spacer';
import { connect } from 'react-redux';
import { changeName, startRecording, stopRecording, createTrack, reset, addTrack } from '../actions';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = (props) => {
  const {
    title,
    recording,
    locations,
    startRecording,
    stopRecording,
    changeName,
    trackAdded
  } = props;

  

  const [saveTrack] = useSaveTrack(createTrack, reset);

  return (
    <>

      <Spacer>
        <Spacer>
         
            <Text>{title}</Text>
          </Spacer>
          {recording ? (
            <Button title="Stop" onPress={stopRecording} />
          ) : (
            <Button title="Start Recording" onPress={startRecording} />
          )}
      </Spacer>
    </>
  );
};

const mapStateToProps = state => {
  return {
    name: state.location.name,
    recording: state.location.recording,
    locations: state.location.locations,
    trackAdded: state.location.trackAdded
  }
}

export default withNavigationFocus(connect(mapStateToProps, {
  changeName, startRecording, stopRecording, addTrack
})(TrackForm));
