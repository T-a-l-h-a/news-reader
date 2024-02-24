from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . import services
from .models import Article
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator
from django.db.models import Q

@api_view(['GET'])  # Only accept GET requests
def getLatestNews(request):
    """
    Fetches the latest news and updates the database.

    Args:
        request: The HTTP request object.

    Returns:
        A Response object with the latest news data or an error message.

    Raises:
        Exception: If there is an error while fetching or updating the news.
    """
    try:
        data = services.get_top_news()
        services.updateDB(data)
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])  # Only accept GET requests
def queryNewsAPI(request):
    """
    Fetches news articles from the news API based on the provided query parameters.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        Response: The HTTP response object containing the fetched news articles.

    Raises:
        Exception: If an error occurs while fetching the news articles.
    """
    try:
        # Query parameters
        q = request.GET.get('q')
        sources = request.GET.get('sources')
        domains = request.GET.get('domains')
        from_param = request.GET.get('from')
        to = request.GET.get('to')
        # Fetch news articles from the news API
        data = services.query_news_api(
            q=q,
            sources=sources,
            domains=domains,
            from_param=from_param,
            to=to,
        )
        services.updateDB(data)
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])  # only accept GET requests
def getAllNews(request):
    """
    Retrieve all news articles based on the provided query parameters.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        JsonResponse: The JSON response containing the filtered news articles.

    Raises:
        ObjectDoesNotExist: If no articles are found.
        Exception: If any other error occurs during the retrieval process.
    """
    try:
        # Query parameters
        q = request.GET.get('q')
        sources = request.GET.get('sources')
        domains = request.GET.get('domains')
        from_param = request.GET.get('from')
        to = request.GET.get('to')
        # Query builder
        query = Q()
        if q:
            query &= Q(title__icontains=q)
        if sources:
            query &= Q(source_name__in=sources.split(','))
        if domains:
            query &= Q(url__icontains=domains)
        if from_param:
            query &= Q(published_at__gte=from_param)
        if to:
            query &= Q(published_at__lte=to)
        # Fetch all news from the database and filter by the query
        # News is displayed by the most recently added to the DB first
        articles = Article.objects.filter(query).order_by('-id')
        # Paginate the articles
        paginator = Paginator(articles, 50)  # 50 articles per page
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        # Serialize the articles to JSON
        articles_json = [
            {
                'id': article.pk,
                'title': article.title,
                'author': article.author,
                'source_name': article.source_name,
                'published_at': article.published_at.isoformat(),
                'url': article.url,
            }
            for article in page_obj
        ]
        return JsonResponse(articles_json, safe=False)  # Return the articles as an HTTP response
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'No articles found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])  # Only accept GET requests
def bulkUpdate(request):
    """
    Fetches the latest news from the services module and updates the database with the fetched data.

    Args:
        request: The HTTP request object.

    Returns:
        A Response object with the fetched data and a status code of 200 if successful, 
        or an error message and a status code of 500 if an exception occurs.
    """
    try:
        for i in range(1, 5):
            data = services.get_top_news(page=i)
            services.updateDB(data)
        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
