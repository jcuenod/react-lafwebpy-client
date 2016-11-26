import React from 'react'
import {render} from 'react-dom'

import Modal from './Modal'
import SearchResults from './SearchResults'
import CollocationResults from './CollocationResults'

import EventPropagator from 'events/EventPropagator'

class ResultsDisplayer extends React.Component {
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
					"normal": "/api/search",
					"collocation": "/api/collocations"
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
	render() {
		return (
			<div>
				<Modal isVisible={this.state.show !== "none"}
					onClickHandler={() => console.log('this.setState({"show": "none"})')}>
					{this.state.show === "collocation" ?
						<CollocationResults data={this.state.collocationResults} /> :
						this.state.show === "normal" ?
							<SearchResults data={this.state.normalResults} /> :
							""}
					<div className="close_button" onClick={() => this.setState({"show": "none"})}>close</div>
				</Modal>
			</div>
		)
	}
}
export default ResultsDisplayer
