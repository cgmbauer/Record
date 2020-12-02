interface ICountHours {
  setHours: number;
}

export default function countHours(hours: number): ICountHours {
  let setHours = hours;

  setHours += 1;

  return {
    setHours,
  }
}
