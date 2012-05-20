
require.config({
  paths: {
    jquery: 'vendor/jquery',
    underscore: 'vendor/underscore',
    backbone: 'vendor/backbone',
    Handlebars: 'vendor/Handlebars',
    hbs: 'vendor/hbs'
  }
});

require(['views/app'], function(AppView) {
  var app_view;
  return app_view = new AppView;
});
