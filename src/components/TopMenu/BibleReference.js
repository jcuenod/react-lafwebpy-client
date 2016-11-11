import React from 'react'
import EventPropagator from 'events/EventPropagator'
import OTBookDetails from 'data/OTBookDetails'

class BibleReference extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			reference: null
		}
	}
	componentDidMount() {
		EventPropagator.registerListener({
			eventType: "navigation_complete",
			callback: (payload) => {
				this.setState({reference: payload.reference})
			}
		})
	}
	moveChapter(direction) {
		if (this.state.navigate_in_progress) return
		var referenceArray = OTBookDetails.reduce(function(previousValue, currentValue){
			var newReferences = [...Array(currentValue.chapters).keys()].map((i) => ({ "book": currentValue.name, "chapter": i+1}))
			return previousValue.concat(newReferences)
		},[])
		var curr_ref = this.state.reference
		var index = referenceArray.findIndex((item) => item.chapter == curr_ref.chapter && item.book == curr_ref.book)
		var newIndex = index + direction
		newIndex = newIndex >= 0 ? newIndex : referenceArray.length - 1
		newIndex = newIndex < referenceArray.length ? newIndex : 0

		EventPropagator.fireEvent({
			eventType: "navigation_request",
			payload: {
				reference: referenceArray[newIndex]
			}
		})
	}
	render() {
		return (
			<div className="bible_reference">
				<div className="chapter_nav" onClick={() => this.moveChapter(-1)}>«</div>
				<div className="book_nav"
					onClick={() => {
						EventPropagator.fireEvent({
							eventType: "show_book_selector",
							payload: null
						})
					}}>
					{this.state.reference === null ? "…" : this.state.reference.book + " " + this.state.reference.chapter}
				</div>
				<div className="chapter_nav" onClick={() => this.moveChapter(1)}>»</div>
			</div>
		)
	}
}
export default BibleReference
