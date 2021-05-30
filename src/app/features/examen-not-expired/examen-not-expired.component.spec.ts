import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenNotExpiredComponent } from './examen-not-expired.component';

describe('ExamenNotExpiredComponent', () => {
  let component: ExamenNotExpiredComponent;
  let fixture: ComponentFixture<ExamenNotExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenNotExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenNotExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
