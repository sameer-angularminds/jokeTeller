import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { debug } from 'console';
import { HttpService } from '../services/http.service';
import { MainPageComponent } from './main-page.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  // let httpService:HttpService;
  // let httpServiceSpy:{ mainPage:jasmine.Spy};
  // let routerSpy:{ navigateByUrl:jasmine.Spy};
  // let router :Router;
  // let debugEl:DebugElement;
  let page: Page;

  class Page {

  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      imports: [AppModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    // httpServiceSpy=jasmine.createSpyObj(httpService,['mainPage']);
    // routerSpy=jasmine.createSpyObj(Router,['navigateByUrl']);
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    const spy = spyOn(console, 'log');
    fixture.detectChanges();
  });

  it('should call getInfoURL and return infoData', () => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    component.getInfoURL();
    expect(component.getInfoURL).not.toEqual([]);
   
  })

  it('Default form values', () => {
    expect(component.form.value.categories).toBe('Any');
    expect(component.form.value.lang).toBe('en');
    expect(component.form.value.amount).toBe(1);
    expect(component.form.value.format).toBe('default');
  })

  it('should change language on changing default language',() => {
    let de = fixture.debugElement.query(By.css('.changeLang'));
    spyOn(component,'changeLang');
    de.triggerEventHandler('change',{});
    expect(component.changeLang).toHaveBeenCalled(); 
  }); 

  it('should change typeCount on changing joke type', () => {
    let de = fixture.debugElement.query(By.css('.typeCount'));
    spyOn(component,'typeCount');
    de.triggerEventHandler('change',{});
    expect(component.typeCount).toHaveBeenCalled();
  })

  it('should call sendData() when submitted', () => {
    component.sendData();
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('submit button has been clicked!');
    expect(component.submitted).toBe(true);
  });
  

  it('should call resetForm() to clear form', () => { 
    component.resetForm();
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('Reset button has been clicked!');
  });

});