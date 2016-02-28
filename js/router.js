import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Entry from './models/entry';
import Entries from './collections/entries';
import EntryView from './views/entry';
import EntriesView from './views/entries';
import CreateEntryView from './views/createentry';
import EditEntryView from './views/editentry';

var Router = Backbone.Router.extend({
  routes: {
    'view/:id' : 'displayEntry',
    'edit/:id' : 'editEntry',
    'create'   : 'createEntry',
    '*path'    : 'displayEntries',
  },
  
  displayEntries() {
    console.log('display entries');
    var entries = new Entries();
    
    var entriesView = new EntriesView({ model: entries });
  },
  
  displayEntry(id) {
    console.log('displaying individual entry', id);
    
    var entry = new Entry({ id });
    var entryView = new EntryView({ model: entry });
  },
  
  createEntry() {
    var entries = new Entries();
    var createEntryView = new CreateEntryView({ model: entries });
  },
  
  editEntry(id) {
    console.log('editing individual entry', id);
    
    var entry = new Entry({ id });
    var editEntryView = new EditEntryView({ model: entry });
  }
});

var initialize = function() {
  var router = new Router();

  //router.entries = new Entries();
  //router.entries.fetch();

  Backbone.history.start();
};

export default {
  initialize,
};