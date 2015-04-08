import React from 'react-native';
import Reflux from 'reflux';

import Actions from '../../actions';
import ThoughtsStore from '../../stores/thoughts';

import Thought from './thought';

let { StyleSheet, Text, View, ListView } = React;

let styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#F5FCFF',
    // paddingLeft: 10,
    // paddingRight: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333'
  }
});

export default React.createClass({
  displayName: 'StreamView',

  mixins: [
      Reflux.listenTo(ThoughtsStore, 'onStoreUpdate')
  ],

  getInitialState: function() {
    return this.getState();
  },

  onStoreUpdate: function() {
    this.setState(this.getState());
  },

  getState: function() {
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    dataSource = dataSource.cloneWithRows(ThoughtsStore.thoughts.reverse().toJS());

    return {
      loading: true,
      thoughts: ThoughtsStore.thoughts,
      dataSource: dataSource
    };
  },

  componentDidMount() {
    Actions.thoughtsPoll();
  },

  renderRow(thought) {
    return <Thought thought={thought} />;
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
});
