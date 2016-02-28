import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

var entriesHtml = `
<ul class="entries">
</ul>
`;

var entryHtml = `
<li class="entry">
  <a href="#/view/<%= id %>">
    <%= date %> - <%= title %>
  </a>
</li>
`;


var EntriesView = Backbone.View.extend({
  el: '#page',
  
  initialize() {
    this.$el.html(entriesHtml);
    
    this.model.on('add', this.addOne, this);
    
    this.model.fetch();
  },
  
  addOne(model) {
    var template = _.template(entryHtml);
    var html = template(model.toJSON());
    this.$('.entries').append(html);
  }
});

export default EntriesView;