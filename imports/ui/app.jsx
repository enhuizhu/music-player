import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Songs } from '../api/songs';
import { Meteor } from 'meteor/meteor'
import Header from './components/header';
import Player from './components/player';
import SongList from './components/songList';

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

	  	this.clickToPlay = this.clickToPlay.bind(this);
	  	this.addToPlayList = this.addToPlayList.bind(this);
	  	this.sort = this.sort.bind(this);
	}

	componentDidMount() {
	
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

	clickToPlay(songInfo) {
	
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


	render() {
		return (
			<div>
				<Header/>
				<div>
					<button className='btn btn-primary' onClick={this.sort.bind(this, 'title')}>Sort by title</button>
					<button className='btn btn-primary' onClick={this.sort.bind(this, 'artist')}>Sort by artist</button>
					<button className='btn btn-primary' onClick={this.sort.bind(this, 'genre')}>Sort by gene</button>
				</div>
				<SongList songs={this.state.songs} clickToPlay={this.clickToPlay} addToPlayList={this.addToPlayList}/>
				<Player list={this.state.playList}/>
			</div>
		);
	}
}

// export default App;

export default createContainer(() => {
	return {
		songs: Songs.find().fetch(),
		sort: function(name, order) {
			let sortObj = {};
			sortObj[name] = order
			this.songs = Songs.find({}, {sort: sortObj}).fetch();

			console.log('this.songs', this.songs);
		}
	}
}, App);