import countMinutes from './countMinutes';

interface ICountSeconds {
  seconds: number;
  minutes: number;
  hours: number;
}

export default function countSeconds(seconds: number, minutes: number, hours: number): ICountSeconds {
  let setSeconds = seconds;
  let setMinutes = minutes;
  let setHours = hours;

  setSeconds += 1;

  if(setSeconds > 59) {
    const { setMinutes: minutesReturned, setHours: hoursReturned} = countMinutes(minutes, hours);

    setMinutes = minutesReturned;
    setHours = hoursReturned;

    setSeconds = 0;
  }

  return {
    seconds: setSeconds,
    minutes: setMinutes,
    hours: setHours,
  }
};
