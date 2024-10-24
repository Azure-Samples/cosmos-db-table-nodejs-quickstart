import { PagedAsyncIterableIterator } from '@azure/core-paging';
import { DefaultAzureCredential, TokenCredential } from '@azure/identity';
import { TableServiceClient, TableClient, TableEntityResult, GetTableEntityResponse, TableEntityResultPage, TableEntityQueryOptions } from '@azure/data-tables';

import { Emit, Product } from './types'

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
        const endpoint: string = process.env.AZURE_COSMOS_DB_TABLE_ENDPOINT!
        console.log(`ENDPOINT: ${endpoint}`);
        
        const credential: TokenCredential = new DefaultAzureCredential();
        
        const client: TableServiceClient = new TableServiceClient(endpoint, credential);
        // </create_client>
        
        return client;
    }

    async createTable(emit: Emit, client: TableServiceClient): Promise<TableClient> {
        const endpoint: string = process.env.AZURE_COSMOS_DB_TABLE_ENDPOINT!
        
        const credential: TokenCredential = new DefaultAzureCredential();

        let table: TableClient = new TableClient(endpoint, "cosmicworks-products", credential);

        emit(`Get table:\t${table.tableName}`);

        return table;
    }

    async createEntities(emit: Emit, table: TableClient) {
        {
            const entity: Product = {
                rowKey: '70b63682-b93a-4c77-aad2-65501347265f',
                partitionKey: 'gear-surf-surfboards',
                name: 'Yamba Surfboard',
                quantity: 12,
                price: 850.00,
                clearance: false
            };

            await table.upsertEntity<Product>(entity, "Replace");            
            emit(`Upserted item:\t${JSON.stringify(entity)}`);
        }
    
        {
            const entity: Product = {
                rowKey: '25a68543-b90c-439d-8332-7ef41e06a0e0',
                partitionKey: 'gear-surf-surfboards',
                name: 'Kiama Classic Surfboard',
                quantity: 25,
                price: 790.00,
                clearance: true
            };
    
            await table.upsertEntity<Product>(entity, "Replace");
            emit(`Upserted item:\t${JSON.stringify(entity)}`);
        }
    }
    
    async readEntity(emit: Emit, table: TableClient) {
        const rowKey: string = '70b63682-b93a-4c77-aad2-65501347265f';
        const partitionKey: string = 'gear-surf-surfboards';

        const response: GetTableEntityResponse<TableEntityResult<Product>> = await table.getEntity<Product>(partitionKey, rowKey);
        const entity: Product = response as Product;
        emit(`Read item id:\t${entity.rowKey}`);
        emit(`Read item:\t${JSON.stringify(entity)}`);

    }

    async queryEntities(emit: Emit, table: TableClient) {
        const partitionKey: string = 'gear-surf-surfboards';
        const filter: string = `PartitionKey eq '${partitionKey}'`
        const queryOptions: TableEntityQueryOptions = { filter: filter }

        const entities: PagedAsyncIterableIterator<TableEntityResult<Product>, TableEntityResultPage<Product>> = table.listEntities<Product>({ queryOptions: queryOptions });

        for await(const entity of entities) {
            emit(`Found item:\t${entity.name}\t${entity.rowKey}`);
        }
    }
}