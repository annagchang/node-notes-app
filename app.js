//const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('2.2.0')

//Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
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
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})

//Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption:true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})

//List command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler() {
        notes.listNotes()
    }
})

//Read command
yargs.command({
    command: 'read',
    describe: 'Read the note',
    handler(argv) {
        notes.readNotes(argv.title)
    }
})

yargs.parse()