/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game/Game.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game/Game.ts":
/*!**************************!*\
  !*** ./src/game/Game.ts ***!
  \**************************/
/*! exports provided: GameButton, GameController, gameUpdate, gameRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameButton\", function() { return GameButton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameController\", function() { return GameController; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameUpdate\", function() { return gameUpdate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameRender\", function() { return gameRender; });\nvar GameButton = /** @class */ (function () {\n    function GameButton() {\n        this.pressed = false;\n    }\n    return GameButton;\n}());\n\nvar GameController = /** @class */ (function () {\n    function GameController() {\n        this.moveUp = new GameButton();\n        this.moveDown = new GameButton();\n        this.moveLeft = new GameButton();\n        this.moveRight = new GameButton();\n        this.actionDown = new GameButton();\n        this.actionUp = new GameButton();\n        this.actionLeft = new GameButton();\n        this.actionRight = new GameButton();\n        this.leftShoulder = new GameButton();\n        this.rightShoulder = new GameButton();\n        this.start = new GameButton();\n        this.back = new GameButton();\n    }\n    return GameController;\n}());\n\nfunction gameUpdate(memory, input) {\n    if (!memory.isInitialized) {\n        memory.isInitialized = true;\n        memory.playerX = 30;\n        memory.playerY = 30;\n    }\n    var dx = 0;\n    var dy = 0;\n    function getStep() {\n        return 4; //event.repeat ? 15 : 2 // just to move faster for demo purposes\n    }\n    input.controllers.forEach(function (controller) {\n        if (controller.moveUp.pressed) {\n            dy -= getStep();\n        }\n        if (controller.moveDown.pressed) {\n            dy += getStep();\n        }\n        if (controller.moveRight.pressed) {\n            dx += getStep();\n        }\n        if (controller.moveLeft.pressed) {\n            dx -= getStep();\n        }\n    });\n    memory.playerX += dx;\n    memory.playerY += dy;\n}\nfunction gameRender(memory, ctx, width, height) {\n    ctx.fillStyle = '#EEEEEE';\n    ctx.fillRect(0, 0, width, height);\n    ctx.fillStyle = '#000000';\n    ctx.fillRect(memory.playerX - 10, memory.playerY - 10, 20, 20);\n}\n\n\n//# sourceURL=webpack:///./src/game/Game.ts?");

/***/ })

/******/ });