import React from 'react'
import TabulatedResults from './TabulatedResults'

const SearchResults = ({data}) => (
	<TabulatedResults
		title={data.length + " results"}
		message={<span>Scripture quoted by permission. All scripture quotations, unless otherwise indicated, are taken from the <a href='http://netbible.org'>NET Bible</a>® copyright ©1996-2016 by Biblical Studies Press, L.L.C. All rights reserved.</span>}>
		{data.map((row, i) => (
			<tr key={i}>
				<td className="reference"><a href={row.passage.replace(/(.*)\ (\d+):\d+/, "/$1/$2").replace(" ", "")}>{row.passage}</a></td>
				<td className="hebrew">{row.clause.map((words, i) => (
						<span key={i} className={words.significance}>{words.text}</span>
					))}</td>
				<td className="english" dangerouslySetInnerHTML={{__html: row.english}} />
			</tr>
		))}
	</TabulatedResults>
)
export default SearchResults
