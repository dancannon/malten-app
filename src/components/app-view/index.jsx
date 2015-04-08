import React from 'react-native';
import Reflux from 'reflux';

import StreamView from '../stream-view';

let { StyleSheet, NavigatorIOS } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF'
  }
});


export default React.createClass({
  displayName: 'AppView',

  render: function() {

    return (
      <NavigatorIOS
        initialRoute={{
          title: 'Malten',
          component: StreamView
        }}
        style={styles.container}
        tintColor='#FF6600'
      />
    );
  }
});
