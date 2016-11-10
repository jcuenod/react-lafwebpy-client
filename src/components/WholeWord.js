import React from 'react'
import {render} from 'react-dom'

import WordBit from './WordBit'
import EventPropagator from '../events/EventPropagator'

class WholeWord extends React.Component {
	render() {
		return (
			<span className="whole_word">
				{this.props.word_bits.map((bit, i) => {
					return bit.wid === "verse" ?
						<span key={i} className="verse_number">{bit.verse}</span> :
						<WordBit key={i} wordbit={bit} />
				}, this)}
			</span>
		)
	}
}
export default WholeWord
