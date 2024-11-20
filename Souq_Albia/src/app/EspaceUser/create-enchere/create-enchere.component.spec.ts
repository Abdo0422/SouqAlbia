import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnchereComponent } from './create-enchere.component';

describe('CreateEnchereComponent', () => {
  let component: CreateEnchereComponent;
  let fixture: ComponentFixture<CreateEnchereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEnchereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEnchereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
