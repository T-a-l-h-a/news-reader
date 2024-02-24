import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { DialogContentExampleDialog } from '../article-reader/article-reader.component';

/**
 * Represents the component responsible for displaying a list of articles.
 */
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = []; // Array to store the articles
  searchForm = new FormGroup({ // Form group for search filters
    text: new FormControl(''), // Text filter
    sources: new FormControl(''), // Sources filter
    domains: new FormControl(''), // Domains filter
    fromDate: new FormControl(''), // From date filter
    toDate: new FormControl(''), // To date filter
    page: new FormControl(''), // Page number filter
    sortBy: new FormControl('') // Sort by filter
  });

  constructor(private articleService: ArticleService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getArticles();
  }

  /**
   * Retrieves the articles based on the search filters.
   */
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
  
  /**
   * Refreshes the articles by updating them from the server.
   * After updating, the page is reloaded after a delay of 1 second.
   */
  refreshArticles() {
    this.articleService.updateArticles().subscribe(data => {
      this.articles = data;
    });
    setTimeout(() => {
      location.reload();
    }, 1000); // Wait 1 second before reloading the page
  }

  /**
   * Queries the articles based on the search filters.
   * After querying, the page is reloaded after a delay of 1 second.
   */
  queryArticles() {
    const formValue = this.searchForm.value;
    this.articleService.queryArticles({
      text: formValue.text || undefined,
      sources: formValue.sources ? formValue.sources.split(',').map(source => source.trim()) : undefined,
      domains: formValue.domains ? formValue.domains.split(',').map(domain => domain.trim()) : undefined,
      fromDate: formValue.fromDate || undefined,
      toDate: formValue.toDate || undefined,
      page: formValue.page ? parseInt(formValue.page) : undefined,
      //sortBy: formValue.sortBy || undefined
    }).subscribe(data => {
      this.articles = data;
    });
    setTimeout(() => {
      location.reload();
    }, 1000); // Wait 1 second before reloading the page
  }

  /**
   * Opens a dialog to display the full article content.
   * @param article The article to be displayed.
   */
  openArticle(article: Article) {
    this.dialog.open(DialogContentExampleDialog, {
      height: '80%',
      width: '80%',
      data: { url: article.url }
    });
  }

}