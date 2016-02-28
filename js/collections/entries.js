import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Entry from '../models/entry';
import Store from 'backbone.localstorage';

var Entries = Backbone.Collection.extend({
  model: Entry,
  
  localStorage: new Store('diary-app'),
});

export default Entries;
