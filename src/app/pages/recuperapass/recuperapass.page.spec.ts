import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperapassPage } from './recuperapass.page';

describe('RecuperapassPage', () => {
  let component: RecuperapassPage;
  let fixture: ComponentFixture<RecuperapassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperapassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
