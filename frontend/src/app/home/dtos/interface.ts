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

export interface IRecordObject {
  startTimer: number;
  index: number;
}

export interface IIntervalToBeCleared {
  record?: IRecordObject;
  i?: number;
}
