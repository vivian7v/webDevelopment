import { CallBackendService } from './../call-backend.service';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-res-table',
  templateUrl: './res-table.component.html',
  styleUrls: ['./res-table.component.css']
})
export class ResTableComponent implements OnInit{
  @Input() tableData!:any;
  public detail:any=[];
  public oriDetail:any;
  public venueDetail:any=[];
  public venueId:any='';
  public artistTable:any;
  public twitterUrl:any="";
  public lat:any;
  public lng:any;
  ngOnInit(): void{
    
  }
  constructor(private callBackendService:CallBackendService){}

  showTable(): boolean{
    // console.log(this.callBackendService.showTable);
    return this.callBackendService.showTable;
  }

  getDetailFromServer(id:any){
    this.callBackendService.detailFromSever(id).subscribe((res:any) =>{     
      this.detail = [];
      console.log(res);
      this.oriDetail = res;
      console.log(this.oriDetail);
      // this.detail.push(["Name",res.name]);
      
      // if(res.dates.start.localDate){
      //   if(res.dates.start.localTime){
      //     this.detail.push(["Date",[res.dates.start.localDate,res.dates.start.localTime]]);
      //   }else{
      //   this.detail.push(["Date",[res.dates.start.localDate]]);}
      // }

      // let artist = [];
      // let artistbody = [];
      // artist.push("Artist/Team");
      // if(res._embedded.attractions){
      //   for(let i=0; i<res._embedded.attractions.length;i++){
      //     artistbody.push(res._embedded.attractions[i].name);
      //   }
      // }
      // artist.push(artistbody);
      // this.detail.push(artist);

      if(res._embedded.venues){
        this.detail.push(["Venue",[res._embedded.venues[0].name]]);
        this.venueId = res._embedded.venues[0].id;
      }
      // let genres = [];
      // // genres.push("Genres");
      // if(res.classifications[0].genre){
      //   genres.push(res.classifications[0].genre.name);
      // }
      // if(res.classifications[0].subGenre){
      //   genres.push(res.classifications[0].subGenre.name);
      // }
      // if(res.classifications[0].segment){
      //   genres.push(res.classifications[0].segment.name);
      // }
      // if(res.classifications[0].type){
      //   genres.push(res.classifications[0].type.name);
      // }
      // if(res.classifications[0].subType){
      //   genres.push(res.classifications[0].subType.name);
      // }
      // this.detail.push(["Genres",genres]);

      
      // if(res.priceRanges){
      //   this.detail.push(["priceRanges",[res.priceRanges[0].min, res.priceRanges[0].max, res.priceRanges[0].currency]]);
      // }
      // if(res.dates.status.code){
      //   this.detail.push(["Ticket Statues",[res.dates.status.code]]);
      // }
      // if(res.url){
      //   this.detail.push(["Buy Ticket At",[res.url]]);
      // }

      // if(res.seatmap){
      //   this.detail.push(["seatMap",[res.seatmap.staticUrl]])
      // }

      // console.log(this.detail);
      this.callBackendService.showDetail = true;
      this.callBackendService.showTable = false;

      let Artists=[]
      for(let i=0; i<res._embedded.attractions.length;i++){
        if(res._embedded.attractions[0].classifications[0].segment.name=="Music"){
          Artists.push(res._embedded.attractions[i].name);
        }
      }

      this.twitterUrl = res.url;
      this.getArtistDetailFromServer(Artists);
      this.getVenueDetailFromServer();
    })    
     
  }

  getDetail(){
    // this.callBackendService.showDetail = true;
    // this.callBackendService.showTable = false;
    return this.detail;
  }

  getoriDetail(){
    return this.oriDetail;
  }

  getArtistDetailFromServer(artist:any){
        // this.callBackendService.getSpotifytoken().subscribe((res:any)=>{
          console.log("执行spotify")
          this.artistTable = [];
          for(let i=0; i<artist.length; i++){
            //this.callBackendService.spotifyLogin();
            this.callBackendService.callSpotifyArtist(artist[i]).subscribe((res:any)=>{
              console.log(res);
              let artistData= [];
              artistData.push(res.artists.items[0].name);
              artistData.push(res.artists.items[0].followers.total);
              artistData.push(res.artists.items[0].popularity);
              artistData.push(res.artists.items[0].external_urls.spotify);
              artistData.push(res.artists.items[0].images[0].url);
              this.callBackendService.callSpotifyAlbum(res.artists.items[0].id).subscribe((res:any)=>{
                console.log(res);
                let album = [];
                for(let i =0;i<res.body.items.length; i++){
                  album.push(res.body.items[i].images[0].url);
                }
                artistData.push(album);
              })
              this.artistTable.push(artistData);
              console.log(this.artistTable);
            })
          }
        console.log(this.artistTable);  
  }

  getArtist(){
    // console.log(this.artistTable); 
    return this.artistTable;
  }

  getVenueDetailFromServer(){
    this.callBackendService.venueDetailFromServer(this.venueId).subscribe((res:any)=>{
      console.log(res);
      this.venueDetail= [];
      this.venueDetail=res;

      // this.venueDetail=[];

      // this.venueDetail.push(["Name",res.name]);

      // let address = [];
      // address.push("Address");
      // if(res.address.line1){
      //   address.push(res.address.line1);
      // }
      // if(res.state){
      //   address.push(res.state.name);
      //   address.push(res.state.stateCode);
      // }
      // this.venueDetail.push(address);

      // if(res.boxOfficeInfo){
      //   if(res.boxOfficeInfo.phoneNumberDetail){
      //   this.venueDetail.push(["Phone Number",res.boxOfficeInfo.phoneNumberDetail])
      //   }
      //   if(res.boxOfficeInfo.openHoursDetail){
      //     this.venueDetail.push(["Open Hours",res.boxOfficeInfo.openHoursDetail])
      //   } 
       
      // }
      
      // if(res.generalInfo){
      //   if(res.generalInfo.generalRule){
      //     this.venueDetail.push(["General Rule",res.generalInfo.generalRule])
      //   }
      //   if(res.generalInfo.childRule){
      //     this.venueDetail.push(["Child Rule",res.generalInfo.childRule])
      //   }
      // }
      this.lat = res.location.latitude;
      this.lng = res.location.longitude;
      console.log(this.lat);
      console.log(this.lng)
    })
  }

  getVenue(){
    return this.venueDetail;
  }

  getLat(){
    return this.lat;
  }

  getLng(){
    return this.lng;
  }
  // callSpotify(artist:any){
  //   var SpotifyWebApi = require('spotify-web-api-node');
  //   var credentials = {
  //     clientId: 'd60295f3f0ff419da77660d021e0aaff',
  //     clientSecret: '618e85851fd04b9db36ef2e29b40a54c',
  //     redirectUri: 'http://google.com'
  //   };
    
  //   var spotifyApi = new SpotifyWebApi(credentials);
    
  //   // The code that's returned as a query parameter to the redirect URI
  //   var code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';
    
  //   // Retrieve an access token and a refresh token
  //   spotifyApi.authorizationCodeGrant(code).then(
  //     function(data: any) {
  //       console.log('The token expires in ' + data.body['expires_in']);
  //       console.log('The access token is ' + data.body['access_token']);
  //       console.log('The refresh token is ' + data.body['refresh_token']);
    
  //       // Set the access token on the API object to use it in later calls
  //       spotifyApi.setAccessToken(data.body['access_token']);
  //       spotifyApi.setRefreshToken(data.body['refresh_token']);
  //     },
  //     function(error: any) {
  //       console.log('Something went wrong!', error);
  //     }
  //   );
  //   // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
  //   spotifyApi.refreshAccessToken().then(
  //     function(data: any) {
  //       console.log('The access token has been refreshed!');

  //       // Save the access token so that it's used in future calls
  //       spotifyApi.setAccessToken(data.body['access_token']);
  //     },
  //     function(err: any) {
  //       console.log('Could not refresh access token', err);
  //     });
  //   // Search artists whose name contains 'Love'
  //   spotifyApi.searchArtists(artist)
  //     .then(function(data:any) {
  //       console.log('Search artists by "Love"', data.body);
  //     }, function(err:any) {
  //       console.error(err);
  //     });
  // }
}
