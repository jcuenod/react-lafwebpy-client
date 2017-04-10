import React from 'react'
import EventPropagator from 'events/EventPropagator'

import SettingsListItem from './SettingsListItem'

let font_size = ["small","medium","large"]
let font_family = ["SBL Biblit","Ezra SIL"]

class GeneralSettingsMenu extends React.Component {
	render() {
		// <li className="heading">general settings</li>
		// <li className="menu_item_button">data to show</li>
		return (
			<ul className="settings_menu_dropdown">
				<li className="heading">font size</li>
				{font_size.map((value, i) => {
					return (
						<SettingsListItem key={i}
							isSelected={value == this.props.settings.font_size}
							value={value}
							setting_type="font_size" />
					)
				}, this)}
				<li className="heading">font face</li>
				{font_family.map((value, i) => {
					return (
						<SettingsListItem key={i}
							isSelected={value == this.props.settings.font_family}
							value={value}
							setting_type="font_family" />
					)
				}, this)}
				<li className="heading">qBible</li>
				<li className="menu_item_button" onClick={() => EventPropagator.fireEvent({
					"eventType": "show_help",
					"payload": {"slide": "help"}
				})}>help</li>
				<li className="menu_item_button" onClick={() => EventPropagator.fireEvent({
					"eventType": "show_help",
					"payload": {"slide": "about"}
				})}>about</li>
			</ul>
		)
	}
}
export default GeneralSettingsMenu
