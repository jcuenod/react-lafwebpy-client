import React from 'react'
import EventPropagator from 'events/EventPropagator'

class SettingsListItem extends React.Component {
	render() {
		var styles_string = this.props.isSelected ? "active" : ""
		return (
			<li className={styles_string} onClick={() => EventPropagator.fireEvent({
					eventType: "update_settings",
					payload: {
						setting_type: this.props.setting_type,
						value: this.props.value
					}
				})}>
				{this.props.value}
			</li>
		)
	}
}
export default SettingsListItem
