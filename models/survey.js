const mongoose = require('mongoose');
const Schema = mongoose.Schema

const surveySchema = new Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Survey = mongoose.model(Survey, surveySchema);

module.exports=Survey