import React from 'react'
import EventPropagator from 'events/EventPropagator'

import SearchSettings from 'components/TopMenu/SearchSettings'
import SearchTerm from 'components/TopMenu/SearchTerm'
import BibleReference from 'components/TopMenu/BibleReference'

class TopMenuBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			terms: [],
			settings: {
				search_range: "clause",
				search_type: "normal"
			}
		}
	}
	componentDidMount() {
		EventPropagator.registerListener([{
			eventType: "add_search_term",
			callback: (payload) => {
				var new_terms = this.state.terms.slice()
				var term_to_push = payload.term
				term_to_push.id = new Date().valueOf()
				new_terms.push(term_to_push)
				this.setState({"terms": new_terms})
			}
		}, {
			eventType: "remove_search_term",
			callback: (payload) => {
				var new_terms = this.state.terms.slice()
				var index_to_remove = new_terms.map(function(o) { return o.id; }).indexOf(payload.id)
				new_terms.splice(index_to_remove, 1)
				this.setState({"terms": new_terms})
			}
		}, {
			eventType: "update_settings",
			callback: (payload) => {
				var new_state = Object.assign({}, this.state.settings)
				new_state[payload.setting_type] = payload.value
				this.setState({"settings": new_state})
			}
		}])
	}
	fireSearchEvent() {
		var dataToSend = {
			"query": this.state.terms,
			"search_range": this.state.settings.search_range
		};
		var events = {
			normal: "do_search",
			collocation: "do_collocation_search"
		}
		EventPropagator.fireEvent({
			eventType: events[this.state.settings.search_type],
			payload: {
				query_data: dataToSend
			}
		})
	}
	render() {
		var searchTermElements = this.state.terms.map((term) => {
			return <SearchTerm key={term.id} data={term} />
		}, this)
		return (
			<div className="search_builder">
				{searchTermElements}
				<div className="do_search" onClick={this.fireSearchEvent.bind(this)}>
				</div>
				<SearchSettings settings={this.state.settings} />
				<BibleReference />
				<div className="spacer"></div>
			</div>
		)
	}
}
export default TopMenuBar
