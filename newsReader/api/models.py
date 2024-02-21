from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    source_name = models.CharField(max_length=100)
    published_at = models.DateTimeField()
    url = models.URLField()

    def __str__(self):
        return self.title
