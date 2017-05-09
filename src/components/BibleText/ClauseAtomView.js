import React from 'react'
import {render} from 'react-dom'

import WholeWord from './WholeWord'
// Put verse numbers somewhere somehow...
// <span className="verse_number">{data.verse}</span>
const ClauseAtomView = ({data, active_wid}) =>(
	<tr className="clause_atom_view">
		<td><span className="verse_number">{data.verse}</span></td>
		<td className="clause_atom_type">{data.type}</td>
		<td>
			<span className="clause_atom" style={{"marginRight": data.tab * 3 + "vw"}}>
				{data.clause_words.map((accent_unit, i) => (
					<WholeWord key={i} accent_unit={accent_unit} active_wid={active_wid} />
				))}
			</span>
		</td>
	</tr>
)
export default ClauseAtomView
