import fs from 'fs-extra';
import { Server } from './class';
import { parse } from 'yaml';
import childProcess from 'child_process';
async function main(): Promise<void> {
    const res = await new Promise((resolve, reject) => {
        childProcess.exec('ls ./dist/api/dannSCPF/routes', (err, stdout, stderr) => {
            if (stderr) reject(new Error(`Command failed: \n${stderr}`));
            if (err) reject(err);
            resolve(stdout);
        });
    })
    console.log(res)
    const read = await fs.readFile('./config.json', 'utf8')
    const server = new Server(2771, './dist/api/dannSCPF/routes')
    const config: { mongoDB: string } = parse(read);
    server.loadDatabases(config.mongoDB)

    const fakeBan: {userId: string, reason: string, expiration?: { date: string, processed: Boolean}, moderator: string} = {
        userId: '2020239250',
        reason: 'trolling',
        expiration: {
            date: '1608877800',
            processed: false
        },
        moderator: '135015992'
    }
    const yikeBan: {userId: string, reason: string, expiration?: { date: string, processed: Boolean}, moderator: string} = {
        userId: '2020239250',
        reason: 'trolling',
        expiration: {
            date: '1601011800',
            processed: true
        },
        moderator: '135015992'
    }
    const anotherBan: {userId: string, reason: string, expiration?: { date: Date, processed: Boolean}, moderator: string} = {
        userId: '171136692',
        reason: 'exploiting',
        moderator: '135015992'
    }
    await (new server.db.Ban(fakeBan).save())
    await (new server.db.Ban(yikeBan).save())
    await (new server.db.Ban(anotherBan).save())
}

main()