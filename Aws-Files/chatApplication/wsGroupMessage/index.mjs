// Import external library with websocket functions
import { getSendMessagePromises } from './websocket.mjs';
import { getRoomId } from './database.mjs'; 

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// Create DynamoDB client
const dbClient = new DynamoDBClient();

export const handler = async (event) => {
    try {
        // Get message and roomId from event
        const { data } = JSON.parse(event.body);
        const connectionId = event.requestContext.connectionId;
        console.log("Message: " + data);
        console.log("Connection ID: " + connectionId);
        
        // Extract domain and stage from event
        const domain = event.requestContext.domainName;
        const stage = event.requestContext.stage;
        console.log("Domain: " + domain + "; Stage: " + stage);
        
        // Get roomId based on connectionId
        const roomId = await getRoomId(connectionId);
        console.log("Room ID: " + roomId);
        
        
        // Generate unique message ID
        const messageId = generateMessageId();
        
        const message = {
            MessageId: messageId,
            RoomId: roomId,
            SenderId: connectionId,
            Content: data,
            Timestamp: Date.now()
        };
        
        await dbClient.send(new PutItemCommand({
            TableName: "Messages",
            Item: {
                "MessageId": { S: messageId },
                "RoomId": { S: roomId },
                "SenderId": { S: connectionId },
                "Content": { S: data },
                "timestampChat": { N: Date.now().toString() }
            }
        }))

        // Get promises to send messages to connected clients in the room
        let sendMsgPromises = await getSendMessagePromises(data, roomId, domain, stage);

        // Execute promises
        await Promise.all(sendMsgPromises);
        
        return { statusCode: 200, body: "Message sent successfully." };
    } catch (err) {
        console.error("Error:", err);
        return { statusCode: 500, body: "Error: " + JSON.stringify(err) };
    }
};

function generateMessageId() {
    // Generate a timestamp-based ID
    const timestamp = new Date().getTime();

    // Generate a random string to ensure uniqueness
    const randomString = Math.random().toString(36).substr(2, 5); // Adjust length as needed

    // Combine timestamp and random string
    const messageId = `${timestamp}-${randomString}`;

    return messageId;
}
