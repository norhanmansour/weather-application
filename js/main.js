var findCity = document.getElementById('findCity');
var searchBtn = document.getElementById('searchBtn')
var searchText;
var allData;
let apiKey = 'f10c93767c0847d8b57205049220206';

(function() {
    getData('paris'); // I will invoke myself
})();

findCity.addEventListener('keyup', function() {
    searchText = this.value;
    return searchText;
})

searchBtn.addEventListener('click', function() {
    getData(`${searchText}`)
});
//display data after click enter on keyboard
findCity.addEventListener('keydown', function(e) {
    if (e.key == 'Enter') {
        getData(`${searchText}`)
    }
});

// search in api
findCity.addEventListener('keyup', function(e) {
    let searchCity = e.target.value;
    if (searchCity.length > 2) {
        getData(`${searchCity}`)

    }
})


async function getData(cityName) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=yes&alerts=no`);
    var data = await response.json();
    allData = data;
    console.log(allData);
    await displayData();
}

// showdate
//
let date = new Date;
let days = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let currentDayIndex = date.getDay();
let currentDay = days[currentDayIndex];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let currentMonthIndex = date.getMonth();
let CurrentMonth = months[currentMonthIndex];
let currentDayDate = date.getDate();


//displaydata
//
async function displayData() {
    var weatherInfo = `
    <div  class="card  mx-2">
    <div  class="card-header header-bgc  d-flex justify-content-between  align-items-center">
    <p> ${currentDay}</p>
    <p class="card-title ">${currentDayDate+' '+CurrentMonth}</p>
    </div>
    <div class="card-body main-color">
       <div class="fs-1 text-white card-title mt-4">${allData.location.country}</div>
       <div class=" fs-3 text-white card-title">${allData.location.name}</div>

       <div class='d-flex justify-content-around  align-items-center'>
       <div class=" fs-1 text-white card-text mt-4">${allData.current.temp_c} <sup>o</sup>c</div>
       <img class="card-img w-25" src=https:${allData.current.condition.icon}> </img>
       </div>
       
       <div class='d-flex justify-content-around  align-items-center'>
       <div class="card-title mt-2 text-white"> <span class="text-warning ">Feels like  </span> ${allData.current.feelslike_c}</div>
       <div class="card-text text-secondary"> ${allData.current.condition.text} </div>
       </div>
      <div class='text-white d-flex align-items-center justify-content-around' >

      <div class='d-flex align-items-center '>
      <i class="fas fa-umbrella pr-1 me-1"></i>
      <span class="card-title text-white"> ${allData.current.humidity} %</span>
      </div>

      <div class='d-flex align-items-center'>
      <i class="fas fa-wind pl-3 pr-1 me-1"></i>
      <span class="card-title text-white"> ${allData.current.wind_kph} Km/h</span>
      </div>

       <div class='d-flex align-items-center'>
       <i class="far fa-compass pl-3 pr-1 me-1 "></i>
       <span class="card-title text-white"> ${allData.current.wind_dir} </span>
       </div>
       </div>
    </div>

</div>
    `;
    for (var i = 1; i < 3; i++) {
        weatherInfo +=
            `
                 <div  class="text-center  card mx-2">
                 <div  class="card-header header-bgc  d-flex justify-content-between align-items-center">
                 <p> ${days[currentDayIndex+i]}</p>
                 <p class="card-title ">${(currentDayDate+i)+'  '+CurrentMonth}</p>
                
                 </div>
                     <div class="card-body forcast-background-color">
                     <img class="card-img w-25 "src=https:${allData.forecast.forecastday[i].day.condition.icon}> 
                     <div class="fs-1 text-white card-text mt-4">${allData.forecast.forecastday[i].day.avgtemp_c} <sup>o</sup>c</div>
                     <div class="card-text text-secondary"> ${allData.forecast.forecastday[i].day.condition.text} </div>
                     </div>
                </div>
            `
    }

    document.getElementById('displayWeather').innerHTML = weatherInfo;



}