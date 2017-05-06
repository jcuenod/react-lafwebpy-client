import React from 'react'
// import TabulatedResults from './TabulatedResults'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

import {term_to_english} from 'data/MorphCodes'

class WordStudyResults extends React.Component {
	constructor(props) {
		super(props)
		var possibleVisible = this.props.data.columns.map(x => x["accessor"])
		var visibleDefault = [
			{ "value": "lex" },
			{ "value": "tricons" },
			{ "value": "sdbh" },
			{ "value": "lxxlexeme" },
			{ "value": "vs" },
			{ "value": "vt" },
			{ "value": "book" },
			{ "value": "ch" },
			{ "value": "v" },
		].map((x) => ({
			"value": x["value"],
			"label": term_to_english["categories"].hasOwnProperty(x["value"]) ?
					term_to_english["categories"][x["value"]] :
					x["value"]
		})).filter(x => possibleVisible.includes(x["value"]))
		this.state = {
			visibleColumns: visibleDefault,
			pivotColumns: [],
		}
	}
	render() {
		var select_options = this.props.data.columns.map((x) => ({
			"value": x["accessor"],
			"label": term_to_english["categories"].hasOwnProperty(x["header"]) ?
					term_to_english["categories"][x["header"]] :
					x["header"]
		}))
		var cols = this.state.visibleColumns.map((c) => {
			var column_data = this.props.data.columns.find((x) => x["accessor"] === c["value"])
			column_data["header"] = term_to_english["categories"].hasOwnProperty(column_data["header"]) ?
					term_to_english["categories"][column_data["header"]] :
					column_data["header"]
			column_data["minWidth"] = undefined
			return column_data
		})
		var rows = this.props.data.rows
		return (
			<div>
				<h1>Word Study Results ({rows.length})</h1>
				<div style={{width: "48%", display: "inline-block", margin: "0 1%"}}>
					Visible Columns:
					<Select
						name="visibles"
						value={this.state.visibleColumns}
						options={select_options}
						multi={true}
						onChange={(v) => this.setState({ "visibleColumns": v })}
						/>
				</div>
				<div style={{width: "48%", display: "inline-block", margin: "0 1%"}}>
					Pivoting Columns:
					<Select
						name="pivots"
						value={this.state.pivotColumns}
						options={select_options}
						multi={true}
						onChange={(v) => this.setState({ "pivotColumns": v })}
						/>
				</div>
				<br />
				<ReactTable
					data={rows}
					columns={cols}
					pivotBy={this.state.pivotColumns.map((x) => x["value"])}
					/>
			</div>
		)
	}
}
export default WordStudyResults
