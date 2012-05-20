var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone', 'models/todo'], function(_, Backbone, Todo) {
  var TodosCollection;
  TodosCollection = (function(_super) {

    __extends(TodosCollection, _super);

    TodosCollection.name = 'TodosCollection';

    function TodosCollection() {
      return TodosCollection.__super__.constructor.apply(this, arguments);
    }

    TodosCollection.prototype.url = '/todos';

    TodosCollection.prototype.model = Todo;

    TodosCollection.prototype.done = function() {
      return this.filter(function(todo) {
        return todo.get('done');
      });
    };

    TodosCollection.prototype.remaining = function() {
      return this.without.apply(this, this.done());
    };

    TodosCollection.prototype.nextOrder = function() {
      if (!this.length) {
        return 1;
      } else {
        return this.last().get('order') + 1;
      }
    };

    TodosCollection.prototype.comparator = function(todo) {
      return todo.get('order');
    };

    return TodosCollection;

  })(Backbone.Collection);
  return new TodosCollection;
});
