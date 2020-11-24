import fs from 'fs-extra';
import { Server } from './class';
import { parse } from 'yaml';
import childProcess from 'child_process';
async function main(): Promise<void> {
    childProcess.exec('ls ..')
    const read = await fs.readFile('../config.json', 'utf8')
    const server = new Server(2711, './api/dannSCPF/routes')
    const config: { mongoDB: string } = parse(read);
    server.loadDatabases(config.mongoDB)
}

main()