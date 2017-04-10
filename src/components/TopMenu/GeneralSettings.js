import React from 'react'

import GeneralSettingsMenu from './GeneralSettingsMenu'

class GeneralSettings extends React.Component {
	render() {
		return (
			<div className="general_settings">
				<div className="general_settings_button">
					<GeneralSettingsMenu settings={this.props.settings} />
				</div>
			</div>
		)
	}
}
export default GeneralSettings
