import React from 'react'
import {render} from 'react-dom'

import Modal from './Modals/Modal'
import SearchResultsDisplayer from './Modals/SearchResultsDisplayer'
import BookSelector from './Modals/BookSelector'
import ChapterSelector from './Modals/ChapterSelector'

import EventPropagator from '../events/EventPropagator'

class ModalDisplayer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchResults: [],
			collocationResults: [],
			bookSelectionMode: false,
			chapterSelectionMode: false
		}
	}
	render() {
		return (
			<div>
				<SearchResultsDisplayer />

				<Modal isVisible={this.state.bookSelectionMode}
					onClickHandler={() => this.changeMode("bookSelectionMode", false)}>
					<BookSelector onSelection={this.bookSelectionHandler}
						books={this.state.bookNames} />
				</Modal>

				<Modal isVisible={this.state.chapterSelectionMode}>
					<ChapterSelector onSelection={this.chapterSelectionHandler}
						chapters={this.state.chapterSelection} />
				</Modal>
			</div>
		)
	}
}
export default ModalDisplayer
