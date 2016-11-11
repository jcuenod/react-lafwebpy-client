import React from 'react'
import EventPropagator from 'events/EventPropagator'

class BibleReference extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			reference: "…"
		}
	}
	componentDidMount() {
		EventPropagator.registerListener({
			eventType: "navigation_complete",
			callback: (payload) => {
				this.setState({reference: payload.reference})
				localStorage.setItem("reference", payload.reference);
			}
		})
	}
	render() {
		return (
			<div className="bible_reference">
				<div className="chapter_nav">«</div>
				<div className="book_nav">{this.state.reference}</div>
				<div className="chapter_nav">»</div>
			</div>
		)
	}
}
export default BibleReference
