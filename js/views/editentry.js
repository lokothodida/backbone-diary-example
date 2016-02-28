import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

// Html for entry page
var html = `
<section id="editentry">
  <form>
    <h2>Edit Entry</h2>
    <p>
      <input type="text"/ class="title" placeholder="Diary entry title" value="<%= title %>">
    </p>
    
    <p>
      <textarea class="content" placeholder="Write today's entry here..."><%= content %></textarea>
    </p>
    
    <button class="save">Save</button>
  </form>
</section>
`;

// Html for success/error message
var msgHtml = `
<div class="message <%= status %>">
  <%= msg %>
</div>
`;

var EditEntryView = Backbone.View.extend({
  el: '#page',
  
  events: {
    'click .save': 'saveEntry',
  },
  
  initialize() {
    var template = _.template(html);
    //this.model.on('invalid', this.invalidEntry, this);
    this.model.on('sync', this.validEntry, this);
    this.model.fetch();
    this.$el.html(template(this.model.toJSON()));
  },
  
  saveEntry() {
    var title = this.$('.title').val();
    var date = new Date();
    var content = this.$('.content').val();
    
    this.model.save({
      title,
      date,
      content
    });
  },
  
  invalidEntry(model, msg) {
    this.displayMessage('error', msg);
  },
  
  validEntry() {
    this.displayMessage('success', 'Entry edited successfully!');
  },
  
  displayMessage(status, msg) {
    var template = _.template(msgHtml);
    var html = template({
      msg,
      status, 
    });

console.log('message being displayed');
    this.$('.message').remove();
    this.$('#editentry').prepend(html);
  }
});

export default EditEntryView;