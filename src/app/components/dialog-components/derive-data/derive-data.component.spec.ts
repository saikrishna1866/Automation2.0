import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeriveDataComponent } from './derive-data.component';

describe('DeriveDataComponent', () => {
  let component: DeriveDataComponent;
  let fixture: ComponentFixture<DeriveDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeriveDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeriveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
