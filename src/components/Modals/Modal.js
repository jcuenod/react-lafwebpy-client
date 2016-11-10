import React from 'react'

class Modal extends React.Component {
	render() {
		return (
			<div className={this.props.isVisible ? "modal" : "modal hidden"} onClick={this.props.onClickHandler}>
				{this.props.children}
			</div>
		)
	}
}
export default Modal
