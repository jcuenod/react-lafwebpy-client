import React from 'react'

class CollocationResults extends React.Component {
	render() {
		var the_list = this.props.list || []
		var columns = Math.round(Math.sqrt(the_list.length));
		var grid = the_list.reduce((previousValue, currentValue, i) => {
			var returnValue = previousValue;
			if (i % columns === 0)
				returnValue.push([]);
			returnValue[returnValue.length-1].push(currentValue);
			return returnValue;
		}, []);
		return (
			<div className="abstract_selector">
				{grid.map((item, i) => {
					return (
						<div key={i} className="table_row">
							{item.map((item_i, j) => {
								return <div key={j} className="table_cell" onClick={() => this.props.onSelection(item_i)}>{item_i}</div>
							}, this)}
						</div>
					)
				}, this)}
			</div>
		);
	}
}
export default CollocationResults
