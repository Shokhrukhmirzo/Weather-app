window.addEventListener('load', ()=>{
	let long;
	let lat;
	let temperatureDescription = document.querySelector(
		'.temperature-description');

	let temperatureDegree = document.querySelector('.temperature-degree');

	let locationTimezone = document.querySelector(
		'.location-timezone'); 

	let  temperatureSection = document.querySelector('.temperature');
	
	const temperatureSpan = document.querySelector('.temperature span');

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/11f8213329f2fbbdeefefaaae419b7d1/${lat},${long}`;

			fetch(api)
			.then(response =>{
				return response.json();
			})
			.then(data =>{
				console.log(data);
				const {temperature, summary, icon } = data.currently;
				//set DOM Elements from the API
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;
				//Formula for celcius

				let celcius = (temperature - 32) * (5/9);

				//Set icon
				setIcons(icon, document.querySelector('.icon'));
				 
				//Change temperature to Celsius/ Fahrenheit
				temperatureSection.addEventListener("click", () =>{
					if(temperatureSpan.textContent === "F"){
						temperatureSpan.textContent = "C";
						temperatureDegree.textContent = Math.floor(celcius);
					}else{
						temperatureSpan.textContent = "F";
						temperatureDegree.textContent = temperature;
					}
				});

			});
		});
	}

	function setIcons(icon, iconId){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconId, Skycons[currentIcon]);
	}
});