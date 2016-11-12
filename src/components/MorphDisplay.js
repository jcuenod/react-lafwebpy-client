import React from 'react'
import EventPropagator from '../events/EventPropagator'

var term_to_english = {
	"categories": {
		"lex_utf8": "Sense Lexeme",
		"tricons": "Consonantal Root",
		"g_prs_utf8": "Pronominal Suffix",
		"is_definite": "Definite",
		"has_suffix": "Has Pron. Suffix",
		"g_uvf_utf8": "Univalent Final",
		"sp": "Part of Speech",
		"ps": "Person",
		"nu": "Number",
		"gn": "Gender",
		"vt": "Tense",
		"vs": "Stem",
		"st": "State",
		"gloss": "Gloss"
	},
	"is_definite": {
		"det": "Yes",
		"und": "No"
	},
	"sp": {
		"art": "Article",
		"verb": "Verb",
		"subs": "Noun",
		"nmpr": "Proper noun",
		"advb": "Adverb",
		"prep": "Preposition",
		"conj": "Conjunction",
		"prps": "Pers. pronoun",
		"prde": "Demons. pron.",
		"prin": "Interr. pronoun",
		"intj": "Interjection",
		"nega": "Negative",
		"inrg": "Interrogative",
		"adjv": "Adjective"
	},
	"nu": {
		"sg": "Singular",
		"du": "Dual",
		"pl": "Plural",
		"unknown": "Unknown",
		"NA": "NA"
	},
	"gn": {
		"m": "Masculine",
		"f": "Feminine",
		"unknown": "Unknown",
		"NA": "NA"
	},
	"ps": {
		"p1": "First",
		"p2": "Second",
		"p3": "Third",
		"unknown": "Unknown",
		"NA": "NA"
	},
	"vt": {
		"perf": "Perfect",
		"impf": "Imperfect",
		"wayq": "Wayyiqtol",
		"impv": "Imperative",
		"infa": "Infinitive (Absolute)",
		"infc": "Infinitive (Construct)",
		"ptca": "Participle",
		"ptcp": "Participle (Passive)",
		"NA": "NA"
	},
	"vs": {
		"afel": "Af‘el",
		"etpa": "Etpa“al",
		"etpe": "Etpe‘el",
		"haf": "Haf‘el",
		"hif": "Hif‘il",
		"hit": "Hitpa“el",
		"hof": "Hof‘al",
		"hop": "Hotpa“al",
		"hsht": "Hishtaf‘al",
		"htpa": "Hitpa“al",
		"htpe": "Hitpe‘el",
		"nif": "Nif‘al",
		"nit": "Nitpa“el",
		"pael": "Pa“el",
		"pasq": "Passiveqal",
		"peal": "Pe‘al",
		"peil": "Pe‘il",
		"piel": "Pi“el",
		"pual": "Pu“al",
		"qal": "Qal",
		"shaf": "Shaf‘el",
		"tif": "Tif‘al",
		"NA": "NA"
	},
	"st": {
		"a": "Absolute",
		"c": "Construct",
		"e": "Emphatic",
		"NA": "NA"
	}
}
var category_weights = {
	"vs": -10,
	"vt": -9,
	"lex_utf8": -8,
	"ps": -7,
	"nu": -6,
	"gn": -5,
	"sp": -4,
	"gloss": 1,
}

class MorphDisplay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {"data": [], "selected": {}}
	}
	componentDidMount() {
		EventPropagator.registerListener({
			eventType: "word_clicked",
			callback: (payload) => {
				$.post("/api/word_data", JSON.stringify({ word_id: payload.wid }), (result) => {
					var morph_data = Object.keys(result).map((key, i) => {
						return {
							"selected": false,
							"k": key,
							"v": result[key]
						}
					})
					this.setState({
						"data": morph_data
					});
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
		var morph_state = this.state.data.slice();
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
		var morph_state = this.state.data.slice();
		var index = morph_state.map(function(m) {return m.k; }).indexOf(key);
		morph_state[index].selected = !morph_state[index].selected;
		this.setState({data: morph_state})
	}
	render() {
		var morph_data = this.state.data.slice()
		morph_data.sort((a, b) => {
			var keyA = category_weights.hasOwnProperty(a.k) ? category_weights[a.k] : 0,
				keyB = category_weights.hasOwnProperty(b.k) ? category_weights[b.k] : 0
			return keyA < keyB ? -1 : ((keyA > keyB) ? 1 : 0)
		})
		return (
			<div className="morph_displayer">
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
