import { Route, Server } from '../../../class';

export default class bans extends Route {

    constructor(server: Server) {
        super(server)
        this.conf = {
            path: '/dann/bans'
        }
    }

    public bind() {
        this.router.get('/', async (req, res) => {
            const banD = await this.server.db.Ban.find().lean().exec()
            const bans = []
            for (const ban of banD) {
                bans.push({ id: ban.userId, reason: ban.reason, date: ban.date, expiration: ban.expiration, moderator: ban.moderator, caseId: ban.caseId})
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
                bans.push({ reason: ban.reason, date: ban.date, expiration: ban.expiration, moderator: ban.moderator, caseId: ban.caseId})
            }
            const obj = {
                bans
            }
            res.status(200).json(obj)
        })

        this.router.post('/edit/:Id', async (req, res) => {
            const token = "8bc867e4-e5a3-40dd-8300-ed7f4b4fb067"

            if (!req.headers.token || !req.headers['Field-Change'] || !req.headers["New-Value"] || !req.headers["Case-Number"]) {
                return res.status(400).json({ code: this.constants.codes.CLIENT_ERROR, message: this.constants.messages.CLIENT_ERROR })
            }

            if (req.headers.token !== token) {
                return res.status(401).json({ code: this.constants.codes.UNAUTHORIZED, message: this.constants.messages.PERMISSION_DENIED})
            }
            res.status(200).json('hi')
        })
    }
}