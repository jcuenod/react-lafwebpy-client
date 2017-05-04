import React from 'react'
import Modal from './Modal'
import Sortable from 'react-sortablejs'

import {term_to_english} from 'data/MorphCodes'

class SettingsModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible_features: Object.keys(term_to_english.categories).reduce((carry, current) => {
				return carry.concat(term_to_english.categories[current])
			}, []),
			invisible_features: []
		}
	}
	onChange(new_items) {
		this.setState({"visible_features": new_items})
	}
	render() {
		let sortable = null
		const listItems = this.state.visible_features.map((val, key) => (<div key={key} data-id={val}>{val}</div>))

		return (
			<Modal isVisible={true}>
				<Sortable
					options={{
						animation: 50,
						group: {
							name: 'shared',
							pull: true,
							put: true
						}
					}}

					// [Optional] The onChange method allows you to implement a controlled component and keep
					// DOM nodes untouched. You have to change state to re-render the component.
					// @param {Array} order An ordered array of items defined by the `data-id` attribute.
					// @param {Object} sortable The sortable instance.
					// @param {Event} evt The event object.
					onChange={(order, sortable, evt) => {
						this.onChange(order)
					}}
				>
				{listItems}
				</Sortable>
			</Modal>
		)
	}
}
export default SettingsModal
