import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  
  jokes: any = {};
  showDelivery: boolean = false;
  showDiv: boolean = false;
  choosenIndex:number=-1;
  
  constructor(private httpService:HttpService,private http:HttpClient) { }

  ngOnInit(): void {
    this.showDiv = true;
    this.showDelivery = false;
    // console.log(this.form.value);
    this.httpService.getAPI().subscribe((data) => {
      this.jokes = data;
      // console.log(this.jokes);
    })
  }
  showJokeDelivery(i){
    //  console.log(i);
     this.showDelivery=!this.showDelivery;
     this.choosenIndex=i;
      }
}
