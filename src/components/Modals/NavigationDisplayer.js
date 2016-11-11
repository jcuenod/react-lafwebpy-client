import React from 'react'
import {render} from 'react-dom'

import Modal from './Modal'
import BookSelector from './BookSelector'
import ChapterSelector from './ChapterSelector'

import EventPropagator from 'events/EventPropagator'
import OTBookDetails from 'data/OTBookDetails'

class NavigationDisplayer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchResults: [],
			collocationResults: [],
			bookSelectionMode: false,
			chapterSelectionMode: false,
			bookSelected: "Gen"
		}
	}
	componentDidMount() {
		EventPropagator.registerListener({
			eventType: "show_book_selector",
			callback: (payload) => {
				this.setState({bookSelectionMode: true})
			}
		})
	}
	render() {
		return (
			<div>
				<Modal isVisible={this.state.bookSelectionMode} onClickHandler={() => this.setState({bookSelectionMode: false})}>
					<BookSelector onSelection={(book) => {
							var book_name = OTBookDetails.filter((b) => b.abbreviation === book)[0].name
							this.setState({bookSelected: book_name})
							var ch_count = OTBookDetails.filter((b) => b.abbreviation === book)[0].chapters
							this.setState({chapters: ch_count})
							this.setState({bookSelectionMode: false})
							this.setState({chapterSelectionMode: true})
						}}
						books={this.state.bookNames} />
				</Modal>
				<Modal isVisible={this.state.chapterSelectionMode} onClickHandler={() => this.setState({chapterSelectionMode: false})}>
					<ChapterSelector onSelection={(chapter) => {
							EventPropagator.fireEvent({
								eventType: "navigation_request",
								payload: {
									reference: {
										book: this.state.bookSelected,
										chapter: chapter
									}
								}
							})
							this.setState({chapterSelectionMode: false})
						}}
						chapters={this.state.chapters} />
				</Modal>
			</div>
		)
	}
}
export default NavigationDisplayer
