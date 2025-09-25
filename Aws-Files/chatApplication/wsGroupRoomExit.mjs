import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

//Create client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async(event) => {
  //Get connectId from event 
  let connId = event.requestContext.connectionId;
  const roomId = JSON.parse(event.body).data
  
  console.log("EnterExit", connId, roomId)
  
  const command = new DeleteCommand({
     TableName: "ConnectionTable",
     Key: {
        roomId: roomId,
        connectionId: connId
     }
  })
  
  //Send delte command 
  try{
    await docClient.send(command)
    console.log("Connection ID delted from group")
    
    return {
      statusCode: 200,
      body: "Client disconnected. ID: " + connId
    };
  }catch(err){
      console.log("Error disconnecting client with ID: " + connId + ": with group ID" + roomId + ": " + JSON.stringify(err));
      return{
        statusCode: 500,
        body: "Server Error: " + JSON.stringify(err)
      }
  }
}