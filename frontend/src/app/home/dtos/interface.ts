interface ITime {
  seconds: number;
  minutes: number;
  hours: number;
}

export interface IDoList {
  userInput: string;
  clock: string;
  time: ITime;
  isClockRunning: boolean;
}
