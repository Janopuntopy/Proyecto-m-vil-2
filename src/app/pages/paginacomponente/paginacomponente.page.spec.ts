import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginacomponentePage } from './paginacomponente.page';

describe('PaginacomponentePage', () => {
  let component: PaginacomponentePage;
  let fixture: ComponentFixture<PaginacomponentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginacomponentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
