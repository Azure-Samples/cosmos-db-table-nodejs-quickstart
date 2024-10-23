import { DefaultAzureCredential } from '@azure/identity';

export async function start(emit) {
    const endpoint = process.env.AZURE_COSMOS_DB_TABLE_ENDPOINT;
    console.log(`ENDPOINT: ${endpoint}`);
}