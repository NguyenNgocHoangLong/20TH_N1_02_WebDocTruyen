const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    genre: { type: String },
    description: { type: String },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }]
});

const Comic = mongoose.model('Comic', comicSchema);

module.exports = Comic;
