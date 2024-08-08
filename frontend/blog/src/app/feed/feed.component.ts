import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importar módulos necessários

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  listPost: Post[] = [];
  postAdd: Post = new Post(0, '', ''); // Inicializar postAdd
  postForm!: FormGroup; // Definir o FormGroup para representar o formulário

  constructor(private postService: PostService, private fb: FormBuilder) { // Injetar FormBuilder para criar o FormGroup
    // Inicializar o FormGroup com controles de formulário e validadores
    this.postForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]], // Campo 'nome' é obrigatório e deve ter pelo menos 3 caracteres
      mensagem: ['', [Validators.required, Validators.minLength(10)]] // Campo 'mensagem' é obrigatório e deve ter pelo menos 10 caracteres
    });
  }

  ngOnInit() {
    this.findPosts();
  }

  findPosts() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.listPost = posts;
    });
  }


 // publicarMensagem(){
       //this.postService.postMensagem(this.postAdd).subscribe((post: Post) => {this.postAdd = post })

 // }

 //publicarMensagem() {

  // Gerar novo ID sequencial
 // const newId = this.listPost.length > 0 ? this.listPost[this.listPost.length - 1].id + 1 : 1;
 // this.postAdd.id = newId;

 // this.postService.postMensagem(this.postAdd).subscribe((post: Post) => {
  //  this.listPost.push(post); // Adicionar novo post à lista
 //   this.postAdd = { id: 0, nome: '', mensagem: '' }; // Resetar o formulário
//  });
//}
//}
publicarMensagem() {
  if (this.postForm.valid) { // Verifica se o formulário é válido antes de enviar a mensagem
    const newPost = new Post(
      this.listPost.length > 0 ? this.listPost[this.listPost.length - 1].id + 1 : 1, // Gera um novo ID incremental para a postagem
      this.postForm.value.nome, // Obtém o valor do campo 'nome'
      this.postForm.value.mensagem // Obtém o valor do campo 'mensagem'
    );

    this.postService.postMensagem(newPost).subscribe((post: Post) => {
      this.listPost.push(post); // Adiciona o novo post à lista
      this.postForm.reset(); // Reseta o formulário após a postagem
    });
  } else {
    console.log('Formulário inválido'); // Exibe uma mensagem no console se o formulário for inválido
  }
}
}
