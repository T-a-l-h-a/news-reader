import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  searchForm = new FormGroup({
    text: new FormControl(''),
    sources: new FormControl(''),
    domains: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    page: new FormControl('')
  });

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    const formValue = this.searchForm.value;
    this.articleService.getArticles({
      text: formValue.text || undefined,
      sources: formValue.sources ? formValue.sources.split(',').map(source => source.trim()) : undefined,
      domains: formValue.domains ? formValue.domains.split(',').map(domain => domain.trim()) : undefined,
      fromDate: formValue.fromDate || undefined,
      toDate: formValue.toDate || undefined,
      page: formValue.page ? parseInt(formValue.page) : undefined
    }).subscribe(data => {
      this.articles = data;
    });
  }
}