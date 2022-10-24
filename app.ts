let Torres: object[] = [];
let CampoDeBatalha: object[] = [];
let Inimigos: object[] = [];
let Continuar = true;

Torres.length = 9;
CampoDeBatalha.length = 9;

class Torre {
  private _Nome: string;
  private _Ataque: number;
  private _Alcance: number;
  private _Nivel: number;
  private _Valor: number;

  constructor(
    nome: string,
    ataque: number,
    alcance: number,
    nivel: number,
    valor: number
  ) {
    this.SetName(nome);
    this.SetAtaque(ataque);
    this.SetAlcance(alcance);
    this.SetNivel(nivel);
    this.SetValor(valor);
  }

  SetName(name: string) {
    this._Nome = name;
  }
  SetAtaque(ataque: number) {
    this._Ataque = ataque;
  }
  SetAlcance(alcance: number) {
    this._Alcance = alcance;
  }
  SetNivel(nivel: number) {
    this._Nivel = nivel;
  }
  SetValor(valor: number) {
    this._Valor = valor;
  }

  GetName(): string {
    return this._Nome;
  }
  Atacar(): number {
    return this._Ataque;
  }
  GetAlcance(): number {
    return this._Alcance;
  }
  GetNivel(): number {
    return this._Nivel;
  }
  GetValor(): number {
    return this._Valor;
  }
}
class Inimigo {
  private _Nome: string;
  private _Vida: number;

  constructor(nome: string, vida: number) {
    this.SetName(nome);
    this.SetVida(vida);
  }

  SetName(name: string) {
    this._Nome = name;
  }
  SetVida(vida: number) {
    this._Vida = vida;
  }

  GetName(): string {
    return this._Nome;
  }
  GetVida(): number {
    return this._Vida;
  }

  ReceberDano(dano: number) {
    this.SetVida(this.GetVida() - dano);
  }
}

while (Continuar) {
  let Pergunta = prompt(
    "1 Começar Jogo /// 2 Criar Torre /// 3 Criar Inimigo /// 4 Finalizar"
  );
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
  let Error = false;

  let Nome = String(prompt("Qual o Nome da Torre ?"));
  let Ataque = Number(prompt("Qual o Ataque da Torre ?"));
  let Alcance = Number(prompt("Qual o Alcance da Torre ? (Max 3)"));
  if (Alcance > 3) {
    return alert("Alcance inválido");
  }
  let Nivel = Number(prompt("Qual o Nivel da Torre ?"));
  let Valor = Number(prompt("Qual o Valor da Torre ?"));

  let NewTorre = new Torre(Nome, Ataque, Alcance, Nivel, Valor);
  let IndexTorre = Number(
    prompt("Torre criada ! Selecione a posição dela no tabuleiro (0 ~ 9)")
  );
  if (IndexTorre > 9 || IndexTorre < 0) {
    return alert("Posição inválida");
  }

  Torres.forEach(VerificateIndex);

  function VerificateIndex(item: object, index: number) {
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
  let Nome = String(prompt("Qual o Nome do Inimigo ?"));
  let Vida = Number(prompt("Qual a Vida do Inimigo ?"));

  let NewInimigo = new Inimigo(Nome, Vida);

  let QuantidadeInimigos = Number(
    prompt("Quantos inimigos vão ter na Partida ? (Max 9)")
  );
  if (QuantidadeInimigos > 9) {
    return alert("Valor inválido");
  }

  for (let index = 0; index < QuantidadeInimigos; index++) {
    Inimigos.unshift(NewInimigo);
  }
}

function ComeçarPartida() {
  let VidaJogador = 10;
  let FimDeJogo = true;

  for (let index = 0; index < Inimigos.length; index++) {
    console.log(Inimigos.length);
    CampoDeBatalha.push(Inimigos[index]);
  }

  while (FimDeJogo) {
    let Escolha = String(prompt("1 Passar turno /// 2 Render-se"));
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
      console.log(`Vida Do Jogador: ${VidaJogador}`);
    }
  }

  function VerificarCampoDeBatalha() {
    let Contador = 0;

    if (CampoDeBatalha[0] != undefined) {
      console.log(`Vida do Jogador: ${VidaJogador}`);
      VidaJogador--;
    }

    CampoDeBatalha.forEach(Verificar);

    if (Contador == Inimigos.length) {
      alert("Jogador Venceu !");
      FimDeJogo = false;
    }

    function Verificar(item: object) {
      if (item == undefined) {
        Contador++;
      }
    }
  }
}

function RemoverInimigo(item: object, index: number) {
  item.GetVida();
  if (item.GetVida() < 0) {
    console.log(item.GetVida());
    CampoDeBatalha.splice(index, 1, undefined);
  }
}

function MoverInimigo() {
  if (Inimigos.length == 0) {
    CampoDeBatalha.shift();
  } else {
    CampoDeBatalha.shift();
    CampoDeBatalha.length++;
  }

  if (CampoDeBatalha.length > 9) {
    CampoDeBatalha.pop();
  }
}

function AtaqueTorre(item: object, index: number) {
  if (CampoDeBatalha[index] != undefined) {
    CampoDeBatalha[index].GetVida();
    CampoDeBatalha[index].ReceberDano(item.Atacar());
  }

  if (CampoDeBatalha[index - Torres[index].GetAlcance()]) {
    CampoDeBatalha[index - Torres[index].GetAlcance()].GetVida();
    CampoDeBatalha[index - Torres[index].GetAlcance()].ReceberDano(
      item.Atacar()
    );
  }

  if (CampoDeBatalha[index - Torres[index].GetAlcance() + 1]) {
    CampoDeBatalha[index - Torres[index].GetAlcance() + 1].GetVida();
    CampoDeBatalha[index - Torres[index].GetAlcance() + 1].ReceberDano(
      item.Atacar()
    );
  }

  if (CampoDeBatalha[index + Torres[index].GetAlcance() - 1]) {
    CampoDeBatalha[index + Torres[index].GetAlcance() - 1].GetVida();
    CampoDeBatalha[index + Torres[index].GetAlcance() - 1].ReceberDano(
      item.Atacar()
    );
  }

  if (CampoDeBatalha[index + Torres[index].GetAlcance()]) {
    CampoDeBatalha[index + Torres[index].GetAlcance()].GetVida();
    CampoDeBatalha[index + Torres[index].GetAlcance()].ReceberDano(
      item.Atacar()
    );
  }
}
