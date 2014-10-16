/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();
app.import('vendor/ember-easy-decorator.js');
//app.import('vendor/ember-easyForm.js');
app.import('bower_components/ember-forms/dist/globals/main.js');
app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');



// Put the bootstrap fonts in the place that the bootstrap css expects to find them.
var pickFiles = require('broccoli-static-compiler');
var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/assets/bootstrap'
});
var mergeTrees = require('broccoli-merge-trees');
app.import('vendor/app.css');

// Merge the bootstrapFonts with the ember app tree

module.exports = mergeTrees([app.toTree(), bootstrapFonts]);
