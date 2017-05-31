'use strict';

(function(){

class TheatreComponent {
  constructor($http, $scope, socket, $filter) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];
    this.omdbi=[];


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }


 $onInit() {
    this.$http.get('/api/theatres')
      .then(response => {
        this.awesomeThings =response.data;

//this.awesomeThings=JSON.stringify(this.awesomeThings));

     //window.alert(JSON.stringify(this.awesomeThings));
        this.socket.syncUpdates('thing', this.awesomeThings);

      });
	  this.cityList = [
    // { city_name: "--Choose a city--", theatre_name:"Choose a theatre name"},
    //Mumbai
    { city_name: "Mumbai.", theatre_name:"IMAX BIG Cinemas", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Mumbai.", theatre_name:"Inox R-City Ghatkopar", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Mumbai.", theatre_name:"Big Cinema, R city Mall", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Mumbai.", theatre_name:"PVR Cinema", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Mumbai.", theatre_name:"Eros Cinema", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Mumbai.", theatre_name:"Regal Theatre", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Delhi
    { city_name: "Delhi.", theatre_name:"PVR Cinemas - PVR Gold Class", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Delhi.", theatre_name:"Cinepolis Unity One - Rohini", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Delhi.", theatre_name:"PVR Vikaspuri", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Delhi.", theatre_name:"PVR Cinemas", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Delhi.", theatre_name:"Big Cinemas", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Delhi.", theatre_name:"Fun Cinema", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
      { city_name: "Delhi.", theatre_name:"Q Cinemas", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Kolkata
    { city_name: "Kolkata.", theatre_name:"New Empire Cinema", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Kolkata.", theatre_name:"Priya Cinema", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Kolkata.", theatre_name:"Nandan West Bengal Film Centre", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Kolkata.", theatre_name:"Cinepolis - Lake Mall", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Kolkata.", theatre_name:"Prachi Cinema", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Kolkata.", theatre_name:"Menoka Cinema", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Kolkata.", theatre_name:"Ashoka Cinema", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Bengaluru
    { city_name: "Bengaluru.", theatre_name:"Pune", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Bengaluru.", theatre_name:"4", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Bengaluru.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Bengaluru.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Hyderabad
    { city_name: "Hyderabad.", theatre_name:"Pune", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Hyderabad.", theatre_name:"4", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Hyderabad.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Hyderabad.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Chennai
    { city_name: "Chennai.", theatre_name:"Pune", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Chennai.", theatre_name:"4", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Chennai.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Chennai.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Ahmedabad
    { city_name: "Ahmedabad.", theatre_name:"Pune", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Ahmedabad.", theatre_name:"4", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Ahmedabad.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Ahmedabad.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Pune
    { city_name: "Pune.", theatre_name:"Pune", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Pune.", theatre_name:"4", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Pune.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Pune.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Surat
    { city_name: "Surat.", theatre_name:"Pune", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Surat.", theatre_name:"4", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Surat.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Surat.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Visakhapatnam
    { city_name: "Visakhapatnam.", theatre_name:"Pune", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Visakhapatnam.", theatre_name:"4", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Visakhapatnam.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Visakhapatnam.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Bhubaneswar
    { city_name: "Bhubaneswar.", theatre_name:"Pune", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Bhubaneswar.", theatre_name:"4", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Bhubaneswar.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Bhubaneswar.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},

    //Chandigarh
    { city_name: "Chandigarh.", theatre_name:"Pune", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Chandigarh.", theatre_name:"4", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Chandigarh.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
    { city_name: "Chandigarh.", theatre_name:"5", showtime:[{time:'1'},{time:'2'},{time:'3'}]},
  ];
  this.numefructe = _.uniq(this.cityList, 'city_name');
  }

updatetheater(theater)
{

  var theatername=[];
    //console.log(movies.title);
    this.$http.get('/api/theraterallocates')
      .then(response => {
    theatername =response.data;
    var flag=0;
    console.log(theatername)
  for(var i=0;i<theatername.length;i++)
  {
  if(theater.state== theatername[i].state && theater.location == theatername[i].location )
  {
    flag=1;
  }
  }
  if(flag==1)
  {
  alert(" Theater is allready book for the movie , so it can't be Update from this page.");
  }
  else {


    if(theater.seat==80 || theater.seat==100 ||theater.seat==130 )
    {


      this.$http.put( '/api/theatres/'+theater._id ,JSON.stringify(theater));



      }
      else {
      alert('wrong seat entry please enter 80 or 100 0r 130 ');
      }

  }

  });






///////

}

deletetheater(theater)
{
  var theatername=[];
    //console.log(movies.title);
    this.$http.get('/api/theraterallocates')
      .then(response => {
    theatername =response.data;
    var flag=0;
    console.log(theatername)
  for(var i=0;i<theatername.length;i++)
  {
  if(theater.state== theatername[i].state && theater.location == theatername[i].location )
  {
    flag=1;
  }
  }
  if(flag==1)
  {
  alert(" Theater is allready book for the movie , so it can't be delete from this page.");
  }
  else {
this.$http.delete('/api/theatres/' + theater._id);
  }

});

}



  getdata(){


    this.$http.get('http://www.omdbapi.com/?t='+this.t+'&y='+this.y)
      .then(response => {

        this.omdbi =response.data;


        if(this.omdbi.Poster==null)
        {
alert("no data found")

        }


        this.socket.syncUpdates('thing', this.omdbi);

      });
      }




  addThing() {

      this.$http.post('/api/theatres', {

        state:this.state,
        location:this.location1,
        seat:this.seat




      });
window.alert("data inserted");
this.state="";
this.location1="";
this.seat="";
      this.newThing = '';
    }
}





angular.module('merafilmApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
  //  controllerAs: Omdbi
  });

})();
