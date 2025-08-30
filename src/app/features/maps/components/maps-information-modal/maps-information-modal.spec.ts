import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsInformationModal } from './maps-information-modal';

describe('MapsInformationModal', () => {
  let component: MapsInformationModal;
  let fixture: ComponentFixture<MapsInformationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapsInformationModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsInformationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
