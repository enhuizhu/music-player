import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Songs } from '../api/songs';
import Header from './components/header';

class App extends Component {
	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
	
	}	

	render() {
		const list = this.props.songs.map(v => {
			return (
				<div className='song-item list-group-item' key={v._id}>
					<img src={v.artwork_url} className='float-left img-thumbnail'/>
					
					<div className='info-wrapper'>
						<div className='info-item'>
						 	<span className='fa fa-address-book text-info'></span>
						  	<label>{v.title}</label>
						</div>

						<div className='info-item'>
						  	<span className='fa fa-address-book text-info'></span>
						  	<label>{v.artist}</label>
						</div>

 						<div className='info-item'>
						  	<span className='fa fa-address-book text-info'></span>
						  	<label>{v.genre}</label>
						</div>

 						<div className='info-item'>
						  	<span className='fa fa-address-book text-info'></span>
						  	<label>{v.duration}</label>
						</div>
					</div>

					<div className='clearfix'></div>
				</div>
			);
		})


		return (
			<div>
				<Header/>
				<div className='song-list-container list-group text-muted'>
					{list}
				</div>	
			</div>
		);
	}
}

export default createContainer(() => {
	return {
		songs: Songs.find().fetch()
	}
}, App);