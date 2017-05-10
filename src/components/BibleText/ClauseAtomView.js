import React from 'react'
import {render} from 'react-dom'

import WholeWord from './WholeWord'
import { clause_types } from 'data/MorphCodes'

const ClauseAtomView = ({data, active_wid}) =>(
	<span className="clause_atom_view">
		<span><span className="verse_number">{data.verse}</span></span>
		<span className="clause_atom_type">
			<span data-rh-at="left" data-rh={clause_types[data.type]}>{data.type}</span>
		</span>
		<span>
			<span className="clause_atom" style={{"marginRight": data.tab * 3 + "vw"}}>
				{data.clause_words.map((accent_unit, i) => (
					<WholeWord key={i} accent_unit={accent_unit} active_wid={active_wid} />
				))}
			</span>
		</span>
	</span>
)
export default ClauseAtomView
