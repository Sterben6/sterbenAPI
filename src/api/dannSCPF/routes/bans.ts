import { Route, Server } from '../../../class';

export default class bans extends Route {

    constructor(server: Server) {
        super(server)
        this.conf = {
            path: '/bans'
        }
    }

    public bind() {
        this.router.get('/', async (req, res) => {
            const banD = await this.server.db.Ban.find().lean().exec()
            const bans = []
            for (const ban of banD) {
                bans.push({ id: ban.userId, reason: ban.reason, date: ban.date, expiration: ban.expiration, moderator: ban.moderator})
            }
            const obj = {
                bans
            }
            res.status(200).json(obj)
        })

        this.router.get('/user/:Id', async (req, res) => {
            const banD = await this.server.db.Ban.find({ userId: req.params.Id}).lean().exec()
            const bans = []
            for (const ban of banD) {
                bans.push({ reason: ban.reason, date: ban.date, expiration: ban.expiration, moderator: ban.moderator})
            }
            const obj = {
                bans
            }
            res.status(200).json(obj)
        })

        this.router.post('/edit/:Id', async (req, res) => {
            const fieldChange = req.header('Field-Change');
            const token = req.header('Token')
            console.log(token)
            res.status(200).json('hi')
        })
    }
}