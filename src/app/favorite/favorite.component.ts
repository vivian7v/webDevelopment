import { CallBackendService } from './../call-backend.service';
import { Component, Input } from '@angular/core';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
favoriteData:any;
favoriteArray:any=[];
constructor(private callBackendService: CallBackendService){}

// favoriteLength(){
//   return this.callBackendService.favoritelen;
// }

getFavorite(){
  this.favoriteData = localStorage.getItem("favorite");
  if(!this.favoriteData){return false;}
  this.favoriteData = JSON.parse(this.favoriteData)
  console.log(this.favoriteData)
  console.log(Object.keys(this.favoriteData).length)
  if(Object.keys(this.favoriteData).length == 0){return false;}
  this.favoriteArray=[];
  let i = 1
    for (const [key,value] of Object.entries(this.favoriteData)){
      let tmp:any = [i]
      tmp.push.apply(tmp, value)
      this.favoriteArray.push(tmp)
      i = i+1
    } 
  console.log(this.favoriteArray)
  return true
}

deleteFavorite(name:any){
  console.log(String(name).replaceAll(" ",""))
  this.favoriteData = localStorage.getItem("favorite")
  this.favoriteData = JSON.parse(this.favoriteData)
  delete this.favoriteData[String(name).replaceAll(" ","")]
  localStorage.setItem("favorite", JSON.stringify(this.favoriteData))
  alert("Removed from favorites!");
}
}
