const fs = require('fs');
const chalk = require('chalk');

const getNotes = function getNotes() {
    return 'Your notes...';
}

const addNote = function(title, body) {
    const notesArr = loadNotes();
    const duplicateNotes = notesArr.filter((note)=>{
        return note.title === title;
    });

    if (duplicateNotes.length === 0) {
        const note = {title: title,
                      body: body};
        notesArr.push(note);
        saveNotes(notesArr);
        console.log(chalk.green.inverse('Note added!'));
    } else {
        console.log(chalk.red.inverse('Note already added!'));
    }
}

const removeNote = function(title) {
    const notesArr = loadNotes();
    const indexToDel = notesArr.findIndex((note) => {
        return note.title === title;
    });
    if (indexToDel === -1) {
        console.log(chalk.red.inverse('Note doesnot exist, cannot be deleted!'));
    } else {
        notesArr.splice(indexToDel, 1);
        saveNotes(notesArr);
        console.log(chalk.green.inverse('Note removed'));
    }
}

const saveNotes = function(notesArr) {
    const noteArrJsonStr = JSON.stringify(notesArr);
    fs.writeFileSync('notes.json', noteArrJsonStr);
}

const loadNotes = function() {
    try {
        const notesJsonBuffer = fs.readFileSync('notes.json');
        const notesJsonStr = notesJsonBuffer.toString();
        const notes = JSON.parse(notesJsonStr);
        return notes;
    } catch (e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}