import { Game } from './../../model/game.model';
import { Categoria } from './../../model/categoria.model';
import { CategoriaService } from './../../service/game/categoria.service';
import { GameService } from 'src/app/service/game/game.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';

@Component({
  selector: 'app-game-form-dialog',
  templateUrl: './game-form-dialog.component.html',
  styleUrls: ['./game-form-dialog.component.css']
})
export class GameFormDialogComponent implements OnInit {

  public form: FormGroup

  categorias: Categoria[];

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    public dialogRef: MatDialogRef<GameFormDialogComponent>,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      nomeCategoria: [null, [Validators.required]],
      preco: [null, [Validators.required]],
      anoLancamento: [null, [Validators.required]],
      empresa: [null, [Validators.required]]
    },
    {
      validators:[usuarioSenhaIguaisValidator]
    })

    this.getCategorias();
  }

  cancel(): void{
    this.dialogRef.close();
    this.form.reset();
  }

  adicionarGame(){

    let game = new Game();
    game.nome = this.form.get('nome').value
    game.descricao = this.form.get('descricao').value
    game.nomeCategoria = this.form.get('nomeCategoria').value
    game.empresa = this.form.get('empresa').value
    game.anoLancamento = this.form.get('anoLancamento').value
    game.preco = this.form.get('preco').value

    this.gameService.postGame(game).subscribe(() => {
      console.log('deu certo')
      this.dialogRef.close();
      this.form.reset();
    });
  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data.content;
    })
  }

}
