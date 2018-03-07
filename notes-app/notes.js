
const fs = require('fs');

function addNote(title, body) {

    const notes = readFileSafely();
    const newNote = {
        title,
        body
    }
    const indexOfNote = notes.findIndex(note => note.title === title);

    if(indexOfNote !== -1) {
        notes.splice(indexOfNote, 1);
    }

    notes.push(newNote);

    fs.writeFileSync('./notes-data.json', JSON.stringify(notes));
    console.log('\nNote successfully saved!\n');
    return 0;

}

function listNotes() {

    const notes = readFileSafely();

    console.log('\n---File List: \n');
    notes.forEach(note => {
        console.log(note.title);
    });
    console.log('\n---End of list---\n');

    return notes.map(note => note.title);

}

function readNote (title) {

    const notes = readFileSafely();
    const note = notes.find(note => note.title === title);

    debugger;

    console.log('\nContent: \n');
    printSafely(note.body);
    console.log('\n---End of content---\n');

    return note.body;

}

function removeNote (title) {

    const notes = readFileSafely();
    const indexOfNote = notes.findIndex(note => note.title === title);

    if(indexOfNote !== -1) {
        notes.splice(indexOfNote, 1);
        fs.writeFileSync('./notes-data.json', JSON.stringify(notes));
        console.log('\nNote successfully removed!\n');
        return 0;
    } else {
        console.log('There\'s no such note.');
    }

}

function resetNotes() {
    
    fs.writeFileSync('./notes-data.json', JSON.stringify([]));
    return 0;

}

function readFileSafely() {

    try {
        return JSON.parse(fs.readFileSync('notes-data.json'));
    } catch(e) {
        return [];
    }

}

function printSafely (message) {

    console.log(message ? message : 'Oops, there\'s nothing to see here.');

}

module.exports = {
    addNote,
    listNotes,
    readNote,
    removeNote,
    resetNotes
}
