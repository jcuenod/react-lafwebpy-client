import React from 'react'
import EventPropagator from 'events/EventPropagator'

const WordBit = ({wordbit, active}) => (
	<span>
		<span className={active === wordbit.wid ? "word_bit active" : "word_bit"}
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
