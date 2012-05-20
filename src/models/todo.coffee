define [
  'underscore'
  'backbone'
], (_, Backbone)->

  class TodoModel extends Backbone.Model

    idAttribute: "_id"

    # Default attributes for the todo.
    defaults: content: "empty todo...", done: false

    # Ensure that each todo created has `content`.
    initialize: -> @set "content": @defaults.content unless @get "content"

    # Toggle the `done` state of this todo item.
    toggle: -> @save done: !@get "done"

    # Remove this Todo from *localStorage*.
    clear: -> @destroy()
