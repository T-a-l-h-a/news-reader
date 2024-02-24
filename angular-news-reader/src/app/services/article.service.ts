import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private newsUrl = 'http://127.0.0.1:8000/api/allNews';
  private refreshUrl = 'http://127.0.0.1:8000/api/bulkUpdate/';
  private queryUrl = 'http://127.0.0.1:8000/api/queryNewsAPI/';

  constructor(private http: HttpClient) { }

  getArticles(options?: { text?: string, sources?: string[], domains?: string[], fromDate?: string, toDate?: string, page?: number }): Observable<Article[]> {
    let params = new HttpParams();
    if (options) {
      if (options.text) params = params.set('text', options.text);
      if (options.sources) params = params.set('sources', options.sources.join(','));
      if (options.domains) params = params.set('domains', options.domains.join(','));
      if (options.fromDate) params = params.set('from', options.fromDate);
      if (options.toDate) params = params.set('to', options.toDate);
      if (options.page) params = params.set('page', options.page.toString());
    }
    return this.http.get<Article[]>(this.newsUrl, { params });
  }

  queryArticles(options?: { text?: string, sources?: string[], domains?: string[], fromDate?: string, toDate?: string, page?: number }): Observable<Article[]> {
    let params = new HttpParams();
    if (options) {
      if (options.text) params = params.set('q', options.text);
      if (options.sources) params = params.set('sources', options.sources.join(','));
      if (options.domains) params = params.set('domains', options.domains.join(','));
      if (options.fromDate) params = params.set('from', options.fromDate);
      if (options.toDate) params = params.set('to', options.toDate);
      if (options.page) params = params.set('page', options.page.toString());
      //if (options.sortBy) params = params.set('sortBy', options.sortBy);
    }
    return this.http.get<Article[]>(this.queryUrl, { params });
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.newsUrl}/${id}`);
  }

  updateArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.refreshUrl);
  }
}