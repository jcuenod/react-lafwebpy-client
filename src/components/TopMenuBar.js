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
			search_in_progress: false,
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
		}, {
			eventType: "navigation_request",
			callback: (payload) => {
				this.setState({navigate_in_progress: true})
			}
		}, {
			eventType: "navigation_complete",
			callback: (payload) => {
				this.setState({navigate_in_progress: false})
			}
		}, {
			eventType: "do_search",
			callback: () => {
				this.setState({search_in_progress: true})
			}
		}, {
			eventType: "do_search_done",
			callback: () => {
				this.setState({search_in_progress: false})
			}
		}])
	}
	fireSearchEvent() {
		if (this.state.terms.length === 0) return
		var terms = this.state.terms.map((t) => {
			var ret = Object.assign({}, t)
			delete ret["id"]
			return ret
		})
		EventPropagator.fireEvent({
			eventType: "do_search",
			payload: {
				search_type: this.state.settings.search_type,
				query_data: {
					"query": terms,
					"search_range": this.state.settings.search_range
				}
			}
		})
	}
	render() {
		var searchTermElements = this.state.terms.map((term) => {
			return <SearchTerm key={term.id} data={term} />
		}, this)
		var search_button_classes = ["do_search"]
		if (this.state.search_in_progress)
			search_button_classes.push("in-progress")

		return (
			<div className="search_builder" style={{
					opacity: this.state.navigate_in_progress ? 0.4: 1,
					pointerEvents: this.state.navigate_in_progress ? "none": "all"
				}}>
				{searchTermElements}
				<div className={search_button_classes.join(" ")} onClick={this.fireSearchEvent.bind(this)}>
				</div>
				<SearchSettings settings={this.state.settings} />
				<BibleReference />
				<div className="spacer"></div>
			</div>
		)
	}
}
export default TopMenuBar
