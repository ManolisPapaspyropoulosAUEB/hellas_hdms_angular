import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltrasyncComponent } from './ultrasync.component';

describe('UltrasyncComponent', () => {
  let component: UltrasyncComponent;
  let fixture: ComponentFixture<UltrasyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltrasyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltrasyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
