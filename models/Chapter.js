const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    comic: { type: mongoose.Schema.Types.ObjectId, ref: 'Comic', required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
