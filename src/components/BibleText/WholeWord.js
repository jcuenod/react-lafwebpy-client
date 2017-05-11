import React from 'react'
import {render} from 'react-dom'

import WordBit from './WordBit'

const WholeWord = ({accent_unit, active_wid, non_breaking_verse_number}) =>(
	<span className="whole_word">
		{non_breaking_verse_number !== false ? <span className="verse_number">{non_breaking_verse_number}</span> : ""}
		{accent_unit.map((bit, i) => (
			<WordBit key={i} wordbit={bit} active_wid={active_wid} />
		))}
	</span>
)
export default WholeWord
