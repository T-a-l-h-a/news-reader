/**
 * Represents an article from the news API
 * import { Article } from '../models/article.model';
 */
export interface Article {
    id: number;
    title: string;
    author: string;
    source_name: string;
    published_at: Date;
    url: string;
}