const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'your notes...'
}

const addNotes = (title, body) => {
    const notes = loadNotes()

    //filter goes through every item ,find stops once found
    //const duplicatedNotes = notes.filter((note) => note.title === title)
    const duplicatedNote = notes.find((note) => note.title === title)

    if (!duplicatedNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('Note added')
    } else {
        console.log('Note title is taken')
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const oldLength = notes.length

    const notesKept = notes.filter((note) => note.title !== title)

    debugger
    
    saveNotes(notesKept)
    const newLength = notesKept.length

    if (oldLength === newLength) {
        console.log(chalk.red('No note found'))
    } else {
        console.log(chalk.green('Note removed'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.blue.bold('Your notes:'))
    const titles = notes.forEach((note) => console.log(note.title))
}

const readNotes = (title) => {
    const notes = loadNotes()

    const selected = notes.find((note) => note.title === title)

    if (selected) {
        console.log(chalk.bold(selected.title))
        console.log(selected.body)
    } else {
        console.log(chalk.red('Error'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        console.log('error loading notes')
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}