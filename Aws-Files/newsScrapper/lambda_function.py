import boto3
from newsScrappers import talksport
from newsScrappers import bbc
from newsScrappers import guardian
from newsScrappers import independent

def lambda_handler(event, context):
    # table_name = 'news_articles'
    # table_name2 = "main_news_table"
    
    # Clear DynamoDB table
    # deleted_count = clear_dynamodb_table(table_name)
    # deleted_count2 = clear_dynamodb_table(table_name2)
    
    # Scrape and store new data
    bbc.scrape_and_store_data()
    talksport.scrape_and_store_data()
    guardian.scrape_and_store_data()
    independent.scrape_and_store_data()
    


def clear_dynamodb_table(table_name):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)

    # Scan the DynamoDB table to retrieve all items
    response = table.scan()
    items_to_delete = response['Items']

    # Delete items in batches using batch_writer
    deleted_items_count = 0
    with table.batch_writer() as batch:
        for item in items_to_delete:
            batch.delete_item(
                Key={
                    'headline_link': item['headline_link'],
                    'news_category': item['news_category']
                }
            )
            deleted_items_count += 1

    return deleted_items_count
