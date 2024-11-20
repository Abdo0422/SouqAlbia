import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetsGagnesComponent } from './objets-gagnes.component';

describe('ObjetsGagnesComponent', () => {
  let component: ObjetsGagnesComponent;
  let fixture: ComponentFixture<ObjetsGagnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObjetsGagnesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjetsGagnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
