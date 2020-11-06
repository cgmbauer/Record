import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XablauComponent } from './xablau.component';

describe('XablauComponent', () => {
  let component: XablauComponent;
  let fixture: ComponentFixture<XablauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XablauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XablauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
