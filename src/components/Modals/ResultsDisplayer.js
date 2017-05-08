import React from 'react'
import {render} from 'react-dom'

import {toast} from 'react-toastify';

import Modal from './Modal'
import SearchResults from './SearchResults'
import CollocationResults from './CollocationResults'
import WordStudyResults from './WordStudyResults'

import EventPropagator from 'events/EventPropagator'

class ResultsDisplayer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			normalResults: [],
			collocationResults: [],
			show: "none",
			font: false
		}
		EventPropagator.registerListener({
			eventType: "update_settings",
			callback: (payload) => {
				if (payload.setting_type == "font_family")
				{
					this.setState({"font": payload.value})
				}
			}
		})
	}
	componentDidMount() {
		EventPropagator.registerListener({
			eventType: "do_search",
			callback: (payload) => {
				var search_urls = {
					"normal": window.root_url + "/api/search",
					"collocation": window.root_url + "/api/collocations",
					"word study": window.root_url + "/api/word_study",
				}
				var states = {
					"normal": "normalResults",
					"collocation": "collocationResults",
					"word study": "wordStudyResults",
				}
				$.ajax({
					method: "POST",
					url: search_urls[payload.search_type],
					data: JSON.stringify(payload.query_data)
				}).done((data) => {
					if (data.search_results.length === 0)
					{
						toast('Your search did not yield any results', {
							type: toast.TYPE.INFO
						});
					}
					else
					{
						var newState = {}
						newState[states[payload.search_type]] = data.search_results
						this.setState(newState)
						this.setState({"show": payload.search_type})
						if (data.truncated)
						{
							toast('The search returned too many results, not all of them are being displayed.', {
								type: toast.TYPE.INFO
							});
						}
					}
					EventPropagator.fireEvent({
						eventType: "do_search_done",
						payload: null
					})
					ga('send', {
						hitType: 'event',
						eventCategory: 'search',
						eventAction: 'do-search',
						eventValue: data.length > 0
					})
				}).fail((msg) => {
					toast('Hmm, something went wrong with that search. Sorry about that...', {
						type: toast.TYPE.ERROR
					});
					EventPropagator.fireEvent({
						eventType: "do_search_done",
						payload: null
					})
					ga('send', {
						hitType: 'event',
						eventCategory: 'search',
						eventAction: 'failed-search'
					})
				})
			}
		})
	}
	hideModal() {
		this.setState({"show": "none"})
		ga('send', {
			hitType: 'event',
			eventCategory: 'search',
			eventAction: 'hide-search'
		})
	}
	render() {
		var resultElement = ""
		switch (this.state.show) {
			case "normal":
				resultElement = <SearchResults data={this.state.normalResults} font={this.state.font} />
				break;
			case "collocation":
				resultElement = <CollocationResults data={this.state.collocationResults} font={this.state.font} />
				break;
			case "word study":
				resultElement = <WordStudyResults data={this.state.wordStudyResults} font={this.state.font} />
				break;
		}

		return (
			<Modal isVisible={this.state.show !== "none"}
				onClickHandler={() => console.log('this.setState({"show": "none"})')}>
				{resultElement}
				<div className="close_button" onClick={() => this.hideModal()}></div>
			</Modal>
		)
	}
}
export default ResultsDisplayer
