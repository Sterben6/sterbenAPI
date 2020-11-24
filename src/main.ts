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

    const fakeBan: {userId: string, reason: string, expiration?: { date: Date, processed: Boolean}, moderator: string} = {
        userId: '2222',
        reason: 'no233ob',
        moderator: 'ha3ha poo1p'
    }
    const newBan = await (new server.db.Ban(fakeBan).save())
}

main()