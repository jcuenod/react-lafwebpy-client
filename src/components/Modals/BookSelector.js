import React from 'react'
import AbstractSelector from './AbstractSelector'
import OTBookDetails from 'data/OTBookDetails'

class BookSelector extends React.Component {
	render() {
		return (
			<AbstractSelector list={OTBookDetails.map((b) => b.abbreviation)}
				onSelection={this.props.onSelection} />
		)
	}
}
export default BookSelector
