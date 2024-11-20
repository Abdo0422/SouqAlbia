import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTendanceComponent } from './article-tendance.component';

describe('ArticleTendanceComponent', () => {
  let component: ArticleTendanceComponent;
  let fixture: ComponentFixture<ArticleTendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleTendanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleTendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
