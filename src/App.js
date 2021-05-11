import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [input, setInput] = useState('');
	const [data, setData] = useState({
		city: '',
		state: '',
		data: [],
	});
	const [status, setStatus] = useState(false);
	const [umbrella, setUmbrella] = useState(false);
	const [sunglasses, setSunglasses] = useState(false);
	const [fit, setFit] = useState('');

	const handleInputChange = (event) => {
		let value = event.target.value;
		setInput(value);
	};

	const handleClick = () => {
		fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?&postal_code=${input}&country=US&Units=I&key=99ff94c38c7042d1ac0031ac6bdbe781&hours=12
    `)
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				const hourly = [];
				body.data.forEach((data) => {
					hourly.push({
						time: data.timestamp_local,
						temp: data.temp,
						code: data.weather.code,
						icon: data.weather.icon,
						desc: data.weather.description,
						feel: data.app_temp,
						precp: data.pop,
					});
				});
				console.log(hourly, 'hourly');
				const dataCurrent = {
					city: body.city_name,
					state: body.state_code,
					data: hourly,
				};
				setData(dataCurrent);
				setStatus(true);
			});
	};
	console.log(data, 'data');

	useEffect(() => {
		// console.log(stations, "Stations");
		if (status === true) {
      //umbrella and sunglasses
			data.data.map((hourly) => {
				//hourly.code > 700 ? setUmbrella(true): hourly.code == 800 ? setSunglasses(true): setSunglasses(false)
				if (hourly.code < 700) {
					console.log(hourly.code, 'less than 700!');
					setUmbrella(true);
				}  
        if (hourly.code == 800) {
					console.log(hourly.code, 'sunny!');
					setSunglasses(true);
				}
			});
      //fit
      const x = data.data[0].temp
      switch(true) {
        case (data.data[0].temp < 41): setFit("Puffer Jackets, Scarf, +3 Layers"); break;
        case (data.data[0].temp >= 41 && data.data[0].temp < 48): setFit("Coats, Jackets, +2 Layers"); break;
        case (data.data[0].temp >= 48 && data.data[0].temp < 52): setFit("Trench Coat, Jackets, +2 Layers"); break;
        case (data.data[0].temp >= 52 && data.data[0].temp < 60): setFit("Light Jackets, Cardigans, tights, +1 Layers"); break;
        case (data.data[0].temp >= 60 && data.data[0].temp < 66): setFit("Hoodie, Sweatshirts, Jeans, dresses"); break;
        case (data.data[0].temp >= 66 && data.data[0].temp < 72): setFit("Long Sleeves, Hoodie, Cardigan"); break;
        case (data.data[0].temp >= 72 && data.data[0].temp < 80): setFit("Short Sleeves, Shorts, Skirts"); break;
        case (data.data[0].temp > 80): setFit("Tank Tops, Shorts"); break;

      }
      
		}

		console.log(umbrella, 'umbrella');
		console.log(sunglasses, 'sunglasses');
	}, [status, data]);
	// const convertFarenheit = (temp) => {
	// 	return ((temp - 273.15) * (9.0 / 5.0) + 32).toFixed(0);
	// };
	// const handleFit = () =>  {

	// 	data.data.map((hourly) => {
	//     //hourly.code > 700 ? setUmbrella(true): hourly.code == 800 ? setSunglasses(true): setSunglasses(false)
	//     if(hourly.code < 700){
	//       console.log(hourly.code,"less than 700!")
	//       setUmbrella(true)
	//      } else if(hourly.code == 800){
	//        console.log(hourly.code,"sunny!")
	//        setSunglasses(true)
	//      }
	// 	});
	//   console.log(umbrella,"umbrella")
	//   console.log(sunglasses,"sunglasses")

	// }

	return (
		<div className="App">
			<h1>Fit By Weather</h1>
			<input onChange={handleInputChange}></input>
			<button onClick={handleClick}>Search</button>

			<h2>
				<p>
					City: {data.city}, {data.state}
				</p>
				<p>Umbrella: {umbrella ? 'bring' : 'dont bring'}</p>
				<p>Sunglasses: {sunglasses ? 'bring' : 'dont bring'}</p>
        <p>Fit: {fit}</p>
			</h2>
			<div className="hourly">
				{data.data.map((data, i) => {
					return (
						<div key={i}>
							<img src={'./icons/'.concat(data.icon).concat('.png')} alt="icons" style={{ height: 40 }} />
							<p>Time:{data.time}</p>
							<p>Temp:{data.temp}</p>
							<p>Description:{data.desc}</p>
							<p>feels-like:{data.feel}</p>
							<p>Precipitation:{data.precp}%</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
