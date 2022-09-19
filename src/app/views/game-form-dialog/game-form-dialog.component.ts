import { GameExistsValidationService } from './../../service/game/game-exists-validation.service';
import { Game } from './../../model/game.model';
import { Categoria } from './../../model/categoria.model';
import { CategoriaService } from './../../service/game/categoria.service';
import { GameService } from 'src/app/service/game/game.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-form-dialog',
  templateUrl: './game-form-dialog.component.html',
  styleUrls: ['./game-form-dialog.component.css']
})
export class GameFormDialogComponent implements OnInit {

  public form: FormGroup

  categorias: Categoria[];
  categoriaSelecionada: string;
  manterLista: boolean = true;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private gameExistsValidationService: GameExistsValidationService,
    public dialogRef: MatDialogRef<GameFormDialogComponent>,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required], [this.gameExistsValidationService.gameExists()]],
      descricao: [null, [Validators.required]],
      nomeCategoria: [null, [Validators.required]],
      preco: [null, [Validators.required]],
      anoLancamento: [null, [Validators.required]],
      empresa: [null, [Validators.required]],
      urlImagem: [null, [Validators.required]]
    },
    {
      validators:[usuarioSenhaIguaisValidator]
    })

    this.getCategorias();
  }

  cancel(): void{
    this.manterLista = true
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
    game.urlImagem = this.form.get('urlImagem').value

    Swal.fire({
      title: 'Are you sure you want to add "' + game.nome +'"?',
      text: "You won't be able to change this game's name later, only the others informations!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gameService.postGame(game).subscribe(() => {

          this.categoriaSelecionada = 'ALL'
          this.manterLista = false
          this.dialogRef.close();
          this.form.reset();

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: game.nome + ' added successfully!'
          })
        });
      }
    })
  }

  getCategorias(){
    this.categoriaService.getCategoriasNoPagination().subscribe(data => {
      this.categorias = data.content;
    })
  }

}
