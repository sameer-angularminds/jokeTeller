import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;
  let http:HttpClient;
  let httpController:HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[HttpService]
    });

    // to get the actual instance
    service = TestBed.inject(HttpService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify(); //Verifies that no requests are outstanding.
  });
  it('Service Created',()=>{
    expect(service).toBeDefined();
  });
  it('should test queryparams', () => {
    service.queryParams('acx');
    expect(service.queryParams).toBeTruthy();
 });
  it('should test output of queryParams()',()=>{
     let result=service.queryParams('data');
    expect(result).not.toBe(null);
    expect(service.additionURL).not.toBe(null);
  });

 
});
