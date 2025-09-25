//Import library and scan command
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";


//Create new Client
const ddbClient = new DynamoDBClient();

export const handler = async(event) => {
    let connId = event.requestContext.connectionId;
    const roomId = JSON.parse(event.body).data
    console.log("Client connected with ID: " + connId)
    console.log("Enter Room", connId, roomId)
    
    const params = {
        TableName: "ConnectionTable",
        Item: {
            roomId: roomId,
            connectionId: connId
        }
    }
    
    
    
    try{
    
        await ddbClient.send(new PutCommand(params));
        console.log("Connection and room Id stored")
        
        
        return {
            statusCode: 200,
            body: "Client connected with ID: " + connId + " to roomId " + roomId
        }
    }catch(err) {
        console.error(JSON.stringify(err));
        return {
            statusCode: 500,
            body: "Server Error: " + JSON.stringify(err)
        };
    }
}