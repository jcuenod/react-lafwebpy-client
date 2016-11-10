import React from 'react'
import EventPropagator from '../events/EventPropagator'

import SearchSettingsMenu from './SearchSettingsMenu'

class SearchSettings extends React.Component {
	render() {
		return (
			<div className="search_settings">
				<div className="search_settings_button">
					<SearchSettingsMenu settings={this.props.settings} />
				</div>
			</div>
		)
	}
}
export default SearchSettings
