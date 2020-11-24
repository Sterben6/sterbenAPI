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
                bans.push({id: { reason: ban.reason, date: ban.date, expiration: ban.expiration, moderator: ban.moderator}})
            }
            const obj = {
                bans
            }
            res.status(200).json(obj)
        })
    }
}