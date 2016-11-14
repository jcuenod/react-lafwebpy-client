import React from 'react'
import {render} from 'react-dom'

import ResultsDisplayer from './Modals/ResultsDisplayer'
import NavigationDisplayer from './Modals/NavigationDisplayer'

class ModalDisplayer extends React.Component {
	render() {
		return (
			<div>
				<ResultsDisplayer />
				<NavigationDisplayer />
			</div>
		)
	}
}
export default ModalDisplayer
