import fs from 'fs-extra';
import { Server } from './class';
import { parse } from 'yaml';
import childProcess from 'child_process';
async function main(): Promise<void> {
    const res = await new Promise((resolve, reject) => {
        childProcess.exec('ls ./dist/api/routes', (err, stdout, stderr) => {
            if (stderr) reject(new Error(`Command failed: \n${stderr}`));
            if (err) reject(err);
            resolve(stdout);
        });
    })
    console.log(res)
    const read = await fs.readFile('./config.json', 'utf8')
    const server = new Server(2711, './dist/api/dannSCPF/routes')
    const config: { mongoDB: string } = parse(read);
    server.loadDatabases(config.mongoDB)
}

main()