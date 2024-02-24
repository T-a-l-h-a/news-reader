import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private newsUrl = 'http://127.0.0.1:8000/api/allNews'; // URL for getting all news articles
  private refreshUrl = 'http://127.0.0.1:8000/api/bulkUpdate/'; // URL for refreshing the news articles
  private queryUrl = 'http://127.0.0.1:8000/api/queryNewsAPI/'; // URL for querying news articles

  constructor(private http: HttpClient) { }

  /**
   * Get articles based on the provided options.
   * @param options - Options for filtering the articles (text, sources, domains, fromDate, toDate, page)
   * @returns Observable<Article[]> - Observable that emits an array of articles
   */
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

  /**
   * Query articles based on the provided options.
   * @param options - Options for querying the articles (text, sources, domains, fromDate, toDate, page)
   * @returns Observable<Article[]> - Observable that emits an array of articles
   */
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

  /**
   * Get a single article by its ID.
   * @param id - ID of the article
   * @returns Observable<Article> - Observable that emits the article
   */
  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.newsUrl}/${id}`);
  }

  /**
   * Update all articles by refreshing them.
   * @returns Observable<Article[]> - Observable that emits an array of updated articles
   */
  updateArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.refreshUrl);
  }
}