var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jquery', 'underscore', 'backbone', 'collections/todos', 'views/todos', 'hbs!/template/stats'], function($, _, Backbone, Todos, TodoView, statsTemplate) {
  var AppView;
  AppView = (function(_super) {

    __extends(AppView, _super);

    AppView.name = 'AppView';

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = $("#todoapp");

    AppView.prototype.statsTemplate = statsTemplate;

    AppView.prototype.events = {
      "keypress #new-todo": "createOnEnter",
      "keyup #new-todo": "showTooltip",
      "click .todo-clear a": "clearCompleted",
      "click .mark-all-done": "toggleAllComplete"
    };

    AppView.prototype.initialize = function() {
      _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');
      this.input = this.$('#new-todo');
      this.allCheckbox = this.$('.mark-all-done')[0];
      Todos.bind('add', this.addOne);
      Todos.bind('reset', this.addAll);
      Todos.bind('all', this.render);
      return Todos.fetch();
    };

    AppView.prototype.render = function() {
      var done, remaining;
      done = Todos.done().length;
      remaining = Todos.remaining().length;
      this.$('#todo-stats').html(this.statsTemplate({
        total: Todos.length,
        done: done,
        remaining: remaining
      }));
      return this.allCheckbox.checked = !remaining;
    };

    AppView.prototype.addOne = function(todo) {
      var view;
      view = new TodoView({
        model: todo
      });
      return this.$('#todo-list').append(view.render().el);
    };

    AppView.prototype.addAll = function() {
      return Todos.each(this.addOne);
    };

    AppView.prototype.newAttributes = function() {
      return {
        content: this.input.val(),
        order: Todos.nextOrder(),
        done: false
      };
    };

    AppView.prototype.createOnEnter = function(e) {
      if (e.keyCode === 13) {
        Todos.create(this.newAttributes());
        return this.input.val('');
      }
    };

    AppView.prototype.clearCompleted = function() {
      _.each(Todos.done(), function(todo) {
        return todo.clear();
      });
      return false;
    };

    AppView.prototype.showTooltip = function(e) {
      var show, tooltip, val;
      tooltip = this.$('.ui-tooltip-top');
      val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) {
        clearTimeout(this.tooltipTimeout);
      }
      if (val === '' || val === this.input.attr('placeholder')) {
        return;
      }
      show = function() {
        return tooltip.show().fadeIn();
      };
      return this.tooltipTimeout = _.delay(show, 1000);
    };

    AppView.prototype.toggleAllComplete = function() {
      var done;
      done = this.allCheckbox.checked;
      return Todos.each(function(todo) {
        return todo.save({
          'done': done
        });
      });
    };

    return AppView;

  })(Backbone.View);
  return AppView;
});
