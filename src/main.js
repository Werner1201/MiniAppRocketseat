import api from './api';
class App {
    constructor() {
        this.repositorios = [];

        this.eleForm = document.getElementById('repo-form');
        this.eleInput = document.querySelector('input[name=repositorio]')
        this.eleBaseLista = document.getElementById('repo-list');
        this.manejoRegistros();
    }

    manejoRegistros() {
        this.eleForm.onsubmit = evento => this.addRepositorio(evento);
    }

    //Carregando se sim ou nao
    setCarregando(carregando = true) {
        if (carregando === true) {
            //Break Line e Escrito Carregando
            let brkLine = document.createElement('br');
            let elemCarregando = document.createElement('span');
            //Define Id de Span para remove-lo depois
            elemCarregando.setAttribute('id', 'carregando');
            //Escreve Carregando
            elemCarregando.appendChild(document.createTextNode('Carregando'));

            //Codigo da Internet para fazer 3 pontinhos carregando
            window.dotsGoingUp = true;
            var dots = window.setInterval(function () {
                var wait = document.getElementById('carregando');
                if (window.dotsGoingUp)
                    wait.innerHTML += ".";
                else {
                    wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
                    if (wait.innerHTML === "")
                        window.dotsGoingUp = true;
                }
                if (wait.innerHTML.length > 13)
                    window.dotsGoingUp = false;
            }, 100);
            //Acrescenta o Carregando ao Formulario
            this.eleForm.appendChild(elemCarregando);
        } else {
            //Remove o carregando caso a condicao seja falsa
            document.getElementById('carregando').remove();
        }
    }
    //Adciona Repositorio
    async addRepositorio(evento) {
        evento.preventDefault();

        const valorInput = this.eleInput.value;
        if (valorInput.lenght === 0)
            return;

        this.setCarregando();
        //Tentativa de Requisicao
        try {
            const response = await api.get(`/repos/${valorInput}`);

            const {
                name,
                description,
                html_url,
                owner: {
                    avatar_url
                }
            } = response.data;

            this.repositorios.push({
                nome: name,
                descricao: description,
                avatar_url: avatar_url,
                html_url: html_url
            });

            //Apaga os valores de dentro do input qnd faz a requisicao
            this.eleInput.value = '';

            //Renderiza as Informacoes
            this.renderiza();
        } catch (err) {
            //Alerta caso a requisicao volte vazia ou com erro.
            alert('O repositório não existe!');
        }
        //Define a condicao falsa para remover o elemento de carregando.
        this.setCarregando(false);
    }

    renderiza() {
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