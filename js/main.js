import Detector from './three_components/Detector'

import camera from './core/camera'
import {init as container_init} from './core/container'
import {init as controls_init} from './core/controls'
import scene from './core/scene'
import lights_init from './core/lights'
import {renderer, init as renderer_init} from './core/renderer'

import {stats, init as stats_init} from './misc/stats'

import {init as base_helpers_init} from './objects/helpers'
import {init as models_init, collection as models} from './objects/models/collection'

/**
 * настройки по умолчанию
 * @type {Object}
 */
var default_settings = {
	container: '#game',
	width: '100%',
	height: '100%',
	block_size: {
		x: 100,
		z: 100,
		y: 10
	},
	block_height: 10
}

/**
 * Настройки
 */
export var settings;

/**
 * Инициализация плеера
 * @param {object} [params] объект с настройками
 * @param {string} [params.container='#player'] jquery селектор, в котором будет развернут плеер
 * @param {number} [params.width='100%'] ширина плеера
 * @param {number} [params.height='100%'] высота плеера
 * @param {string} [params.modal_selector='#modal'] jquery селектор модального окна
 * @param {string} [params.modal_text_selector='p'] jquery селектор текстового блока в модальном окне. Выборка происходит относительно селктора модального окна
 * @param {number} [params.modal_arrow_top=0] отступ у стрелки модального окна
 * @param {string} [params.planes_editor_width] селектор поля ширины разреза в редакторе плоскостей
 * @param {string} [params.planes_editor_length] селектор поля длины разреза в редакторе плоскостей
 * @param {string} [params.planes_editor_button] селектор кнопки в редакторе плоскостей
 */
export function init(params) {
	if (!Detector.webgl) Detector.addGetWebGLMessage();

	settings = default_settings;
	
	for (let key in params)
		settings[key] = params[key];

	controls_init();
	container_init();
	renderer_init();
	models_init();

	if(__DEV__){
		stats_init();
		// base_helpers_init();
	}

	if(settings.width == '100%' && settings.height == '100%'){
		$(window).resize(() => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		});
	}
	else{
		camera.aspect = settings.width / settings.height;
		camera.updateProjectionMatrix();

		renderer.setSize(settings.width, settings.height);
	}

	animate();
}

$(document).ready(() => init());

function animate() {
	if(render())
		requestAnimationFrame(animate);
}

function render() {
	try{	
		renderer.render(scene, camera);
		
		if(__DEV__)
			stats.update();
		return true;
	}
	catch(e){
		console.error(e);
		return false;   
	}
}