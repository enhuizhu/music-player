'use strict';

import React, { Component } from 'react';
import _ from 'lodash';


class Player extends Component {
    constructor(props) {
        super(props);
        
        this.audio = new Audio();

        this.state = {
            activeSong: {},
            progress: '0%',
        };

        this.toogleAudio = this.toogleAudio.bind(this);
        this.playPre = this.playPre.bind(this);
        this.playNext = this.playNext.bind(this);
    }

    toogleAudio() {
        let activeSong = this.state.activeSong;
        activeSong.isPlaying = !activeSong.isPlaying;
        activeSong.isPlaying ? this.audio.play() : this.audio.pause();
        this.setState({activeSong});
    }

    playAudio(song) {
        song.isPlaying = true;
        this.audio.play();
    }

    setUpAudio(song) {
        this.audio.src= '';
        this.audio.src = `/songs/${song.track_path}`;
        this.audio.currentTime = 0;
        
        // this.audio.onloadeddata = (data) => {
        //     console.log('data', data);
        //     console.log('duration', this.audio.duration);
        // }

        // this.audio.ondurationchange = (data) => {
        //     console.log('duration data', data);
        // }

        this.audio.ontimeupdate = (data) => {
            let percentage = (this.audio.currentTime / this.audio.duration) * 100 + '%';
            this.setState({progress: percentage});
        }

        this.audio.onended = (data) => {
            this.state.activeSong.isPlaying = false;
            this.playNext();
        } 
    }

    doesNextAvilable() {
        return this.props.list[this.props.list.length - 1]._id !== this.state.activeSong._id;
    }

    doesPreAvilabe() {
        return this.props.list[0]._id !== this.state.activeSong._id;
    }

    getTimeLeft() {
        const timeLeft = this.audio.duration - this.audio.currentTime;
        const oneHour = 3600;
        const oneMin = 60;
        const hours = Math.floor(timeLeft / oneHour);
        const mins = Math.floor((timeLeft - hours * oneHour) / oneMin );
        const seconds = Math.floor(timeLeft - hours * oneHour - mins * oneMin);

        const forceToTwoDigit = function(digit) {
            if (digit < 10) {
                return '0' + digit;
            }

            return digit;
        }

        return forceToTwoDigit(hours) + ':' + forceToTwoDigit(mins) + ':' + forceToTwoDigit(seconds);
    }

    playPre() {
        if (!this.doesPreAvilabe()) {
            return ;
        }

         let preIndex = null;

        for(let k in this.props.list) {
            if (this.props.list[k]._id == this.state.activeSong._id) {
                preIndex = parseInt(k) - 1;
                break;
            }
        }


        if (preIndex !== null) {
            this.setNewSong(this.props.list[preIndex]);
        }
    }

    playNext() {
        if (!this.doesNextAvilable()) {
            return ;
        }

        let nextIndex = null;

        for(let k in this.props.list) {
            if (this.props.list[k]._id == this.state.activeSong._id) {
                nextIndex = parseInt(k, 10) + 1;
                break;
            }
        }

        if (nextIndex !== null) {
            this.setNewSong(this.props.list[nextIndex]);
        }
    }

    setNewSong(song) {
        this.setState({activeSong: song});
        this.setUpAudio(song);
        this.playAudio(song);
    }

    setActiveSong() {
        if (this.props.list.length > 0 && _.isEmpty(this.state.activeSong)) {
            let song = this.props.list[0]
            this.setNewSong(song);          
        }
    }

    componentDidMount() {
        this.setActiveSong();
    }

    componentWillReceiveProps(nextProps) {
        this.setActiveSong();
    }

    render() {
        let content = <div></div>;

        if (!_.isEmpty(this.state.activeSong)) {
            content = (
                <div className='player'>
                    <div className='song-info'>
                      {this.state.activeSong.artist} &nbsp;&nbsp; {this.state.activeSong.title}                
                    </div>

                    <div className='control-button'>
                        <span className={`glyphicon glyphicon-step-backward ${this.doesPreAvilabe() ? '' : 'disable'}`} onClick={this.playPre}></span>
                        <span className={`glyphicon ${this.state.activeSong.isPlaying ? 'glyphicon-stop' : 'glyphicon-play'}`} onClick={this.toogleAudio}></span>
                        <span className={`glyphicon glyphicon-step-forward ${this.doesNextAvilable() ? '' : 'disable'}`} onClick={this.playNext}></span>
                    </div>

                    <div className='time-line'>
                        <div className='line-wrapper'>
                            <div className='song-progress-bar' style={{'width': this.state.progress}}></div>
                        </div>

                        <div className='time-text'>
                            {this.getTimeLeft()}
                        </div>    
                    </div>

                    <div className='clearfix'></div>
                </div>
            );
        }



        return (
            <div>
                {content}
            </div>
        );       
    }
}

Player.porpTypes = {
    list: React.PropTypes.array
};


Player.defaultProps = {
    list: []
};

export default Player;