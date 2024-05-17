import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGastosComponent } from './tabla-gastos.component';

describe('TablaGastosComponent', () => {
  let component: TablaGastosComponent;
  let fixture: ComponentFixture<TablaGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaGastosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
