import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGastosComponent } from './crear-gastos.component';

describe('CrearGastosComponent', () => {
  let component: CrearGastosComponent;
  let fixture: ComponentFixture<CrearGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearGastosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
