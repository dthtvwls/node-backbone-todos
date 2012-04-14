exports.index = (req, res)->
  Todo.find (err, todos)-> res.json todos

exports.create = (req, res)->
  new Todo(req.body.todo).save (err)-> res.send 204

exports.show = (req, res)->
  Todo.findById req.params.todo, (err, todo)-> res.json todo

exports.update = (req, res)->
  Todo.update { _id: req.params.todo }, req.body.todo, upsert: true, (err)-> res.send 204

exports.destroy = (req, res)->
  Todo.findById req.params.todo, (err, todo)-> todo.remove (err)-> res.send 204
