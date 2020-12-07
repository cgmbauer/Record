import { IDoList } from '../dtos/interface';

export default function updateLocalStorage(doList: IDoList[]): void {
  localStorage.setItem('@Record:list', JSON.stringify(doList));
}
