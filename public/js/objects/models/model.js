/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

import MK from 'matreshka'
import THREE from 'three'
import scene from '../../core/scene'

export default class Model extends MK.Object {
	/**
	 * Конструктор
	 * @param {object} data данные этого объекта
	 */
	constructor(data, collection){
		super();

		this.jset({
			obj: null
		});

		var color = collection.colors[collection.length % collection.colors.length]

		var geometry = new THREE.BoxGeometry(data.x, data.y, data.z);
		var material = new THREE.MeshLambertMaterial({ 
			color: Number('0x' + color), 
			shading: THREE.FlatShading 
		});

		this.obj = new THREE.Mesh(geometry, material);
		this.obj.position.set(0,0,0)

		scene.add(this.obj);
	}
	move(dir){
		dir = dir || 'z';

		this.moveto = 1;
		this.interval = setInterval(() => {
			var step = 0.2

			if(this.moveto == 1)
				this.obj.position[dir] += step
			else
				this.obj.position[dir] -= step

			if(this.obj.position[dir] >= 100)
				this.moveto = 0
			if(this.obj.position[dir] <= -100)
				this.moveto = 1
		}, 5)
	}
	move_stop(){
		clearInterval(this.interval);
	}
}