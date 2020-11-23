interface IAccumulatedTime {
  seconds: number;
  minutes: number;
  hours: number;
}

interface ITime {
  seconds: number;
  minutes: number;
  hours: number;
}

export interface IDoList {
  userInput: string;
  clock: string;
  time: ITime;
  accumulatedTime: IAccumulatedTime;
  isClockRunning: boolean;
}
