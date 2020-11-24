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
            const banArray = []
            for (const bans of banD) {
                banArray.push({id: { reason: bans.reason, date: bans.date, expiration: bans.expiration, moderator: bans.moderator}})
            }
            res.status(200).json(banArray)
        })
    }
}