import React from 'react'

import SettingsListItem from './SettingsListItem'

let search_ranges = ["phrase","clause","sentence","verse"]
let search_types = ["normal","collocation","word study"]

class SearchSettingsMenu extends React.Component {
	render() {
		return (
			<ul className="search_settings_menu">
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
			</ul>
		)
	}
}
export default SearchSettingsMenu
