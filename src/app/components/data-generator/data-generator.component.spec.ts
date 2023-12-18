import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGeneratorComponent } from './data-generator.component';

describe('DataGeneratorComponent', () => {
  let component: DataGeneratorComponent;
  let fixture: ComponentFixture<DataGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
