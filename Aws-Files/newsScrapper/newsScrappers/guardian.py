import requests
from bs4 import BeautifulSoup
from .scrapperFunctions import get_category_from_link
from database import NewsSave
import boto3

guardianUrl = [
    'https://www.theguardian.com/world',
    'https://www.theguardian.com/uk/sport',
    'https://www.theguardian.com/uk/business',
    'https://www.theguardian.com/politics',
    'https://www.theguardian.com/uk/culture',
    'https://www.theguardian.com/uk/lifeandstyle'
]


def scrape_and_store_data():
    for url in guardianUrl:
        articles_scraped = 0
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code != 200:
            print(f"Failed to fetch URL: {url}")
            continue

        soup = BeautifulSoup(response.text, 'html.parser')

        for headlines in soup.find_all('div', class_="dcr-16c50tn"):

            headline = headlines.find('a', class_='dcr-lv2v9o')
            if headline:
                headline_text = headline.get('aria-label', '')  # Extract aria-label text
                headline_link = headline.get('href', '')  # Extract href link
                if '/live/' in headline_link.lower() or 'first thing:' in headline_text.lower() or '/crosswords/' in headline_link.lower():
                    continue

                article_url = f'https://www.theguardian.com/{headline_link}'

                response = requests.get(article_url, headers={'User-Agent': 'Mozilla/5.0'})
                if response.status_code != 200:
                    print(f"Failed to fetch article URL: {article_url}")
                    continue

                soup = BeautifulSoup(response.text, 'html.parser')

                article_div = soup.find("div", class_='article-body-commercial-selector')
                temp_article = ''
                if article_div:
                    for p in article_div.find_all('p'):
                        text = p.get_text()
                        temp_article += "\n" + text

                if len(temp_article) >= 2000:
                    if soup.find("meta", property="og:image"):
                        article_image = soup.find("meta", property="og:image")['content']
                    else:
                        article_image = "None"

                    if soup.find("span", class_='dcr-u0h1qy'):
                        article_date = soup.find("span", class_='dcr-u0h1qy').getText()
                    else:
                        article_date = "None"
                    category = get_category_from_link(url)
                    news_outlet = "The Guardian"
                     # Create a NewsItem instance and upload data to DynamoDB
                    news_item = NewsSave(
                        headline_link=article_url,
                        news_category=category,
                        date=article_date,
                        image_link= article_image,
                        headline=headline_text,
                        news_source=news_outlet,
                        news_content=temp_article
                    )
                    try:
                        news_item.upload_to_dynamodb()
                    except Exception as e:
                        print(f"Error uploading data to DynamoDB: {e}")

                    articles_scraped += 1

                    if articles_scraped >= 10:
                        break
