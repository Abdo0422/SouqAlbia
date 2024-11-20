import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousCategoriePageComponent } from './sous-categorie-page.component';

describe('SousCategoriePageComponent', () => {
  let component: SousCategoriePageComponent;
  let fixture: ComponentFixture<SousCategoriePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SousCategoriePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SousCategoriePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
