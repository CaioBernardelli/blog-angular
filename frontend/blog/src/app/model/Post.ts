export class Post {
    public id?: number;  // 'id' é opcional
    public nome: string;
    public mensagem: string;

    constructor(nome: string, mensagem: string, id?: number) {
        this.id = id;  // 'id' é opcional no construtor
        this.nome = nome;
        this.mensagem = mensagem;
    }
}
