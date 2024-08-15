import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule,MatIconModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  listPost: Post[] = [];
  postAdd: Post = new Post('', '', 0);
  postForm!: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
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

  publicarMensagem() {
    if (this.postForm.valid) {
      const newPost = new Post(
        // Deixe o ID como 0 ou undefined; o json-server gerará um novo ID.
        this.postForm.value.nome,
        this.postForm.value.mensagem,
        undefined
      );

      this.postService.postMensagem(newPost).subscribe((post: Post) => {
        this.listPost.push(post);
        this.findPosts();  // Recarrega os posts para garantir que tudo está sincronizado.
        this.postForm.reset();
      });
    } else {
      console.log('Formulário inválido');
    }
  }



  remover(postARemover: Post) {
    if (postARemover.id !== undefined) {
      this.postService.deletePost(postARemover.id).subscribe(() => {
        this.listPost = this.listPost.filter(post => post.id !== postARemover.id);
        this.findPosts();
      });
    } else {
      console.error('ID do post é indefinido, não é possível remover');
    }
  }
}

