/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

import $ from 'jquery';
import {settings} from '../main'

export var container;

export function init(){
	let elem = $(settings.container);
	
	if(elem.length == 0)
		throw new Error('Viewer: container element with selector "' + settings.container + '" not found');

	container = elem[0];	
}