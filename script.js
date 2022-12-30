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
Whole.setAttribute("class","container")
document.body.append(Whole)
let Heading = document.createElement("H1")
Heading.innerHTML ="WORLS STATISTICS"
Heading.setAttribute("class","text-center")
Heading.setAttribute("id","title")
Whole.append(Heading)
let row = document.createElement("div")
row.setAttribute("class","row")
Whole.append(row)
function Createdetails({name,flag,latlng,region,capital,lat,long,code}){
    

  var columnchange = document.createElement("div")
  columnchange.setAttribute("class","col-lg-4 col-sm-12 col-md-6");
  row.append(columnchange)

  var Carddiv = document.createElement("div")
  Carddiv.setAttribute("class","card  text-light")
  Carddiv.setAttribute("id","Card")
  columnchange.append(Carddiv)

  var Cardhead = document.createElement("H4")
  Cardhead.setAttribute("class","text-center card-header")
  Cardhead.innerHTML += name
  Carddiv.append(Cardhead)

  var imageFlag = document.createElement("img")
  imageFlag.setAttribute("src",flag)
  imageFlag.setAttribute("class","card-img-top")
  Carddiv.append(imageFlag)

  var Cardbody= document.createElement("div")
  Cardbody.setAttribute("class","card-body")
  Carddiv.append(Cardbody)

  var P1 = document.createElement("p")
  Cardbody.append(P1)

  var P2 = document.createElement("p")
  Cardbody.append(P2)
  
  var P3 = document.createElement("p")
  Cardbody.append(P3)

  var P4 = document.createElement("p")
  Cardbody.append(P4)

  var S1 = document.createElement("span")
  S1.innerHTML=`Country code :${code}`
  P1.append(S1)

  var S2 = document.createElement("span")
  S2.innerHTML=`latlng${latlng}`
  P2.append(S2)

  var S3 = document.createElement("span")
  S3.innerHTML=`Region :${region}`
  P3.append(S3)

  var S4 = document.createElement("span")
  S4.innerHTML=`Capital :${capital}`
  P4.append(S4)

  var Weatherbutton = document.createElement("button")
  Weatherbutton.setAttribute("class","btn btn-primary")
  Weatherbutton.addEventListener("click",()=>{Weather(lat,long)})
  Weatherbutton.setAttribute("id","buttons")
  Weatherbutton.innerHTML="Click For Weather"
  Cardbody.append(Weatherbutton)
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