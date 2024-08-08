export class Post {
    public id: number;
    public nome: string;
    public mensagem: string;

    constructor(id: number, nome: string, mensagem: string) {
        this.id = id;
        this.nome = nome;
        this.mensagem = mensagem;
    }
}
