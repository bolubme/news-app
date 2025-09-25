import requests
from bs4 import BeautifulSoup
from datetime import datetime
from database import NewsSave
import boto3
from .scrapperFunctions import get_category_from_link

# Link to scrape from
bbcUrl = [
    'https://www.bbc.co.uk/news/business',
    'https://www.bbc.co.uk/news/politics',
]

def scrape_and_store_data():
    for url in bbcUrl:
        articles_scraped = 0

        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code != 200:
            print(f"Failed to fetch URL: {url}")
            continue

        soup = BeautifulSoup(response.text, 'html.parser')

        for headline in soup.find_all('div', class_='ssrcss-tq7xfh-PromoContent'):
            headline_path = headline.find('a').get('href')
            headline_text = headline.find('p', class_="ssrcss-15dlehh-PromoHeadline").text

            headline_link = f'https://www.bbc.co.uk{headline_path}'

            response = requests.get(headline_link, headers={'User-Agent': 'Mozilla/5.0'})
            if response.status_code != 200:
                print(f"Failed to fetch headline link: {headline_link}")
                continue

            soup = BeautifulSoup(response.text, 'html.parser')

            article_div = soup.find_all("div", {"data-component": "text-block"})
            temp_article = ""
            for div in article_div:
                p = div.find("p")
                if p:
                    text = p.get_text()
                    if 'click here' not in text.lower():
                        temp_article += "\n" + text.strip()
            if len(temp_article) > 2000:
                article_length = len(temp_article)
                article_images = []
                article_images_div = soup.find_all('div', class_='ssrcss-ab5fd8-StyledFigureContainer')
                for image in article_images_div:
                    img_tag = image.find('img')
                    if img_tag:
                        img_src = img_tag['src']
                        article_images.append(img_src)
                article_date = soup.find('span', class_='ssrcss-1if1g9v-MetadataText').find('time')
                if article_date:
                    datetime_str = article_date['datetime']
                    try:
                        article_datetime = datetime.fromisoformat(datetime_str[:-1])
                        timestamp_str = str(int(article_datetime.timestamp()))
                    except ValueError:
                        print(f"Error parsing datetime: {datetime_str}")
                        continue

                    category = get_category_from_link(url)
                    news_source = "bbc"
                    # Create a NewsItem instance and upload data to DynamoDB
                    news_item = NewsSave(
                        headline_link=headline_link,
                        news_category=category,
                        date=timestamp_str,
                        image_link= article_images[0],
                        headline=headline_text,
                        news_source=news_source,
                        news_content=temp_article
                    )
                    try:
                        news_item.upload_to_dynamodb()
                    except Exception as e:
                        print(f"Error uploading data to DynamoDB: {e}")

            articles_scraped += 1

            if articles_scraped >= 1:
                break
