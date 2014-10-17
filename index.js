/**
 * Module dependencies
 */

var util = require('util');
var makeECMAScriptCompatible = require('./makeECMAScriptCompatible');


/**
 * sails-generate-directive
 *
 * Usage:
 * `sails generate directive`
 *
 * @description Generates an Angular directive within a Sails project.
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  before: function (scope, cb) {

    if (!scope.args[0]) {
      return cb( new Error('Please provide the name for this directive using HTML (dash, NOT camel case) syntax; e.g. "foo-bar-baz").') );
    }

    // The first command-line argument will be used as the dash-delimited
    // (or "htmlized") directive name
    scope.htmlizedDirectiveName = scope.args[0];

    // Calculate the camel-cased version
    scope.camelCasedDirectiveName = makeECMAScriptCompatible(scope.htmlizedDirectiveName);

    // Decide the output filename for use in targets below:
    scope.filename = scope.htmlizedDirectiveName + '.directive.js';

    // Path to directives dir within the project
    // (set using --directives-directory)
    scope.directivesDirectory = scope['directives-directory']||'assets/js/directives';

    scope.htmlExample = (function build_html_example(htmlizedDirectiveName) {
      return util.format('<%s></%s>', htmlizedDirectiveName, htmlizedDirectiveName);
    })(scope.htmlizedDirectiveName);

    // If an angular module name was not provided as `--angular-module`,
    // default to 'App'.
    scope.angularModule = scope['angular-module'] || 'App';

    cb();
  },



  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: {

    './:directivesDirectory/:filename': { template: 'new-directive.gen' },

  },


  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname)
};
