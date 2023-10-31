import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CandidatosDestacadosPage } from './candidatos-destacados.page';

describe('VacantesPage', () => {
  let component: CandidatosDestacadosPage;
  let fixture: ComponentFixture<CandidatosDestacadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CandidatosDestacadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
