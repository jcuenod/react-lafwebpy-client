import React from 'react'
import EventPropagator from '../events/EventPropagator'

import SettingsListItem from './SettingsListItem'

let search_ranges = ["phrase","clause","sentence","verse"]
let search_types = ["normal","collocation"]

class SearchSettingsMenu extends React.Component {
	render() {
		return (
			<ul className="search_settings_menu">
				<li className="heading">search range</li>
				{search_ranges.map((value, i) => {
					return <SettingsListItem key={i} isSelected={value == this.props.settings.search_range} value={value} onClickHandler={this.props.setSearchRange} />
				}, this)}
				<li className="heading">search type</li>
				{search_types.map((value, i) => {
					return <SettingsListItem key={i} isSelected={value == this.props.settings.search_type} value={value} onClickHandler={this.props.setSearchType} />
				}, this)}
			</ul>
		)
	}
}
export default SearchSettingsMenu
