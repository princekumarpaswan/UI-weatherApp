// https://api.openweathermap.org/data/2.5/weather?lat=23.58&lon=87.1837&appid=3f5b6347b18caf50f3475a160817ec61

const sucessCallback = (position) => {
    console.log(position);
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(sucessCallback, errorCallback)