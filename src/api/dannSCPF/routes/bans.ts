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
            const banD = this.server.db.Ban.find()
            res.status(200).json(banD)
        })
    }
}