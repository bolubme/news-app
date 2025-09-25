//Import library and scan command
import { DynamoDBClient, QueryCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient,  ScanCommand } from "@aws-sdk/lib-dynamodb";

//Create client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export async function getRoomId(connectionId){
    const params = {
        TableName: "ConnectionTable",
        FilterExpression: 'connectionId = :connectionId',
        ExpressionAttributeValues: {
            ':connectionId': connectionId
        }
    };
    try{
        const data = await docClient.send(new ScanCommand(params))
        return data.Items[0].roomId
    }catch(err){
        console.error('Unable to scan. Error:', JSON.stringify(err, null, 2))
    }
}

export async function deleteConnection(roomId, connectionId) {
    const params = {
        TableName: "ConnectionTable",
        Key: {
            roomId: { S: roomId },
            connectionId: { S: connectionId }
        }
    };
    const command = new DeleteItemCommand(params);
    await docClient.send(command);
    console.log(`Connection ${connectionId} deleted`);
}