
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all saved notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Removes a note', {
        title: titleOptions
    })
    .command('reset', 'Removes all saved notes')
    .help()
    .argv;

const command = argv._[0];

console.log('COMMAND:', command);

switch (command) {
    case 'add':
        notes.addNote(argv.title, argv.body);
        break;
    case 'list':
        notes.listNotes();
        break;
    case 'read':
        notes.readNote(argv.title);
        break;
    case 'remove':
        notes.removeNote(argv.title);
        break;
    case 'reset':
        notes.resetNotes();
        break;
    default:
        console.log('Command not recognized');
}

