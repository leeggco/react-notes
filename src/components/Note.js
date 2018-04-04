import React, {Component} from 'react';
import Editor from './Editor';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { loadCollection, db } from '../database';
import _ from 'lodash';
moment.locale('zh-CN');

export default class Note extends Component {
	state = {
		entity: this.props.entity,
		body: this.props.entity.body,
		updated: this.props.entity.meta.updated || this.props.entity.meta.created,
		open: false,
		destroyEntity: this.props.destroyEntity,
	}

	updated(){
		console.log(this.state.updated);
		return moment(this.state.updated).fromNow();
	}

	header(){
		return _.truncate(this.state.body, {length: 30}) || '新建笔记';
	}

	words(){
		return this.state.body.length
	}

	toggle(){
		this.setState({
			open: !this.state.open
		})
	}

	updateEntity = (event) =>{
		const _body = event.target.value

		this.setState({
			body: _body
		})

		loadCollection('notes')
			.then((collection) => {
				const entity = this.state.entity
				entity.body = _body

				collection.update(entity)
				db.saveDatabase();
			})
	}

	render () {
	    return (
	      <div className="item">
	        <div className="meta">
	          { this.updated() }
	        </div>
	        <div className="content">
	          <div className="header" onClick={this.toggle.bind(this)}>
	            { this.header() }
	          </div>
	          <div className="extra">
			  	{ this.state.open &&
	              <Editor entity = {this.state.entity} updateEntity = {this.updateEntity}/>
			  	}

				{ this.words() } 字

				{ this.state.open &&
	            	<i className="right floated " onClick = {()=> {this.state.destroyEntity(this.state.entity)}}>删除</i>
				}
	          </div>
	        </div>
	      </div>
	    )
  }
}
