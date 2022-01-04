import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormBuilder, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  baseURL = environment.apiURL;
  // jokes: any = {};
  flags: any = ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'];
  type: any = ['single', 'twopart'];
  showCustom: boolean = false;
  // showDelivery: boolean = false;
  showDiv: boolean = false;
  choosenIndex:number=-1;
  infoData: any;
  idRangeForLang: any;
  count: number = 0;
  ngForm: any;
  nativeElement: any;
  constructor(private http: HttpClient, private fb: FormBuilder, private httpService: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group(
      {
        categories: ['Any'],
        format: ['default'],
        lang: ['en'],
        flags: new FormArray([]),
        type: new FormArray([]),
        amount: [1],
        contains: [''],
        start: [''],
        end: ['']
      },
    );
    this.addFlag();
    this.addType();
    this.getInfoURL();
  }

  getInfoURL() {
    this.http.get(`https://v2.jokeapi.dev/info`).subscribe((data) => {
      this.infoData = data;
      this.idRangeForLang = this.infoData.jokes.idRange;
      console.log(this.infoData);
    })
  }

  // convenience getter for easy access to form fields
  get flagArr(): FormArray {
    return this.form.get("flags") as FormArray
  }
  get typeArr(): FormArray {
    return this.form.get("type") as FormArray
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  newFlag(data): FormGroup {
    return this.fb.group({
      name: [data],
      value: [false],
    })
  }
  newType(data): FormGroup {
    return this.fb.group({
      name: [data, Validators.required],
      value: [true],
    })
  }


  addFlag() {
    for (let i = 0; i < this.flags.length; i++) {
      this.flagArr.push(this.newFlag(this.flags[i]));
    }
  }
  addType() {
    for (let i = 0; i < this.type.length; i++) {
      this.typeArr.push(this.newType(this.type[i]));
    }
  }


  changeLang(e) {
    // console.log(e.target.value);
    let m = e.target.value
    let a, b;
    let obj = Object.keys(this.idRangeForLang);
    let val = Object.values(this.idRangeForLang);
    for (let i = 0; i < obj.length; i++) {
      if (obj[i] == m) {
        a = val[i][0];
        b = val[i][1];
        break;
      }
    }
     this.form.patchValue({
      start:a,
      end:b
     })
    this.form.value.start=a;
    this.form.value.end=b;
    // console.log(this.form.value);
  }

  typeCount(e){
    console.log(e.target.value);
  }

  sendData() {
    console.log('submit button has been clicked!');
    this.submitted=true;
      if(this.form.invalid){
        return;
      }
    this.count = 0;
    this.form.value.type.forEach(element => {
      if (element.value == false) {
        this.count++;
      }
    });
    if (this.count == 2) {
      return;
    }
    if (this.form.value.start > this.form.value.end) {
      alert("range is invalid : Starting value is greater than end value");
      return;
    }
    this.router.navigate(['/display']);
    // this.showDiv = true;
  //   this.showDelivery = false;
  //   console.log(this.form.value);
     this.httpService.queryParams(this.form.value);
  //   this.httpService.getAPI(this.form.value).subscribe((data) => {
  //     this.jokes = data;
  //     console.log(data);
  //   })
  //   this.submitted=false;
  }

  resetForm() {
    this.submitted = false;
    console.log(('Reset button has been clicked!'));
    this.ngOnInit();
  }


}
