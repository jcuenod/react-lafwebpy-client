import React from 'react'
import {render} from 'react-dom'

import WholeWord from './WholeWord'

const VerseView = ({data, active_wid}) => (
	<span className="verse_view">
		{data.verse_words.map((accent_unit, i) => (
			<WholeWord
				key={i}
				accent_unit={accent_unit}
				active_wid={active_wid}
				non_breaking_verse_number={(i === 0 ? data.verse : false)}
				/>
		))}
	</span>
)
export default VerseView
