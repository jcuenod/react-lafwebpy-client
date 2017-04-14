import React from 'react'
import EventPropagator from 'events/EventPropagator'

const WordBit = ({wordbit, active_wid}) => (
	<span>
		<span className={wordbit.highlights.concat('word_bit').join(' ') +
									(active_wid === wordbit.wid ? " active" : "")}
			onClick={() => EventPropagator.fireEvent({
				eventType: "word_clicked",
				payload: {wid: wordbit.wid}})
			}>
			{wordbit.bit}
		</span>
		<span className="word_trailer">
			{wordbit.trailer.replace("\n", "  ")}
		</span>
	</span>
)
export default WordBit
