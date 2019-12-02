const mongoose = require('mongoose');

var Note = mongoose.model('Note', {
    title: { type: String },
    content: { type: String }
});

module.exports = { Note };