import { IDoList } from '../dtos/interface';

export default function updateLocalStorage(doList: IDoList[]): void {
  localStorage.setItem('@Remote:list', JSON.stringify(doList));
}
