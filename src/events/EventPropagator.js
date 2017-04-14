/**
 * To use EventPropagator:
 *

 import EventPropagator from './events/EventPropagator'

 EventPropagator.registerListener({
 	"eventType": "test",
 	"callback": (payload) => {
 		console.log(payload.attr)
 	}
 })

 EventPropagator.fireEvent({
 	"eventType": "test",
 	"payload": { "attr": "meh" }
 })

 */

let EventPropagator = {
	/**
	 * accepts a listenerObject or array of listenerObject(s)
	 */
	registerListener(listenerObject){
		if (this.listeners == null)
			this.listeners = []

		if (Array.isArray(listenerObject))
			this.listeners = this.listeners.concat(listenerObject)
		else
			this.listeners.push(listenerObject)
	},
	fireEvent(eventObject){
		// this.listeners.forEach((l) => {
		// 	console.log(l.eventType, "==", eventObject.eventType, "?", l.eventType === eventObject.eventType)
		// })
		let listenerList = this.listeners.filter((listener) => listener.eventType === eventObject.eventType)
		listenerList.forEach((listener) => {
			listener.callback(eventObject.payload)
		})
		if (listenerList.length === 0) {
			console.warn("Error with:", eventObject)
			console.warn("No listeners are registered for eventObject:", eventObject.eventType)
		} else {
			console.info("Event (", eventObject.eventType, ") fired to listeners:", listenerList.length)
		}
	}
}
export default EventPropagator
