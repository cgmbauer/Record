import countHours from './countHours';

interface ICountMinutes {
  setMinutes: number;
  setHours: number;
}

export default function countMinutes(minutes: number, hours: number): ICountMinutes {
  let setMinutes = minutes;
  let setHours = hours;

  setMinutes += 1;

  if (setMinutes > 59) {
    const { setHours: hoursReturned } = countHours(hours);

    setHours = hoursReturned;

    setMinutes = 0;
  }

  return {
    setHours,
    setMinutes,
  }
}
