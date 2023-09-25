import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { EgresadosPage } from './egresados.page';

describe('VacantesPage', () => {
  let component: EgresadosPage;
  let fixture: ComponentFixture<EgresadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EgresadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
