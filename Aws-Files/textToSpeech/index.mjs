import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {convertTextToSpeech} from "./textspeech.mjs"

const BUCKET_NAME = "mynewsaudio";
const DYNAMODB_TABLE_NAME = "mainTable";

//Create new DocumentClient
const s3Client = new S3Client();
const dynamoClient = new DynamoDBClient();
const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoClient);

export const handler = async (event) => {
  console.log(JSON.stringify(event))
  try{
    for(let record of event.Records){
      if(record.eventName === "INSERT"){
        
          // Retrieve important information
          let newsCategory = record.dynamodb.NewImage.news_category.S
          let headlineLink = record.dynamodb.NewImage.headline_link.S
          let date = record.dynamodb.NewImage.date.S
          let headline = record.dynamodb.NewImage.headline.S
          let imageLink = record.dynamodb.NewImage.image_link.S
          let mainId = record.dynamodb.NewImage.main_id.S
          let newsContent = record.dynamodb.NewImage.news_content.S
          let newsSource = record.dynamodb.NewImage.news_source.S
          let newsSummary = record.dynamodb.NewImage.news_summary.S
        
          try{
              // Get audio of summary 
              const audioBuffer = await convertTextToSpeech(newsSummary)
          
          
              //Upload the audio file to S3
              const s3Params = {
                Bucket: BUCKET_NAME,
                Key: `audio/${Date.now()}_speech1.mp3`, // Unique key for S3
                Body: audioBuffer,
              };
              
              await s3Client.send(new PutObjectCommand(s3Params))
              
              // Generate S3 URL
              const s3Url = `https://${BUCKET_NAME}.s3.amazonaws.com/${s3Params.Key}`;
              
              
              //Store all the the data in DynamoDB
              const dynamoParams = {
                TableName: DYNAMODB_TABLE_NAME,
                Item: {
                    "news_category": newsCategory,
                    "headline_link": headlineLink,
                    "date": date,
                    "headline": headline,
                    "image_link": imageLink,
                    "news_content": newsContent,
                    "news_source" : newsSource,
                    "news_summary": newsSummary,
                    "main_id": mainId,
                    "audioUrl": s3Url
                }
              }
              
              await dynamoDbDocClient.send(new PutCommand(dynamoParams))
              
              
          }catch(err){
            console.log("ERROR uplaoding NBA data: " + JSON.stringify(err))
          }
      }
    }
    
  }catch(e){
    console.log("Error: " + e)
  }
}