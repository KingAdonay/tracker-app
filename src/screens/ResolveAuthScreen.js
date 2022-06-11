import React, { useEffect, useContext, Component } from 'react';
import { connect } from 'react-redux';
import { tryLocalSignin } from '../actions';
import LandingPage from './LandingPage';

class ResolveAuthScreen extends Component{
  
  // UNSAFE_componentWillMount(){
  //   this.props.tryLocalSignin();
  // }

   render() {  
    return (
      <LandingPage/>
    );
  };
}


const mapStateToProps = state =>{
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps,{tryLocalSignin})(ResolveAuthScreen);
