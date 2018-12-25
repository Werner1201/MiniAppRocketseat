class App {
    constructor() {
        this.repositorios = [];

        this.eleForm = document.getElementById('repo-form');
        this.eleBaseLista = document.getElementById('repo-list');
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
        
        this.renderiza();
    }

    renderiza(){
        this.eleBaseLista.innerHTML = '';
        this.repositorios.forEach(repo => {
            //Cria a Imagem 
            let eleImg = document.createElement('img');
            eleImg.setAttribute('src', repo.avatar_url);

            //Cria o Nome
            let eleNome = document.createElement('strong');
            eleNome.appendChild(document.createTextNode(repo.nome));

            //Cria a descricao
            let eleDesc = document.createElement('p');
            eleDesc.appendChild(document.createTextNode(repo.descricao));

            //Cria o Link 
            let eleLink = document.createElement('a');
            eleLink.setAttribute('target', '_blank');
            eleLink.setAttribute('href', repo.html_url);
            eleLink.appendChild(document.createTextNode('Acessar'));

            //Elementos da Lista
            let eleItemLista = document.createElement('li');
            eleItemLista.appendChild(eleImg);
            eleItemLista.appendChild(eleNome);
            eleItemLista.appendChild(eleDesc);
            eleItemLista.appendChild(eleLink);

            //Colocar os Itens da Lista na Base da Lista
            this.eleBaseLista.appendChild(eleItemLista);
        });
    }

};

new App();