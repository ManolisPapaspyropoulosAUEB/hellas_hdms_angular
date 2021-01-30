import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoredataComponent } from './coredata.component';

describe('CoredataComponent', () => {
  let component: CoredataComponent;
  let fixture: ComponentFixture<CoredataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoredataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoredataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
