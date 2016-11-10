/**
 * To use EventPropagator:
 *

 import EventPropagator from './events/EventPropagator'

 EventPropagator.registerListener({
 	"eventType": "test",
 	"callback": function(payload){
 		console.log(payload);
 	}
 });

 EventPropagator.fireEvent({
 	"eventType": "test",
 	"payload": { "meh": function(){} }
 });

 */

let EventPropagator = {
	registerListener(listenerObject){
		if (this.listeners == null)
			this.listeners = []
		this.listeners.push(listenerObject)
	},
	fireEvent(eventObject){
		let listenerList = this.listeners.filter(function(listener){
			return listener.eventType === eventObject.eventType
		})
		listenerList.forEach(function(listener) {
			listener.callback(eventObject.payload)
		})
		if (listenerList.length === 0) {
			console.warn("No listeners are registered for eventObject:", eventObject)
		} else {
			console.info("Events fired to listeners:", listenerList.length)
		}
	}
}
export default EventPropagator
