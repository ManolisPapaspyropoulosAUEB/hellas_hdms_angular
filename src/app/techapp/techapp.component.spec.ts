import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechappComponent } from './techapp.component';

describe('TechappComponent', () => {
  let component: TechappComponent;
  let fixture: ComponentFixture<TechappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
