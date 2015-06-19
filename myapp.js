/*
Skycons is a set of ten animated weather glyphs, procedurally generated by JavaScript using the HTML5 canvas tag.
http://darkskyapp.github.io/skycons/
*/

var skycons = new Skycons();
  // on Android, a nasty hack is needed: {"resizeClear": true}
 


    
  // you can add a canvas by it's ID...
  skycons.add("today", Skycons.PARTLY_CLOUDY_DAY);
  skycons.add("day1", Skycons.CLEAR_DAY);
  skycons.add("day2", Skycons.CLOUDY);
  skycons.add("day3", Skycons.RAIN);

  // start animation!
  skycons.play();
  
  // want to change the icon? no problem:
  skycons.set("today", Skycons.PARTLY_CLOUDY_NIGHT);



//call back function for YGL
 var callbackFunction = function(data) {
    var item = data.query.results.channel.item;
    var cond = item.condition;
    //var forecast = item.forecast[1];  
    var forecast = item.forecast;      
    changeToday(cond.temp, cond.date, cond.text, cond.code);
    changeDay1(forecast[1].low, forecast[1].high, forecast[1].date,  forecast[1].code  );
    changeDay2(forecast[2].low, forecast[2].high, forecast[2].date,  forecast[2].code  );
    changeDay3(forecast[3].low, forecast[3].high, forecast[3].date,  forecast[3].code  );  
    
  };


//convert Fahrenheit to Celsius
var f2c = function(f) {
    return Math.round((f-32.0)*5.0/9.0);
 };


// change Today's value
var changeToday = function(temperature_now, today, weather, yahoocode  ){

/* $('.temperature').replaceWith('<span class="temperature">'
                              + f2c(temperature_now)
                              + '</span>'); */
$('.temperature').text(f2c(temperature_now));
                                                          
$('.condition').replaceWith('<div class="condition"><span class="date">'
                              + today
                              + '</span> : '
                              + weather
                              + '</div>');                                                          
setSkyconsByYahooCode("today",yahoocode);                              

};

// change Day 1 next
var changeDay1 = function(tempL, tempH, day,  yahoocode ){
  $('th').each( function (index) {
     if (index === 0) {$(this).text(day)}
     });
  $('td').each( function (index) {
     if (index===0) { $(this).replaceWith('<td>'+Math.round((f-32.0)*5.0/9.0)(tempL)+'-'+Math.round((f-32.0)*5.0/9.0)(tempH)+' &#8451;</td>');}  
    });
  setSkyconsByYahooCode("day1",yahoocode);                              
};
// change Day 2 next
var changeDay2 = function(tempL, tempH, day,  yahoocode ){
  $('th').each( function (index) {
     if (index === 1) {$(this).text(day)}
     });
  $('td').each( function (index) {
     if (index===1) { $(this).replaceWith('<td>'+Math.round((f-32.0)*5.0/9.0)(tempL)+'-'+Math.round((f-32.0)*5.0/9.0)(tempH)+' &#8451;</td>');}  
    });
  setSkyconsByYahooCode("day2",yahoocode);                              
};
// change Day 3 next
var changeDay3 = function(tempL, tempH, day,  yahoocode ){
  $('th').each( function (index) {
     if (index === 2) {$(this).text(day)}
     });
  $('td').each( function (index) {
     if (index===2) { $(this).replaceWith('<td>'+Math.round((f-32.0)*5.0/9.0)(tempL)+'-'+Math.round((f-32.0)*5.0/9.0)(tempH)+' &#8451;</td>');}  
    });
  setSkyconsByYahooCode("day3",yahoocode);                              
};  



  
/*
Get value from Bootstrap dropdown menu
*/
$('#dropdown li').on('click', function(){
    //alert($(this).text());
$('button').replaceWith('<button class=\"btn btn-default btn-lg dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"  aria-expanded=\"false\">'
                          + $(this).text() 
                          + '<span class=\"caret\"></span></button>');

//changeToday('','','');


var yql = "http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where woeid in (select woeid from geo.places(1) where text='"
  +$(this).text()
  +"')&format=json";

$.getJSON(yql,callbackFunction);


});

/* 
  Skycons.CLEAR_DAY 
  Skycons.CLEAR_NIGHT 
  Skycons.PARTLY_CLOUDY_DAY 
  Skycons.PARTLY_CLOUDY_NIGHT 
  Skycons.CLOUDY 
  Skycons.RAIN 
  Skycons.SLEET 
  Skycons.SNOW 
  Skycons.WIND 
  Skycons.FOG 
  */
// Set Skycons from Yahoo Weather condition Code 
var setSkyconsByYahooCode  = function(canvasid,yahoocode) {
  switch(yahoocode) {
    case "0":  //tornado
        skycons.set(canvasid, Skycons.SLEET);
        break;
    case "1": //tropical storm
        skycons.set(canvasid, Skycons.SLEET);
        break;
    case "2": //hurricane
        skycons.set(canvasid, Skycons.SLEET);
        break;
    case "3":  //severe thunderstorms
        skycons.set(canvasid, Skycons.SLEET);
        break;
    case "4":  //thunderstorms
        skycons.set(canvasid, Skycons.SLEET);
        break;
    case "5":  //mixed rain and snow
        skycons.set(canvasid, Skycons.SNOW);
        break;        
    case "6":  //mixed rain and sleet
        skycons.set(canvasid, Skycons.SLEET);
        break;        
    case "7":  //mixed snow and sleet
        skycons.set(canvasid, Skycons.SNOW);
        break;        
    case "8":  //freezing drizzle
        skycons.set(canvasid, Skycons.RAIN);
        break;        
    case "9":  //drizzle
        skycons.set(canvasid, Skycons.RAIN);
        break;        
    case "10":  //freezing rain
        skycons.set(canvasid, Skycons.RAIN);
        break;        
    case "11":  //showers
        skycons.set(canvasid, Skycons.RAIN);
        break;        
    case "12":  //showers
        skycons.set(canvasid, Skycons.RAIN);
        break;        
    case "13":  //snow flurries
        skycons.set(canvasid, Skycons.SNOW);
        break;        
    case "14":  //light snow showers
        skycons.set(canvasid, Skycons.SNOW);
        break;        
    case "15":  //blowing snow
        skycons.set(canvasid, Skycons.SNOW);
        break;        
    case "16":  //snow
        skycons.set(canvasid, Skycons.SNOW);
        break;        
    case "17":  //hail
        skycons.set(canvasid, Skycons.SNOW);
        break;        
    case "18":  //sleet
        skycons.set(canvasid, Skycons.SLEET);
        break;        
    case "19":  //dust
        skycons.set(canvasid, Skycons.FOG);
        break;        
    case "20":  //foggy
        skycons.set(canvasid, Skycons.FOG);
        break;       
    case "21":  //haze
        skycons.set(canvasid, Skycons.FOG);
        break;       
    case "22":  //smoky
        skycons.set(canvasid, Skycons.FOG);
        break;       
    case "23":  //blustery
        skycons.set(canvasid, Skycons.FOG);
        break;               
    case "24":  //windy
        skycons.set(canvasid, Skycons.WIND);
        break;         
    case "25":  //cold
        skycons.set(canvasid, Skycons.WIND);
        break;               
    case "26":  //cloudy
        skycons.set(canvasid, Skycons.CLOUDY);
        break;               
    case "27":  //mostly cloudy (night)
        skycons.set(canvasid, Skycons.CLOUDY);
        break;               
    case "28":  //mostly cloudy (day)
        skycons.set(canvasid, Skycons.CLOUDY);
        break;               
    case "29":  //partly cloudy (night)
        skycons.set(canvasid, Skycons.PARTLY_CLOUDY_NIGHT);
        break;               
    case "30":  //partly cloudy (day)
        skycons.set(canvasid, Skycons.PARTLY_CLOUDY_DAY);
        break;      
    case "31":  //clear (night)
        skycons.set(canvasid, Skycons.CLEAR_NIGHT);
        break;              
    case "32":  //sunny
        skycons.set(canvasid, Skycons.CLEAR_DAY);
        break;              
    case "33":  //fair (night)
        skycons.set(canvasid, Skycons.CLEAR_NIGHT);
        break;              
    case "34":  //fair (day)
        skycons.set(canvasid, Skycons.CLEAR_DAY);
        break;              
    case "35":  //mixed rain and hail
        skycons.set(canvasid, Skycons.RAIN);
        break;              
    case "36":  //hot
        skycons.set(canvasid, Skycons.CLEAR_DAY);
        break;              
    case "37":  //isolated thunderstorms
        skycons.set(canvasid, Skycons.RAIN);
        break;              
    case "38":  //scattered thunderstorms
        skycons.set(canvasid, Skycons.RAIN);
        break;              
    case "39":  //scattered thunderstorms
        skycons.set(canvasid, Skycons.RAIN);
        break;              
    case "40":  //scattered showers
        skycons.set(canvasid, Skycons.RAIN);
        break;              
    case "41":  //heavy snow
        skycons.set(canvasid, Skycons.SNOW);
        break;              
    case "42":  //scattered snow showers
        skycons.set(canvasid, Skycons.SNOW);
        break;              
    case "43":  //heavy snow
        skycons.set(canvasid, Skycons.SNOW);
        break;              
    case "44":  //partly cloudy
        skycons.set(canvasid, Skycons.CLOUDY);
        break;              
    case "45":  //thundershowers
        skycons.set(canvasid, Skycons.RAIN);
        break;              
    case "46":  //snow showers
        skycons.set(canvasid, Skycons.SNOW);
        break;              
    case "47":  //isolated thundershowers
        skycons.set(canvasid, Skycons.RAIN);
        break;                      
    default:
        skycons.set(canvasid, Skycons.CLEAR_DAY);
    };    
};


