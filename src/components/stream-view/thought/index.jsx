import React from 'react-native';
import Reflux from 'reflux';

import ThoughtsStore from '../../../stores/thoughts';

import TimeAgo from '../../time-ago';

import styles from './styles';

let { Text, View } = React;

export default React.createClass({
  displayName: 'Thought',

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.thought}>{this.props.thought.Text}</Text>
          <TimeAgo style={styles.time} timestamp={this.props.thought.Created / 1000 / 1000} />
        </View>
        <Text style={styles.seperator}>~</Text>
      </View>
    );
  }
});
