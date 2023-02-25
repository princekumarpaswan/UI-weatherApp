// https://api.openweathermap.org/data/2.5/weather?lat=23.58&lon=87.1837&appid=3f5b6347b18caf50f3475a160817ec61
// date 5 
// https://api.openweathermap.org/data/2.5/forecast?lat=23.58&lon=87.1837&appid=3f5b6347b18caf50f3475a160817ec61
let latitude
let longitude

let changer = true


const getData = async () => {

    const serchData = document.getElementById("serch").value
    console.log(serchData);
    if (serchData) {
        changer = false
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${serchData}&units=metric&appid=3f5b6347b18caf50f3475a160817ec61`

            let res = await fetch(url);
            let data = await res.json();

            const { temp, humidity, pressure } = data.main
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset

            };
            console.log(myNewWeatherInfo)


            document.getElementById("wMood").innerHTML = myNewWeatherInfo.weathermood
            document.getElementById("tempr").innerHTML = myNewWeatherInfo.temp
            document.getElementById("speed").innerHTML = myNewWeatherInfo.speed
            document.getElementById("press").innerHTML = myNewWeatherInfo.pressure

            document.getElementById("mainTemp").innerHTML = myNewWeatherInfo.temp
            document.getElementById("city").innerHTML = `${myNewWeatherInfo.name}, ${myNewWeatherInfo.country}`
            document.getElementById("mainDate").innerHTML = time[0]
            document.getElementById("now").innerHTML = new Date().toLocaleTimeString()




        } catch (error) {
            console.log(error);
        }
    }

    else {
        try {
            const sucessCallback = async (position) => {
                latitude = position.coords.latitude
                longitude = position.coords.longitude
                console.log(latitude, longitude);
                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3f5b6347b18caf50f3475a160817ec61`
                let urlTwo = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&timezone=GMT&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh`
                let res = await fetch(url);
                let data = await res.json();

                let resTwo = await fetch(urlTwo)
                let dataTwo = await resTwo.json()
                // console.log(dataTwo.daily);
                const fiveday = dataTwo.daily

                const { temperature_2m_max, time } = fiveday
                console.log(temperature_2m_max, time);

                const { temp, humidity, pressure } = data.main
                const { main: weathermood } = data.weather[0];
                const { name } = data;
                const { speed } = data.wind;
                const { country, sunset } = data.sys;

                const myNewWeatherInfo = {
                    temp,
                    humidity,
                    pressure,
                    weathermood,
                    name,
                    speed,
                    country,
                    sunset

                };
                console.log(myNewWeatherInfo)
                document.getElementById("city").innerHTML = `${myNewWeatherInfo.name}, ${myNewWeatherInfo.country}`
                document.getElementById("mainDate").innerHTML = time[0]
                document.getElementById("now").innerHTML = new Date().toLocaleTimeString()



                const dates = document.getElementsByClassName("firstDate")

                dates[0].innerHTML = time[0]
                dates[1].innerHTML = time[1]
                dates[2].innerHTML = time[2]
                dates[3].innerHTML = time[3]
                dates[4].innerHTML = time[4]




                document.getElementById("mood").innerText = weathermood
                const tempur = document.getElementsByClassName("tempr")
                tempur[0].innerHTML = `${temperature_2m_max[0]}&deg`
                tempur[1].innerHTML = `${temperature_2m_max[1]}&deg`
                tempur[2].innerHTML = `${temperature_2m_max[2]}&deg`
                tempur[3].innerHTML = `${temperature_2m_max[3]}&deg`
                tempur[4].innerHTML = `${temperature_2m_max[4]}&deg`








            };

            // console.log(latitude, longitude);

            const errorCallback = (error) => {
                console.log(error);
            };

            navigator.geolocation.getCurrentPosition(sucessCallback, errorCallback)




        } catch (error) {
            console.log(error);
        }
    }
}

if (changer) {
    getData()
}



const handleClick = () => {
    getData()
    let screen = window.innerWidth;
    if (screen <= "650") window.scrollBy(0, 100)

}