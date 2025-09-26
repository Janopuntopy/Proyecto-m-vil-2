import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoencontradoPage } from './noencontrado.page';

describe('NoencontradoPage', () => {
  let component: NoencontradoPage;
  let fixture: ComponentFixture<NoencontradoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoencontradoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
