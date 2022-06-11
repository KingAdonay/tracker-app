import { navigate } from '../navigationRef';
import { useSelector, useDispatch } from 'react-redux';

export default (createTrack, reset) => {
  const state = useSelector(state => state.location);
  console.log(state);

  const { name, locations } = state;

  const saveTrack = () => {
    createTrack(name, locations);
    reset();
    navigate('TrackList');
  };

  return [saveTrack];
};
