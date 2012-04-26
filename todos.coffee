exports.index = (req, res)->
  Todo.find (err, todos)-> res.json todos

exports.create = (req, res)->
  console.log JSON.stringify req.body
  console.log JSON.stringify req.params
  new Todo(req.body).save (err)-> res.send 200

exports.show = (req, res)->
  Todo.findById req.params.todo, (err, todo)-> res.json todo

exports.update = (req, res)->
  console.log JSON.stringify req.body
  console.log JSON.stringify req.body._id
  id = req.body._id
  delete req.body._id
  Todo.update { _id: id }, req.body, upsert: true, (err)->
    console.log JSON.stringify err
    res.send 200

exports.destroy = (req, res)->
  console.log JSON.stringify req.body
  console.log JSON.stringify req.params
  Todo.findById req.body._id, (err, todo)-> todo.remove (err)-> res.send 200
