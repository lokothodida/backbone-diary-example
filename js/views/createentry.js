import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

// Html for entry page
var html = `
<section id="createentry">
  <form>
    <h2>Create Entry</h2>
    <p>
      <input type="text"/ class="title" placeholder="Diary entry title">
    </p>
    
    <p>
      <textarea class="content" placeholder="Write today's entry here..."/>
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

var CreateEntryView = Backbone.View.extend({
  el: '#page',
  
  events: {
    'click .save': 'saveEntry',
  },
  
  initialize() {
    this.model.on('invalid', this.invalidEntry, this);
    this.model.on('sync', this.validEntry, this);
    this.$el.html(html);
  },
  
  saveEntry() {
    var title = this.$('.title').val();
    var date = new Date();
    var content = this.$('.content').val();
    
    this.model.create({
      title,
      date,
      content
    });
  },
  
  invalidEntry(model, msg) {
    this.displayMessage(false, msg);
  },
  
  validEntry(model) {
    this.displayMessage(true, 'Entry created successfully!');
    this.$('form').slideUp();
  },
  
  displayMessage(succ, msg) {
    var template = _.template(msgHtml);
    var html = template({
      msg,
      status: succ ? 'success' : 'error', 
    });

    this.$('.message').remove();
    this.$('#createentry').prepend(html);
  }
});

export default CreateEntryView;