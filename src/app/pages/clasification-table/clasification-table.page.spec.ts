import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasificationTablePage } from './clasification-table.page';

describe('ClasificationTablePage', () => {
  let component: ClasificationTablePage;
  let fixture: ComponentFixture<ClasificationTablePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificationTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
