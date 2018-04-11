import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity} from "react-native";
import { Badge, Card } from "react-native-elements";
import { getPostDate } from "../utils/Utils";

const placeholder = require("../assets/placeholder.jpeg");

export default class CustomListItem extends Component {

    constructor(props) {
        super(props);
    }

    /*checkForEmptyImage(data) {
        return <Image ref={data.id} source={{uri: data.thumbnail}} style={styles.thumbnail} 
        onError={(e) => this.refs[data.id].setNativeProps({src: [{uri: "http://demo.makitweb.com/broken_image/images/noimage.png"}]})}/>
    }*/
    
    checkForEmptyImage(data) {
        if (!data.thumbnail) {
            return <Image style={styles.thumbnail} defaultSource={placeholder}/>;
        }
        return <Image style={styles.thumbnail} source={{ uri: data.thumbnail }}/>
    }

    handleRemove(item) {
        console.log("press remove");
    }

    formatDate(postDate) {
        return getPostDate(postDate);
    }

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        let thumbnail = this.checkForEmptyImage(this.props.item.data);
        let selected = this.props.item.selected;
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
                    <View style={{ height: 130, flexDirection: "row"}}>
                        <View style={{ flex: 1}}>                 
                            <View style={styles.container}>
                                <View style={styles.left}>
                                     <Text style={styles.authorText}>{this.props.item.data.author}</Text>
                                 </View>
                                 <View style={styles.right}>
                                    <Text>{this.formatDate(this.props.item.data.created_utc)}</Text>
                                 </View>
                            </View>
                            <View style={styles.container}></View>
                            <View style={styles.container}></View>
                            <View style={styles.container}>
                                 <View style={styles.left}>
                                     {thumbnail}
                                 </View>
                                 <View style={{ flex: 3, padding: 3, height: 75}}>
                                    <Text style={styles.titleText} numberOfLines={4} >{this.props.item.data.title}</Text>
                                 </View>
                                 
                            </View>
                            <View style={styles.container}></View>
                            <View style={styles.container}></View>
                            <View style={{ flex: 1, flexDirection: "row" }}>   
                                <TouchableOpacity onPress={this.handleRemove}> style={styles.buttonStyle}>
                                     <Text>Dismiss Post</Text>
                                 </TouchableOpacity>                    
                                <View style={styles.right}>
                                     <Text>{this.props.item.data.num_comments + " comments"}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
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
    right: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    thumbnail : {
        width  : 80,
        height : 80,
        marginTop:5
    },
    buttonStyle: {
        height: 35,
        marginTop:8
    },
    authorText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign:"left"
    },
    titleText: {
        fontSize: 10,
        height: 75,
        textAlign:"left",
        textAlignVertical: "center"
    },
    
  });