import React from 'react'
import EventPropagator from '../events/EventPropagator'

import SearchSettings from './SearchSettings'
import SearchTerm from './SearchTerm'
import BibleReference from './BibleReference'

class SearchBuilder extends React.Component {
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
		EventPropagator.registerListener({
			eventType: "add_search_term",
			callback: (payload) => {
				var new_terms = this.state.terms.slice()
				var term_to_push = payload.term
				term_to_push.id = new Date().valueOf()
				new_terms.push(term_to_push)
				this.setState({"terms": new_terms})
			}
		})
		EventPropagator.registerListener({
			eventType: "remove_search_term",
			callback: (payload) => {
				var new_terms = this.state.terms.slice()
				var index_to_remove = new_terms.map(function(o) { return o.id; }).indexOf(payload.id)
				new_terms.splice(index_to_remove, 1)
				this.setState({"terms": new_terms})
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
				<div className="do_search"></div>
				<SearchSettings settings={this.state.settings} />
				<BibleReference />
				<div className="spacer"></div>
			</div>
		)
	}
}
export default SearchBuilder
