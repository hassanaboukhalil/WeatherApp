//// api key mn openweathermap api
// let weather_api_key = 'YOUR_OPENWEATHERMAP_API_KEY'
let weather_api_key = "9f10861628fcafde23b7b908bef6e091";



//// api key mn unplash
// let unsplash_api_key = 'YOUR_UNSPLASH_API_KEY'
let unsplash_api_key = "mbjH1KCNl1UsngDntvfytRQQ0S8uKBeLkrgrKtC7Dn0"



const box = document.getElementsByClassName("box")[0];
const search_div = document.getElementsByClassName("search-div")[0];


//geting the city value yalle ma7tot bl bedeye bl search
let city = document.getElementById("city").value;


improve_box();


//// ta7ded 7ajeb L screen wa 3ala hayda L 2asas b7aded eza image_orientation = portrait aw image_orientation = landscape
let image_orientation = "landscape"
var x = window.matchMedia("(max-width: 912px)") // sta3malta 3ashn e3mal 3layha event 3ashn 2e3ref eza L user 8ayyar L orientation

portrait_or_landscrape()

/*
    - when the user change the orientation of the device , the event will be triggered
*/
x.addEventListener("change",()=>{
    // myFunction(x);
    portrait_or_landscrape()
    improve_box()
    getimage(city)
})


//// set an initial image
if(image_orientation == "landscape"){
    document.getElementById("img").src = '../images/dubai.jpeg';
}
else{
    document.getElementById("img").src = '../images/dubai_portrait.jpeg';
}


////getting the weather data
let url2 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID="+weather_api_key;
const xhttp2 = new XMLHttpRequest();
xhttp2.onload = function(){
    console.log(this.responseText);
    const obj2 = JSON.parse(this.responseText);

    ////puting the weather data in the box
    document.getElementById("weatherintxt").innerHTML = "Weather in "+obj2.name;
    var weather = Math.round(obj2.main.temp - 273.15);
    document.getElementById("nb_weather").innerHTML = weather+"°C";

    document.getElementById("discription").innerHTML = obj2.weather[0].description;
    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${obj2.weather[0].icon}@2x.png`;


    document.getElementById("humanidity").innerHTML = "Humidity: "+obj2.main.humidity + "%";
    document.getElementById("wind_speed").innerHTML = "Wind speed: "+obj2.wind.speed + "km/h";
    ////
}
xhttp2.open("POST",url2,true);
xhttp2.send();
////



/*
    - triggered when the user press the search icon
    - check if 
*/
function search(){
    city = document.getElementById("city").value;
    document.getElementById("weatherintxt").style.color = "white"
    document.getElementById("weatherintxt").style.paddingBottom = "initial"
    if(city == ""){
        x=document.getElementsByClassName("text");
        for(i in x){
            x[i].innerHTML = "";
        }
        document.getElementById("icon").src = ""
        getimage(undefined)
    }
    else{
        url2 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID="+weather_api_key;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            //console.log(this.responseText);
            const obj = JSON.parse(this.responseText);
            getimage(undefined)
            if(obj.name == undefined){
                x=document.getElementsByClassName("text");
                for(i in x){
                    x[i].innerHTML = "";
                }
                document.getElementById("icon").src = ""
                document.getElementById("weatherintxt").innerHTML = "Wrong City Name"
                document.getElementById("weatherintxt").style.color = "red"
                document.getElementById("weatherintxt").style.paddingBottom = "20px"
            }
            else{
                // document.getElementById("weatherintxt").innerHTML = "";
                // document.getElementById("weatherintxt").style.color = "white"
                // document.getElementById("weatherintxt").style.paddingBottom = "inherit"
                getimage(city);
                document.getElementById("weatherintxt").innerHTML = "Weather in "+obj.name;
                var weather = Math.round(obj.main.temp - 273.15);
                document.getElementById("icon").src = `http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`;
                document.getElementById("nb_weather").innerHTML = weather+"°C";
                document.getElementById("discription").innerHTML = obj.weather[0].description;
                document.getElementById("humanidity").innerHTML = "Humidity: "+obj.main.humidity + "%";
                document.getElementById("wind_speed").innerHTML = "Wind speed: "+obj.wind.speed + "km/h";
                // console.log(obj);
            }
        }
        xhttp.open("POST",url2);
        xhttp.send();
    }
}


/*
    - getting the image of the city
*/
function getimage(city){
    if(city != undefined){
        //////////////////////geting the image from unsplash
        
        // if(window.matchMedia("(max-width: 700px)")){
        //     url2 = `https://api.unsplash.com/search/photos?query=${city}&orientation=${image_orientation}&client_id=${unsplash_api_key}`;
        // }

        url2 = `https://api.unsplash.com/search/photos?query=${city}&orientation=${image_orientation}&client_id=${unsplash_api_key}`;

        const xhttp2 = new XMLHttpRequest();
        xhttp2.onload = function(){
            //console.log(this.responseText);
            const obj2 = JSON.parse(this.responseText);

            console.log(obj2);

            // document.body.style.backgroundImage = `url(${obj2.results[0].urls.full})`; //haydee 2emtaaaaaaaaaaaaaaaaaaaa
            document.getElementById("img").src = obj2.results[0].urls.full; // hayde jdedeeeeeeeeeeeeeee


        }
        xhttp2.open("GET",url2);
        xhttp2.send();
        ///////////////////////////////////////
    }
    else{
        document.getElementById("img").src = '../images/white_bg.jpg';
    }
}


/*
    - put a suitable size to the text that is inside the box that contain the weather data
    - make the width and height of the body equal to the width and height of the screen
*/
function improve_box(){

    document.body.style.width = window.innerWidth + "px";
    document.body.style.height = window.innerHeight + "px";

    ////margin of search div
    let margin1 = get_margin_top(search_div)

    //// getting the height of the box
    let h1 = get_height(box)

    //// getting the height and margin top of the search box
    let h2 = get_height(search_div)

    ////calculating and puting the height of the div txt
    const div_txt = document.getElementsByClassName("div-txt")[0];
    div_txt.style.height = h1 - h2 - margin1 + "px";
}


/*
    - get the heigt of an element
*/
function get_height(obj){
    let styleofObj1 = window.getComputedStyle(obj,null);
    let h1 = styleofObj1.height; // betale3a m3 klmet px
    h1 = h1.replace("px", "");
    h1 = parseInt(h1);
    return h1
}


/*
    - get the margin top of an element
*/
function get_margin_top(obj){
    let styleofObj1 = window.getComputedStyle(obj,null);
    margin1 = styleofObj1.marginTop; // betale3a m3 klmet px
    margin1 = margin1.replace("px", "");
    margin1 = parseInt(margin1);
    return margin1
}


/*
    - check if the media query specified is monaseba la 7ajeb L screen of the device
*/
function myFunction(x) {
    if (x.matches) { // If media query matches
        image_orientation = "portrait"
    }
    else{
        image_orientation = "landscape"
    }
}


/*
    - if width of device > height of device => landscrape
    - else portrait
*/
function portrait_or_landscrape(){
    if(window.innerHeight > window.innerWidth){
        image_orientation = "portrait"
    }
    else{
        image_orientation = "landscape"
    }
}
