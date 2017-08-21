'use strict';

import React, { Component } from 'react';
import { Songs } from '../../api/songs';

class AddSongs extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        let artist = this.form.artist.value;
        let artwork_url = this.form.artworkUrl.value;
        let duration = this.form.duration.value;
        let track_path = this.form.track_path.value;
        let title = this.form.title.value;
        let genre = this.form.genre.value;
        let rating = this.form.rating.value;


        let obj = {
            artist,
            artwork_url,
            duration,
            track_path,
            title,
            genre,
            rating
        }

        console.log('Songs in add song', Songs);

        Songs.insert({
          "artist": "Solu Music",
          "artwork_url": "http://is3.mzstatic.com/image/thumb/Music69/v4/eb/2d/60/eb2d60f4-3e8c-a69c-07ed-f8ee0c1cc123/source/100x100bb.jpg",
          "duration": 59,
          "id": 27611,
          "track_path": "http://www.stephaniequinn.com/Music/Allegro from Duet in C Major.mp3",
          "title": "Fade (feat Kimblee - Fuchse remix)",
          "genre": "Trance",
          "rating": 0
        });

        console.log('obj', obj);
    }

    render() {
        return (
            <div className='container add-song'>
                <h1>Add song</h1>
                <form onSubmit={this.handleSubmit} ref={c => {this.form = c;}}>
                    <div className='form-group'>
                        <label>Artist</label>
                        <input type='text' className='form-control' name='artist'/>
                    </div>
                    <div className='form-group'>
                        <label>Artwork Url</label>
                        <input type='text' className='form-control' name='artworkUrl'/>
                    </div>

                    <div className='form-group'>
                        <label>Duration</label>
                        <input type='number' className='form-control' name='duration'/>
                    </div>

                    <div className='form-group'>
                        <label>track_path</label>
                        <input type='text' className='form-control' name='track_path'/>
                    </div>

                    <div className='form-group'>
                        <label>title</label>
                        <input type='text' className='form-control' name='title'/>
                    </div>

                    <div className='form-group'>
                        <label>genre</label>
                        <input type='text' className='form-control' name='genre'/>
                    </div>

                    <div className='form-group'>
                        <label>rating</label>
                        <input type='number' className='form-control' name='rating'/>
                    </div>
                    
                    <div className='form-group'>
                        <input type='submit' value='submit' className='btn btn-info'/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddSongs;