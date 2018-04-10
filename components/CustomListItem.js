import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Badge, Card } from 'react-native-elements';

export default class CustomListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                    <View style={{ height: 120, flexDirection: 'row' }}>
                        <Image
                            style={{ height: 120, width: 120 }}
                            source={{ uri: this.props.item.data.thumbnail }}
                         />
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