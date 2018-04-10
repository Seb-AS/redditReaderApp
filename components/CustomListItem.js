import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Badge, Card } from 'react-native-elements';

const placeholder = require('../assets/placeholder.jpeg');

export default class CustomListItem extends Component {

    constructor(props) {
        super(props);
    }

    checkForEmptyImage(source) {
        if (source == "") {
            return <Image style={styles.thumbnail} source={source} defaultSource={placeholder}/>;
        }

        return <Image style={styles.thumbnail} source={{ uri: source }}/>
    }

   
    render() {
        let thumbnail = this.checkForEmptyImage(this.props.item.data.thumbnail);
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                    <View style={{ height: 120, flexDirection: 'row' }}>
                        {thumbnail}                        
                        <View style={{ flex: 1, flexDirection: 'column' }}>                   
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}></View>
                                <View style={{ flex: 1, padding: 1}}>
                                <Text >{this.props.item.data.author}</Text>
                            </View>
                                <View style={{ flex: 1 }}>
                                    <Text >{this.props.item.data.created_utc}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 3, padding: 5 }}>
                                <Text numberOfLines={4} >{this.props.item.data.title}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>                             
                                <View style={{ flex: 1, padding: 2 }}>
                                     <Text numberOfLines={4} >{this.props.item.data.num_comments + " comments"}</Text>
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
    thumbnail : {
        width  : 100,
        height : 100,
        margin : 7
    },
  });