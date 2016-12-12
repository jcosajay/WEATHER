var weatherData;
var mapImage;
var myFont;
var centerX;
var centerY;
//selects the location of the circle
var selectionX;
var selectionY;
var mapLocationX = 100;
var mapLocationY = 190;
var mapSizeX = 360;
var mapSizeY = 180;

function preload(){
  myFont = loadFont("HelveticaNeue-Thin.otf");
  mapImage = loadImage("mp.png");
}

function setup() {
  createCanvas(1080,720);
  angleMode(DEGREES);
  
  textFont(myFont);
  textSize(24);
  textAlign(CENTER);
  fill('red');
  
  centerX = width/2;
  centerY = height/2;
  
  loadJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=1f34481f4e658616e669e4cae23725eb&units=imperial", gotData);
  
   colors = [color(255,153,0),color(0,145,255),color(112,178,192),color(300),color(0),color(25,108,137)];
}

function gotData(data){
  //this callback function executes once the json has arrived
  //takes the json in the data argument and dumps it in the weatherData variable
  weatherData = data;
}

function draw() {
  background(colors[2]);
  /*var time = frameCount * 0.001;
  var up = map(noise(time),0,1,0,height);
  */
  
  //TITLE
  fill(colors[3]);
  textSize(70);
  text("Global Weather",width/2,70);
  
  
  noStroke();
  fill(colors[0]);
  ellipse(width/1.4,350,450,450);
  
  image(mapImage,mapLocationX,mapLocationY,mapSizeX,mapSizeY);
  //mapImage = (mapLocationX,mapSizeX,mapLocationY,mapSizeY);
  
    for(var i = 0; i < 1; i++){
      var speed = 0.01;
      //wave length
      var correlation = 1;
      var time = (frameCount * speed)+(i*correlation);
      var size = map(noise(time),0,5,0,720);
     // var size = map(400);
      //var spacer = 80;
      push();  
        translate(width/1.4,350);
         if(weatherData){
        rotate((weatherData.main.humidity)*4);
         
            fill(colors[3]);
            noStroke();
        ellipse(170,170, weatherData.main.temp,weatherData.main.temp);
        
        //WIND SPEED DOTS
               for (var x = 0; x < width; x+=10) {
	              	for (var y = 0; y < height; y+=10) {
		              	var c = 255 * noise(.1 * x, .1 * y);
			               fill(c);
			               ellipse(x,y,weatherData.wind.speed*.1,weatherData.wind.speed*.1);
			               //rect(x, y, 10, 10);
          }
      pop();
    }
         }
    }
    
  
    /*if(weatherData){
     stroke(100);
     //ellipse(500,500,weatherData.wind.speed*3,weatherData.wind.speed*3);
      beginShape();
  for (var k = 0; k < 500; k++) {
	var nk = map(k, 0, width, 0, 10);
	var j = weatherData.wind.speed/1.4 * noise((nk)*weatherData.wind.speed);
	vertex(k, j);
  }
  endShape();
    }
    */
     /*beginShape();
  for (var x = 500; x < width; x++) {
	var nx = map(x, 0, width/1.4, 0, 0);
	var y = height * noise(nx);
	vertex(x, y);
	
  }
  endShape();
  
  */
   /* if(weatherData){
      noise(weatherData.main.humidity,500,900,500);
    }*/
    
    /*
    for (var x = 0; x < width; x+=10) {
	    	for (var y = 0; y < height; y+=10) {
		    	var c = 255 * noise(0.01 * x, 0.01 * y);
		    	fill(c);
			    ellipse(width/1.4,350,450,450);
	  	}		
  	}*/

  
  stroke(100);
  ellipse(selectionX,selectionY,10,10);
  
    
  //if the mouse is over the map
  if(mouseX > mapLocationX &&
    mouseX < (mapLocationX + mapSizeX) &&
    mouseY > mapLocationY &&
    mouseY < (mapLocationY + mapSizeY)
    ){
    //draw the crosshair lines
    line(mouseX,mapLocationY,mouseX,mapLocationY + mapSizeY);
    line(mapLocationX,mouseY,mapLocationX + mapSizeX,mouseY);
    textSize(25);
    noStroke();
    fill(colors[4]);
    
    //draw the lat and long coordinates
    text(floor(map(mouseY,mapLocationY,mapLocationY + mapSizeY,90,-90)),mapSizeX+30,mouseY - 4);
    text(floor(map(mouseX,mapLocationX,mapLocationX + mapSizeX,-180,180)),mouseX - 20,mapLocationY + 20);
    
    }
  
    
  
  //if weatherData is undefined, then this code will not execute undefined = FALSE anything
  if(weatherData){
    fill(colors[3]);
    noStroke();
    //City Name
    textSize(50);
    text(weatherData.name,width/1.4,240);
    //Country Name
    textSize(20);
    text(weatherData.sys.country,width/1.4,260);
    textSize(110);
    //temperature
    text(weatherData.main.temp + " °F",width/1.4,430);
    
    //weather type
    textSize(30);
    text(weatherData.weather[0].main,width/1.4,315);
    
    //wind speed
    text("Humidity " + weatherData.main.humidity,width/1.4,470);
    
    //Latitude
    //text(weatherData.coord.lat,width/2,320);
    //Longitude
    //text(weatherData.coord.lon,width/2,340);
    
    //wind(weatherData.wind.all,20,290);
  }
  
}


function mousePressed(){
  if(mouseX > mapLocationX &&
    mouseX <(mapLocationX + mapSizeX) &&
    mouseY > mapLocationY &&
    mouseY < (mapLocationY + mapSizeY)
    ){
      selectionX = mouseX;
      selectionY = mouseY;
      //grab the JSON based on the new selection
      var lon = map(selectionX,mapLocationX,mapLocationX + mapSizeX, -180,180);
      var lat = map(selectionY,mapLocationY,mapLocationY + mapSizeY, 90,-90);
      var start = "http://api.openweathermap.org/data/2.5/weather?lat="
      var end = "&appid=1f34481f4e658616e669e4cae23725eb&units=imperial"
      var url = start + lat + "&lon=" + lon + end;
      loadJSON(url, gotData);
      //println(mousePressed);
    }
}
