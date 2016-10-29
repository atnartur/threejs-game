/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

import THREE from 'three'
import '../three_components/OrbitControls'
import camera from  './camera'
import {container} from  './container'

/**
 * Инициализация контролов (прокрутка, масштабирование)
 */

export var controls;

export function init(){
	controls = new THREE.OrbitControls(camera, container);
	controls.enablePan = true;
	controls.enableZoom = true;
	controls.enableKeys = true;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 2;
	controls.minPolarAngle = THREE.Math.degToRad(0);
	controls.maxPolarAngle = THREE.Math.degToRad(180);
}
