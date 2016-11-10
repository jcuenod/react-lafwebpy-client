import React from 'react'
import EventPropagator from '../events/EventPropagator'

class SettingsListItem extends React.Component {
	render() {
		var styles_string = this.props.isSelected ? "active" : ""
		return (
			<li className={styles_string}>
				{this.props.value}
			</li>
		)
	}
}
export default SettingsListItem
