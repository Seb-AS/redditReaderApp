import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Linking ,TouchableHighlight, ScrollView, TouchableOpacity, Image} from "react-native";
import { List } from "react-native-elements";
import { StackNavigator } from "react-navigation";

import CustomListItem from "./components/CustomListItem";

class App extends Component {

  static navigationOptions =
 {
    title: "Reddit Posts",
 };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      count: 1,
      after: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { count, after } = this.state;
    const url = "https://api.reddit.com/r/pics/new.json?after=${after}&count=${count}&limit=50";
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.data.children,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        count: 1,
        after: this.state.after + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        count: this.state.count + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  /**
   * Testing only opens a reddit website with the post   * 
   */
  handlePress(item) {
    this.props.navigation.navigate(
      "DetailPage",
      { item },
    );

    /*const WEB_URL = "https://www.reddit.com";
    // Open post link in webview
    let urlToOpen = WEB_URL + item.data.permalink;

    Linking.canOpenURL(urlToOpen).then(supported => {
      if (supported) {
        Linking.openURL(urlToOpen);
      } else {
        console.log("Don\"t know how to open URI: " + urlToOpen);
      }
      return false
    });*/
  }

  handleRemoveAll(item) {
    console.log("pressed remove ALL");
    
    //this.refs.flatList
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.titleText}>{"Reddit Posts"}</Text>
      </View>
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={styles.footerList}>}
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

 _renderItem = ({item}) => (
    <CustomListItem
      id={item.id}
      item={item}
      onPress={() => this.handlePress(item)}
    />
  );

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.9}}>
          <ScrollView style={styles.flatListSectionLayout} contentContainerStyle={{ flexGrow: 1 }}>
            <FlatList
              ref="flatList"
              style={{ flex: 1 }}
              data={this.state.data}
              extraData={this.state}
              renderItem={this._renderItem}           
              keyExtractor={item => item.data.id }
              ItemSeparatorComponent={this.renderSeparator}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.bottomButtons} onPress={this.handleRemoveAll}> >
            <Text style={styles.footerText}>Dismiss All</Text>
          </TouchableOpacity>            
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  mainviewStyle: {
    flex: 1,
    flexDirection: "column",
  },
  header:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    paddingVertical: 20,
  },
  footerList:{
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor:"green",
    flexDirection:"row",
    height:40,
    alignItems:"center",
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  },
  bottomButtons: {
    alignItems:"center",
    justifyContent: "center",
    flex:1,
  },
  footerText: {
    color:"orange",
    fontWeight:"bold",
    alignItems:"center",
    fontSize:18,
  },
  buttonStyle: {
    height: 35,
    marginTop:8
  },
});

class DetailPost extends Component
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
       
export default Project = StackNavigator(
{
  MainPage: { screen: App }, 
  DetailPage: { screen: DetailPost }
});

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
    color: "#000",
  },
  textStyle:
  {
      fontSize: 20,
      textAlign: "left",
      color: "#000",
  },
  thumbnail : {
    width  : 200,
    height : 200,
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