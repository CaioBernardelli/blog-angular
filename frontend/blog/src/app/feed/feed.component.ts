import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  listPost: Post[] = [];
  postAdd: Post = new Post(0, '', '');
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
        this.listPost.length > 0 ? this.listPost[this.listPost.length - 1].id + 1 : 1,
        this.postForm.value.nome,
        this.postForm.value.mensagem
      );

      this.postService.postMensagem(newPost).subscribe((post: Post) => {
        this.listPost.push(post);
        this.postForm.reset();
      });
    } else {
      console.log('Formulário inválido');
    }
  }

  remover(postARemover: Post) {
    this.postService.deletePost(postARemover.id).subscribe(() => {
      this.listPost = this.listPost.filter(post => post.id !== postARemover.id);
    });
  }
}
