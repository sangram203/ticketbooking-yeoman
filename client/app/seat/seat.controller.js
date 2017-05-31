'use strict';

(function(){

class SeatComponent {
  constructor($http, $scope, socket, $rootScope) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

this.seat2=[];
this.seats=[];
this.ss=1;
this.totalprice;
this.time;
this.movietitle;
this.name1;
this.date;
this.selectedseat=[];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }



seat1(seat)
{
  var a=this.s
var b=seat;
var price=this.seats[0].price;


console.log(this.selectedseat);
var color=document.getElementById(seat).getAttribute("style");
var bcolor=document.getElementById(seat).getAttribute("style");

if(this.ss<=a && color!="fill:green" && bcolor!="fill:brown")
{
  document.getElementById(seat).setAttribute("style","fill:green");

this.totalprice=price*this.ss;

this.ss++;
this.selectedseat.push(seat);



}
else if(color=="fill:green")
{
  document.getElementById(seat).setAttribute("style","fill:''");
  console.log(seat);
this.ss--;
this.totalprice=this.totalprice-price;

var data=this.selectedseat.indexOf(seat);
console.log(data);
if(data>-1)
{
  this.selectedseat.splice (data,1);
}


}

  else if(a==null)
  {
    alert("please choice number of seats ")
  }
  else if(bcolor=="fill:brown")
  {
    alert("seat already book");
  }
  else{
    alert("all seat selected ")

  }
  sessionStorage.setItem('seat',this.selectedseat);
  sessionStorage.setItem('price',this.totalprice);
}


paymentpage()
{

  window.location = "/payment";
}

$onInit() {


this.time=sessionStorage.getItem('time');
this.movietitle=sessionStorage.getItem('movietitle');
this.date=sessionStorage.getItem('date');
this.name1=sessionStorage.getItem('name');
  var s_seat=0,no_of_seat,no;
var countdiv=[];
  var seatOnload = function(){

  $(document).ready(function(){
    $('#Seatclass').change(function(){
      var sel=$('#Seatclass').find(":selected").text();
      if(sel=="Premier")
      {

      $('#silver .seatname').addClass('grey');
      $('#gold .seatname').removeClass('grey');
      }

      if(sel=="Executive")
      {
        $('#gold .seatname').addClass('grey');
        $('#silver .seatname').removeClass('grey');
      }

    $('#noofseats').change(function(){
       no = $('#noofseats').find(":selected").text();
	   console.log(no)
      no_of_seat=document.getElementById("totalst").innerHTML= no;
      alert(no);
    $('.seatname').click(function(){

    if(!$(this).hasClass('grey')||$(this).hasClass('red'))
    {
  //alert($(this).hasClass('grey'));
      if(countdiv.length < no)
      {

        $(this).toggleClass("d1");
        var id=$(this).attr('id');
        var cn=$(this).hasClass('d1');

        if(cn)
            {
                countdiv.push(id);
                  this.TotalSeat=JSON.stringify(countdiv);
				s_seat= document.getElementById("st").innerHTML=countdiv;
              // count++;

              }

        else{
              var ind=countdiv.indexOf(id);
              countdiv.splice(ind,1);
              this.TotalSeat=JSON.stringify(countdiv);
            }
  if(sel== "SILVER")
  {
    document.getElementById("amt").innerHTML=countdiv.length*200;
  }
  else
  {
    document.getElementById("amt").innerHTML=countdiv.length*280;
  }

  }
  else {

          alert("Request you to  book only " + no +" seats");
    }
  }
  this.totalprice = document.getElementById("amt").innerHTML;
	sessionStorage.setItem('tprice', this.totalprice);
	this.st= document.getElementById("st").innerHTML;
	sessionStorage.setItem('st', this.st);
  });
	
  });

  });

  });

};
seatOnload();

  this.$http.get('/api/seats')
    .then(response => {
      this.awesomeThings = response.data;
  var s=sessionStorage.getItem("seat");
 for(var a=0;a<=this.awesomeThings.length;a++)
 {
   try{


   if(s==this.awesomeThings[a].seatPlan.count)
   {
     this.seats.push(this.awesomeThings[a].seatPlan);

     console.log(this.seats)
   }
   }
   catch(e){

   }


 }




      this.socket.syncUpdates('thing', this.awesomeThings);
    });

    this.$http.get('/api/payments')
      .then(response => {
        this.seat2=response.data;
    //    console.log(this.seat2[0].selectedseat);
var a=response.data.length;

var d = [];

  for(var i=0;i<=a;i++)
  {
    try {
      if(this.date==this.seat2[i].showdate && this.time==this.seat2[i].Showtime && this.name1==this.seat2[i].theater)
      {
        var booked=this.seat2[i].selectedseat.toString();
        console.log(booked);
        var abc = booked.split(",")
        for(var j = 0 ; j < abc.length ; j++)
        {
          d.push(abc[j])
        }
          }
    } catch (e) {
    }
}

for(var j = 0 ; j < d.length ; j++)
{
  document.getElementById(d[j]).setAttribute("style","fill:brown");
}
     });
}}
angular.module('merafilmApp')
  .component('seat', {
    templateUrl: 'app/seat/seat.html',
    controller: SeatComponent,
  //  controllerAs: Seat
  });

})();
