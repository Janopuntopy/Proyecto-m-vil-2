import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitacodigoPage } from './solicitacodigo.page';

describe('SolicitacodigoPage', () => {
  let component: SolicitacodigoPage;
  let fixture: ComponentFixture<SolicitacodigoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
