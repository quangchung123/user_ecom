import React, { useState, useEffect } from 'react';
import { imgCountDown } from "../../../assets/index";
import {Link} from "react-router-dom";
import {ROUTER_INIT} from "../../../config/constant";

const CountDown = ({ targetDate }) => {
	const calculateTimeLeft = () => {
		const difference = +new Date(targetDate) - +new Date();
		let timeLeft  = {}
		if(difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			}
		} else {
			timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}
		return timeLeft;
	}
	const [timeCountDown, setTimeCountDown] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeCountDown(calculateTimeLeft)
		},1000)
		return () => clearTimeout(timer);
	}, [timeCountDown]);

	const timerComponents = [];
	Object.keys(timeCountDown).forEach((interval) => {
		timerComponents.push(
			<div key={interval} className="flex flex-col items-center mx-2">
				<div className="flex items-center flex-col justify-center w-24 h-24 bg-white rounded-full">
					<span className="text-primary text-3xl font-bold">
						{timeCountDown[interval]}
					</span>
					<span className="text-black font-semibold opacity-80">{interval}</span>
				</div>
			</div>
		)
	})
	return (
		<div className="flex bg-accent w-full items-center justify-between box-border px-52">
			<div className="mr-4">
				<img src={imgCountDown} alt="Countdown" />
			</div>
			<div className="flex flex-col items-center space-y-10 h-full py-12">
				<h2 className="font-semibold opacity-80 text-4xl mb-2">Ưu đãi tuần này</h2>
				<div className="border-b-4 border-primary mb-4 w-16 mt-2"></div>
				<div className="flex justify-center">
					{timerComponents.length ? timerComponents : <span className="text-white">Time's up!</span>}
				</div>

				<button className="py-2 px-6 bg-primary text-white rounded mt-8">Mua ngay</button>
			</div>
		</div>
	);
};

export default CountDown;
