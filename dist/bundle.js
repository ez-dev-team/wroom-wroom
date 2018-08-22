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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/GamepadInput.ts":
/*!*****************************!*\
  !*** ./src/GamepadInput.ts ***!
  \*****************************/
/*! exports provided: getGamepads */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getGamepads\", function() { return getGamepads; });\nfunction getGamepads() {\n    return navigator.getGamepads\n        ? navigator.getGamepads()\n        : (navigator['webkitGetGamepads'] ? navigator['webkitGetGamepads'] : []);\n}\n\n\n//# sourceURL=webpack:///./src/GamepadInput.ts?");

/***/ }),

/***/ "./src/KeyboardInput.ts":
/*!******************************!*\
  !*** ./src/KeyboardInput.ts ***!
  \******************************/
/*! exports provided: KeyboardCodes, startListen, isKeyPressed, gameTickDone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"KeyboardCodes\", function() { return KeyboardCodes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startListen\", function() { return startListen; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isKeyPressed\", function() { return isKeyPressed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameTickDone\", function() { return gameTickDone; });\nvar KeyboardCodes;\n(function (KeyboardCodes) {\n    KeyboardCodes[KeyboardCodes[\"A\"] = 65] = \"A\";\n    KeyboardCodes[KeyboardCodes[\"W\"] = 87] = \"W\";\n    KeyboardCodes[KeyboardCodes[\"S\"] = 83] = \"S\";\n    KeyboardCodes[KeyboardCodes[\"D\"] = 68] = \"D\";\n    KeyboardCodes[KeyboardCodes[\"Q\"] = 81] = \"Q\";\n    KeyboardCodes[KeyboardCodes[\"E\"] = 69] = \"E\";\n    KeyboardCodes[KeyboardCodes[\"U\"] = 85] = \"U\";\n    KeyboardCodes[KeyboardCodes[\"I\"] = 73] = \"I\";\n    KeyboardCodes[KeyboardCodes[\"O\"] = 79] = \"O\";\n    KeyboardCodes[KeyboardCodes[\"P\"] = 80] = \"P\";\n    KeyboardCodes[KeyboardCodes[\"LEFT_ARROW\"] = 37] = \"LEFT_ARROW\";\n    KeyboardCodes[KeyboardCodes[\"UP_ARROW\"] = 38] = \"UP_ARROW\";\n    KeyboardCodes[KeyboardCodes[\"RIGHT_ARROW\"] = 39] = \"RIGHT_ARROW\";\n    KeyboardCodes[KeyboardCodes[\"DOWN_ARROW\"] = 40] = \"DOWN_ARROW\";\n    KeyboardCodes[KeyboardCodes[\"SPACE\"] = 32] = \"SPACE\";\n    KeyboardCodes[KeyboardCodes[\"ESCAPE\"] = 27] = \"ESCAPE\";\n})(KeyboardCodes || (KeyboardCodes = {}));\nvar GAME_KEYS_STATE = new Map();\nvar ACTUAL_KEYS_STATE = new Map();\nfunction startListen() {\n    document.addEventListener('keydown', function (event) {\n        var keyCode = event.keyCode || event.which;\n        GAME_KEYS_STATE.set(keyCode, true);\n        ACTUAL_KEYS_STATE.set(keyCode, true);\n    }, true);\n    document.addEventListener('keyup', function (event) {\n        var keyCode = event.keyCode || event.which;\n        // Do not reset game keys state here to be sure that we didn't miss user input.\n        // Resetting should be done on game tick end.\n        ACTUAL_KEYS_STATE.set(keyCode, false);\n    }, true);\n}\nfunction isKeyPressed(code) {\n    return !!GAME_KEYS_STATE.get(code);\n}\nfunction gameTickDone() {\n    // Update game keys state to actual state when tick is done\n    GAME_KEYS_STATE = new Map(ACTUAL_KEYS_STATE);\n}\n\n\n//# sourceURL=webpack:///./src/KeyboardInput.ts?");

/***/ }),

/***/ "./src/PointerInput.ts":
/*!*****************************!*\
  !*** ./src/PointerInput.ts ***!
  \*****************************/
/*! exports provided: startListen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startListen\", function() { return startListen; });\nvar POINTER = {\n    x: 0,\n    y: 0\n};\nfunction startListen() {\n    document.addEventListener('mousemove', function (event) {\n        POINTER.x = event.screenX;\n        POINTER.y = event.screenY;\n    }, true);\n    document.addEventListener('touchmove', function (event) {\n        var touch = event.touches[0];\n        POINTER.x = touch.screenX;\n        POINTER.y = touch.screenY;\n    }, true);\n}\n\n\n//# sourceURL=webpack:///./src/PointerInput.ts?");

/***/ }),

/***/ "./src/engine/GameLoop.ts":
/*!********************************!*\
  !*** ./src/engine/GameLoop.ts ***!
  \********************************/
/*! exports provided: createTickFunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createTickFunction\", function() { return createTickFunction; });\nvar MAX_LAG_FIX_STEPS_COUNT = 240;\nvar UPDATE_FPS_TIMEOUT = 1000;\nvar UPDATE_FPS_EXPONENTIAL_MOVING_DECAY = 0.25;\nfunction createTickFunction(params) {\n    var DESIRED_FPS = params.fps || 60;\n    var MS_PER_UPDATE = 1000 / DESIRED_FPS;\n    var prevTime = 0;\n    var lag = 0;\n    var actualFps = DESIRED_FPS;\n    var lastFpsUpdate = 0;\n    var framesThisSecond = 0;\n    function panic() {\n        // TODO: use logger\n        console.log('panic');\n        // discard the unsimulated time\n        lag = 0;\n        // ... snap the player to the authoritative state (from server or smth)\n    }\n    function updateActualFps(elapsed) {\n        // update every UPDATE_FPS_TIMEOUT\n        if (elapsed > lastFpsUpdate + UPDATE_FPS_TIMEOUT) {\n            // compute the new actual FPS\n            actualFps = UPDATE_FPS_EXPONENTIAL_MOVING_DECAY * framesThisSecond + (1 - UPDATE_FPS_EXPONENTIAL_MOVING_DECAY) * actualFps;\n            lastFpsUpdate = elapsed;\n            framesThisSecond = 0;\n        }\n        framesThisSecond++;\n    }\n    return function (elapsed) {\n        // Throttle the frame rate\n        if (elapsed < prevTime + MS_PER_UPDATE) {\n            return;\n        }\n        updateActualFps(elapsed);\n        lag += elapsed - prevTime;\n        prevTime = elapsed;\n        // for processing inputs or smth\n        params.start();\n        var steps = 0;\n        while (lag >= MS_PER_UPDATE) {\n            params.update(elapsed);\n            lag -= MS_PER_UPDATE;\n            // Sanity check\n            if (++steps >= MAX_LAG_FIX_STEPS_COUNT) {\n                panic(); // fix things\n                break; // bail out\n            }\n        }\n        params.render(lag / elapsed);\n        params.end(actualFps);\n    };\n}\n\n\n//# sourceURL=webpack:///./src/engine/GameLoop.ts?");

/***/ }),

/***/ "./src/game/Game.ts":
/*!**************************!*\
  !*** ./src/game/Game.ts ***!
  \**************************/
/*! exports provided: GameButton, GameController, gameUpdate, gameRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameButton\", function() { return GameButton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameController\", function() { return GameController; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameUpdate\", function() { return gameUpdate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameRender\", function() { return gameRender; });\nvar GameButton = /** @class */ (function () {\n    function GameButton() {\n        this.pressed = false;\n    }\n    return GameButton;\n}());\n\nvar GameController = /** @class */ (function () {\n    function GameController() {\n        this.moveUp = new GameButton();\n        this.moveDown = new GameButton();\n        this.moveLeft = new GameButton();\n        this.moveRight = new GameButton();\n        this.actionDown = new GameButton();\n        this.actionUp = new GameButton();\n        this.actionLeft = new GameButton();\n        this.actionRight = new GameButton();\n        this.leftShoulder = new GameButton();\n        this.rightShoulder = new GameButton();\n        this.start = new GameButton();\n        this.back = new GameButton();\n    }\n    return GameController;\n}());\n\nfunction gameUpdate(memory, input) {\n    if (!memory.isInitialized) {\n        memory.isInitialized = true;\n        memory.playerX = 30;\n        memory.playerY = 30;\n    }\n    var dx = 0;\n    var dy = 0;\n    function getStep() {\n        return 4; //event.repeat ? 15 : 2 // just to move faster for demo purposes\n    }\n    input.controllers.forEach(function (controller) {\n        if (controller.moveUp.pressed) {\n            dy -= getStep();\n        }\n        if (controller.moveDown.pressed) {\n            dy += getStep();\n        }\n        if (controller.moveRight.pressed) {\n            dx += getStep();\n        }\n        if (controller.moveLeft.pressed) {\n            dx -= getStep();\n        }\n    });\n    memory.playerX += dx;\n    memory.playerY += dy;\n}\nfunction gameRender(memory, ctx, width, height) {\n    ctx.fillStyle = '#EEEEEE';\n    ctx.fillRect(0, 0, width, height);\n    ctx.fillStyle = '#000000';\n    ctx.fillRect(memory.playerX - 10, memory.playerY - 10, 20, 20);\n}\n\n\n//# sourceURL=webpack:///./src/game/Game.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _PointerInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PointerInput */ \"./src/PointerInput.ts\");\n/* harmony import */ var _KeyboardInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KeyboardInput */ \"./src/KeyboardInput.ts\");\n/* harmony import */ var _GamepadInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GamepadInput */ \"./src/GamepadInput.ts\");\n/* harmony import */ var engine_GameLoop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! engine/GameLoop */ \"./src/engine/GameLoop.ts\");\n/* harmony import */ var game_Game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! game/Game */ \"./src/game/Game.ts\");\n// TODO: no implicit any + more TS flags for super strict mode\n// TODO: split bundle for 2 files. Startup + game. Load game code via websockets?\n// TODO: add ability to record inputs + loop recorded state (how to clone game state? Deep copy?)\n\n\n\n\n\nvar PIXEL_RATIO = window.devicePixelRatio || 1;\nvar TARGET_MS_PER_FRAME = 1000 / 60;\nvar WIDTH = 800;\nvar HEIGHT = 600;\nvar canvas = document.createElement('canvas');\nvar ctx = canvas.getContext('2d');\ndocument.body.appendChild(canvas);\n// for sprites scaled up to retina resolution\nctx.mozImageSmoothingEnabled = false;\nctx.imageSmoothingEnabled = false;\nfunction resizeCanvas(width, height, outputWidth, outputHeight) {\n    var scaleX = outputWidth / width;\n    var scaleY = outputHeight / height;\n    canvas.width = scaleX * width * PIXEL_RATIO;\n    canvas.height = scaleY * height * PIXEL_RATIO;\n    canvas.style.width = scaleX * width + \"px\";\n    canvas.style.height = scaleY * height + \"px\";\n    ctx.scale(scaleX * PIXEL_RATIO, scaleY * PIXEL_RATIO);\n}\n// resize to fit window\nresizeCanvas(WIDTH, HEIGHT, window.innerWidth, window.innerHeight);\nwindow.addEventListener('resize', function () {\n    resizeCanvas(WIDTH, HEIGHT, window.innerWidth, window.innerHeight);\n});\n// TODO: loading queue:\n// 1. let the game push tasks to queue <=== load sounds (bg, effects), sprites, smth else\n// 2. show the loading progress in the loading screen\n// 3. make some logo on the loading screen?\n// 4.\n// TODO: Hot reloading for game code (websockets?)\nvar GAME_MEMORY = {};\nvar GAME_INPUT = {\n    controllers: [\n        new game_Game__WEBPACK_IMPORTED_MODULE_4__[\"GameController\"]()\n    ]\n};\nfunction processKeyboardInputs() {\n    var keyboardController = GAME_INPUT.controllers[0];\n    keyboardController.moveLeft.pressed = _KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].A)\n        || _KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].LEFT_ARROW);\n    keyboardController.moveRight.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].D)\n        || _KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].RIGHT_ARROW));\n    keyboardController.moveUp.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].W)\n        || _KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].UP_ARROW));\n    keyboardController.moveDown.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].S)\n        || _KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].DOWN_ARROW));\n    keyboardController.leftShoulder.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].Q));\n    keyboardController.rightShoulder.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].E));\n    keyboardController.actionLeft.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].U));\n    keyboardController.actionDown.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].I));\n    keyboardController.actionUp.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].O));\n    keyboardController.actionRight.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].P));\n    keyboardController.start.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].SPACE));\n    keyboardController.back.pressed = (_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"isKeyPressed\"](_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"KeyboardCodes\"].ESCAPE));\n    _KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"gameTickDone\"]();\n}\nfunction processGamepadInput() {\n    var gamepads = _GamepadInput__WEBPACK_IMPORTED_MODULE_2__[\"getGamepads\"]();\n    for (var gamepadIndex = 0; gamepadIndex < gamepads.length; gamepadIndex++) {\n        var controllerIndex = gamepadIndex + 1;\n        var gamepadController = GAME_INPUT.controllers[controllerIndex]; // NOTE: +1 because zero is for controller\n        if (!gamepadController) {\n            gamepadController = new game_Game__WEBPACK_IMPORTED_MODULE_4__[\"GameController\"]();\n            GAME_INPUT.controllers[controllerIndex] = gamepadController;\n        }\n        // buttons = {pressed:boolean, value:number}[17].\n        // TODO: how to figure out what are they? :D Are they static? Or i need to calibrate it every time?\n        // axes[2], axes[3] - right stick\n        var gamepad = gamepads[gamepadIndex];\n        var axes = gamepad && gamepad.connected ? gamepad.axes : new Array(4).fill(0);\n        var stick_threshold = 0.1;\n        gamepadController.moveLeft.pressed = axes[0] < -stick_threshold; //axes[3] < - stick_threshold\n        gamepadController.moveRight.pressed = axes[0] > stick_threshold; // down\n        gamepadController.moveUp.pressed = axes[1] < -stick_threshold; // left\n        gamepadController.moveDown.pressed = axes[1] > stick_threshold;\n        gamepadController.leftShoulder.pressed = false;\n        gamepadController.rightShoulder.pressed = false;\n        gamepadController.actionLeft.pressed = false;\n        gamepadController.actionDown.pressed = false;\n        gamepadController.actionUp.pressed = false;\n        gamepadController.actionRight.pressed = false;\n        gamepadController.start.pressed = false;\n        gamepadController.back.pressed = false;\n    }\n}\nvar loadGameCodeIsInProgress = false;\nfunction loadGameCode() {\n    if (loadGameCodeIsInProgress) {\n        return;\n    }\n    loadGameCodeIsInProgress = true;\n    var xhr = new XMLHttpRequest();\n    xhr.onreadystatechange = function () {\n        if (xhr.readyState === 4) {\n            if (xhr.status === 200 || xhr.status === 0) {\n                try {\n                    console.log('ev', eval(xhr.responseText));\n                    loadGameCodeIsInProgress = false;\n                }\n                catch (e) {\n                    loadGameCodeIsInProgress = false;\n                    console.error('failed to load game code', e);\n                }\n            }\n            else {\n                console.error('failed to load game code', xhr.status, xhr);\n            }\n        }\n    };\n    try {\n        xhr.open('GET', '/game.js', true);\n        xhr.send();\n    }\n    catch (e) {\n        console.error('failed to load game code', e);\n    }\n}\nvar tick = engine_GameLoop__WEBPACK_IMPORTED_MODULE_3__[\"createTickFunction\"]({\n    start: function () {\n        loadGameCode();\n        processGamepadInput();\n        processKeyboardInputs();\n        Object(game_Game__WEBPACK_IMPORTED_MODULE_4__[\"gameUpdate\"])(GAME_MEMORY, GAME_INPUT);\n    },\n    update: function () {\n    },\n    // TODO: fix frame rate, join the update+render functions\n    render: function () {\n        ctx.clearRect(0, 0, WIDTH, HEIGHT);\n        Object(game_Game__WEBPACK_IMPORTED_MODULE_4__[\"gameRender\"])(GAME_MEMORY, ctx, WIDTH, HEIGHT);\n    },\n    end: function (fps) {\n        ctx.font = '10px Arial';\n        ctx.fillText(\"FPS: \" + fps, WIDTH - 50, HEIGHT - 50);\n    }\n});\nvar animate = function (elapsed) {\n    tick(elapsed);\n    requestAnimationFrame(animate);\n};\nrequestAnimationFrame(animate);\n_KeyboardInput__WEBPACK_IMPORTED_MODULE_1__[\"startListen\"]();\n_PointerInput__WEBPACK_IMPORTED_MODULE_0__[\"startListen\"]();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });