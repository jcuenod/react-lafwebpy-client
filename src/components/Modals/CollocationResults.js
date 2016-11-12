import React from 'react'

const CollocationResults = ({data}) => (
	<div>
		<div className="results_tally">{data.length} collocations</div>
		<table className="results_table collocation_table">
			<tbody>
				{data.map((row, i) => {
					return (
						<tr key={i}>
							<td className="hebrew">{row.lexeme}</td>
							<td className="reference">{row.count}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	</div>
)
export default CollocationResults
