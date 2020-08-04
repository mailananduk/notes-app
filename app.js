const validator = require('validator')
const yargs = require('yargs')
const chalk = require('chalk');
const { command } = require('yargs');

const notes = require('./notes.js');

//create add command
yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

//create delete command
yargs.command({
    command: 'delete',
    describe: 'Remove note',
    builder: {
        title:{
            describe: 'Note title to delete',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title);
    }
})

//create list  comand
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: function() {
        console.log('List all notes...')
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function() {
        console.log('Read note...')
    }
})

yargs.parse();