import React from 'react'
import {render} from 'react-dom'

import WholeWord from './WholeWord'

const VerseView = ({data, active_wid}) => (
	<span className="verse_view">
		<span className="verse_number">{data.verse}</span>
		{data.verse_words.map((accent_unit, i) => (
			<WholeWord key={i} accent_unit={accent_unit} active_wid={active_wid} />
		))}
	</span>
)
export default VerseView
