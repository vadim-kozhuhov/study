export default async function getData() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Mykolaiv&appid=2d692842da54c9d794071063a8902e29&units=metric`);
        if (response.status === 200) {
            document.getElementById('reload').disabled = false;
            const data = await response.json();
            document.getElementById('city').innerHTML = data.name;
            document.getElementById('temp').innerHTML = `${data.main.temp} °C`;
            document.getElementById('wind').innerHTML = `${data.wind.speed} M/s`;
            document.getElementById('time').innerHTML = new Date();
        }
    } catch (error) {
        console.log(error);
    }
}