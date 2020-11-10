import { Component } from '@angular/core';

interface IFavorite {
  classe: string;
  descricao: string;
  favorite?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wendy';
  private _isFavorite = true;
  ataque = 0;

  form = {
    nome: '',
    raca: '',
    classe: '',
    nivel: '',
    telefone: '',
  }

  listagem: IFavorite[] = [
    {
        "classe":  "Bárbaro",
        "descricao": "A fierce warrior of primitive background who can enter a battle rage",
        "favorite": false
    },
    {
        "classe":  "Bardo",
        "descricao": "An inspiring magician whose power echoes the music of creation",
        "favorite": false
    },
    {
        "classe":  "Paladino",
        "descricao": "A holy warrior bound to a sacred oath",
        "favorite": false
    },
    {
        "classe":  "Mago",
        "descricao": "A scholarly magic-user capable of manipulating the structures of reality",
        "favorite": false
    },
    {
        "classe":  "Druída",
        "descricao": "A priest of the Old Faith, wielding the powers of nature and adopting animal forms",
        "favorite": false
    }
    ];

  public get isFavorite() : boolean {
    return this._isFavorite;
  }

  handleStarClick(index): void {
    this._isFavorite = !this._isFavorite;
    this.listagem[index].favorite = !this.listagem[index].favorite;
  }

  handleAtk(): void {
   this.ataque = Math.floor(20 * Math.random() + 1);
  }

  handleSubmit(cadastro): void {
    console.log(this.form);
    console.log(cadastro);
  }
}
