import React from 'react'
import {render} from 'react-dom'

import SearchResultsDisplayer from './Modals/SearchResultsDisplayer'
import NavigationDisplayer from './Modals/NavigationDisplayer'

class ModalDisplayer extends React.Component {
	render() {
		return (
			<div>
				<SearchResultsDisplayer />
				<NavigationDisplayer />
			</div>
		)
	}
}
export default ModalDisplayer
