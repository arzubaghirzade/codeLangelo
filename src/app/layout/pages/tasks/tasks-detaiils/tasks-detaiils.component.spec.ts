import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetaiilsComponent } from './tasks-detaiils.component';

describe('PersonDetaiilsComponent', () => {
  let component: PersonDetaiilsComponent;
  let fixture: ComponentFixture<PersonDetaiilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDetaiilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetaiilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
