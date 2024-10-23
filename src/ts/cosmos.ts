import { DefaultAzureCredential, TokenCredential } from '@azure/identity';
import { TableServiceClient, TableClient } from '@azure/data-tables';

import { Emit } from './types'

export class DataClient {

    async start(emit: Emit) {
        const client: TableServiceClient = await this.createClient(emit);

        emit('Current Status:\tStarting...');

        const table: TableClient = await this.createTable(emit, client);

        await this.createEntities(emit, table);

        await this.readEntity(emit, table);

        await this.queryEntities(emit, table);

        emit('Current Status:\tFinalizing...');
    }

    async createClient(_: Emit): Promise<TableServiceClient> {
        // <create_client>
        const endpoint: string = process.env.AZURE_COSMOS_DB_NOSQL_ENDPOINT!
        console.log(`ENDPOINT: ${endpoint}`);
        
        const credential: TokenCredential = new DefaultAzureCredential();
        
        const client: TableServiceClient = new TableServiceClient(endpoint, credential);
        // </create_client>
        
        return client;
    }

    async createTable(emit: Emit, client: TableServiceClient): Promise<TableClient> {
        const endpoint: string = process.env.AZURE_COSMOS_DB_NOSQL_ENDPOINT!
        
        const credential: TokenCredential = new DefaultAzureCredential();

        let table: TableClient = new TableClient(endpoint, "cosmicworks-products", credential);

        emit(`Get table:\t${table.tableName}`);

        return table;
    }

    async createEntities(_: Emit, table: TableClient) {
        {
            // Create entity
        }
    
        {
            // Create entity
        }
    }
    
    async readEntity(_: Emit, table: TableClient) {
        // Read entity
    }

    async queryEntities(_: Emit, table: TableClient) {
        // Query entities
    }
}