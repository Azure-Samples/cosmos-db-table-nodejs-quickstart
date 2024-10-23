import { DefaultAzureCredential } from '@azure/identity';
import { TableServiceClient, TableClient } from '@azure/data-tables';

export async function start(emit) {
    // <create_client>
    const endpoint = process.env.AZURE_COSMOS_DB_TABLE_ENDPOINT;
    console.log(`ENDPOINT: ${endpoint}`);

    const credential = new DefaultAzureCredential();
    
    const client = new TableServiceClient(endpoint, credential);
    // </create_client>
    emit('Current Status:\tStarting...')
    
    const table = new TableClient(endpoint, "cosmicworks-products", credential);

    emit(`Get table:\t${table.tableName}`);

    {
        // Create entity
    }

    {
        // Create entity
    }

    {
        // Read entity
    }

    {
        // Query entities
    }

    emit('Current Status:\tFinalizing...');
}