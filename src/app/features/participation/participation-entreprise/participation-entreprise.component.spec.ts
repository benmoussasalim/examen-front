import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationEntrepriseComponent } from './participation-entreprise.component';

describe('ParticipationEntrepriseComponent', () => {
  let component: ParticipationEntrepriseComponent;
  let fixture: ComponentFixture<ParticipationEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipationEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipationEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
