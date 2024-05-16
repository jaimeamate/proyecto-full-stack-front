import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGastosComponent } from './vista-gastos.component';

describe('VistaGastosComponent', () => {
  let component: VistaGastosComponent;
  let fixture: ComponentFixture<VistaGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGastosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
