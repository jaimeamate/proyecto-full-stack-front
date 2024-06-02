import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosCardComponent } from './gastos-card.component';

describe('GastosCardComponent', () => {
  let component: GastosCardComponent;
  let fixture: ComponentFixture<GastosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
