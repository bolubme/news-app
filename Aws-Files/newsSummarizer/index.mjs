import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {summarizeArticle } from "./summarize.mjs"

const client = new DynamoDBClient({})
const documentClient = DynamoDBDocumentClient.from(client)


export const handler = async(event) => {
    console.log(JSON.stringify(event))
    
    try{
        for(let record of event.Records){
            
            //retrieve important information
            let newsCategory = record.dynamodb.NewImage.news_category.S
            let headlineLink = record.dynamodb.NewImage.headline_link.S
            let date = record.dynamodb.NewImage.date.S
            let headline = record.dynamodb.NewImage.headline.S
            let imageLink = record.dynamodb.NewImage.image_link.S
            let newsContent = record.dynamodb.NewImage.news_content.S
            let newsSource = record.dynamodb.NewImage.news_source.S
            
            
            // Summarize Article here 
            const summary = await summarizeArticle(newsContent)
            
            // Create an ID for each item 
            const itemId = generateUniqueId()

            

            const command = new PutCommand({
                TableName: "summary_table",
                Item: {
                    "news_category": newsCategory,
                    "headline_link": headlineLink,
                    "date": date,
                    "headline": headline,
                    "image_link": imageLink,
                    "news_content": newsContent,
                    "news_source" : newsSource,
                    "news_summary": summary,
                    "main_id": itemId
                }
            })
            
            try{
                const response = await documentClient.send(command);
                console.log(response)
            }catch(err){
                console.log("ERROR uploading NBA data: "+ JSON.stringify(err))
                throw err;
            }
            
            
        }
    }catch(e){
        console.log("Error: " + e)
    }
}


// Function to generate a unique ID
function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return timestamp.toString() + randomNumber.toString();
}