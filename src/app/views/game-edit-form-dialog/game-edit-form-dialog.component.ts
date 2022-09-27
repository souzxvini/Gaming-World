import { GameExistsValidationService } from './../../service/game/game-exists-validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/categoria.model';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/service/game/game.service';
import { CategoriaService } from 'src/app/service/game/categoria.service';
import { usuarioSenhaIguaisValidator } from '../game-form-dialog/usuario-senha-iguais.validator';
import { Game } from 'src/app/model/game.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-edit-form-dialog',
  templateUrl: './game-edit-form-dialog.component.html',
  styleUrls: ['./game-edit-form-dialog.component.css']
})
export class GameEditFormDialogComponent implements OnInit {

  form: FormGroup
  id: number;
  categorias: Categoria[];
  game: Game = new Game();
  recarregarLista: boolean = true;

  constructor(private fb: FormBuilder,
    private gameService: GameService,
    private gameExistsValidationService: GameExistsValidationService,
    public dialogRef: MatDialogRef<GameEditFormDialogComponent>,
    private categoriaService: CategoriaService) {
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required], [this.gameExistsValidationService.gameExists(this.id)]],
      descricao: [null, [Validators.required]],
      nomeCategoria: [null, [Validators.required]],
      preco: [null, [Validators.required]],
      anoLancamento: [null, [Validators.required]],
      empresa: [null, [Validators.required]],
      urlImagem: [null, [Validators.required, Validators.maxLength(3000)]]
    },
    {
      validators:[usuarioSenhaIguaisValidator]
    })

    this.getCategorias();
    this.buscarGame();
  }

  getCategorias(){
    this.categoriaService.getCategoriasNoPagination().subscribe(data => {
      this.categorias = data.content;
    })
  }

  cancel(): void{
    this.recarregarLista = false
    this.dialogRef.close();
    this.form.reset();
  }

  buscarGame(){
    this.gameService.getGameDetails(this.id).subscribe(data => {
      this.game = data;
      this.preencherForm();
    })
  }

  preencherForm(){
    this.form.get('nome').setValue(this.game.nome)
    this.form.get('nomeCategoria').setValue(this.game.categoria.nome)
    this.form.get('descricao').setValue(this.game.descricao)
    this.form.get('anoLancamento').setValue(this.game.anoLancamento)
    this.form.get('empresa').setValue(this.game.empresa)
    this.form.get('preco').setValue(this.game.preco)
    this.form.get('urlImagem').setValue(this.game.urlImagem)
  }

  atualizarGame(){
    let game = new Game();

    game.id = this.game.id
    game.nome = this.form.get('nome').value
    game.nomeCategoria = this.form.get('nomeCategoria').value
    game.descricao = this.form.get('descricao').value
    game.anoLancamento = this.form.get('anoLancamento').value
    game.empresa = this.form.get('empresa').value
    game.preco = this.form.get('preco').value
    game.urlImagem = this.form.get('urlImagem').value


    Swal.fire({
      title: 'Are you sure you want to update this game?',
      text: "You'll be able do change it again.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, udpate it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gameService.updateGame(game).subscribe(() => {
          this.recarregarLista = true
          this.dialogRef.close();
          Swal.fire(
            'Updated!',
            'The game has been updated.',
            'success'
          )
        })

      }
    })
  }
}
