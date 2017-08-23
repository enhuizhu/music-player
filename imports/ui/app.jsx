import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Songs } from '../api/songs';
import { Meteor } from 'meteor/meteor'
import Header from './components/header';
import Player from './components/player';
import SongList from './components/songList';
import _ from 'lodash';

class App extends Component {
	constructor(props) {
	  	super(props);
	  	
	  	this.state = {
	  		songs: [],
	  		playList: []
	  	};

	  	this.orders = {
	  		title: -1,
	  		artist: -1, 
	  		genre: -1
	  	};

	  	this.addToPlayList = this.addToPlayList.bind(this);
	  	this.sort = this.sort.bind(this);
	  	this.filter = this.filter.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({songs: nextProps.songs})
	}

	sort(name) {
		this.orders[name] = ~this.orders[name] + 1;
		
		let newSongs = Object.assign([], this.props.songs);

		newSongs.sort((a, b) => {
			if (this.orders[name] > 0) {
				return a[name] > b[name];
			} else {
				return a[name] < b[name];
			}
		});

		this.setState({songs: newSongs});
	}

	addToPlayList(songInfo) {
		let newPlayList = this.state.playList;
		//check if songInfo already in the list
		let isSongInList = newPlayList.some(v => {return v._id === songInfo._id});
		
		if (isSongInList) {
			alert(`${songInfo.title} already in the playList`);
			return ;
		}

		let newSong = Object.assign({}, songInfo);
		
		newPlayList.push(newSong);

		this.setState({playList: newPlayList});
	}

	filter(e) {
		const input = e.target.value.toLocaleLowerCase();

		if (_.isEmpty(input)) {
			this.setState({songs: this.props.songs});
			return ;
		}

		//filter the list
		let newList = this.state.songs.filter(v => {
			return v.artist.toLocaleLowerCase().indexOf(input) !== -1 
				|| v.title.toLocaleLowerCase().indexOf(input) !== -1 
				|| v.genre.toLocaleLowerCase().indexOf(input) !== -1;
		});

		this.setState({songs: newList});
	}

	render() {
		return (  
			<div>
				<Header/>
				<div className='form-inline'>
				    <div className='form-group'>
						<input type='text' placeholder='search' className='form-control' onChange={this.filter}/>
					</div>
					<div className='form-group'>
						<button className='btn btn-primary' onClick={this.sort.bind(this, 'title')}>Sort by title</button>
						<button className='btn btn-primary' onClick={this.sort.bind(this, 'artist')}>Sort by artist</button>
						<button className='btn btn-primary' onClick={this.sort.bind(this, 'genre')}>Sort by gene</button>
					</div>
				</div>
				<SongList songs={this.state.songs} clickToPlay={this.clickToPlay} addToPlayList={this.addToPlayList}/>
				<Player list={this.state.playList}/>
			</div>
		);	
	}
}

// export default App;

export default createContainer((props) => {
	return {
		songs: Songs.find().fetch()		
	}

}, App);