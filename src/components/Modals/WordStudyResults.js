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
		this.state = {
			visibleColumns: [
				{ "value": "lex", "label": "lex"},
				{ "value": "tricons", "label": "tricons"},
				{ "value": "sdbh", "label": "sdbh"},
				{ "value": "lxxlexeme", "label": "lxxlexeme"},
				{ "value": "vs", "label": "vs"},
				{ "value": "vt", "label": "vt"},
				{ "value": "book", "label": "book"},
				{ "value": "ch", "label": "ch"},
				{ "value": "v", "label": "v"},
			],
			pivotColumns: [],
		}
	}
	render() {
		var cols = this.props.data.search_results.columns
		var select_options = cols.map((x) => ({ "value": x["accessor"], "label": x["header"]}))
		var cols = cols.map((x) => {
			x["minWidth"] = undefined
			x["show"] = this.state.visibleColumns.map((y) => y["value"]).includes(x["accessor"])
			return x
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
