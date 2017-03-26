import React from 'react'
// import TabulatedResults from './TabulatedResults'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

import term_to_english from 'data/MorphCodes'

class WordStudyResults extends React.Component {
	constructor(props) {
		super(props)
		var possibleVisible = this.props.data.search_results.columns.map(x => x["accessor"])
		var visibleDefault = [
			{ "value": "lex", "label": "lex"},
			{ "value": "tricons", "label": "tricons"},
			{ "value": "sdbh", "label": "sdbh"},
			{ "value": "lxxlexeme", "label": "lxxlexeme"},
			{ "value": "vs", "label": "vs"},
			{ "value": "vt", "label": "vt"},
			{ "value": "book", "label": "book"},
			{ "value": "ch", "label": "ch"},
			{ "value": "v", "label": "v"},
		].filter(x => possibleVisible.includes(x["value"]))
		this.state = {
			visibleColumns: visibleDefault,
			pivotColumns: [],
		}
	}
	render() {
		var select_options = this.props.data.search_results.columns.map((x) => ({ "value": x["accessor"], "label": x["header"]}))
		var cols = this.state.visibleColumns.map((c) => {
			var column_data = this.props.data.search_results.columns.find((x) => x["accessor"] === c["value"])
			column_data["minWidth"] = undefined
			return column_data
		})
		var rows = this.props.data.search_results.rows
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
