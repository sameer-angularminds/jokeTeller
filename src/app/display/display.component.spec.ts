import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DisplayComponent } from './display.component';
import { HttpService } from '../services/http.service';

describe('DisplayComponent', () => {
  let dispComponent: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayComponent ],
      imports:[HttpClientTestingModule],
      providers:[HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayComponent);
    dispComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(dispComponent).toBeTruthy();
  });

  it('should call showJokeDelivery()', () => { 
    dispComponent.showJokeDelivery(1);
    //  const spy = spyOn(console, 'log'); 
    fixture.detectChanges();
    expect(dispComponent.choosenIndex).toBe(1);
    // expect(console.log).toBeTruthy();
  });
});
