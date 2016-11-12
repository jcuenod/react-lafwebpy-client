import React from 'react'
import AbstractSelector from './AbstractSelector'

class TabulatedResults extends React.Component {
	render() {
		return (
			<div>
				<div className="results_tally">{this.props.data.length} results</div>
				<table className="results_table">
					<tbody>
						{this.props.data.map((row, i) => {
							var url = row.passage.replace(/(.*)\ (\d+):\d+/, "/$1/$2")
							return (
								<tr key={i}>
									<td className="reference"><a href={url}>{row.passage}</a></td>
									<td className="hebrew">{row.clause.map((words, i) => {
											return (
												<span key={i} className={words.significance}>{words.text}</span>
											)
										})}</td>
									<td className="english" dangerouslySetInnerHTML={{__html: row.english}} />
								</tr>
							)
						}, this)}
					</tbody>
				</table>
				<br /><i>Scripture quoted by permission. All scripture quotations, unless otherwise indicated, are taken from the <a href="http://netbible.org">NET Bible</a>® copyright ©1996-2016 by Biblical Studies Press, L.L.C. All rights reserved.</i>
			</div>
		)
	}
}
export default TabulatedResults
