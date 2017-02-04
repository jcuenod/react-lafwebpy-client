import React from 'react'
// import TabulatedResults from './TabulatedResults'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

class WordStudyResults extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pivotColumns: [],
		}
	}
	render() {
		var cols = this.props.data.search_results.columns
		var select_options = cols.map((x) => ({ "value": x["accessor"], "label": x["header"]}))
		var rows = this.props.data.search_results.rows
		return (
			<div>
				<h1>Word Study Results ({rows.length})</h1>
				<Select
					name="pivots"
					value={this.state.pivotColumns}
					options={select_options}
					multi={true}
					onChange={(v) => this.setState({ "pivotColumns": v })}
					/>
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
