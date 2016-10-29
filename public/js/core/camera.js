/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

import THREE from 'three'

let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(150, 150, 110);

console.log('camera', camera);

export default camera;

export function stand_in_front_of(obj, k = 1.5){
	let mesh_box_sizes = (new THREE.Box3().setFromObject(obj)).size();

	camera.position.set(mesh_box_sizes.x * k, mesh_box_sizes.y * k, mesh_box_sizes.z * k);
	camera.lookAt(obj.position)
}