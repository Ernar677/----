
let mySity = document.querySelector('.city')
let search = document.querySelector('.btn');
let cardDiv = document.querySelector('.card');
let kaz = document.querySelector('.kaz')
cardDiv.style.display = "none"

let massiv = []
mySity.addEventListener("click", function (){
    cardDiv.textContent = ""
    fetchData("Almaty")
})

kaz.addEventListener('click', function (){
    cardDiv.textContent = ""
    fetchData("Astana")
    fetchData("almaty")
    fetchData("Shymkent")
    fetchData("Aktobe")
})

search.addEventListener('click', function (e){
    e.preventDefault()
    cardDiv.textContent = ""
    let aqparat = document.querySelector('.input1').value;
    fetchData(aqparat)
})

async function fetchData(city) {
    cardDiv.style.display = "block"
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e3ad77404dc88bee59f4a50942c3dbc6&units=metric`)
        if (!response.ok) { 
            throw new Error('New error')
        }

        let data = await response.json()    


        console.log(data);

        console.log(data.wind.speed);

        let div = document.createElement('div')
        div.className = 'header'

        div.innerHTML = `
            <div><img width="100px" height="100px" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt=""></div>
            <div class="temperature">${data.main.temp}° / ${data.main.feels_like}°</div>
            <div class="name">${data.name}</div>`

        let div2 = document.createElement('div')

        div2.innerHTML = `
        <div class="details">Кейбір уақыттарда <b>${data.weather[0].main}</b></div>
            <div class="item"><span>RealFeel</span> <span>2°</span></div>
            <div class="item"><span>RealFeel Shade</span> <span>2°</span></div>
            <div class="item"><span>Макс. УФ-индекс</span> <span>1 Жақсы</span></div>
            <div class="item"><span>Жел</span> <span>${data.wind.speed} м/с</span></div>`
        cardDiv.appendChild(div)
        cardDiv.appendChild(div2)
        
    } catch (err) {
        alert("Дұрыстап тер")
    }
}
