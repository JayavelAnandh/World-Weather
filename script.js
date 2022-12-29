fetch("https://restcountries.com/v3.1/all")
.then((response)=>response.json())
.then((data)=>{
    data.forEach(element => {
        const detailsrequired ={
            ...element,
            name: element.name.common,
            flag: element.flags.png,
            latlng: element.latlng,
            region: element.region,
            capital: element.capital,
            lat :element.latlng[0],
            long:element.latlng[1],
            code:element.cca3
        }
        Createdetails(detailsrequired)
    });
})
.catch((error)=>console.log(error))

let Whole = document.createElement("div")
Whole.setAttribute("class","container-lg")
document.body.append(Whole)
let row = document.createElement("div")
row.setAttribute("class","row")
Whole.append(row)
function Createdetails({name,flag,latlng,region,capital,lat,long,code}){
    row.innerHTML +=
    
    `
    <div class= "col-lg-4 col-sm-12 col-md-6">
    <div class="card  text-light" style="width: 18rem;" id="Card">
    <H4 class =" text-center card-header" id="title" ">${name}</H4>
    <img src="${flag}" class="card-img-top" alt="...">
    <div class="card-body">
      <p><span>Country code:</span>${code}</p>
      <p><span>latlng : </span>${latlng}</p>
      <p><span>Region : </span>${region}</p>
      <p><span>Capital : </span>${capital}</p>
      <button class="btn btn-primary"  onclick="Weather(${lat},${long})"  "id ="buttons">Click For Weather</button>
    </div>
  </div>
    </div>
    `
}

async function Weather(lat,long){
  let datum= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2ed78f7d293ed51f9ddcd7366d909e43`)
  datum = await datum.json()
  swal(`Temperature:${datum.main.temp}
        Humidity:${datum.main.humidity}
        Overall condition: ${datum.weather[0].description} `,
        {title:"Weather"})
}
//datum.main.temp
//datum.main.humidity
//datum.weather[0].description