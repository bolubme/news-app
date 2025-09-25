import requests
from bs4 import BeautifulSoup
from datetime import datetime
from .scrapperFunctions import get_category_from_link
from database import NewsSave
import boto3

talksportUrl = [
    'https://talksport.com/'
]


def scrape_and_store_data():
    for url in talksportUrl:
        articles_scraped = 0  # Counter to track the number of articles scraped for each link

        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code != 200:
            print(f"Failed to fetch URL: {url}")
            continue

        soup = BeautifulSoup(response.text, 'html.parser')

        for headline in soup.find_all('a', class_='text-anchor-wrap'):
            if articles_scraped >= 10:  # Check if maximum limit reached for this link
                break

            headline_text = headline.find('h3', class_='teaser__subdeck').text.strip()
            headline_link = headline['href']

            # Scraping individual article page and images
            article_response = requests.get(headline_link, headers={'User-Agent': 'Mozilla/5.0'})
            if article_response.status_code != 200:
                print(f"Failed to fetch article URL: {headline_link}")
                continue

            article_soup = BeautifulSoup(article_response.text, 'html.parser')

            article_div = article_soup.find("div", class_='article__content')
            temp_article = ''
            if article_div:
                for p in article_div.find_all('p'):
                    text = p.get_text()
                    temp_article += text

            category = get_category_from_link(url)
            news_source = "talk sport"

            if len(temp_article) > 2000:
                try:
                    # Extract article image
                    article_image = article_soup.find("div", class_='article__media-img-container')
                    image_src = article_image.find('img')['data-src'] if article_image and article_image.find(
                        'img') else None

                    # Extract article date
                    article_date = article_soup.find('li', class_='article__published').find('time')
                    article_datetime = datetime.strptime(article_date['datetime'][:-6], '%Y-%m-%dT%H:%M:%S.%f')
                    article_datetime_str = article_datetime.isoformat()
                except Exception as e:
                    print(f"Error extracting image or date: {e}")
                    continue

                try:
                    # Create a NewsItem instance and upload data to DynamoDB
                    news_item = NewsSave(
                        headline_link=headline_link,
                        news_category=category,
                        date=article_datetime_str,
                        image_link=image_src,
                        headline=headline_text,
                        news_source=news_source,
                        news_content=temp_article
                    )
                    news_item.upload_to_dynamodb()
                    articles_scraped += 1
                except Exception as e:
                    print(f"Error uploading data to DynamoDB: {e}")

            else:
                print("No article content found.")

        if articles_scraped >= 10:
            break
