import React from 'react'
import {render} from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import EventPropagator from 'events/EventPropagator'

import SearchBuilder from 'components/TopMenuBar'
import BibleText from 'components/BibleText'
import MorphDisplay from 'components/MorphDisplay'
import TermConstructor from 'components/TermConstructor'
import ModalDisplayer from 'components/ModalDisplayer'

window.root_url = "http://qbible.tk"

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			construction_mode: false
		}
	}
	componentDidMount() {
		EventPropagator.registerListener([{
			eventType: "navigation_complete",
			callback: (payload) => {
				var ref_string = "/" + payload.reference.book + "/" + payload.reference.chapter
				localStorage.setItem("reference", ref_string)
				browserHistory.push(ref_string)
				ga('set', 'page', ref_string)
				ga('send', 'pageview')
			}
		}, {
			eventType: "remove_search_term",
			callback: (payload) => {
				this.setState({"construction_mode": true})
			}
		}, {
			eventType: "word_clicked",
			callback: (payload) => {
				this.setState({"construction_mode": false})
			}
		}])

		var do_navigate = () => {
			var ref = "/Genesis/1"
			if (localStorage.getItem('reference'))
			ref = localStorage.getItem('reference')
			if (location.pathname.replace("/", "").length > 0)
			ref = location.pathname
			var ref_array = ref.replace(/^\//, "").split("/")
			var ref_obj = {
				"book": ref_array[0],
				"chapter": Number.isInteger(+ref_array[1]) ? +ref_array[1] : 1
			}
			EventPropagator.fireEvent({
				eventType: "navigation_request",
				payload: {
					reference: ref_obj
				}
			})
		}
		window.onpopstate = do_navigate
		do_navigate()
	}
	render() {
		return (
			<div>
				<SearchBuilder />
				<BibleText />
				<div className='sidebar' style={this.state.construction_mode ? {display: "none"} : {}}>
					<MorphDisplay />
				</div>
				<div className='sidebar' style={this.state.construction_mode ? {} : {display: "none"}}>
					<TermConstructor />
				</div>
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
)
