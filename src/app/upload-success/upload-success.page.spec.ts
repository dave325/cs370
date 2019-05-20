import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSuccessPage } from './upload-success.page';

describe('UploadSuccessPage', () => {
  let component: UploadSuccessPage;
  let fixture: ComponentFixture<UploadSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
