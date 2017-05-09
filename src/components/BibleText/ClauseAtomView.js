import React from 'react'
import {render} from 'react-dom'

import WholeWord from './WholeWord'
// Put verse numbers somewhere somehow...
// <span className="verse_number">{data.verse}</span>
const ClauseAtomView = ({data, active_wid}) =>(
	<span className="clause_atom_view">
		<span className="verse_number">{data.verse}</span>
		<span className="clause_atom_type">{data.type}</span>
		<span className="clause_atom" style={{"marginRight": data.tab * 3 + "vw"}}>
			{data.clause_words.map((accent_unit, i) => (
				<WholeWord key={i} accent_unit={accent_unit} active_wid={active_wid} />
			))}
		</span>
	</span>
)
export default ClauseAtomView
