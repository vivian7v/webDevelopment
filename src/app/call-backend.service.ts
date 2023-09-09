import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CallBackendService {
  public tableData:any;
  public detail:any;
  public venueDetail:any;
  public location:any;
  public geo:any;
  public ip:any;
  public showTable:boolean=false;
  public showDetail:boolean=false;
  // public favorite:any=[];
  public favoritelen:number=0;
  auto:any=[];
  // public latitude:any;
  // public longitude:any;
  constructor(private http: HttpClient) { }
  
  // callBackendServiceObservable:Observable<CallBackendService[]>
  // geoUrl:string=''
  // callGeo(location:string){
  //   console.log(location)
  //   let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyDpae7DYbTObU-l1nNQLWZMV3mNdIbfq70';
  //   // this.callBackendServiceObservable=this.httpclient.get<CallBackendService[]>(url)
  //   console.log(this.httpclient.get(url))
  // }
 
   callGeo(location:any):Observable<any>{
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyDpae7DYbTObU-l1nNQLWZMV3mNdIbfq70';
    this.geo = this.http.get(url)
    return this.geo;
    // this.latitude = this.geo.results[0].geometry.location.lat.toString();
    // this.longitude = this.geo.results[0].geometry.location.lng.toString();
    // console.log(this.latitude)
    // console.log(this.longitude)
  }

  callIpinfo():Observable<any>{
    var url = 'https://ipinfo.io/?token=4b82e0ebe5bea1';
    this.ip = this.http.get(url);
    // this.http.get(url).subscribe((res:any)=>{
    //   // this.location = this.ip.city + "+" + this.ip.region;
    //   this.location = res.city + "+" + res.region;
    //   console.log(res)
      
    // });
    console.log(this.ip)
    return this.ip;
  }
////
spotifyLogin(){
  this.http.get("https://hw8backend-382420.wm.r.appspot.com/login");
}
////
  getSpotifytoken():Observable<any>{
    var url = "https://hw8backend-382420.wm.r.appspot.com/token";
    // let token = this.http.get(url);
    return this.http.get(url);
  }
  ////
  callSpotifyArtist(artist:any):Observable<any>{
    var url = "https://hw8backend-382420.wm.r.appspot.com/spotify?artist="+artist;
    console.log(url);
    return this.http.get(url);
  }
  ////
  callSpotifyAlbum(id:any):Observable<any>{
    var url = "https://hw8backend-382420.wm.r.appspot.com/album?id="+id;
    console.log(url);
    return this.http.get(url);
  }
  ////
  autoFromServer(keyword:any){
    var url = "https://hw8backend-382420.wm.r.appspot.com/auto?keyword="+keyword;
    this.auto = this.http.get(url);
    return this.auto;
  }
  ////
  tableFromSever(latitude:any, longitude:any, keyword:any, distance:any, category:any) :Observable<any>{
    var url = "https://hw8backend-382420.wm.r.appspot.com/search?latitude="+latitude+"&longitude="+longitude+"&distance="+distance+"&keyword="+keyword+"&category="+category;
    console.log(url);
    this.tableData = this.http.get(url);
    return this.tableData;
  }
  ////
  detailFromSever(id:any){
    var url = "https://hw8backend-382420.wm.r.appspot.com/detail?id="+id;
    console.log(url);
    this.detail = this.http.get(url);
    return this.detail;
  }
  venueDetailFromServer(id:any){
    var url = "https://hw8backend-382420.wm.r.appspot.com/venue?id="+id;
    console.log(url);
    this.venueDetail = this.http.get(url);
    return this.venueDetail;
  }
}
//用http.get()....，把表格内的数据传到后端“/search?keyword=.....&location=....”
//return 后端的结果