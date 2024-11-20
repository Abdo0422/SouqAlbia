import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEncheresComponent } from './manage-encheres.component';

describe('ManageEncheresComponent', () => {
  let component: ManageEncheresComponent;
  let fixture: ComponentFixture<ManageEncheresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageEncheresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageEncheresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
