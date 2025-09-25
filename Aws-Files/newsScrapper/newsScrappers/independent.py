import requests
from bs4 import BeautifulSoup
from .scrapperFunctions import get_category_from_link
from database import NewsSave
import boto3

independentUrl = [
    'https://www.independent.co.uk/news/world',
    'https://www.independent.co.uk/sport',
    'https://www.independent.co.uk/news/business',
    'https://www.independent.co.uk/news/uk/politics',
    'https://www.independent.co.uk/arts-entertainment',
    'https://www.independent.co.uk/life-style'
]

def scrape_and_store_data():
    for url in independentUrl:
        articles_scraped = 0  # Counter to track the number of articles scraped for each link

        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code != 200:
            print(f"Failed to fetch URL: {url}")
            continue

        soup = BeautifulSoup(response.text, 'html.parser')

        for article in soup.find_all('div', class_='article-default'):
            if articles_scraped >= 10:  # Check if maximum limit reached for this link
                break

            headline = article.find('a', class_='title')
            if headline:
                headline_text = headline.text.strip()
                headline_temp = headline['href']
                if '/vouchercodes/' in headline_temp.lower():
                    continue

                headline_link = f"https://www.independent.co.uk/{headline_temp}"

                # Fetch article content
                article_response = requests.get(f"https://www.independent.co.uk/{headline_temp}", headers={'User-Agent': 'Mozilla/5.0'})
                if article_response.status_code != 200:
                    print(f"Failed to fetch article URL: {headline_link}")
                    continue

                article_soup = BeautifulSoup(article_response.text, 'html.parser')

                category = get_category_from_link(url)
                news_source = "Independent"
                # Extract article content
                article_div = article_soup.find("div", id='main')
                if article_div:
                    article_content = ""
                    for paragraph in article_div.find_all('p'):
                        article_content += paragraph.text

                    # Extract article image
                    article_image = article_soup.find("meta", property="og:image")['content'] if article_soup.find("meta", property="og:image") else "None"

                    article_date = "None"

                    if len(article_content) > 2000:
                        try:
                            # Create a NewsItem instance and upload data to DynamoDB
                            news_item = NewsSave(
                                headline_link=headline_link,
                                news_category=category,
                                date=article_date,
                                image_link= article_image,
                                headline=headline_text,
                                news_source=news_source,
                                news_content=article_content
                            )
                            news_item.upload_to_dynamodb()
                            articles_scraped += 1

                            if articles_scraped >= 10:
                                break
                        except Exception as e:
                            print(f"Error uploading data to DynamoDB: {e}")
                else:
                    print("No article content found.")

                print("\n")
            else:
                print("No headline found.")
