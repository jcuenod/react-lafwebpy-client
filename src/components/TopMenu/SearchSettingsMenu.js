import React from 'react'
import EventPropagator from 'events/EventPropagator'

import SettingsListItem from './SettingsListItem'

let search_ranges = ["phrase","clause","sentence","verse"]
let search_types = ["normal","collocation","word study"]
let search_filters = ["none","current book"] //,"custom"

// This list is duplicated in TopMenuBar so don't only change in one place...
let builtin_filters = {
	"pentateuch": ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
	"minor prophets": ["Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"],
	// note the note above
}
search_filters.push(...Object.keys(builtin_filters))

class SearchSettingsMenu extends React.Component {
	render() {
		return (
			<ul className="settings_menu_dropdown">
				<li className="heading">search range</li>
				{search_ranges.map((value, i) => {
					return (
						<SettingsListItem key={i}
							isSelected={value == this.props.settings.search_range}
							value={value}
							setting_type="search_range" />
					)
				}, this)}
				<li className="heading">search type</li>
				{search_types.map((value, i) => {
					return (
						<SettingsListItem key={i}
							isSelected={value == this.props.settings.search_type}
							value={value}
							setting_type="search_type" />
					)
				}, this)}
				<li className="heading">search filter</li>
				{search_filters.map((value, i) => {
					return (
						<SettingsListItem key={i}
							isSelected={value == this.props.settings.search_filter}
							value={value}
							setting_type="search_filter" />
					)
				}, this)}
				<li className="heading">highlight</li>
				<li className="menu_item_button" onClick={() => EventPropagator.fireEvent({
						eventType: "update_settings",
						payload: {
							setting_type: 'highlight_terms',
							value: !this.props.settings.highlight_terms
						}
					})}>{this.props.settings.highlight_terms ? "✔" : "✘"} highlight terms</li>
			</ul>
		)
	}
}
export default SearchSettingsMenu
