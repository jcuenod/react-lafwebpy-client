import React from 'react'
import OTBookDetails from 'data/OTBookDetails'
import TabulatedResults from './TabulatedResults'

var format_references = (references) =>  {
	var sorted_references = Object.keys(references).sort((book_name) => OTBookDetails.findIndex((el) => el.abbreviation === book_name))
	return sorted_references.map((book_name) => {
		return book_name + " " + Object.keys(references[book_name]).map((chapter) => {
			return chapter + ":" + references[book_name][chapter].join(", ")
		}).join(", ")
	}).join("; ")
}

const CollocationResults = ({data}) => (
	<TabulatedResults title={data.length + " collocations"}>
		{data.map((row, i) => {
			return (
				<tr key={i}>
					<td className="hebrew">{row.lexeme}</td>
					<td className="large_number">{row.count}</td>
					<td>{format_references(row.references)}</td>
				</tr>
			)
		})}
	</TabulatedResults>
)
export default CollocationResults
