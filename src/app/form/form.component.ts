import { CallBackendService } from './../call-backend.service';
import { Component,OnInit, Input } from '@angular/core';
import { Form, FormBuilder, NgForm } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public keyword:any="";
  public distance:string="10";
  public location:any="";
  public category:any="default";
  public checkbox:boolean=false;
  public latitude:any;
  public longitude:any;
  public tableData:any = [];
  // public results:any;
  // public table_body:any;
  public no_res:boolean=false;
  public keywordCmd = new FormControl();
  isLoading:boolean = false;
  filteredResult:any;
  errorMsg!: string;
  public locationFrame:any;
  distanceFrame:any;

  constructor(private callBackendService: CallBackendService){}
 

  ngOnInit(){
    this.callBackendService.showDetail = false;
    this.callBackendService.showTable = false;
    this.no_res = false;
    this.category="default";
    this.distance="10";
    this.keywordCmd.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= 2
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredResult = [];
          this.isLoading = true;
        }),
        switchMap(value => this.callBackendService.autoFromServer(value)//(this.keyword)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        console.log(data);
        this.filteredResult = []
        for (let i = 0; i < data._embedded.attractions.length; i ++){
          this.filteredResult.push(data._embedded.attractions[i].name)
        }
        console.log(this.filteredResult);
      });
  }
  onSelected() {
    this.keyword = this.keyword;
  }

  displayWith(value: any) {
    return value;
  }

  change1(){
    this.distanceFrame = document.getElementById("distance");
    this.distanceFrame.type = "number"; 
  }
  
  change2(){
    this.distanceFrame = document.getElementById("distance");
    this.distanceFrame.type = "text"; 
  }
  
  onSubmit(form: NgForm){
    this.keyword = this.keywordCmd.value;
    console.log(form.value);

    if(this.checkbox == false){
      this.callBackendService.callGeo(this.location).subscribe((res:any)=>{
      console.log(res);
      this.latitude = res.results[0].geometry.location.lat;
      this.longitude = res.results[0].geometry.location.lng;
      console.log(this.latitude)
      console.log(this.longitude)
      this.callBackendService.tableFromSever(this.latitude, this.longitude, this.keyword,this.distance,this.category).subscribe((res: any)=>{
        console.log(res);
        this.tableData=[];
        if (typeof(res._embedded) === 'undefined'){
          this.callBackendService.showTable = false;
          this.callBackendService.showDetail = false;
          this.no_res=true;
        }
        else{
          this.no_res=false;
          if (res._embedded.events.length<20){
            for (let i = 0; i < res._embedded.events.length; i++){
              this.tableData.push(res._embedded.events[i]);
            }
          }
          else{
            for (let i = 0; i < 20; i++){
              this.tableData.push(res._embedded.events[i]);
            }
          }         
          this.sortEvent();
          this.callBackendService.showTable = true;
          this.callBackendService.showDetail = false;           
        } 
      })
    })}
    else{
      this.callBackendService.callIpinfo().subscribe((res:any)=>{
      console.log(res)
      this.latitude = res.loc.split(',')[0];
      this.longitude = res.loc.split(',')[1];
      // console.log(this.latitude)
      // console.log(this.longitude)
      this.callBackendService.tableFromSever(this.latitude, this.longitude, this.keyword,this.distance,this.category).subscribe((res: any)=>{
        console.log(res);
        this.tableData=[];
        if (typeof(res._embedded) === 'undefined'){
          this.callBackendService.showTable = false;
          this.callBackendService.showDetail = false;
          this.no_res=true;
        }
        else{
          this.no_res=false;
          if (res._embedded.events.length<20){
            for (let i = 0; i < res._embedded.events.length; i++){
              this.tableData.push(res._embedded.events[i]);
            }
          }
          else{
            for (let i = 0; i < 20; i++){
              this.tableData.push(res._embedded.events[i]);
            }
          }         
          this.sortEvent();
          console.log(this.tableData)    
          this.callBackendService.showTable = true;
          this.callBackendService.showDetail = false;      
        } 
      })
      
      });     
  }
}

sortEvent() {
    this.tableData.sort(function (p1:any, p2:any) {
      return p1.dates.start.localDate.localeCompare(p2.dates.start.localDate);      
    });
}

  noRecordFound(){
    return this.no_res;
  }


  hide(){
    if(!this.checkbox){
      console.log('checked')
      this.locationFrame = document.getElementById("location");
      this.location = "";
      this.locationFrame.disabled = true;//it can be delete, but why?
    }
    else{
      this.locationFrame = document.getElementById("location");
      this.locationFrame.disabled= false;
    }
  }

  clear(){
    this.keyword="";
    this.location=""
    this.checkbox=false;
    this.no_res=false;
    this.callBackendService.showTable = false;
    this.callBackendService.showDetail = false;
  }
 
}
