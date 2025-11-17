import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresacodigoPage } from './ingresacodigo.page';

describe('IngresacodigoPage', () => {
  let component: IngresacodigoPage;
  let fixture: ComponentFixture<IngresacodigoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresacodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
