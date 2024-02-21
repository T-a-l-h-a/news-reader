import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://127.0.0.1:8000/api/allNews';

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
    return this.http.get<Article[]>(this.apiUrl, { params });
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }
}