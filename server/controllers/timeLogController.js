const moment = require ('moment')

module.exports = {
    addTime: async(req, res) => {
        try {
            let id = 1
            const db = req.app.get('db')
            let {time} = req.body
            let  Users_id  = req.session.user.id
            let newTime = moment().format()
            let logTime = await db.add_time_log([newTime, time, Users_id])

            res.send(logTime)
        } catch (error) {
            console.log('error logging time:', error)
            res.status(500).send(error)
        }
    },
    getTime: async (req, res) => {
        try{
            const db = req.app.get('db')
            let {id} = req.session.user
            console.log(id)
            
            let timeResponse = await db.getTime(id)

            res.send(timeResponse)
        } catch (error) {
            console.log('error fetching time', error)
            res.status(500).send(error)
        }
    }, 

    delete: async (req, res) => {
        try{
            const db = req.app.get('db')
            let {id} = req.params
            let userID = req.session.user.id
            console.log(req.session)
          
            let time = await db.deleteTime([id, userID])
            res.send(time)
        } catch (error) {
            console.log(error) 
                console.log('error deleting time', error)
                res.status(500).send(error)
        }
    },
    update: async (req, res) => {
        try{
            const db = req.app.get('db')
            let {id} = req.params
            let { timestamp, length_of_time} = req.body
            let userID = req.session.user.id

            let editTime = await db.updateTime([id, timestamp, length_of_time, userID])
            res.send(editTime)
        } catch (error) {
            console.log('cannot update time', error)
            res.status(500).send(error)
        }
    }


}