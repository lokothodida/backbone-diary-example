import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Store from 'backbone.localstorage';

var Entry = Backbone.Model.extend({
  localStorage: new Store('diary-app'),
  
  defaults: {
    title: '',
    date: '',
    content: '',
  },
  
  validate(attrs) {
    if (_.isEmpty(attrs.title)) {
      return 'Must have a title';
    }
  }
});

export default Entry;