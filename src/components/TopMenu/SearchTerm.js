import React from 'react'
import EventPropagator from 'events/EventPropagator'

var png_prop = {
	"nu": {
		"sg": "s",
		"du": "d",
		"pl": "p",
		"unknown": "-",
		"NA": "-"
	},
	"gn": {
		"m": "m",
		"f": "f",
		"unknown": "-",
		"NA": "-"
	},
	"ps": {
		"p1": "1",
		"p2": "2",
		"p3": "3",
		"unknown": "-",
		"NA": "-"
	}
}

class SearchTerm extends React.Component {
	render() {
		var props = Object.keys(this.props.data)
		var lexeme = "ANY"
		if (props.includes("lex_utf8"))
			lexeme = this.props.data.lex_utf8.replace(/[\/\[=]/g, "")
		else if (props.includes("tricons"))
			lexeme = this.props.data.tricons
		else if (props.includes("lex"))
			lexeme = this.props.data.lex
		else if (props.includes("lxxlexeme"))
			lexeme = this.props.data.lxxlexeme
		else if (props.includes("g_cons_utf8"))
			lexeme = this.props.data.lxxlexeme
		else if (props.includes("gloss"))
			lexeme = this.props.data.gloss
		else if (props.includes("sdbh"))
			lexeme = this.props.data.sdbh
		// var lexeme = this.props.data.hasOwnProperty("lex_utf8") ? this.props.data.lex_utf8.replace(/[\/\[=]/g,"") :
		//	(this.props.data.hasOwnProperty("tricons") ? this.props.data.tricons : "ANY")

		var png = typeof this.props.data.ps !== "undefined" ? (png_prop.ps[this.props.data.ps]) : "-"
		png = png + (typeof this.props.data.gn !== "undefined" ? (png_prop.gn[this.props.data.gn]) : "-")
		png = png + (typeof this.props.data.nu !== "undefined" ? (png_prop.nu[this.props.data.nu]) : "-")

		var stem = this.props.data.hasOwnProperty("vs") ?
			<span className="stem">{this.props.data.vs}</span> : ""
		var tense = this.props.data.hasOwnProperty("vt") ?
			<span className="stem">{this.props.data.vt}</span> : ""
		png = png !== "---" ?
			<span className="png">{png}</span> : ""

		return (
			<div className="search_term" onClick={() =>
					EventPropagator.fireEvent({
						eventType: "remove_search_term",
						payload: { search_term: this.props.data }
					})
				}>
				<heading>
					{lexeme}
				</heading>
				<p>
					{stem}{tense}{png}
				</p>
			</div>
		)
	}
}
export default SearchTerm
