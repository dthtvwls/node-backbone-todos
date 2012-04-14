express = require 'express'

app = express.createServer().configure ->
  @set 'view engine', 'hbs'
  @use express.logger()
  @use express.bodyParser()
  @use express.methodOverride()
  @use express.cookieParser 'changeme'
  @use express.session secret: 'changeme'
  @use @router
  @use express.static 'public'
  @use express.errorHandler
    dumpExceptions: true
    showStack: true
.listen 3000