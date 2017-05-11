import React from 'react'
import {toast} from 'react-toastify';

import EventPropagator from 'events/EventPropagator'

import SearchSettings from 'components/TopMenu/SearchSettings'
import SearchTerm from 'components/TopMenu/SearchTerm'
import BibleReference from 'components/TopMenu/BibleReference'
import GeneralSettings from 'components/TopMenu/GeneralSettings'


// This list is duplicated in SearchSettingsMenu so don't only change in one place...
let builtin_filters = {
	"pentateuch": ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
	"minor prophets": ["Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"],
	// note the note above
}
let settings_that_cause_refresh = [
	"display_by", "highlight_terms"
]
let waitingForUpdate = false

class TopMenuBar extends React.Component {
	constructor(props) {
		super(props)
		var settings = JSON.parse(localStorage.getItem("qbibleSettings")) || {}
		if (!settings.hasOwnProperty("search_range"))
			settings["search_range"] = "clause"
		if (!settings.hasOwnProperty("search_type"))
			settings["search_type"] = "normal"
		if (!settings.hasOwnProperty("search_filter"))
			settings["search_filter"] = "none"
		if (!settings.hasOwnProperty("font_size"))
			settings["font_size"] = ""
		if (!settings.hasOwnProperty("font_family"))
			settings["font_family"] = ""
		if (!settings.hasOwnProperty("highlight_terms"))
			settings["highlight_terms"] = false
		if (!settings.hasOwnProperty("display_by"))
			settings["display_by"] = "verse"

		this.state = {
			"terms": [],
			"search_in_progress": false,
			"reference": {},
			"settings": settings,
		}
	}
	componentDidMount() {
		EventPropagator.registerListener([{
			eventType: "add_search_term",
			callback: (payload) => {
				var term_to_push = payload.term
				if (Object.keys(term_to_push).length === 0)
				{
					toast('You can\'t add an empty search term. Select attributes to build one up.', {
						type: toast.TYPE.INFO
					});
					return
				}

				var new_terms = this.state.terms.slice()
				term_to_push.uid = new Date().valueOf()
				new_terms.push(term_to_push)
				this.setState({"terms": new_terms})
				ga('send', {
					hitType: 'event',
					eventCategory: 'topmenubar',
					eventAction: 'added-search-term'
				})

				if (this.state.settings.highlight_terms)
				{
					waitingForUpdate = true
				}
			}
		}, {
			eventType: "remove_search_term",
			callback: (payload) => {
				var new_terms = this.state.terms.slice()
				var index_to_remove = new_terms.map((o) => o.uid).indexOf(payload.search_term.uid)
				new_terms.splice(index_to_remove, 1)
				this.setState({"terms": new_terms})
				ga('send', {
					hitType: 'event',
					eventCategory: 'topmenubar',
					eventAction: 'removed-search-term'
				})

				if (this.state.settings.highlight_terms)
				{
					waitingForUpdate = true
				}
			}
		}, {
			eventType: "update_settings",
			callback: (payload) => {
				var new_state = Object.assign({}, this.state.settings)
				new_state[payload.setting_type] = payload.value
				this.setState({"settings": new_state})
				localStorage.setItem("qbibleSettings", JSON.stringify(new_state))
				ga('send', {
					hitType: 'event',
					eventCategory: 'topmenubar',
					eventAction: 'updated-settings'
				})
				if (settings_that_cause_refresh.includes(payload.setting_type))
				{
					// Refresh navigation
					waitingForUpdate = true
				}
			}
		}, {
			eventType: "navigation_request",
			callback: (payload) => {
				this.setState({navigate_in_progress: true, reference: payload.reference})
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
		}, {
			eventType: "get_settings",
			callback: (payload) => {
				payload.callback(this.state.settings)
			}
		}, {
			eventType: "get_terms",
			callback: (payload) => {
				payload.callback(this.state.terms)
			}
		}])
	}
	componentDidUpdate(prevProps, prevState)
	{
		if (waitingForUpdate)
		{
			waitingForUpdate = false
			EventPropagator.fireEvent({
				eventType: "navigation_request",
				payload: {
					reference: this.state.reference
				}
			})
		}
	}
	fireSearchEvent() {
		if (this.state.terms.length === 0)
		{
			alert("You need to add search term. To do so,\n1. Click on a word\n2. Click on a morphological feature\n3. Click 'add search term'")
			return
		}

		var terms = this.state.terms.map((t) => {
			var ret = Object.assign({}, t)
			delete ret["uid"]
			return ret
		})
		var payload = {
			search_type: this.state.settings.search_type,
			query_data: {
				"query": terms,
				"search_range": this.state.settings.search_range
			}
		}
		if (this.state.settings.search_filter == 'none') {
			//do nothing
		}
		else if (this.state.settings.search_filter == 'current book') {
			payload.query_data["search_filter"] = [this.state.reference.book]
		}
		else if (this.state.settings.search_filter == 'custom') {
			payload.query_data["search_filter"] = localStorage.getItem("custom_search_filter")
		}
		else if (Object.keys(builtin_filters).includes(this.state.settings.search_filter)) {
			payload.query_data["search_filter"] = builtin_filters[this.state.settings.search_filter]
		}

		EventPropagator.fireEvent({
			"eventType": "do_search",
			"payload": payload
		})
	}
	render() {
		var search_button_classes = ["do_search"]
		if (this.state.search_in_progress)
			search_button_classes.push("in-progress")
		var term_under_construction = ["term_under_construction"]
		if (this.state.under_construction)
			term_under_construction.push("show")

		return (
			<div className="search_builder" style={{
					opacity: this.state.navigate_in_progress ? 0.4: 1,
					pointerEvents: this.state.navigate_in_progress ? "none": "all"
				}}>
				<div className="build_search_term" onClick={() => EventPropagator.fireEvent({
					eventType: "build_term",
					payload: null
				})}></div>
				<div className={term_under_construction.join(" ")}
					onClick={() => {
						EventPropagator.fireEvent({
							eventType: "remove_search_term",
							payload: { search_term: [] }
						})
					}}>
					<svg enableBackground="new 0 0 64 64" height="90%" id="Layer_1" version="1.1" viewBox="0 0 64 64" width="40px"><g fill="#fff"><path d="M55.736,13.636l-4.368-4.362c-0.451-0.451-1.044-0.677-1.636-0.677c-0.592,0-1.184,0.225-1.635,0.676l-3.494,3.484   l7.639,7.626l3.494-3.483C56.639,15.998,56.639,14.535,55.736,13.636z"/><polygon points="21.922,35.396 29.562,43.023 50.607,22.017 42.967,14.39  "/><polygon points="20.273,37.028 18.642,46.28 27.913,44.654  "/><path d="M41.393,50.403H12.587V21.597h20.329l5.01-5H10.82c-1.779,0-3.234,1.455-3.234,3.234v32.339   c0,1.779,1.455,3.234,3.234,3.234h32.339c1.779,0,3.234-1.455,3.234-3.234V29.049l-5,4.991V50.403z"/></g></svg>
				</div>
				{this.state.terms.map((term) => (
					<SearchTerm key={term.uid} data={term} />)
				)}
				<div className={search_button_classes.join(" ")} onClick={this.fireSearchEvent.bind(this)}></div>
				<SearchSettings settings={this.state.settings} />
				<BibleReference />
				<GeneralSettings settings={this.state.settings} />
				<div className="spacer"></div>
			</div>
		)
	}
}
export default TopMenuBar
