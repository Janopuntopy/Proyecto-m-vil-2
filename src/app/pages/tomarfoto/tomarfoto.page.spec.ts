import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TomarfotoPage } from './tomarfoto.page';

describe('TomarfotoPage', () => {
  let component: TomarfotoPage;
  let fixture: ComponentFixture<TomarfotoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TomarfotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
