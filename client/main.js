import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Songs } from '../imports/api/songs'

import App from '../imports/ui/app.jsx';

Meteor.startup(() => {
	render(<App/> , document.getElementById('app'));
});