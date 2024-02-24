import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleReaderComponent } from './article-reader.component';

describe('ArticleReaderComponent', () => {
  let component: ArticleReaderComponent;
  let fixture: ComponentFixture<ArticleReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleReaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
