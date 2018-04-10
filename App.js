import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Linking } from "react-native";
import { List } from "react-native-elements";
import CustomListItem from "./components/CustomListItem";

class App extends Component {
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
    const url = `https://api.reddit.com/r/pics/new.json?after=${after}&count=${count}&limit=50`;
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
        page: 1,
        seed: this.state.after + 1,
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
        page: this.state.count + 1
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
    const WEB_URL = "https://www.reddit.com";
    // Open post link in webview
    let urlToOpen = WEB_URL + item.data.permalink;

    Linking.canOpenURL(urlToOpen).then(supported => {
      if (supported) {
        Linking.openURL(urlToOpen);
      } else {
        console.log('Don\'t know how to open URI: ' + urlToOpen);
      }
      return false
    });
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
      <View style={styles.footer}>}
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <CustomListItem
            item={item}
            onPress={() => this.handlePress(item)}
            />          
          )}
          keyExtractor={item => item.data.id }
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
}

var styles = StyleSheet.create({
  header:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical: 20,
  },
  footer:{
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;