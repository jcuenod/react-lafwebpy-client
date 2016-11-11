import React from 'react'

class CollocationResults extends React.Component {
	render() {
		return (
			<div>
				<div className="results_tally">{this.props.data.length} collocations</div>
				<table className="results_table collocation_table">
					<tbody>
						{this.props.data.map(function(row, i){
							return (
								<tr key={i}>
									<td className="hebrew">{row.lexeme}</td>
									<td className="reference">{row.count}</td>
								</tr>
							)
						}, this)}
					</tbody>
				</table>
			</div>
		)
	}
}
export default CollocationResults
