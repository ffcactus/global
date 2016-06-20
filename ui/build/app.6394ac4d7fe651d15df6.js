/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	import React from 'react';
	import { render } from 'react-dom';
	import HelloWorld from './hello';
	
	// require('react');
	// require('./section');
	
	var sectionTree = {
	  "name": "root",
	  "id": "id_0001",
	  "children": [{
	    "name": "folder0",
	    "id": "id_0002",
	    "children": [{
	      "name": "folder1",
	      "id": "id_0003",
	      "children": []
	    }, {
	      "name": "folder2",
	      "id": "id_0004",
	      "children": [{
	        "name": "folder3",
	        "id": "id_0005",
	        "children": []
	      }]
	    }]
	  }, {
	    "name": "folder4",
	    "id": "id_0006",
	    "children": [{
	      "name": "folder5",
	      "id": "id_0007",
	      "children": []
	    }, {
	      "name": "folder2",
	      "id": "id_0008",
	      "children": [{
	        "name": "folder3",
	        "id": "id_0009",
	        "children": []
	      }]
	    }]
	  }]
	};
	
	React.render(React.createElement(HelloWorld, null), document.body);

/***/ }
/******/ ]);
//# sourceMappingURL=app.6394ac4d7fe651d15df6.js.map