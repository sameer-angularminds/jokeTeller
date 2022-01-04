import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 baseURL=environment.apiURL;
 additionURL:any;
//  codec = new HttpUrlEncodingCodec;
  constructor(private http:HttpClient) { }

  getAPI(){  
    return this.http.get(`${this.baseURL}/${this.additionURL}`);
  }


  queryParams(data){
     
    data.lang=='en'?this.additionURL=data.categories:this.additionURL=data.categories+`?lang=`+data.lang;
    // if(data.lang!='en'){
    //   this.additionURL=data.categories+`?lang=`+data.lang;
    // }
    
    // if(data.lang=='en'){
    //   this.additionURL=data.categories;
    // }
    

    let tempStr:any='';
    for(let i=0;i<data.flags?.length;i++){
        if(data.flags[i].value==true){
          tempStr+=(data.flags[i].name)+',';
        }
    }



    if(tempStr!=''){
    //  console.log("something in temp str");
     tempStr = tempStr.slice(0, -1);
     data.lang=='en'?this.additionURL+=`?blacklistFlags=`+tempStr:this.additionURL+=`&blacklistFlags=`+tempStr;

    //  if(data.lang=='en'){
    //   this.additionURL+=`?blacklistFlags=`+tempStr;
    //  }
    //  else{
    //   this.additionURL+=`&blacklistFlags=`+tempStr;
    //  }
    }


    if(data.contains){
      data.lang=='en'&& tempStr==''?this.additionURL+=`?contains=`+encodeURIComponent(data.contains):this.additionURL+=`&contains=`+encodeURIComponent(data.contains);
      // if(data.lang=='en'&& tempStr==''){
      //   this.additionURL+=`?contains=`+encodeURIComponent(data.contains);
      // }
      // else{
      //   this.additionURL+=`&contains=`+encodeURIComponent(data.contains);
      // }
    }


    let tempType:any='';
    for(let i=0;i<data.type?.length;i++){
      if(data.type[0].value!=data.type[1].value){
        if(data.type[i].value==true){
          tempType+=(data.type[i].name);
        }
      }      
      // console.log("temptype "+tempType);
  }   
  if(tempType){
    data.lang=='en'&& tempStr==''? this.additionURL+=`?type=`+tempType:this.additionURL+=`&type=`+tempType;
    // if(data.lang=='en'&& tempStr==''){
    //   this.additionURL+=`?type=`+tempType;
    // }
    // else{
    //   this.additionURL+=`&type=`+tempType;
    // }
  } 
  
  if(data.start || data.end)
  { 
    if(data.lang=='en'&& tempStr==''&& tempType==''){
      if(data.start==data.end){
        this.additionURL+=`?idRange=`+data.start
      }
      else{
        this.additionURL+=`?idRange=`+data.start+'-'+data.end;
      }
    }
    else{
      if(data.start==data.end){
        this.additionURL+=`&idRange=`+data.start
      }
      else{
        this.additionURL+=`&idRange=`+data.start+'-'+data.end;
      }
    }
  }


  if(data.amount!=1){
    (data.lang=='en'&& tempStr==''&& tempType==''&& !(data.start || data.end))?this.additionURL+=`?amount=`+data.amount:this.additionURL+=`&amount=`+data.amount;
    // if(data.lang=='en'&& tempStr==''&& tempType==''&& !(data.start || data.end)){
    //   this.additionURL+=`?amount=`+data.amount;
    // }
    // else{
    //   this.additionURL+=`&amount=`+data.amount;
    // }
  }   


  console.log(this.additionURL);
      return (this.additionURL);    
  }
}
