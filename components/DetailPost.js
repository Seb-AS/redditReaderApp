import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";

export default class DetailPost extends Component
{
 render()
 {
    return(
       <View style = { styles.mainContainer }>
          <View style = { styles.left }>
            <Text style={[styles.authorTextStyle]}> {this.props.navigation.state.params.item.data.author} </Text>
          </View>            
          <View style = { styles.middle }>
            <Image style={[styles.thumbnail]} source={{ uri: this.props.navigation.state.params.item.data.thumbnail }}/>    
          </View>      
          <View style = { styles.middle }>
            <Text style={ styles.textStyle }> {this.props.navigation.state.params.item.data.title} </Text>  
          </View>           
       </View>
    );
 }
}

const styles = StyleSheet.create(
{
    mainContainer:
    {
        flex:1,  
    },
    authorTextStyle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign:"left",
        color: "#000"
    },
    textStyle:
    {
        fontSize: 20,
        textAlign: "left",
        color: "#000"
    },
    thumbnail : {
        width  : 200,
        height : 200
    },
    left: {
        flex: 1,
        justifyContent: "center"
    },
    middle: {
        flex: 5,
        justifyContent: "space-between",
        alignItems: "center"
    },
});