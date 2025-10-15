import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumoapiPage } from './consumoapi.page';

describe('ConsumoapiPage', () => {
  let component: ConsumoapiPage;
  let fixture: ComponentFixture<ConsumoapiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumoapiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
