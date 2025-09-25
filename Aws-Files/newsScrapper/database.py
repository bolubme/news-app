import boto3

class NewsSave:
    def __init__(self, headline_link, news_category, date, image_link, headline, news_source, news_content):
        self.headline_link = headline_link
        self.news_category = news_category
        self.date = date
        self.image_link = image_link
        self.headline = headline
        self.news_source = news_source
        self.news_content = news_content
        
        # Upload data to DynamoDB
        self.dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="http://dynamodb.us-east-1.amazonaws.com")
        self.table = self.dynamodb.Table("news_articles")

    def upload_to_dynamodb(self):
        # Put item into the DynamoDB table
        
        self.table.put_item(
            Item={
                'headline_link': self.headline_link,
                'news_category': self.news_category,
                'date': self.date,
                'image_link': self.image_link,
                'headline': self.headline,
                'news_source': self.news_source,
                'news_content': self.news_content
            }
        )


 
