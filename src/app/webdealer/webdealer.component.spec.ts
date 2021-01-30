import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebdealerComponent } from './webdealer.component';

describe('WebdealerComponent', () => {
  let component: WebdealerComponent;
  let fixture: ComponentFixture<WebdealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebdealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebdealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
