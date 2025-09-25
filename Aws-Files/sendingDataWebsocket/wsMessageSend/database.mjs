//Import library and scan command
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";


//Create client 
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

let limit;

export async function getData(specificCategory) {
    let newsCategories;
    
    if(specificCategory === "all"){
        newsCategories = ["business", "politics", "world", "lifestyle", "culture", "sport"]
        limit = 8
    }else{
        newsCategories = [specificCategory]
        limit = 50
    }
    
    const finalData = {}
    
    for(let newsCategory of newsCategories) {
         finalData[newsCategory] = await getNewsData(newsCategory);     
    }
    
    return finalData
}

async function getNewsData(specificCategory) {
    const query = {
        TableName: "mainTable",
        Limit: limit,
        KeyConditionExpression: "news_category = :t",
        ExpressionAttributeValues: {
            ":t": specificCategory
        }
    };
    
    
    const queryCommand = new QueryCommand(query)
    
    try {
        const data = await docClient.send(queryCommand)
        
        const newsDataArray = []
        
        data.Items.forEach(item => {
            
            const { headline_link, news_category, date, headline, image_link, main_id, news_source, news_summary, audioUrl } = item;
            
            let logoLink = '';
            switch (news_source) {
                case 'bbc':
                    logoLink = 'https://bbcimagelogo.s3.amazonaws.com/bbc.jpeg'
                    break;
                case 'The Guardian':
                    logoLink = 'https://bbcimagelogo.s3.amazonaws.com/guardian.png'
                    break;
                case 'Independent':
                    logoLink = 'https://bbcimagelogo.s3.amazonaws.com/independent.jpeg'
                    break;
                case 'talk sport':
                    logoLink = 'https://bbcimagelogo.s3.amazonaws.com/talksport.jpeg'
                    break;
                default:
                    logoLink = 'https://bbcimagelogo.s3.amazonaws.com/default.jpg'
            }
            
            const newsData = {
                id: main_id,
                headlineLink: headline_link,
                newsCategory: news_category,
                headline: headline,
                imageLink: image_link,
                newsSource: news_source,
                newsSummary: news_summary,
                logoLink: logoLink,
                audioUrl: audioUrl,
            };
            
            
            
            newsDataArray.push(newsData);
        })
        
        return newsDataArray
        
    }catch (error){
        console.error("Error fetchign data: ", error)
        throw error
    }
}


//Returns all of the connection IDs
export async function getConnectionIds() {
    const scanCommand = new ScanCommand({
        TableName: "WebSocketClients"
    });
    const response  = await docClient.send(scanCommand);
    return response.Items;
};


//Deletes the specified connection ID
export async function deleteConnectionId(connectionId){
    console.log("Deleting connection Id: " + connectionId);

    const deleteCommand = new DeleteCommand ({
        TableName: "WebSocketClients",
        Key: {
            ConnectionId: connectionId
        }
    });
    return docClient.send(deleteCommand);
};