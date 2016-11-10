import React from 'react'
import EventPropagator from '../events/EventPropagator'

class BibleReference extends React.Component {
	render() {
		return (
			<div className="bible_reference">
				<div className="chapter_nav">«</div>
				<div className="book_nav">{this.props.reference || "…"}</div>
				<div className="chapter_nav">»</div>
			</div>
		)
	}
}
export default BibleReference
