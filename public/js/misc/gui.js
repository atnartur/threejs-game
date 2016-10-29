/*
 * @Author: Artur Atnagulov (ClienDDev team)
 */

import $ from 'jquery'
import scene from '../core/scene';
import {models} from '../objects/models/collection'

var inited = false;

/**
 * Инициалзация dat.gui
 */

export var gui

export function init(){
	if(inited == false){
		gui = new dat.GUI({
	    	autoPlace: false
		});
		$('body').append('<div id="datgui"></div>')
		document.getElementById('datgui').appendChild(gui.domElement);
		console.log('gui', gui);
		inited = true
	}
}