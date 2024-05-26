import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGruposComponent } from './crear-grupos.component';

describe('CrearGruposComponent', () => {
  let component: CrearGruposComponent;
  let fixture: ComponentFixture<CrearGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearGruposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
