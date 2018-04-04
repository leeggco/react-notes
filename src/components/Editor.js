import React, {Component} from 'react';

export default class Editor extends Component {
	state = {
		entity: this.props.entity,
		body: this.props.entity.body,
		updateEntity: this.props.updateEntity
	}

	render(){
		return (
			<div className = "ui form">
				<div className = "field">
					<textarea
						row = "3"
						placeholder = "写点什么"
						defaultValue = {this.state.body}
						onInput = {(event) => this.state.updateEntity(event)}
					/>
				</div>
			</div>
		)
	}
}
