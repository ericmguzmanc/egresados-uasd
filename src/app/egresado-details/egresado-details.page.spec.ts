import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EgresadoDetailsPage } from './egresado-details.page';

describe('EgresadoDetailsPage', () => {
  let component: EgresadoDetailsPage;
  let fixture: ComponentFixture<EgresadoDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EgresadoDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
