/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

import $ from 'jquery'
import MK from 'matreshka'
import THREE from 'three'
import ColorScheme from 'color-scheme'
import Model from './model'
import {settings} from '../../main'
import camera from '../../core/camera'

export class ModelsCollection extends MK.Array {
	Model = Model
	constructor(){
		super()

		this.direction = 'z';

		var scheme = new ColorScheme;
		this.colors = scheme.scheme('tetrade').variation('hard').colors();
		console.log(this.colors)

		this.push({
			x: settings.block_size.x,
			y: settings.block_size.y,
			z: settings.block_size.z
		})

		this.add();
		
		$('body').click(() => {
			console.group('click')
			var dir = this.direction;

			var latest = this[this.length - 1]
			latest.move_stop()

			var prev = this[this.length - 2]
			var position_diff = latest.obj.position[dir] - prev.obj.position[dir];

			var latest_size = (new THREE.Box3().setFromObject(latest.obj)).size(); 
			var prev_size = (new THREE.Box3().setFromObject(prev.obj)).size(); 

			var latest_right = latest.obj.position[dir] + latest_size[dir] / 2;
			var latest_left = latest.obj.position[dir] - latest_size[dir] / 2;

			var prev_right = prev.obj.position[dir] + prev_size[dir] / 2;
			var prev_left = prev.obj.position[dir] - prev_size[dir] / 2;


			console.log('latest size', latest_size)
			console.log('prev size', prev_size)
			console.log('latest left right', latest_left, latest_right)
			console.log('prev left right', prev_left, prev_right)
			console.log('dir', dir)

			var diff = 0;
			var poz = 0;

			if(prev_left > latest_left){
				diff = prev_left - latest_left
				poz = latest.obj.position[dir] + diff / 2;
			}
			if(prev_right < latest_right){
				diff = latest_right - prev_right
				poz = latest.obj.position[dir] - diff / 2;
			}

			console.log('diff', diff)

			latest.obj.position[dir] = poz

			var scale = (latest_size[dir] - diff) / latest_size[dir]
			console.log(scale)

			if(scale < 0){
				latest.move_stop();
				alert('Вы проиграли!')
				location.reload()
				return
			}

			latest.obj.scale[dir] = scale

			console.groupEnd('click')

			if(this.direction == 'z') 
				this.direction = 'x'
			else
				this.direction = 'z'

			latest_size = (new THREE.Box3().setFromObject(latest.obj)).size(); 

			this.add({
				x: latest_size.x,
				y: latest_size.y,
				z: latest_size.z,
			});
		})

	}
	get_objects(){
		let res = [];
		this.forEach((model) => res.push(model.obj))
		return res;
	}
	add(size){
		this.push(size || {
			x: settings.block_size.x,
			y: settings.block_size.y,
			z: settings.block_size.z
		});
		
		setTimeout(() => {
			let latest = this.length - 1 
			let prev = this.length - 2
			
			this[latest].obj.position.set(this[prev].obj.position.x, settings.block_size.y * (this.length - 1), this[prev].obj.position.z)
			this[latest].move(this.direction);
			console.log(camera);
			camera.position.y = 150 + settings.block_size.y * (this.length - 1)
		}, 0);
	}
}


export var collection;
export function init(){
	collection = new ModelsCollection()
	console.log('models collection', collection);
}