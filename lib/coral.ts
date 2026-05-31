import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';


export async function createCoralClient() {
    
    //it start the Coral process
    const transport = new StdioClientTransport({
        command: "C:\\Users\\acer\\.local\\bin\\coral.exe",
        args: ["mcp-stdio"],
    });

    //Create MCP client
    const client = new Client(
        {
            name: "prep-pilot-ai",
            version: "1.0.0",
        },
        {
            capabilities: {},
        }
    );

    //connect client with coral
    await client.connect(transport);
    return client;
}