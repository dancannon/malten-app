import React from 'react-native';
import Reflux from 'reflux';
import moment from 'moment';

let {
  Text
} = React;

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%ds',
    m: 'm',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1Y',
    yy: '%dY'
  }
});

export default React.createClass({
  displayName: 'TimeSince',
  propTypes: {
    timestamp: React.PropTypes.number.isRequired
  },

  componentDidMount: function() {
    this.tick(true);
  },

  tick: function(refresh) {
    if (!this.isMounted()) {
      return;
    }

    var period = 1000;

    var then = (new Date(this.props.timestamp)).valueOf();
    var now = Date.now();
    var seconds = Math.round(Math.abs(now - then) / 1000);

    if (seconds < 60) {
      period = 1000;
    } else if (seconds < 60 * 60) {
      period = 1000 * 60;
    } else if (seconds < 60 * 60 * 24) {
      period = 1000 * 60 * 60;
    } else {
      period = 0;
    }

    if (period !== 0) {
      setTimeout(this.tick, period);
    }

    if (!refresh) {
      this.forceUpdate();
    }
  },

  render() {
    return <Text>{moment(this.props.timestamp).fromNow(true)}</Text>;
  }
});
