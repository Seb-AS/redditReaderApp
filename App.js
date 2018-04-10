import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
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
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
}

export default App;