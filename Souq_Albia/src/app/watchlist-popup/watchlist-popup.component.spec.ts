import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistPopupComponent } from './watchlist-popup.component';

describe('WatchlistPopupComponent', () => {
  let component: WatchlistPopupComponent;
  let fixture: ComponentFixture<WatchlistPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchlistPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WatchlistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
