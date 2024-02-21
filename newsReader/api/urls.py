from django.urls import path
from . import views

urlpatterns = [
    path('latestNews/', views.getLatestNews, name="Latest News"),
    path('bulkUpdate/', views.bulkUpdate, name='Bulk Update'),
]
