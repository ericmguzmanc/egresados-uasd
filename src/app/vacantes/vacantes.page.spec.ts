import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VacantesPage } from './vacantes.page';

describe('VacantesPage', () => {
  let component: VacantesPage;
  let fixture: ComponentFixture<VacantesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VacantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
