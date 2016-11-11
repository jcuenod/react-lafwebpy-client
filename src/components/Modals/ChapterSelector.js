import React from 'react'
import AbstractSelector from './AbstractSelector'

class ChapterSelector extends React.Component {
	render() {
		var chapter_array = [...Array(this.props.chapters).keys()].map((i) => i+1)
		return (
			<AbstractSelector list={chapter_array}
				onSelection={this.props.onSelection} />
		)
	}
}
export default ChapterSelector
