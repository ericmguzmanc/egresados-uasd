import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EgresadoEditPage } from './egresado-edit.page';

describe('EgresadoEditPage', () => {
  let component: EgresadoEditPage;
  let fixture: ComponentFixture<EgresadoEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EgresadoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
