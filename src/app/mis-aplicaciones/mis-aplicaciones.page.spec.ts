import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisAplicacionesPage } from './mis-aplicaciones.page';

describe('MisAplicacionesPage', () => {
  let component: MisAplicacionesPage;
  let fixture: ComponentFixture<MisAplicacionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MisAplicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
