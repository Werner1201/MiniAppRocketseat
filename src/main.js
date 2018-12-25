import api from './api';
class App {
    constructor() {
        this.repositorios = [];

        this.eleForm = document.getElementById('repo-form');
        this.eleInput = document.querySelector('input[name=repositorio]')
        this.eleBaseLista = document.getElementById('repo-list');
        this.manejoRegistros();
    }

    manejoRegistros(){
        this.eleForm.onsubmit = evento => this.addRepositorio(evento);
    }

    async addRepositorio(evento){
        evento.preventDefault();

        const valorInput = this.eleInput.value;
        if(valorInput.lenght === 0)
            return;

        const response = await api.get(`/repos/${valorInput}`);
        
        const {name, description, html_url, owner: {avatar_url} } = response.data;

        this.repositorios.push({
            nome: name,
            descricao: description,
            avatar_url: avatar_url,
            html_url: html_url
        });
        this.eleInput.value = '';

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