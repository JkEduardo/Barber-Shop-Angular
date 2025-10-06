import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loading2 } from './loading-2';

describe('Loading2', () => {
  let component: Loading2;
  let fixture: ComponentFixture<Loading2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loading2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loading2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
