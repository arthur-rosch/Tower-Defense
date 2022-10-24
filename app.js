var Torres = [];
var CampoDeBatalha = [];
var Inimigos = [];
var Continuar = true;
Torres.length = 9;
CampoDeBatalha.length = 9;
var Torre = /** @class */ (function () {
    function Torre(nome, ataque, alcance, nivel, valor) {
        this.SetName(nome);
        this.SetAtaque(ataque);
        this.SetAlcance(alcance);
        this.SetNivel(nivel);
        this.SetValor(valor);
    }
    Torre.prototype.SetName = function (name) {
        this._Nome = name;
    };
    Torre.prototype.SetAtaque = function (ataque) {
        this._Ataque = ataque;
    };
    Torre.prototype.SetAlcance = function (alcance) {
        this._Alcance = alcance;
    };
    Torre.prototype.SetNivel = function (nivel) {
        this._Nivel = nivel;
    };
    Torre.prototype.SetValor = function (valor) {
        this._Valor = valor;
    };
    Torre.prototype.GetName = function () {
        return this._Nome;
    };
    Torre.prototype.Atacar = function () {
        return this._Ataque;
    };
    Torre.prototype.GetAlcance = function () {
        return this._Alcance;
    };
    Torre.prototype.GetNivel = function () {
        return this._Nivel;
    };
    Torre.prototype.GetValor = function () {
        return this._Valor;
    };
    return Torre;
}());
var Inimigo = /** @class */ (function () {
    function Inimigo(nome, vida) {
        this.SetName(nome);
        this.SetVida(vida);
    }
    Inimigo.prototype.SetName = function (name) {
        this._Nome = name;
    };
    Inimigo.prototype.SetVida = function (vida) {
        this._Vida = vida;
    };
    Inimigo.prototype.GetName = function () {
        return this._Nome;
    };
    Inimigo.prototype.GetVida = function () {
        return this._Vida;
    };
    Inimigo.prototype.ReceberDano = function (dano) {
        this.SetVida(this.GetVida() - dano);
    };
    return Inimigo;
}());
while (Continuar) {
    var Pergunta = prompt("1 Começar Jogo /// 2 Criar Torre /// 3 Criar Inimigo /// 4 Finalizar");
    switch (Pergunta) {
        case "1":
            ComeçarPartida();
            break;
        case "2":
            CriarTorre();
            break;
        case "3":
            CriarInimigo();
            break;
        case "4":
            Continuar = false;
            break;
        default:
            alert("Opção inválida");
            break;
    }
}
function CriarTorre() {
    var Error = false;
    var Nome = String(prompt("Qual o Nome da Torre ?"));
    var Ataque = Number(prompt("Qual o Ataque da Torre ?"));
    var Alcance = Number(prompt("Qual o Alcance da Torre ? (Max 3)"));
    if (Alcance > 3) {
        return alert("Alcance inválido");
    }
    var Nivel = Number(prompt("Qual o Nivel da Torre ?"));
    var Valor = Number(prompt("Qual o Valor da Torre ?"));
    var NewTorre = new Torre(Nome, Ataque, Alcance, Nivel, Valor);
    var IndexTorre = Number(prompt("Torre criada ! Selecione a posição dela no tabuleiro (0 ~ 9)"));
    if (IndexTorre > 9 || IndexTorre < 0) {
        return alert("Posição inválida");
    }
    Torres.forEach(VerificateIndex);
    function VerificateIndex(item, index) {
        if (Torres[IndexTorre] !== undefined) {
            Error = true;
            alert("Você já possui uma Torre nessa posição");
        }
    }
    if (Error == false) {
        Torres.splice(IndexTorre, 1, NewTorre);
    }
}
function CriarInimigo() {
    var Nome = String(prompt("Qual o Nome do Inimigo ?"));
    var Vida = Number(prompt("Qual a Vida do Inimigo ?"));
    var NewInimigo = new Inimigo(Nome, Vida);
    var QuantidadeInimigos = Number(prompt("Quantos inimigos vão ter na Partida ? (Max 9)"));
    if (QuantidadeInimigos > 9) {
        return alert("Valor inválido");
    }
    for (var index = 0; index < QuantidadeInimigos; index++) {
        Inimigos.unshift(NewInimigo);
    }
}
function ComeçarPartida() {
    var VidaJogador = 10;
    var FimDeJogo = true;
    for (var index = 0; index < Inimigos.length; index++) {
        console.log(Inimigos.length);
        CampoDeBatalha.push(Inimigos[index]);
    }
    while (FimDeJogo) {
        var Escolha = String(prompt("1 Passar turno /// 2 Render-se"));
        switch (Escolha) {
            case "1":
                PassarTurno();
                break;
            case "2":
                VidaJogador = 0;
                break;
            default:
                alert("Opção Inválida");
                break;
        }
        if (VidaJogador == 0) {
            return alert("Jogador Perdeu !");
        }
        function PassarTurno() {
            Torres.forEach(AtaqueTorre);
            CampoDeBatalha.forEach(RemoverInimigo);
            MoverInimigo();
            VerificarCampoDeBatalha();
            console.log(CampoDeBatalha);
            console.log("Vida Do Jogador: ".concat(VidaJogador));
        }
    }
    function VerificarCampoDeBatalha() {
        var Contador = 0;
        if (CampoDeBatalha[0] != undefined) {
            console.log("Vida do Jogador: ".concat(VidaJogador));
            VidaJogador--;
        }
        CampoDeBatalha.forEach(Verificar);
        if (Contador == Inimigos.length) {
            alert("Jogador Venceu !");
            FimDeJogo = false;
        }
        function Verificar(item) {
            if (item == undefined) {
                Contador++;
            }
        }
    }
}
function RemoverInimigo(item, index) {
    item.GetVida();
    if (item.GetVida() < 0) {
        console.log(item.GetVida());
        CampoDeBatalha.splice(index, 1, undefined);
    }
}
function MoverInimigo() {
    if (Inimigos.length == 0) {
        CampoDeBatalha.shift();
    }
    else {
        CampoDeBatalha.shift();
        CampoDeBatalha.length++;
    }
    if (CampoDeBatalha.length > 9) {
        CampoDeBatalha.pop();
    }
}
function AtaqueTorre(item, index) {
    if (CampoDeBatalha[index] != undefined) {
        CampoDeBatalha[index].GetVida();
        CampoDeBatalha[index].ReceberDano(item.Atacar());
    }
    if (CampoDeBatalha[index - Torres[index].GetAlcance()]) {
        CampoDeBatalha[index - Torres[index].GetAlcance()].GetVida();
        CampoDeBatalha[index - Torres[index].GetAlcance()].ReceberDano(item.Atacar());
    }
    if (CampoDeBatalha[index - Torres[index].GetAlcance() + 1]) {
        CampoDeBatalha[index - Torres[index].GetAlcance() + 1].GetVida();
        CampoDeBatalha[index - Torres[index].GetAlcance() + 1].ReceberDano(item.Atacar());
    }
    if (CampoDeBatalha[index + Torres[index].GetAlcance() - 1]) {
        CampoDeBatalha[index + Torres[index].GetAlcance() - 1].GetVida();
        CampoDeBatalha[index + Torres[index].GetAlcance() - 1].ReceberDano(item.Atacar());
    }
    if (CampoDeBatalha[index + Torres[index].GetAlcance()]) {
        CampoDeBatalha[index + Torres[index].GetAlcance()].GetVida();
        CampoDeBatalha[index + Torres[index].GetAlcance()].ReceberDano(item.Atacar());
    }
}
