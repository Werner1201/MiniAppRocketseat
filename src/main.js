class App {
    constructor() {
        this.repositorios = [];

        this.eleForm = document.getElementById('repo-form');
        this.manejoRegistros();
    }

    manejoRegistros(){
        this.eleForm.onsubmit = evento => this.addRepositorio(evento);
    }

    addRepositorio(evento){
        evento.preventDefault();

        this.repositorios.push({
            nome: 'www.rocketseat.com.br',
            descricao: 'Tire a sua ideia do papel e de vida a sua startup',
            avatar_url: 'https://avatars0.githubusercontent.com/u/28929274?v=4',
            html_url: 'http://github.com/rocketseat/'
        });
        console.log(this.repositorios);
    }


};

new App();