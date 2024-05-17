import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGastosComponent } from './tab-gastos.component';

describe('TabGastosComponent', () => {
  let component: TabGastosComponent;
  let fixture: ComponentFixture<TabGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabGastosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
