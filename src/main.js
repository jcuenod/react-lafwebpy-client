import React from 'react'
import {render} from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';

import EventPropagator from 'events/EventPropagator'

import SearchBuilder from 'components/TopMenuBar'
import BibleText from 'components/BibleText'
import MorphDisplay from 'components/MorphDisplay'
import ModalDisplayer from 'components/ModalDisplayer'

/**
 * Remove **semi colons
 * and **functions
 */
class App extends React.Component {
	componentDidMount() {
		EventPropagator.registerListener({
			eventType: "navigation_complete",
			callback: (payload) => {
				localStorage.setItem("reference", payload.reference);
			}
		})

		var ref = "/Genesis/1"
		if (localStorage.getItem('reference'))
			ref = localStorage.getItem('reference')
		EventPropagator.fireEvent({
			eventType: "navigation_request",
			payload: {
				reference: ref
			}
		})
	}
	render() {
		return (
			<div>
				<SearchBuilder />
				<BibleText />
				<MorphDisplay />
				<ModalDisplayer />
			</div>
		)
	}
}

render(
	<Router history={browserHistory}>
		<Route path="*" component={App} />
	</Router>,
	document.getElementById('app')
);
