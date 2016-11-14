import React from 'react'

const TabulatedResults = ({children, title, message}) => (
	<div>
		<div className="results_tally">{title}</div>
		<table className="results_table">
			<tbody>
				{children}
			</tbody>
		</table>
		<div style={{
				fontStyle: "italic",
				display: message ? "block" : "none"
			}}>{message}</div>
	</div>
)
export default TabulatedResults
