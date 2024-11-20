import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEncheresComponent } from './mes-encheres.component';

describe('MesEncheresComponent', () => {
  let component: MesEncheresComponent;
  let fixture: ComponentFixture<MesEncheresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesEncheresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesEncheresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
