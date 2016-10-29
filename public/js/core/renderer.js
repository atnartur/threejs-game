/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

import THREE from 'three'
import {container} from './container';
import {settings} from '../main'

export var renderer = new THREE.WebGLRenderer({
	antialias: true,
	preserveDrawingBuffer: true
});
renderer.setClearColor(0x393939);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.gammaInput = true;
renderer.gammaOutput = true;

renderer.shadowMap.enabled = true;
renderer.shadowMap.renderReverseSided = false;

export function init(){
	let width = settings.width;
	let height = settings.height

	if(width == '100%')
		width = window.innerWidth
	if(height == '100%')
		height = window.innerHeight

	renderer.setSize(width, height);

	container.appendChild(renderer.domElement);
	console.log('renderer', renderer);
	console.log('renderer size', width, height)
}