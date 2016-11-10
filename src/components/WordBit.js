import React from 'react'
import EventPropagator from '../events/EventPropagator'

class WordBit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {"active": false}
	}
	componentDidMount() {
		var comparableWordBit = this.props.wordbit.wid
		EventPropagator.registerListener({
			eventType: "word_clicked",
			callback: (payload) => {
				this.setState({"active": payload.wid == comparableWordBit})
			}
		})
	}
	render() {
		var trailer_to_use = this.props.wordbit.trailer.replace("\n", "  ")
		return (
			<span>
				<span className={this.state.active ? "word_bit active" : "word_bit"}
						onClick={() => EventPropagator.fireEvent({
							eventType: "word_clicked",
							payload: {wid: this.props.wordbit.wid}})
						}>
					{this.props.wordbit.bit}
				</span>
				<span className="word_trailer">
					{trailer_to_use}
				</span>
			</span>
		)
	}
}
export default WordBit
