import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class ApiServices {

    public fUrl: {
        protocolo: string;
        servidor: string;
        porta: string;
    };

    public fData: {
        idUser: number;
        email: string;
    };

    public fn: any;
    public idOper: number;

    constructor(public http: HttpClient,
                private storageService: StorageService) {
        this.setNuvem();
    }

    setNuvem = () => {
        this.fUrl = {
            protocolo: 'https',
            servidor: 'hipizza.com.br',
            porta: ':8018'
        };
    }
    setLocal = () => {
        this.fUrl = {
            protocolo: 'https',
            servidor: 'localhost',
            porta: ':8018'
        };
    }
    getCab = () => {
        this.storageService.getServer().then((reg) => this.gotServ(reg));
    }
    async gotServ(serv) {
        if (serv === 'local') {
            this.setLocal();
        } else {
            this.setNuvem();
        }
        console.log('setou para serv ' + serv);
        if (this.fn !== undefined) {
            this.fn('setado serv: ' + serv);
        }
        return this.fUrl.protocolo + '://' + this.fUrl.servidor + this.fUrl.porta;
    }

    getProt() {
        return this.fUrl.protocolo + '://' + this.fUrl.servidor + this.fUrl.porta;
    }

    checaLogin = (email: string, ddd: string, fone: string) => {
        let url = this.getProt();
        url += '/clientes/cadastro?email=' + email;
        url += '&ddd=' + ddd;
        url += '&fone=' + fone;
        return this.http.get(url).toPromise();
    }

    getClienteBYid = (id: number) => {
        let url = this.getProt();
        url += '/clientes/' + id;
        return this.http.get(url).toPromise();
    }


    emailsEspeciais = (email) => {
        if (email === 'pequenoursopolar@gmail.com' || email === 'luisinserra@yahoo.com.br') {
            this.fUrl = {
                protocolo: 'https',
                servidor: 'localhost',
                porta: ':8018'
            };
        }
    }

    gravaNovoDono = (user: any) => {
        let url = this.getProt();
        url += '/clientes/cadastraDonoEstabelecimento';
        return this.http.post(url, user).toPromise();
    }

    geraToken = (idUser) => {
        let url = this.getProt();
        url += '/clientes/geraTokenValidaEmail?idCliente=' + idUser;
        return this.http.get(url).toPromise();
    }

    validaTokenGravaEstabelecimento = (idUser, ddd, fone, login, senha, token, razao, fantasia, cnpj) => {
        let url = this.getProt();
        url += '/clientes/validaTokenDonoEstabelecimento';
        url += '?idUser=' + idUser;
        url += '&ddd=' + ddd;
        url += '&fone=' + fone;
        url += '&login=' + login;
        url += '&senha=' + senha;
        url += '&token=' + token;
        url += '&razao=' + razao;
        url += '&fantasia=' + fantasia;
        url += '&cnpj=' + cnpj;
        return this.http.get(url).toPromise();
    }

    removeUsuario = (id: number, email: string) => {
        this.fData = {
            idUser: id,
            email
        };
        let url = this.getProt();
        url += '/clientes/removeUsuario';
        return this.http.post(url, this.fData).toPromise();
    }

    getEstabelecimento = (id) => {
        let url = this.getProt();
        url += '/estabelecimentos/' + id;
        return this.http.get(url).toPromise();
    }

    alteraEstabelecimento = (campo, valor, id) => {
        let url = this.getProt();
        let parm = campo;
        let v2 = '';
        if (campo === 'fonContato') {
            parm = 'fone';
            if (valor.substring(0, 1) === '(') {
                v2 = valor.substring(1, 3);
                valor = valor.substring(5);
            }
        }
        url += '/estabelecimentos/alteraEstabelecimento';
        url += '?' + parm + '=' + valor;
        if (campo === 'fonContato') {
            url += '&ddd=' + v2;
        }
        url += '&id=' + id;
        console.log(url);
        return this.http.get(url).toPromise();
    }

    getEquipe = (idStab) => {
        const cab = this.getProt();
        const url = cab + '/equipes/equipe/' + idStab;
        return this.http.get(url).toPromise();
    }

    getPerfis = () => {
        const cab = this.getProt();
        const url = cab + '/equipes/perfis';
        return this.http.get(url).toPromise();
    }

    putEquipe = (equipe: any, idStab) => {
        const cab = this.getProt();
        const url = cab + '/equipes/' + idStab;
        return this.http.post(url, equipe).toPromise();
    }

    getPessoa = (id) => {
        const cab = this.getProt();
        const url = cab + '/equipes/' + id;
        return this.http.get(url).toPromise();
    }

    apagaPessoa = (id) => {
        const cab = this.getProt();
        const url = cab + '/equipes/remove/' + id;
        return this.http.post(url, null).toPromise();
    }

    getProdutosStab = (idStab) => {
        const cab = this.getProt();
        let url = cab + '/produtos/listaPorDescricao?idStab=' + idStab;
        return this.http.get(url).toPromise();
    }

    getTiposProdutos = () => {
        const cab = this.getProt();
        const url = cab + '/produtos/tipos';
        return this.http.get(url).toPromise();
    }

    getTiposDeStab = (idStab: number) => {
        const cab = this.getProt();
        const url = cab + '/produtos/tiposProdutos?idStab=' + idStab;
        return this.http.get(url).toPromise();
    }

    reordenacaoDeTipos = (idsTipos: string) => {
        const cab = this.getProt();
        const url = cab + '/produtos/reordenarTipos?idTipos=' + idsTipos;
        return this.http.get(url).toPromise();
    }

    getCategoriasProduto = (idTipo) => {
        const cab = this.getProt();
        const url = cab + '/produtos/tipos/' + idTipo + '/categorias';
        return this.http.get(url).toPromise();
    }

    getDivisoesCategoria = (idCat) => {
        const cab = this.getProt();
        const url = cab + '/produtos/tipos/categorias/' + idCat + '/divisoes';
        return this.http.get(url).toPromise();
    }

    gravaNovoTipo = (nome: String, idStab: number) => {

        const cab = this.getProt();
        const url = cab + '/produtos/incluiTipoParaStab?nome=' + nome + '&idStab=' + idStab;
        return this.http.get(url).toPromise();
    }

    apagaProdutosDeUmTipo = (idTipo: number) => {
        const cab = this.getProt();
        const url = '/produtos/apagaProdutoPorTipo?idTipo=' + idTipo;
        return this.http.get(url).toPromise();
    }

    gravaNovaCategoriaDeTipo = (parm) => {
        const cab = this.getProt();
        const url = cab + '/produtos/novaCategoria';
        return this.http.post(url, parm).toPromise();
    }

    gravaNovaDivisaoDeCategoria = (parm) => {
        const cab = this.getProt();
        const url = cab + '/produtos/novaDivisao';
        return this.http.post(url, parm).toPromise();
    }

    gravaNovoProduto = (parm) => {
        const cab = this.getProt();
        const url = cab + '/produtos/incluiProduto';
        return this.http.post(url, parm).toPromise();
    }

    alteraPreco = (parm) => {
        const cab = this.getProt();
        const url = cab + '/produtos/alteraPreco';
        return this.http.put(url, parm).toPromise();
    }

    alteraPublicacao = (idProduto: number, publicado: number) => {
        const cab = this.getProt();
        let url = cab + '/produtos/alteraPublicacao';
        url += '?idProduto=' + idProduto;
        url += '&publicado=' + publicado;
        return this.http.get(url).toPromise();
    }

    excluiProduto = (idProduto: number) => {
        const cab = this.getProt();
        const url = cab + '/produtos/excluiProduto';
        return this.http.post(url, idProduto).toPromise();
    }

    alteraTipo = (idTipo: number, nome: string, meio: number) => {
        const cab = this.getProt();
        const url = cab + '/produtos/tipos/' + idTipo + '/' + nome + '/' + meio;
        return this.http.put(url, null).toPromise();
    }

    excluiTipo = (idTipo: number) => {
        const cab = this.getProt();
        const url = cab + '/produtos/tipo/remove/' + idTipo;
        return this.http.post(url, null).toPromise();
    }

    alteraProduto = (idProduto: number, descricao: string, detalhe: string) => {
        const cab = this.getProt();
        let url = cab + '/produtos/alteraProduto?idProduto=' + idProduto;
        url += '&descricao=' + descricao;
        url += '&detalhe=' + detalhe;
        return this.http.post(url, null).toPromise();
    }

    getCliente = (parm) => {
        const cab = this.getProt();
        const url = cab + '/clientes/login';
        return this.http.post(url, parm).toPromise();
    }

    getStabsDeUser = (idUser: number) => {
        const cab = this.getProt();
        const url = cab + '/estabelecimentos/clientes/' + idUser;
        return this.http.get(url).toPromise();
    }

    getEndereco = (idStab: number) => {
        const cab = this.getProt();
        const url = cab + '/estabelecimentos/enderecos/' + idStab;
        return this.http.get(url).toPromise();
    }

    getByCep = (cep) => {
        const url = 'https://hipizza.com.br/cep/buscaCep.php?cep=' + cep;
        return this.http.get(url).toPromise();
    }

    gravaEndereco = (parm: any) => {
        const cab = this.getProt();
        const url = cab + '/estabelecimentos/enderecos';
        return this.http.post(url, parm).toPromise();
    }

    getFormasPagamento = () => {
        const cab = this.getProt();
        const url = cab + '/formasPagamento/listaFormasPagamento';
        return this.http.get(url).toPromise();
    }

    getFormasPgDeStab = (idStab: number) => {
        const cab = this.getProt();
        const url = cab + '/estabelecimentos/formasPag?idStab=' + idStab;
        return this.http.get(url).toPromise();
    }

    gravaFormaPag = (idStab: number, idForma: number) => {
        const cab = this.getProt();
        const url = cab + '/estabelecimentos/insereFormaPagto/' + idStab + '/' + idForma;
        return this.http.post(url, null).toPromise();
    }

    apagaFormaStab = (idStab: number, idForma: number) => {
        const cab = this.getProt();
        const url = cab + '/formasPagamento/removeFormaDeStab/' + idStab + '/' + idForma;
        return this.http.post(url, null).toPromise();
    }

    getHorarios = (idStab: number) => {
        const cab = this.getProt();
        const url = cab + '/estabelecimentos/horarios?idStab=' + idStab;
        return this.http.get(url).toPromise();
    }

    putHorario = (parms: any) => {
        const cab = this.getProt();
        const url = cab + '/estabelecimentos/putHorario';
        return this.http.post(url, parms).toPromise();
    }

    removeHorarioEstabelecimento = (id: number) => {
        const cab = this.getProt();
        const url = cab + '/estabelecimentos/removeHorarioEstabelecimento/' + id;
        return this.http.post(url, null).toPromise();
    }

    getPedidoStab = (idStab: number) => {
        const cab = this.getProt();
        const url = cab + '/pedidos/pedidosDeStab?idStab=' + idStab + '&passo=25';
        return this.http.get(url).toPromise();
    }

    getFormasPgPd = (idPedido: number) => {
        const cab = this.getProt();
        const url = cab + '/pedidos/formasParaUmPedido?idPedido=' + idPedido;
        return this.http.get(url).toPromise();
    }

    setFormulaMeioAMeio = (idStab: number, valor: string) => {
        const cab = this.getProt();
        const url = cab + '/estabelecimentos/setMeioAMeio?idStab=' + idStab + '&valor=' + valor;
        return this.http.get(url).toPromise();
    }

    getItensPedido = (idPedido: number) => {
        const cab = this.getProt();
        const url = cab + '/pedidos/itensPedido?idPedido=' + idPedido;
        return this.http.get(url).toPromise();
    }

    getProdutoPorId = (idProduto: number) => {
        const cab = this.getProt();
        const url = cab + '/produtos/getProdutoById?idProduto=' + idProduto;
        return this.http.get(url).toPromise();
    }

    getOpcoesDeItem = (idItem: number) => {
        const cab = this.getProt();
        const url = cab + '/opcoes/getOpcoesDeUmProduto?idItem=' + idItem;
        return this.http.get(url).toPromise();
    }

    getListaFlagsClientes = () => {
        const cab = this.getProt();
        const url = cab + '/flags/getListaFlags';
        return this.http.get(url).toPromise();
    }

    getFlagsDeCliente = (idCliente: number) => {
        const cab = this.getProt();
        const url = cab + '/flags/getFlagsCliente/' + idCliente;
        return this.http.get(url).toPromise();
    }

    addFlagCliente = (idCliente: number, idFlag: number) => {
        const cab = this.getProt();
        const url = cab + '/flags/addFlag/' + idCliente + '/' + idFlag;
        return this.http.post(url, null).toPromise();
    }

    retiraFlagCliente = (idCliente: number, idFlag: number) => {
        const cab = this.getProt();
        const url = cab + '/flags/removeFlag/' + idCliente + '/' + idFlag;
        return this.http.post(url, null).toPromise();
    }

    alteraUser = (user: any) => {
        const cab = this.getProt();
        const url = cab + '/clientes/alteraCliente';
        return this.http.post(url, user).toPromise();
    }

    buscaPedidoPorId = (id: number) => {
        const cab = this.getProt();
        const url = cab + '/pedidos/getPedidoById/' + id;
        return this.http.get(url).toPromise();
    }

    getListaStatusPedido = () => {
        const cab = this.getProt();
        const url = cab + '/statusPedido/listaStatusPedido';
        return this.http.get(url).toPromise();
    }

    setStatusPed = (idPedido: number, idStatus: number) => {
        const cab = this.getProt();
        const url = cab + '/pedidos/setStatusPed?idPedido=' + idPedido + '&idStatus=' + idStatus + '&q=sta';
        return this.http.get(url).toPromise();
    }

    setEntregador = (idPedido: number, idEntregador: number) => {
        const cab = this.getProt();
        const url = cab + '/pedidos/setEntregadorPed/' + idPedido + '/' + idEntregador;
        return this.http.post(url, null).toPromise();
    }

    getCardapioPadrao = () => {
        const cab = this.getProt();
        const url = cab + '/produtos/getCardapioPadrao';
        return this.http.get(url).toPromise();
    }

    tombamento = (idStab: number, idsProdutos: string) => {
        const cab = this.getProt();
        const url = cab + '/produtos/tombamento?idStab=' + idStab +  '&idsProdutos=' + idsProdutos;
        return this.http.post(url, null).toPromise();
    }

    loginEntregador = (parm: any) => {
        const cab = this.getProt();
        const url = cab + '/equipes/loginEntregador';
        return this.http.post(url, parm).toPromise();
    }

    buscaEntregadorPorId = (id: number) => {
        const cab = this.getProt();
        const url = cab + '/entregadores/buscaEntregadorPorId/' + id;
        return this.http.get(url).toPromise();
    }

    getStabEntregador = (id: number) => {
        const cab = this.getProt();
        const url = cab + '/entregadores/getStabEntregador?id=' + id;
        return this.http.get(url).toPromise();
    }

    listaPedidosPorStatusEEntregador = (idEntregador: number, idStatus: number) => {
        const cab = this.getProt();
        const url = cab + '/entregadores/listaPedidosPorStatusEEntregador?idEntregador=' + idEntregador + '&idStatus=' + idStatus + '&passo=2';
        return this.http.get(url).toPromise();
    }

    entregadorRegistraEntrega = (entrega: any) => {
        const cab = this.getProt();
        const url = cab + '/entregadores/entregadorRegistraEntrega';
        return this.http.put(url, entrega).toPromise();
    }

    trazListaEntregadores = (idStab: number) => {
        const cab = this.getProt();
        const url = cab + '/equipes/buscaPorPerfil?idEstabelecimento=' + idStab + '&idPerfil=5';
        return this.http.get(url).toPromise();
    }

    trazLogDePlayer = (idPlayer: number, indice: number, passo: number) => {
        const cab = this.getProt();
        const url = cab + '/logs/getLogsDePlayer?idPlayer=' + idPlayer + '&indice=' + indice + '&passo=' + passo;
        return this.http.get(url).toPromise();
    }

    getUrl = (url: string) => {
        return this.http.get(url).toPromise();
    }

    reCall = (fun) => {
        this.fn = fun;
    }

    tstFn = (toFn, parm) => {
        this.fn = toFn;
        this.fn(parm);
    }

    getIdOper = () => {
        return this.idOper;
    }
    setIdOper = (parm) => {
        this.idOper = parm;
    }
}
