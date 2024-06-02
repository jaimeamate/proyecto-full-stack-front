import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldosCardComponent } from './saldos-card.component';

describe('SaldosCardComponent', () => {
  let component: SaldosCardComponent;
  let fixture: ComponentFixture<SaldosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaldosCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaldosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
