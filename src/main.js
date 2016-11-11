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
				var ref_string = "/" + payload.reference.book + "/" + payload.reference.chapter
				localStorage.setItem("reference", ref_string);
			}
		})

		var ref = "/Genesis/1"
		if (localStorage.getItem('reference'))
			ref = localStorage.getItem('reference')
		if (location.pathname.replace("/", "").length > 0)
			ref = location.pathname;
		var ref_array = ref.replace(/^\//, "").split("/");
		var ref_obj = {
			"book": ref_array[0],
			"chapter": Number.isInteger(+ref_array[1]) ? +ref_array[1] : 1
		};
		EventPropagator.fireEvent({
			eventType: "navigation_request",
			payload: {
				reference: ref_obj
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
