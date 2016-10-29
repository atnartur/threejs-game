/*
* @Author: Artur Atnagulov (ClienDDev team)
* @Date:   2016-07-14 23:24:09
* @Last Modified by:   atnartur
* @Last Modified time: 2016-07-15 21:52:23
*/

import statsjs from 'stats.js'
import {container} from '../core/container';

export var stats = new statsjs();

export function init(){
	container.appendChild(stats.dom);
}
