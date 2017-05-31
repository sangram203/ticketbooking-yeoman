'use strict';

import mongoose from 'mongoose';

var OmdbiendpointSchema = new mongoose.Schema({
        title:String,
		poster:String,
		overview:String,
		releaseDate:String,
		language:String,
		popularity:String,
		vote:String
});

export default mongoose.model('Omdbiendpoint', OmdbiendpointSchema);
