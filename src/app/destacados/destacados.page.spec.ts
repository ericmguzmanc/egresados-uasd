import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestacadosPage } from './destacados.page';

describe('DestacadosPage', () => {
  let component: DestacadosPage;
  let fixture: ComponentFixture<DestacadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DestacadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
