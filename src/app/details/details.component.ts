import { CallBackendService } from './../call-backend.service';
import { Component, Input} from '@angular/core';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input() detail!:any;
  @Input() oriDetail!:any;
  @Input() twitterUrl!:any;
  @Input() artist!:any;
  @Input() venue!:any;
  @Input() lat!:any;
  @Input() lng!:any;
  public showmap:boolean=false;
  public showmore1:boolean=true;
  public showless1:boolean=false;
  public showmore2:boolean=true;
  public showless2:boolean=false;
  public showmore3:boolean=true;
  public showless3:boolean=false;
  public otherArtist:any=[];
  public mapOptions: google.maps.MapOptions = {};
  public marker:any;
  constructor(private callBackendService:CallBackendService){}



  showMore1(){
    this.showmore1=false;
    this.showless1=true;
  }
  showLess1(){
    this.showless1=false;
    this.showmore1=true;
  }
  showMore2(){
    this.showmore2=false;
    this.showless2=true;
  }
  showLess2(){
    this.showless2=false;
    this.showmore2=true;
  }
  showMore3(){
    this.showmore3=false;
    this.showless3=true;
  }
  showLess3(){
    this.showless3=false;
    this.showmore3=true;
  }

 spotify(){
  // this.callBackendService.spotifyLogin();
 }
  back(){
    this.callBackendService.showTable = true;
    this.callBackendService.showDetail = false;
  }
  showDetail(){
    this.mapOptions= {
      center: { lat: Number(this.lat), lng: Number(this.lng) },
      zoom : 12
   }
    this.marker ={
      position: { lat: Number(this.lat), lng: Number(this.lng) },
   }

    return this.callBackendService.showDetail;
  }
  local(date:any, event:any,category:any,venue:any) {
    var user = {
        date: date,
        event: event,
        category:category,
        venue:venue,
    }
    let Game_Data = localStorage.getItem("favorite") as any
    if (Game_Data == null) {
        var loc = new Array()
        loc.push(user)
        localStorage.setItem('favorite',JSON.stringify(loc))
    }else{
        Game_Data.push(user)
        localStorage.setItem('favorite',JSON.stringify(Game_Data))
    }
};

  addToFavorite(){
    // // this.local(this.oriDetail.dates.start.localDate,this.oriDetail.name,this.oriDetail.classifications[0].genre.name,this.oriDetail._embedded.venues[0].name)
    // console.log(this.oriDetail);
    // // this.oriDetail = JSON.stringify(this.oriDetail)
    // localStorage.setItem("favorite",JSON.stringify(this.oriDetail))
    // // localStorage.setItem("favorite",JSON.stringify(this.oriDetail))
    // // localStorage.setItem(`${this.oriDetail.name}`,this.oriDetail)
    // this.callBackendService.favoritelen++;
    let booking_data = localStorage.getItem("favorite") as any
    if (!booking_data){
      booking_data= {}
    }
    else{
      booking_data = JSON.parse(booking_data)
    }
    let tmp_array = [this.oriDetail.dates.start.localDate,this.oriDetail.name,this.oriDetail.classifications[0].genre.name,this.oriDetail._embedded.venues[0].name]
    booking_data[String(this.oriDetail.name).replaceAll(" ","")] = tmp_array
    localStorage.setItem("favorite", JSON.stringify(booking_data))
    alert("Event Added to Favorites!");
  }
  cancleFavorite(){
    let booking_data = localStorage.getItem("favorite") as any
    booking_data = JSON.parse(booking_data)
    delete booking_data[String(this.oriDetail.name).replaceAll(" ","")]
    localStorage.setItem("favorite", JSON.stringify(booking_data))
    alert("Removed from Favorites!");
  }

  public get isInFavo():boolean{
    let booking_data = localStorage.getItem("favorite") as any
      booking_data = JSON.parse(booking_data)
      if (!booking_data){
        return false;
      }
      if (String(this.oriDetail.name).replaceAll(" ","") in booking_data){
        return true
      }
      else{
        return false
      }
  }

  showMap(){
    this.showmap = true;
  }
  // public get show(){
  //   return this.showmap;
  // }
  show(){
    return this.showmap;
  }
  closeMap(){
    this.showmap = false;
  }
}

