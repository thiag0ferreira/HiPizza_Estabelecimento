import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface RegistroUsuario {
    id: number;
    nome: string;
    login: string;
    senha: string;
    idPerfil: number;
    email: string;
    verificada: string;
    ddd: number;
    fone: string;
    flow: string;
    razao: string;
    fantasia: string;
    cnpj: string;
  }

export interface RegistroEstabelecimento {
      id: number;
      cargoContato: string;
      cnpj: string;
      contatoEmpresa: string;
      ddd: string;
      deptoContato: string;
      dtAtualizacao: string;
      dtUltContato: string;
      email: string;
      emailContato: string;
      fantasia: string;
      faturamento: string;
      fone: string;
      ie: string;
      mailing: string;
      numeroFuncionarios: string;
      razaoSocial: string;
      sms: string;
      status: string;
      poligono: string;
      idStatusEntidade: number;
      nomeStatusEntidade: string;
      website: string;
      meioameio: string;
  }

export interface RegistroEnderecoEstabelecimento {
    id: number;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cidade: string;
    estado: string;
    bairro: string;
    referencia: string;
    coordenadas: string;
    tipoLogradouro: string;
    idEstabelecimento: string;
    distanciaAtendida: number;
  }

export interface Pedidos {
  id: number,
  dataHora: string,
  obs: string,
  seqPedido: number,
  total: number,
  validade: string,
  idStatus: number,
  nomeStatus: string,
  nomeEstabelecimento: string,
  fantasiaEstabelecimento: string,
  idEstabelecimento: number,
  obsTroco: string,
  formas: string,
  itens: Item[],
  cliente: Cliente,
  ipEquipe2: Equipe,
  cor: string,
  isEntrega: boolean,
  entregador: string
}

export interface Perfil {
  id: number,
  nome: string
}

export interface Equipe {
  apelido: string,
  ddd: string,
  email: string,
  fone: string,
  id: string,
  nasc: string,
  nome: string,
  okBusca: string,
  perfil: Perfil,
  sexo: string
}

export interface NomesDto {
  nome: string
}

export interface Entregador {
  id: number,
  nomeEstabelecimento: string,
  nome: string,
  apelido: string,
  ddd: string,
  fone: string,
  email: string,
  nasc: string,
  CPF: string,
  veiculo: string,
  placa: string,
  idStab: number,
  idPerfil: number,
  nomePerfil: string
}

export interface Entrega {
  id: number,
  dataHora: string,
  dataHoraFormatada: string,
  enderecoCliente: string,
  nomeCliente: string,
  obsTroco: string,
  total: number,
  totalFormatado: string,
  ipCliente: {
    id: number,
    apelido: string,
    cnpj: string,
    ddd: string,
    email: string,
    endBairro: string,
    endCep: string,
    endCidade: string,
    endComplemento: string,
    endEstado: string,
    endLogradouro: string,
    endNumero: string,
    endReferencia: string,
    fone: string,
    nome: string
  }
  nomesFormasPagamento: NomesDto[];
  nomeProdutos: NomesDto[];
}

export interface StabEntregador {
  id: number,
  ddd: string,
  fone: string,
  email: string,
  fantasia: string,
  razaoSocial: string,
  website: string
}

export interface Item {
  id: number,
  seq: number,
  qtd: number,
  valor: number,
  desconto: number,
  idPedido: number,
  idProduto: number,
  idMetade2: number,
  produto: Produto,
  total: string,
  opcoes: Opcoes[]
}

export interface Metades {
  m1: Produto;
  m2: Produto;
  preco: string;
  qtd: number;
  total: string;
  idItem: number;
}

export interface Produto {
  id: 18,
  nome: number,
  descricao: string,
  detalhe: string,
  preco: number,
  publicado: number,
  tipo: {
    id: number,
    nome: string,
    idStab: number
  }
}

export interface Opcoes {
  id: number,
  nome: string
}

export interface Cliente {
  apelido: string,
  cnpj: string,
  ddd: string,
  email: string,
  endBairro: string,
  endCep: string,
  endCidade: string,
  endComplemento: string,
  endEstado: string,
  endLogradouro: string,
  endNumero: string,
  endReferencia: string,
  fantasia: string,
  flow: string,
  fone: string,
  id: number,
  login: string,
  nome: string,
  obs: string
}

export interface QuemEstaNavegando {
  id: number,
  idPerfil: number,
  nomePerfil: string
}

export interface LogEntregador {
  atualizado: string,
  dataHora: string,
  id: number,
  idLogAcao: number,
  idPedido: number,
  idPlayer: number,
  nomeAcao: string,
  obs: string,
  player: string,
  valorAnterior: string,
  valorNovo: string,
  visivelCliente: number
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public regUser: any;
    public campoEdit: string;
    public idEstabelecimento: number;
    public stab: any;
    public pessoaEquipe: number;
    public atribs: any;
    public stProd: any;
    public formas: any;
    public formasStab: any;
    public refresca: number;
    public pedido: any;
    public filtroPedido: string;
    private idxJson: number;
    private itemProd: any;
    private itemTipoProduto: any;
    private operador: QuemEstaNavegando;

    private idReg: number;

    constructor(private storage: Storage) {
        this.regUser = '';
        this.pessoaEquipe = 0;
    }

    salvaUser = (nome, login, senha, id, idPerfil, email,
                 verificada, flow, ddd, fone, fantasia, razao, cnpj): Promise<any> => {
        return this.storage.get('stoHip').then((registros: RegistroUsuario[]) => {
          if (registros) {
            const registro = registros[0];
            console.log('Encontramos registro ' + registro);
          } else {
            const registro: RegistroUsuario = {
              id,
              nome,
              login,
              senha,
              idPerfil,
              email,
              verificada,
              ddd,
              fone,
              flow,
              fantasia,
              razao,
              cnpj
            };
            return this.storage.set('stoHip', [registro]);
          }
        });
    }

    salvaRegistroUser = (user: RegistroUsuario): Promise<any> => {
      return this.storage.get('stoHip').then((registros: RegistroUsuario[]) => {
        if (registros) {
          const registro = registros[0];
          console.log('Encontramos registro ' + registro);
        } else {
          return this.storage.set('stoHip', [user]);
        }
      });
    }

    limpaRegUser = () => {
      this.storage.remove('stoHip');
    }
    limpaRegHip = () => {
      this.storage.remove('stoHipEstabelecimento');
    }

    getUser2 = () => {
        return this.storage.get('stoHip').then((registros: RegistroUsuario[]) => {
          if (registros) {
            const registro = registros[0];
            this.regUser = registro;
            return registro;
          } else {
            this.regUser = '';
            return '';
          }
        },  () => {
          console.log('Erro');
          const registro: RegistroUsuario = {
            id: 0,
            nome: 'inválido',
            login: '',
            senha: '',
            idPerfil: 0,
            email: '',
            verificada: 'nOk',
            ddd: 0,
            fone: '',
            flow: '',
            fantasia: '',
            razao: '',
            cnpj: ''
          };
          return registro;
        });
    }

    salvaEstabelecimento = (stab: RegistroEstabelecimento) => {
      return this.storage.set('stoHipEstabelecimento', stab);
    }
    getEstabelecimento = () => {
      return this.storage.get('stoHipEstabelecimento');
    }
    apagaEstabelecimento = () => {
      return this.storage.remove('stoHipEstabelecimento');
    }

    setServer = (qual: string) => {
      return this.storage.set('stoHipServer', qual);
    }
    getServer = () => {
      return this.storage.get('stoHipServer');
    }

    getJsonByCampo = (json, campo, valor) => {
      const retorno = '';
      for (let i = 0; i < json.length; i++) {
        let resultado = '';
        const reg = json[i];
        const cmd = 'resultado=reg.' + campo + ';';
        eval(cmd);
        resultado = resultado.toString();
        if (resultado.toUpperCase() === valor.toString().toUpperCase()) {
          this.setIdxJson(i);
          return json[i];
        }
      }
      return retorno;
    }

    iterateJson = () => {
      this.storage.get('stoHip').then((rug) => this.iter2(rug));
    }
    iter2 = (rug) => {
      console.log(rug);
      const js = rug[0];
      console.log(js);
      for (let a in js) {
        console.log(a + ':' + js[a]);
      }
    }

    getEstados = () => {
      let estados = '{"ufs":[ {"sigla":"AC","nome":"Acre"}, {"sigla":"AL","nome":"Alagoas"}, {"sigla":"AM","nome":"Amazonas"}, {"sigla":"AP","nome":"Amapá"}, {"sigla":"BA","nome":"Bahia"}, {"sigla":"CE","nome":"Ceará"}, {"sigla":"DF","nome":"Distrito Federal"}, {"sigla":"ES","nome":"Espírito Santo"}, {"sigla":"GO","nome":"Goiás"}, {"sigla":"MA","nome":"Maranhão"}, {"sigla":"MG","nome":"Minas Gerais"}, {"sigla":"MS","nome":"Mato Grosso do Sul"}, {"sigla":"MT","nome":"Mato Grosso"}, {"sigla":"PA","nome":"Pará"}, {"sigla":"PB","nome":"Paraiba"}, {"sigla":"PE","nome":"Pernambuco"}, {"sigla":"PI","nome":"Piauí"}, {"sigla":"PR","nome":"Paraná"}, {"sigla":"RJ","nome":"Rio de Janeiro"}, {"sigla":"RN","nome":"Rio Grande do Norte"}, {"sigla":"RO","nome":"Rondônia"}, {"sigla":"RR","nome":"Roraima"}, {"sigla":"RS","nome":"Rio Grande do Sul"}, {"sigla":"SC","nome":"Santa Catarina"}, {"sigla":"SE","nome":"Sergipe"}, {"sigla":"SP","nome":"São Paulo"}, {"sigla":"TO","nome":"Tocantins"}]}';
      estados = JSON.parse(estados);
      return estados;
    }

    getUser = () => {
      return this.storage.get('stoHip');
    }

    setRegUser = (parm) => {
        this.regUser = parm;
    }
    getRegUser = () => {
        return this.regUser;
    }

    getCampoEdit = () => {
      return this.campoEdit;
    }
    setCampoEdit = (parm) => {
      this.campoEdit = parm;
    }

    getIdEstabelecimento = () => {
      return this.idEstabelecimento;
    }
    setIdEstabelecimento = (parm) => {
      this.idEstabelecimento = parm;
    }

    getStab = () =>{
      return this.stab;
    }
    setStab = (parm) => {
      this.stab = parm;
    }
    getPessoaEquipe = () => {
      return this.pessoaEquipe;
    }
    setPessoaEquipe = (parm) => {
      this.pessoaEquipe = parm;
    }

    getAatribs = () => {
      return this.atribs;
    }
    setAtribs = (parm) => {
      this.atribs = parm;
    }

    getStProd = () => {
      return this.stProd;
    }
    setStProd = (parm) => {
      this.stProd = parm;
    }

    getFormas = () => {
      return this.formas;
    }
    setFormas = (parm) => {
      this.formas = parm;
    }

    getFormasStab = () => {
      return this.formasStab;
    }
    setFormasStab = (parm) => {
      this.formasStab = parm;
    }

    getRefresca = () => {
      return this.refresca;
    }
    setRefresca = (parm) => {
      this.refresca = parm;
    }

    getPedido = () => {
      return this.pedido;
    }
    setPedido = (parm) => {
      this.pedido = parm;
    }

    getFiltroPedido = () => {
      return this.filtroPedido;
    }
    setFiltroPedido = (parm) => {
      this.filtroPedido = parm;
    }

    getIdxJson = () => {
      return this.idxJson;
    }
    setIdxJson = (parm) => {
      this.idxJson = parm;
    }

    getItemProd = () => {
      return this.itemProd;
    }
    setItemProd = (parm) => {
      this.itemProd = parm;
    }

    getItemTipoProduto = () => {
      return this.itemTipoProduto;
    }
    setItemTipoProduto = (parm) => {
      this.itemTipoProduto = parm;
    }

    getIdReg = () => {
      return this.idReg;
    }
    setIdReg = (parm: number) => {
      this.idReg = parm;
    }

    getOperador = () => {
      return this.operador;
    }
    setOperador = (parm) => {
      this.operador = parm;
    }
}
