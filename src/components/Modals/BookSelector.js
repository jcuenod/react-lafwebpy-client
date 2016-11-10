import React from 'react'
import AbstractSelector from './AbstractSelector'

class BookSelector extends React.Component {
	render() {
		return (
			<AbstractSelector list={this.props.books}
				onSelection={this.props.onSelection} />
		)
	}
}
export default BookSelector
