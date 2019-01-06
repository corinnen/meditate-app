const moment = require ('moment')

module.exports = {
    create: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { title, content} = req.body
            let users_id = req.session.user.id
            let date = moment().format()
            let entry = await db.createJournalEntry([title, content, users_id, date]);
            
            res.send(entry)
        } catch (error) {
            console.log('error creating journal entry', error)
            res.status(500).send(error)
        }
    }, 

    getEntries: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {id} = req.session.user
            let entries = await db.getEntries(id)
            console.log(entries)
            res.send(entries);

        } catch (error) {
            console.log('error getting journal entries', error)
            res.status(500).send(error)
        }
    }, 

    updateEntries: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {id} = req.params
            let {title, content} = req.body
            let date = moment().format()
            let updatedEntry = await db.updateJournalEntries([id, title, content, date])

            res.send(updatedEntry)
            
        } catch (error) {
            console.log('error getting jounral entries', error)
            res.status(500).send(error)
        }
    }, 

    delete: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {id} = req.params
            let user_id= req.session.user.id
            let entry = await db.deleteEntry([id, user_id])
            res.send(entry)
            
        } catch (error) {
            console.log('error deleting entry', error)
            res.status(500).send(error)
        }

    }
}