import React from 'react'
import {render} from 'react-dom'

import Modal from './Modal'
import TabulatedResults from './TabulatedResults'
import CollocationResults from './CollocationResults'

import EventPropagator from 'events/EventPropagator'

class SearchResultsDisplayer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			normalResults: [],
			collocationResults: [],
			show: "none"
		}
	}
	componentDidMount() {
		EventPropagator.registerListener({
			eventType: "do_search",
			callback: (payload) => {
				var search_urls = {
					"normal": "http://localhost:8080/api/search",
					"collocation": "http://localhost:8080/api/collocations"
				}
				var states = {
					"normal": "normalResults",
					"collocation": "collocationResults"
				}
				$.ajax({
					method: "POST",
					url: search_urls[payload.search_type],
					data: JSON.stringify(payload.query_data)
				}).done((data) => {
					if (data.length === 0)
					{
						alert("Your search did not yield any results")
					}
					else
					{
						var newState = {}
						newState[states[payload.search_type]] = data
						this.setState(newState)
						this.setState({"show": payload.search_type})
					}
					EventPropagator.fireEvent({
						eventType: "do_search_done",
						payload: null
					})
				}).fail((msg) => {
					alert("Hmm, something went wrong with that search. Sorry about that...")
					EventPropagator.fireEvent({
						eventType: "do_search_done",
						payload: null
					})
				})
			}
		})
	}
	clearResults() {
		this.setState({"show": "none"})
	}
	render() {
		return (
			<div>
				<Modal isVisible={this.state.show === "normal"}
					onClickHandler={this.clearResults.bind(this)}>
					<TabulatedResults data={this.state.normalResults} />
				</Modal>

				<Modal isVisible={this.state.show === "collocation"}
					onClickHandler={this.clearResults.bind(this)}>
					<CollocationResults data={this.state.collocationResults} />
				</Modal>
			</div>
		)
	}
}
export default SearchResultsDisplayer
