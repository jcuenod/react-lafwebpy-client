import React from 'react'
import EventPropagator from 'events/EventPropagator'
import WholeWord from 'components/BibleText/WholeWord'

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
				var ref = payload.reference
				ref["book"] = ref["book"].replace(/\ /g, "_")
				$.post(window.root_url + "/api/book_chapter", JSON.stringify(ref), (result) => {
					this.setState({data: result.chapter_data})
					var newRef = result.reference
					newRef["book"] = newRef["book"].replace(/\_/g, " ")
					EventPropagator.fireEvent({
						eventType: "navigation_complete",
						payload: { reference: newRef }
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
				var newState = this.state.display_setting
				newState[payload.setting_type] = payload.value
				this.setState({"display_setting": newState})
			}
		}])
	}
	render() {
		var fontsizes = { "small": "130%", "medium": "200%", "large": "270%" }
		var biblestyles = {}
		if (this.state.display_setting.hasOwnProperty("font_size"))
			biblestyles["fontSize"] = fontsizes[this.state.display_setting.font_size]
		if (this.state.display_setting.hasOwnProperty("font_family"))
			biblestyles["fontFamily"] = this.state.display_setting.font_family
		
		var lastVerse = 0
		var words = this.state.data.reduce((previousValue, currentValue, i) => {
			// intersperse words with verse references
			var toReturn = previousValue
			if (currentValue.verse !== lastVerse)
			{
				// the last element should be empty
				toReturn[toReturn.length-1].push({"wid": "verse", "verse": currentValue.verse})
				lastVerse = currentValue.verse
			}
			toReturn[toReturn.length-1].push(currentValue)
			if (currentValue.trailer.includes(" ") || currentValue.trailer.includes("\n"))
			{
				toReturn.push([])
			}
			return toReturn
		}, [[]]).filter((el) => el.length > 0)
		return (
			<div className="bible_text_container">
				<div className="bible_text" style={biblestyles}>
					{words.map((word, i) => {
						return <WholeWord key={i} word_bits={word} active_wid={this.state.active_wid} />
					}, this)}
				</div>
			</div>
		)
	}
}
export default BibleText
