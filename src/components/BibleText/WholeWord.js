import React from 'react'
import {render} from 'react-dom'

import WordBit from './WordBit'

const WholeWord = ({word_bits, active_wid}) =>(
	<span className="whole_word">
		{word_bits.map((bit, i) => {
			return bit.wid === "verse" ?
			<span key={i} className="verse_number">{bit.verse}</span> :
				<WordBit key={i} wordbit={bit} active_wid={active_wid} />
			})}
		</span>
)
export default WholeWord
