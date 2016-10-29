/*
* @Author: Artur Atnagulov (ClienDDev team)
*/
import scene from '../../core/scene'
import LabeledAxes from '../../three_components/axis-helpers'

/**
 * Инициализация хелперов, которые не зависят от объектов (base helpers init)
 * @return {[type]} [description]
 */
export function init(){
	axis_init();
}


/**
 * Линии осей
 */
export function axis_init(){
 	var axis = new LabeledAxes({
 		size: 100,
	    
	    textColor:'#ffffff',
	    addLabels:true,
	    addArrows:true,
 	})
 	scene.add(axis)
}
