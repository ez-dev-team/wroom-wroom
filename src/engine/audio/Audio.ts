// https://www.html5rocks.com/en/tutorials/webaudio/games/
// https://miguelmota.com/bytes/slice-audiobuffer/

// polyfill for safari, lol
window['AudioContext'] = window['AudioContext'] || window['webkitAudioContext']

const audioContext = new AudioContext()

let HIT_BUFFER:AudioBuffer

export function init() {
	// TODO: should not be here, return wrapper to game
	// TODO: change BG music by location
	// audio element ===> loading as a stream, no need to decode entire buffer
	let audio = new Audio()
	audio.src = '/assets/audio/background.mp3'
	audio.controls = false
	audio.loop = true
	audio.volume = 0.5 // TODO: bg volume, take from settings
	audio.autoplay = true
	document.body.appendChild(audio)

	loadAudio('/assets/audio/hit.mp3').then(buffer => {
		// just save, call from playHit for now
		HIT_BUFFER = buffer
	})
}

export function playHit() {
	let sound = createSound(HIT_BUFFER)
	sound.gainNode.gain.value = 1 // TODO: effects volume, take from settings
	playSound(sound.source)
}

function loadAudio(url:string):Promise<AudioBuffer> {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest()
		request.open('GET', url, true)
		request.responseType = 'arraybuffer'

		// Decode asynchronously
		request.onload = function() {
			audioContext.decodeAudioData(request.response, buffer => {
				resolve(buffer)
			}, reject)
		}
		request.onerror = reject
		request.send()
	})
}

function playSound(source:AudioBufferSourceNode) {
	if (!source.start) {
		source['noteOn'](0)
	} else {
		source.start(0)
	}
}

function createSound(buffer:AudioBuffer):{source:AudioBufferSourceNode, gainNode:GainNode} {
	let source = audioContext.createBufferSource()
	source.buffer = buffer

	let gainNode = audioContext.createGain()
	source.connect(gainNode)
	gainNode.connect(audioContext.destination)

	return {
		source,
		gainNode
	}
}

/*function crossfade(element) {
	var x = parseInt(element.value) / parseInt(element.max);
	// Use an equal-power crossfading curve:
	var gain1 = Math.cos(x * 0.5*Math.PI);
	var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI);
	this.ctl1.gainNode.gain.value = gain1;
	this.ctl2.gainNode.gain.value = gain2;
}*/

/*function playHelper(bufferNow, bufferLater) {
	var playNow = createSource(bufferNow);
	var source = playNow.source;
	var gainNode = playNow.gainNode;
	var duration = bufferNow.duration;
	var currTime = context.currentTime;
	// Fade the playNow track in.
	gainNode.gain.linearRampToValueAtTime(0, currTime);
	gainNode.gain.linearRampToValueAtTime(1, currTime + ctx.FADE_TIME);
	// Play the playNow track.
	source.start(0);
	// At the end of the track, fade it out.
	gainNode.gain.linearRampToValueAtTime(1, currTime + duration-ctx.FADE_TIME);
	gainNode.gain.linearRampToValueAtTime(0, currTime + duration);
	// Schedule a recursive track change with the tracks swapped.
	var recurse = arguments.callee;
	ctx.timer = setTimeout(function() {
		recurse(bufferLater, bufferNow);
	}, (duration - ctx.FADE_TIME) * 1000);
}*/

/*
function demo() {
	var div = document.querySelector("div");

	function handleFilesSelect(input) {

		div.innerHTML = "loading audio tracks.. please wait";
		var files = Array.from(input.files);
		var chunks = [];
		var channels = [
			[0, 1],
			[1, 0]
		];
		var audio = new AudioContext();
		var player = new Audio();
		var merger = audio.createChannelMerger(2);
		var splitter = audio.createChannelSplitter(2);
		var mixedAudio = audio.createMediaStreamDestination();
		var duration = 60000;
		var context;
		var recorder;
		var audioDownload;
		var description = "";

		player.controls = "controls";

		function get(file) {
			description += file.name.replace(/\..*|\s+/g, "");
			console.log(description);
			return new Promise(function(resolve, reject) {
				var reader = new FileReader;
				reader.readAsArrayBuffer(file);
				reader.onload = function() {
					resolve(reader.result)
				}
			})
		}

		function stopMix(duration, ...media) {
			setTimeout(function(media) {
				media.forEach(function(node) {
					node.stop()
				})
			}, duration, media)
		}

		Promise.all(files.map(get)).then(function(data) {
				return Promise.all(data.map(function(buffer, index) {
						return audio.decodeAudioData(buffer)
							.then(function(bufferSource) {
								var channel = channels[index];
								var source = audio.createBufferSource();
								source.buffer = bufferSource;
								source.connect(splitter);
								splitter.connect(merger, channel[0], channel[1]);
								return source
							})
					}))
					.then(function(audionodes) {
						merger.connect(mixedAudio);
						merger.connect(audio.destination);
						recorder = new MediaRecorder(mixedAudio.stream);
						recorder.start(0);
						audionodes.forEach(function(node, index) {
							node.start(0)
						});

						div.innerHTML = "playing and recording tracks..";

						stopMix(duration, ...audionodes, recorder);

						recorder.ondataavailable = function(event) {
							chunks.push(event.data);
						};
					})
			})
			.catch(function(e) {
				console.log(e)
			});
	}
}*/
