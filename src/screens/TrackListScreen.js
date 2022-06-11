import React from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { fetchTracks } from '../actions';


const TrackListScreen = (props) => {
  const {  navigation } = props;
 // const _id = navigation.getParam('_id');
  const tracks = navigation.getParam('tracks') || {};
  const vehicleKey = navigation.getParam('vehicleKey') || '';

  console.log(tracks);
  let arr=[];
  Object.entries(tracks).forEach(([key, track]) => {
    arr.push({key,track});
  })

  return (
    <View style={{flex: 1, backgroundColor: 'white'}} >
    {
      arr.length>0?( 
        <FlatList
        data={arr}
        keyExtractor={(item) => item.track._tid}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { locations: item.track.locations, title: item.track.title, vehicleKey: vehicleKey, key:item.key })
              }
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.track.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
      ):(<View style={styles.noDataContainer}>
        <Text style={styles.text}>No trips available! </Text>
      </View>)
    }
     
    </View>
  );
};

TrackListScreen.navigationOptions = {
  title: "Tracks",
};

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  text:{
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10
  }
});

const mapStateToProps = state =>{
  return{
    vehicles: state.track.vehicles
  }
}

export default connect(mapStateToProps, {fetchTracks})(TrackListScreen) ;