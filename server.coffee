mongoose = require('mongoose').connect 'mongodb://localhost/node-backbone-todos'
express = require 'express'
require 'express-resource'

global.Todo = mongoose.model 'Todo', new mongoose.Schema
  content: String
  done: Boolean
  order: Number

app = express.createServer().configure ->
  @use express.logger()
  @use express.bodyParser()
  @use express.methodOverride()
  @use express.cookieParser 'changeme'
  @use express.session secret: 'changeme'
  @use express.static 'public'
  @use @router
  @use express.errorHandler
    dumpExceptions: true
    showStack: true
.listen 3000

app.resource 'todos', require './todos'
