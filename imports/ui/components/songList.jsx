'use strict';

import React, { Component } from 'react';

class SongList extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const list = this.props.songs.map(v => {
            return (
                <div className='song-item list-group-item' key={v._id}>
                    <div className='thumbnail-wrapper'>
                        <img src={v.artwork_url} className='img-thumbnail'/>
                        
                        <div className='overlay'>
                            <div><button className='btn btn-info'>Play</button></div>
                            <div><button className='btn btn-info' onClick={() => {this.props.addToPlayList(v);}}>Add To Playlist</button></div>
                        </div>
                    </div>
                    
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
        });


        return (
            <div className='song-list-container list-group text-muted'>
                {list}
            </div>
        );        
    }
}


export default SongList;