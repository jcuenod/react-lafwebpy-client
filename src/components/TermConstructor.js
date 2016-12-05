import React from 'react'
import Dropdown from 'react-dropdown'
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

class TermConstructor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"data": [],
			edit_mode: "",
			option_selected: null
		}
	}
	componentDidMount() {
		EventPropagator.registerListener({
			eventType: "remove_search_term",
			callback: (payload) => {
				var new_data = []
				Object.keys(payload.search_term).forEach((key) => {
					if (key === "uid") return
					new_data.push({"k": key, "v": payload.search_term[key]})
				})
				this.setState({"data": new_data})
			}
		})
	}
	addSearchTermClickHandler(e) {
		var search_term = this.state.data.reduce((previousValue, currentValue) => {
			previousValue[currentValue.k] = currentValue.v
			return previousValue
		}, {})
		console.log(this.state.data)
		console.log(search_term)

		EventPropagator.fireEvent({
			eventType: "add_search_term",
			payload: {term: search_term}
		})
	}
	updateMorphData(new_key, new_value) {
		var new_morph_state = this.state.data.slice()
		var index = new_morph_state.findIndex((item) => item.k === new_key)
		new_morph_state[index].v = new_value
		this.setState({data: new_morph_state})
	}
	render() {
		var morph_data = this.state.data.slice()
		morph_data.sort((a, b) => {
			var keyA = category_weights.hasOwnProperty(a.k) ? category_weights[a.k] : 0,
				keyB = category_weights.hasOwnProperty(b.k) ? category_weights[b.k] : 0
			return keyA < keyB ? -1 : ((keyA > keyB) ? 1 : 0)
		})
		var editable = (prop_key, prop_value) => {
			if (term_to_english.hasOwnProperty(prop_key))
			{
				var options = Object.keys(term_to_english[prop_key]).map((k) => ({value: k, label: term_to_english[prop_key][k]}))
				var defaultOption = options.find((el) => el.value === prop_value)
				return <Dropdown options={options} value={defaultOption} onChange={(option) => {
						this.updateMorphData(prop_key, option.value)
					}}></Dropdown>
			}
			return <input type="text" style={{width: "100%"}} value={prop_value} onChange={(e) => {
					this.updateMorphData(prop_key, e.target.value)
				}} onBlur={() => this.setState({edit_mode: ""})}></input>
		}
		var newReqOptions = Object.keys(term_to_english["categories"]).map((k) => ({value: k, label: term_to_english["categories"][k]}))
		return (
			<div className="morph_displayer">
				<table>
					<tbody>
						{morph_data.map((morph, i) => {
							var kv_key = term_to_english["categories"][morph.k]
							var kv_value = term_to_english.hasOwnProperty(morph.k) ? term_to_english[morph.k][morph.v] : morph.v
							return (
								<tr key={kv_key}
										className={morph.selected ? "active" : ""}
										onClick={() => this.setState({edit_mode: kv_key})}>
									<td>{kv_key}</td>
									<td>
										{this.state.edit_mode === kv_key ?
											editable(morph.k, morph.v) :
											kv_value}
									</td>
									<td width="50" onClick={() => {
											var new_morph_state = this.state.data.slice()
											var index = new_morph_state.findIndex((item) => item.k === morph.k)
											new_morph_state.splice(index, 1)
											this.setState({data: new_morph_state})
										}}>
										<svg height="15" viewBox="0 0 48 48" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path id="colorme" d="M44 6h-30c-1.38 0-2.47.7-3.19 1.76l-10.81 16.23 10.81 16.23c.72 1.06 1.81 1.78 3.19 1.78h30c2.21 0 4-1.79 4-4v-28c0-2.21-1.79-4-4-4zm-6 25.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z"/></svg>
									</td>
								</tr>
							)
						}, this)}
						<tr>
							<td colSpan="2">
								<Dropdown options={newReqOptions} onChange={(option) => {
										this.setState({option_selected: option})
									}}></Dropdown>
							</td>
							<td>
								<div style={{display: "inline-block", backgroundColor: "green"}} onClick={() => {
										var new_morph_state = this.state.data.slice()
										var new_key = this.state.option_selected.value
										var new_value = term_to_english.hasOwnProperty(new_key) ? Object.keys(term_to_english[new_key])[0] : "";
										new_morph_state.push({k: new_key, v: new_value})
										this.setState({data: new_morph_state})
									}}>Add</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div style={{backgroundColor: "green"}}
					className="add_search_term"
					onClick={this.addSearchTermClickHandler.bind(this)}>
					add search term
				</div>
			</div>
		)
	}
}
export default TermConstructor
