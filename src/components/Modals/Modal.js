import React from 'react'

const Modal = ({children, isVisible, onClickHandler}) => (
	<div className={isVisible ? "modal" : "modal hidden"} onClick={onClickHandler}>
		{children}
	</div>
)
export default Modal
