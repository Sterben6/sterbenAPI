import fs from 'fs-extra';
import { Server } from './class';
import { parse } from 'yaml';
async function main(): Promise<void> {
    const read = await fs.readFile('../config.json', 'utf8')
    const server = new Server(2711, './api/dannSCPF/routes')
    const config: { mongoDB: string } = parse(read);
    server.loadDatabases(config.mongoDB)
}

main()