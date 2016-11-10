import React from 'react'
import AbstractSelector from './AbstractSelector'

class ChapterSelector extends React.Component {
	render() {
		return (
			<AbstractSelector list={[...Array(this.props.chapters).keys()].map((i) => i+1)}
				onSelection={this.props.onSelection} />
		)
	}
}
export default ChapterSelector
