import React from 'react'
import {render} from 'react-dom'

import ResultsDisplayer from './Modals/ResultsDisplayer'
import NavigationDisplayer from './Modals/NavigationDisplayer'
import SettingsModal from './Modals/SettingsModal'
import HelpDisplayer from './Modals/HelpDisplayer'

class ModalDisplayer extends React.Component {
	render() {
		return (
			<div>
				<ResultsDisplayer />
				<NavigationDisplayer />
				<SettingsModal />
				<HelpDisplayer />
			</div>
		)
	}
}
export default ModalDisplayer
