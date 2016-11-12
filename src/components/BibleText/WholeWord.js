import React from 'react'
import {render} from 'react-dom'

import WordBit from './WordBit'

class WholeWord extends React.Component {
	render() {
		return (
			<span className="whole_word">
				{this.props.word_bits.map((bit, i) => {
					return bit.wid === "verse" ?
						<span key={i} className="verse_number">{bit.verse}</span> :
						<WordBit key={i} wordbit={bit} active_wid={this.props.active_wid} />
				}, this)}
			</span>
		)
	}
}
export default WholeWord
