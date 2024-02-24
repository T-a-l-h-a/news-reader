import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleService } from './services/article.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ArticleReaderComponent, DialogContentExampleDialog } from './article-reader/article-reader.component';
import { SafePipe } from './article-reader/safe.pipe';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    ArticleListComponent,
    ArticleReaderComponent,
    DialogContentExampleDialog,
    // Pipes
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    // Services
    ArticleService,
    // Other providers
    provideAnimationsAsync()
  ],
  bootstrap: [
    // Root component
    AppComponent,
    // Additional component
    ArticleReaderComponent
  ],
})
export class AppModule { }
