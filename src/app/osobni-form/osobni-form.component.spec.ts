import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobniFormComponent } from './osobni-form.component';

describe('OsobniFormComponent', () => {
  let component: OsobniFormComponent;
  let fixture: ComponentFixture<OsobniFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsobniFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsobniFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
