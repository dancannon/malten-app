import React from 'react-native';

let { StyleSheet } = React;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 10,
    paddingLeft: 5
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    color: '#ccc',
    textAlign: 'right',
    width: 20
  },
  thought: {
    textAlign: 'left',
    flex: 1
  }
})
