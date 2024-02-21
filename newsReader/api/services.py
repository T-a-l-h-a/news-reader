from newsapi import NewsApiClient
from django.conf import settings
from .models import Article
from django.db import IntegrityError
from django.core.exceptions import MultipleObjectsReturned
# This file contains the services for the API

# Init
newsapi = NewsApiClient(api_key='df3a6990ce574938baee4642b47d8a52')


def get_top_news(language='en', page=None):
    """
    Get the top news headlines.

    Args:
        language (str, optional): The language of the headlines. Defaults to 'en'.
        page (int, optional): The page number of the headlines. Defaults to None.

    Returns:
        dict: A dictionary containing the top news headlines.
    """
    return newsapi.get_top_headlines(
        language=language,
        page=page
    )


def query_news_api(
    q=None,
    sources='bbc-news',  # We want to get headlines from BBC News by default
    domains=None,
    from_param=None,
    to=None,
    language='en',
    page=None
):
    """
    Query the news API to retrieve news articles based on the specified parameters.

    Args:
        q (str, optional): The keyword or phrase to search for in the news articles. Defaults to None.
        sources (str, optional): The news sources to retrieve articles from. Defaults to 'bbc-news'.
        domains (str, optional): The domains to restrict the search to. Defaults to None.
        from_param (str, optional): The start date for the search. Defaults to None.
        to (str, optional): The end date for the search. Defaults to None.
        language (str, optional): The language of the news articles. Defaults to 'en'.

    Returns:
        dict: The response from the news API containing the retrieved news articles.
    """
    return newsapi.get_everything(
        q=q,
        sources=sources,
        domains=domains,
        from_param=from_param,
        to=to,
        language=language,
        page=page
    )


def updateDB(data):
    """
    Update the database with the provided data.

    Args:
        data (dict): The data containing articles to be updated in the database.

    Raises:
        IntegrityError: If there is an integrity error while updating the database.
        MultipleObjectsReturned: If multiple objects are returned for a single URL.

    Returns:
        None
    """
    for article_data in data['articles']:
        try:
            # Truncate all string fields to 200 characters
            truncated_data = {k: v[:200] if isinstance(v, str) else v for k, v in article_data.items()}
            Article.objects.get_or_create(
                url=truncated_data['url'],
                defaults={
                    'title': truncated_data['title'],
                    'author': truncated_data['author'] if truncated_data['author'] else 'Unknown',
                    'source_name': truncated_data['source']['name'],
                    'published_at': truncated_data['publishedAt'],
                }
            )
        except IntegrityError:
            print(f"IntegrityError occurred for url: {truncated_data['url']}")
        except MultipleObjectsReturned:
            print(f"Multiple objects returned for url: {truncated_data['url']}")