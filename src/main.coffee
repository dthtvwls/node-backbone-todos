# Author: Thomas Davis <thomasalwyndavis@gmail.com>
# Filename: main.js

# Require.js allows us to configure shortcut alias
require.config paths:
  jquery:     'vendor/jquery'
  underscore: 'vendor/underscore'
  backbone:   'vendor/backbone'
  Handlebars: 'vendor/Handlebars'
  hbs:        'vendor/hbs'

require ['views/app'], (AppView)-> app_view = new AppView
