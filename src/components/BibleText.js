import React from 'react'
import ReactHint from 'react-hint'
import EventPropagator from 'events/EventPropagator'
import VerseView from 'components/BibleText/VerseView'
import ClauseAtomView from 'components/BibleText/ClauseAtomView'

class BibleText extends React.Component {
	constructor(props) {
		super(props)
		var settings = JSON.parse(localStorage.getItem("qbibleSettings")) || {}
		this.state = {
			data: [],
			active_wid: -1,
			display_setting: settings
		}
	}
	componentDidMount() {
		EventPropagator.registerListener([{
			eventType: "navigation_request",
			callback: (payload) => {
				var request = {}
				request["reference"] = payload.reference
				request["reference"]["book"] = request["reference"]["book"].replace(/\ /g, "_")

				// Find out if highlighting is on
				var settings = {}
				EventPropagator.fireEvent({'eventType': 'get_settings', 'payload': {
					'callback': (stobj) => {
						settings = stobj
					}
				}})
				request.display_by = settings.display_by

				var highlightobj = {}
				if (settings.highlight_terms)
				{
					// If highlighting is on, then get the queries to highlight and create the terms
					var rawQueries = []
					EventPropagator.fireEvent({'eventType': 'get_terms', 'payload': {'callback': (sterms) => {
						rawQueries = sterms
					}}})
					var counter = 0
					rawQueries.forEach((q) => {
						delete q["uid"]
						highlightobj['highlight' + counter++] = q
					})
					request["highlights"] = highlightobj
				}

				$.post(window.root_url + "/api/book_chapter", JSON.stringify(request), (result) => {
					this.setState({data: result})
					var newRef = result.reference
					newRef["book"] = newRef["book"].replace(/\_/g, " ")
					EventPropagator.fireEvent({
						eventType: "navigation_complete",
						payload: { reference: newRef }
					})
					ga('send', {
						hitType: 'event',
						eventCategory: 'bibletext',
						eventAction: 'navigation'
					})
				})
			}
		}, {
			eventType: "word_clicked",
			callback: (payload) => {
				this.setState({"active_wid": payload.wid})
				ga('send', {
					hitType: 'event',
					eventCategory: 'bibletext',
					eventAction: 'word-clicked'
				})
			}
		}, {
			eventType: "update_settings",
			callback: (payload) => {
				if (["font_size", "font_family"].includes(payload.setting_type))
				{
					var newState = this.state.display_setting
					newState[payload.setting_type] = payload.value
					this.setState({"display_setting": newState})
				}
			}
		}])
	}
	render() {
		var d = this.state.data
		var fontsizes = { "small": "130%", "medium": "200%", "large": "270%" }
		var biblestyles = {}
		if (this.state.display_setting.hasOwnProperty("font_size"))
			biblestyles["fontSize"] = fontsizes[this.state.display_setting.font_size]
		if (this.state.display_setting.hasOwnProperty("font_family"))
			biblestyles["fontFamily"] = this.state.display_setting.font_family

		var toDisplay
		if (d.display_by == "verse")
		{
			toDisplay = d.chapter_data.map((verse, i) => (
				<VerseView key={i} data={verse} active_wid={this.state.active_wid}></VerseView>
			))
		}
		else if (d.display_by == "clause") {
			toDisplay = <div className="clause_atom_holder">
				{d.chapter_data.map((clause, i) => (
					<ClauseAtomView key={i} data={clause} active_wid={this.state.active_wid}></ClauseAtomView>
				))}
				<ReactHint />
			</div>
		}
		else {
			console.log(d)
			toDisplay = ""
		}
		return (
			<div className="bible_text_container">
				<div className="bible_text" style={biblestyles}>
					{toDisplay}
				</div>
			</div>
		)
	}
}
export default BibleText
