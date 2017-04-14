import React from 'react'
import EventPropagator from 'events/EventPropagator'
import { term_to_english, category_weights } from 'data/MorphCodes'

class MorphDisplay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {"data": [], "selected": {}}
	}
	componentDidMount() {
		EventPropagator.registerListener({
			eventType: "word_clicked",
			callback: (payload) => {
				$.post(window.root_url + "/api/word_data", JSON.stringify({ word_id: payload.wid }), (result) => {
					var morph_data = Object.keys(result).map((key, i) => {
						return {
							"selected": false,
							"k": key,
							"v": result[key]
						}
					})
					this.setState({
						"data": morph_data
					})
				})
			}
		})
	}
	addSearchTermClickHandler(e) {
		var search_term = this.state.data.reduce((previousValue, currentValue) => {
			if (currentValue.selected)
				previousValue[currentValue.k] = currentValue.v
			return previousValue
		}, {})
		var morph_state = this.state.data.slice()
		var new_morph_state = morph_state.map((m) => {
			m.selected = false
			return m
		})
		this.setState(new_morph_state)
		EventPropagator.fireEvent({
			eventType: "add_search_term",
			payload: {term: search_term}
		})
	}
	clickMorphData(key) {
		var morph_state = this.state.data.slice()
		var index = morph_state.map((m) => m.k).indexOf(key)
		morph_state[index].selected = !morph_state[index].selected
		this.setState({data: morph_state})
	}
	render() {
		var morph_data = this.state.data.slice()
		morph_data.sort((a, b) => {
			var keyA = category_weights.hasOwnProperty(a.k) ? category_weights[a.k] : 0,
				keyB = category_weights.hasOwnProperty(b.k) ? category_weights[b.k] : 0
			return keyA < keyB ? -1 : ((keyA > keyB) ? 1 : 0)
		})
		var newHere = this.state.data.length > 0 ? "" : (<div>
			<span href="#" className="newhere" onClick={() => EventPropagator.fireEvent({
				"eventType": "show_help",
				"payload": {"slide": "help"}
			})}></span>
		</div>)
		return (
			<div className="morph_displayer">{newHere}
				<table>
					<tbody>
						{morph_data.map((morph, i) => {
							var kv_key = term_to_english["categories"][morph.k]
							var kv_value = term_to_english.hasOwnProperty(morph.k) ? term_to_english[morph.k][morph.v] : morph.v
							return (
								<tr key={i}
										className={morph.selected ? "active" : ""}
										onClick={() => this.clickMorphData(morph.k)}>
									<td>{kv_key}</td>
									<td>{kv_value}</td>
								</tr>
							)
						}, this)}
					</tbody>
				</table>
				<div style={{
						backgroundColor: this.state.data.reduce((p, c) => { return p |= c.selected }, false) ? "green" : "gray",
						display: this.state.data.length > 0 ? "block" : "none"
					}}
					className="add_search_term"
					onClick={this.addSearchTermClickHandler.bind(this)}>
					add search term
				</div>
			</div>
		)
	}
}
export default MorphDisplay
