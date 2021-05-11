import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [input, setInput] = useState('');
	const [data, setData] = useState({
		city: '',
		state: '',
		data: [],
	});

	const handleInputChange = (event) => {
		let value = event.target.value;
		setInput(value);
	};

	const handleClick = () => {
		fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?&postal_code=${input}&country=US&Units=I&key=99ff94c38c7042d1ac0031ac6bdbe781&hours=6
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
			});
	};
	console.log(data, 'data');

	// const convertFarenheit = (temp) => {
	// 	return ((temp - 273.15) * (9.0 / 5.0) + 32).toFixed(0);
	// };

	return (
		<div className="App">
			<h1>Fit By Weather</h1>
			<input onChange={handleInputChange}></input>
			<button onClick={handleClick}>Search</button>
			<h2>
				City: {data.city}, {data.state}
				Hourly:{' '}
				{data.data.map((data) => {
					return (
						<div>
							<img
								src={'../public/icons/'.concat(data.icon).concat('.png')}
								alt="icons"style={{ height: 40 }}
							/>
							<p>Time:{data.time}</p>
							<p>Temp:{data.temp}</p>
							<p>code:{data.code}</p>
							<p>icon:{data.icon}</p>
							<p>Description:{data.desc}</p>
							<p>feels-like:{data.feel}</p>
							<p>Precipitation:{data.precp}%</p>
						</div>
					);
				})}
			</h2>
		</div>
	);
}

export default App;
