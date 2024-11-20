import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerniereEnchereComponent } from './derniere-enchere.component';

describe('DerniereEnchereComponent', () => {
  let component: DerniereEnchereComponent;
  let fixture: ComponentFixture<DerniereEnchereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DerniereEnchereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DerniereEnchereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
