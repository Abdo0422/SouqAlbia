import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgoriePageComponent } from './catgorie-page.component';

describe('CatgoriePageComponent', () => {
  let component: CatgoriePageComponent;
  let fixture: ComponentFixture<CatgoriePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatgoriePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatgoriePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
