const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Note } = require('../models/noteModel');

// => localhost:3000/notes/
router.get('/', (req, res) => {
    Note.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving notes :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Note.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving notes :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var newnote = new Note({
        title: req.body.title,
        content: req.body.content
    });
    newnote.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in note Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var newnote = {
        title: req.body.title,
        content: req.body.content
    };
    Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in note Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Note.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in note Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;