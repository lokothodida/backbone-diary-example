import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

var entryHtml = `
<section id="entry">
  <h2><%= title %></h3>
  <p><%= date %></p>
  <section class="content">
    <%= content %>
  </section>

  <a href="#/edit/<%= id %>" class="edit">Edit</a>
  <a href="" class="delete">Delete</a>
</section>
`;

var EntryView = Backbone.View.extend({
  el: '#page',
  
  events: {
    'click .delete' : 'deleteEntry',
  },
  
  initialize() {
    this.model.fetch();
    var template = _.template(entryHtml);
    var html = template(this.model.toJSON());
    this.$el.html(html);
  },
  
  
  
  deleteEntry() {
    var sure = confirm('Are you sure you want to delete this entry?');
    
    if (sure) {
      this.model.destroy();
      this.$('#entry').html('Entry deleted.');
    }
    
    return false;
  }
});

export default EntryView;