import React from 'react'
import {render} from 'react-dom'

import WordBit from './WordBit'

const WholeWord = ({accent_unit, active_wid}) =>(
	<span className="whole_word">
		{accent_unit.map((bit, i) => (
			<WordBit key={i} wordbit={bit} active_wid={active_wid} />
		))}
	</span>
)
export default WholeWord
