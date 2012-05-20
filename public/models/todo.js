var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone'], function(_, Backbone) {
  var TodoModel;
  return TodoModel = (function(_super) {

    __extends(TodoModel, _super);

    TodoModel.name = 'TodoModel';

    function TodoModel() {
      return TodoModel.__super__.constructor.apply(this, arguments);
    }

    TodoModel.prototype.idAttribute = "_id";

    TodoModel.prototype.defaults = {
      content: "empty todo...",
      done: false
    };

    TodoModel.prototype.initialize = function() {
      if (!this.get("content")) {
        return this.set({
          "content": this.defaults.content
        });
      }
    };

    TodoModel.prototype.toggle = function() {
      return this.save({
        done: !this.get("done")
      });
    };

    TodoModel.prototype.clear = function() {
      return this.destroy();
    };

    return TodoModel;

  })(Backbone.Model);
});
