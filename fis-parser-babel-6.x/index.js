'use strict';

var babel = require('babel-core');
var preset2015 = require('babel-preset-es2015');
var presetstage3 = require('babel-preset-stage-3');
var presetstage2 = require('babel-preset-stage-2');
var presetstage1 = require('babel-preset-stage-1');
var presetstage0 = require('babel-preset-stage-0');
var presetreact = require('babel-preset-react');
var plugin_transform_class_properties=require('babel-plugin-transform-class-properties');
var plugin_add_module_exports=require('babel-plugin-add-module-exports');
var transform_runtime=require('babel-plugin-transform-runtime');

module.exports = function (content, file, conf) {
    conf = fis.util.extend({
        presets: [
			{
			plugins: [
				plugin_transform_class_properties,
				plugin_add_module_exports,
				transform_runtime
			]
			},
            preset2015,
		    presetstage0,
			presetstage1,
			presetstage2,
            presetstage3,
			presetreact
        ]
    }, conf);
    var result = babel.transform(content, conf);
    return result.code;
};
