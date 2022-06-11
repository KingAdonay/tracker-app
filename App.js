import React, { useEffect } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { initializeApp, getApps, getApp } from "firebase/app";
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import LandingPage from './src/screens/LandingPage';
import RecentTrip from './src/screens/RecentTrip';
import Vehicles from './src/screens/Vehicles';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import AddTracks from './src/screens/AddTracks';



const firebaseConfig = {
  apiKey: "AIzaSyCQbU-km4oxAuW2mqhSMZjd1N3PHnzOgLU",
  authDomain: "tracker-8b4c7.firebaseapp.com",
  databaseURL: "https://tracker-8b4c7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tracker-8b4c7",
  storageBucket: "tracker-8b4c7.appspot.com",
  messagingSenderId: "32708538093",
  appId: "1:32708538093:web:565d349d151aadca1a66e4"
};

// Initialize Firebase


const trackListFlow = createStackNavigator({
  Vehicles: Vehicles,
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen,
});

const trackCreateFlow = createStackNavigator({
  AddTracks: AddTracks,
  TrackCreate: TrackCreateScreen,  
});

const trackeeListFlow = createStackNavigator({
  RecentTrip: RecentTrip,
  TrackDetail: TrackDetailScreen,
});

trackListFlow.navigationOptions = {
  title: 'Vehicles',
  tabBarIcon: <FontAwesome name="car" size={20} />,
  headerTitleStyle: {color: 'green'}
};

trackeeListFlow.navigationOptions = {
  title: 'Last Trips',
  tabBarIcon: <FontAwesome name="th-list" size={20} />,
};

trackCreateFlow.navigationOptions = {
  title: 'Add Trips',
  tabBarIcon: <FontAwesome name="plus" size={20} />,
  headerTitleStyle: {color: 'green'}
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: LandingPage,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainTrackerFlow: createBottomTabNavigator({
    trackListFlow,
    Account: AccountScreen,
  }),
   mainTrackeeFlow: createBottomTabNavigator({
    trackeeListFlow,
    trackCreateFlow,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {

  useEffect(() => {
    initializeApp(firebaseConfig);
  });

  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </Provider>
  );
};
