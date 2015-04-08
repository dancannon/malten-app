import Reflux from 'reflux';
import Immutable from 'immutable';

import actions from '../actions';

const thoughtsURL = 'http://malten.me/thoughts';

function timeAgo() {
  var ts = new Date().getTime() / 1000;
  return (ts - 86400) * 1e9;
}

export default Reflux.createStore({
    listenables: actions,

    init() {
      // this.thoughts = Immutable.fromJS(require('../data/thoughts.json'));
      this.thoughts = new Immutable.List();
      this.seen = new Immutable.Set();
      this.limit = 25;
      this.last = timeAgo();
    },

    // Action listeners
    onThoughtsPoll: function() {
      this.loadThoughts();

      setInterval(() => {
        this.loadThoughts();
      }, 3000);
    },

    loadThoughts() {
      var params = '?direction=1&limit=' + this.limit + '&last=' + this.last;
      fetch(thoughtsURL + params)
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.handleLoadedThoughts(data, 1);
        }).catch(function(err) {
          console.error(err);
        });
    },

    handleLoadedThoughts(data, direction) {
      if (data !== undefined && data !== null && data.length > 0) {
        for(let i = 0; i < data.length; i++) {
          let thought = data[i];

          if (this.seen.has(thought.Id)) {
            continue;
          }

          this.thoughts = this.thoughts.push(thought);
          this.seen = this.seen.add(thought.Id);
        }

        if (direction >= 0) {
          this.last = data[data.length - 1].Created;
        }

        this.trigger({
          thoughts: this.thoughts,
          last: this.last
        });
      }
    },

    // Getters
    getThoughts() {
      return this.thoughts;
    }
});
