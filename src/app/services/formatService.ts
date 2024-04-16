import { Injectable } from '@angular/core';

declare  global {
    interface String {
      gentNum(): string;
      numGent(): string;
    }
  }
@Injectable({
    providedIn: 'root'
})
export class FormatServices {

    constructor() {
        console.log('Construtor');
        String.prototype.gentNum = function() {
            const parm = this;
            let retorno = parm;
            if (parm.length > 9) {
                retorno = parm.substring(6, 10) + '-' + parm.substring(3, 5) + '-' + parm.substring(0, 2);
            }
            return retorno;
        };
        String.prototype.numGent = function() {
            const parm = this;
            let retorno = parm;
            if (parm.length > 9) {
                retorno = parm.substring(8, 10) + '/' + parm.substring(5, 7) + '/' + parm.substring(0, 4);
            }
            return retorno;
        };
    }

    mascaraFone = (idElemento, qtipo) => {
        const elemento = document.getElementById(idElemento);
        let parm = this.getValue(elemento);
        if (parm.length === 1) {
            if (parm !== '(') {
                parm = '(' + parm;
            }
            this.setValue(elemento, parm);
        }
        if (parm.length === 3) {
            parm = parm + ') ';
            this.setValue(elemento, parm);
        }
        if (qtipo === '2') {
            if (parm.length === 6) {
                parm += ' ';
                this.setValue(elemento, parm);
            }
            if (parm.length === 11) {
                parm += '-';
                this.setValue(elemento, parm);
            }
        } else {
            if (parm.length === 9) {
                parm += '-';
                this.setValue(elemento, parm);
            }
        }
    }

    separaFone = (parm) => {
        let retorno = parm;
        if (parm.indexOf('(') === 0) {
            if (parm.indexOf(') ') > 0) {
                const ddd=parm.substring(1, 3);
                const fone = parm.substring(5);
                retorno = ddd + ':' + fone;
            }
        }
        return retorno;
    }

    mascaraCnpj = (idElemento) => {
        const digitos = '0123456789./-';
        const elemento = document.getElementById(idElemento);
        let parm: string = this.getValue(elemento);
        const car = parm.substring(parm.length - 1);
        if (digitos.indexOf(car) < 0) {
            parm = parm.substring(0, parm.length - 1);
            this.setValue(elemento, parm);
        } else {
            if (parm.length === 2) {
                parm += '.';
                this.setValue(elemento, parm);
            }
            if (parm.length === 6) {
                parm += '.';
                this.setValue(elemento, parm);
            }
            if (parm.length === 10) {
                parm += '/';
                this.setValue(elemento, parm);
            }
            if (parm.length === 15) {
                parm += '-';
                this.setValue(elemento, parm);
            }
            if (parm.length === 18) {
                // parm = parm.substring(0, parm.length - 1);
                // this.setValue(elemento, parm);
                this.validaCNPJ(parm);
            }
        }
    }

    getValue = (elemento) => {
        return elemento.value;
    }
    setValue = (elemento, valor) => {
        elemento.value = valor;
    }

    mascaraMoeda = (idElemento) => {
        const numeros = '1234567890';
        const elemento = document.getElementById(idElemento);
        let parm = this.getValue(elemento);
        const c = parm.substring(parm.length - 1, parm.length);
        const n = numeros.indexOf(c);
        const iv = parm.indexOf(',');
        if (n < 0) {
            parm = parm.substring(0, parm.length - 1);
            this.setValue(elemento, parm);
        }
        let pleno = parm.replace(',', '');
        if (pleno.length > 0) {
            pleno = parseInt(pleno, 10);
            pleno = pleno.toString();
        }
        for (let i=pleno.length; i<3; i++) {
            pleno = '0' + pleno;
        }
        pleno = pleno.substring(0,pleno.length - 2) + ',' + pleno.substring(pleno.length - 2);
        parm = pleno;
        this.setValue(elemento, parm);
    }

    mascaracep = (idElemento) => {
        const elemento = document.getElementById(idElemento);
        let parm = this.getValue(elemento);
        if (parm.length === 5) {
            parm += '-';
            this.setValue(elemento, parm);
        }
    }

    validaCNPJ = (CNPJ) => {
        let erro = '';
        if (CNPJ.length < 18) {
            erro += 'É necessario preencher corretamente o nъmero do CNPJ!';
        }
        if ((CNPJ.charAt(2) !== '.') || (CNPJ.charAt(6) !== '.') || (CNPJ.charAt(10) !== '/') || (CNPJ.charAt(15) !== '-')) {
            if (erro.length === 0) {
                erro += 'É necessбrio preencher corretamente o nъmero do CNPJ! \n\n';
             }
        }
        CNPJ = CNPJ. replace ('.','');
        CNPJ = CNPJ. replace ('.','');
        CNPJ = CNPJ. replace ('-','');
        CNPJ = CNPJ. replace ('/','');
        const nonNumbers = /\D/;
        if (nonNumbers.test(CNPJ)) {
            erro += 'A verificaзгo de CNPJ suporta apenas nъmeros! \n\n';
        }
        const a = [];
        let b = 0;
        const c = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 12; i++){
                a[i] = CNPJ.charAt(i);
                const n = parseInt(a[i], 10);
                let z =  n * c[i + 1];
                b += z;
        }
        let x = (b % 11);
        if (x < 2) { a[12] = 0; } else { a[12] = 11 - x }
        b = 0;
        for (let y = 0; y < 13; y++) {
                b += (a[y] * c[y]);
        }
        x = b % 11;
        if (x < 2) { a[13] = 0; } else { a[13] = 11 - x; }
        if ((parseInt(CNPJ.charAt(12),10) !== a[12]) || (parseInt(CNPJ.charAt(13),10) !== a[13])){
                erro += 'Dнgito verificador com problema!';
        }
        if (erro.length > 0){
            alert(erro);
            return false;
                //document.getElementById("retornoCnpj").value="pau";
        } else {
                //document.getElementById("retornoCnpj").value="Bateu";
        }
        return true;
    }

    float2moeda = (num) => {
        let x = 0;

        if (num < 0) {
            num = Math.abs(num);
            x = 1;
        }
        if (isNaN(num)) {
            num = '0';
        }
        const cents = Math.floor((num * 100 + 0.5) % 100);
        let centa = cents.toString();
        num = Math.floor((num * 100 + 0.5) / 100).toString();
        if (cents < 10) {
            centa = '0' + centa;
        }
        for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + '.'
               + num.substring(num.length - (4 * i + 3));
        }
        let ret = num + ',' + centa;
        if (x === 1) {
            ret = ' - ' + ret;
        }
        return ret;
    }

    trocaVigulaPonto = (parm) => {
        let n = parm.indexOf(',');
        while (n >= 0) {
            parm = parm.substring(0, n) + '.' + parm.substring(n + 1, parm.length);
            n = parm.indexOf(',');
        }
        return parm;
    }
    removePonto = (parm) => {
        let n = parm.indexOf('.');
        while (n >= 0) {
            parm = parm.substring(0, n) + parm.substring(n + 1, parm.length);
            n = parm.indexOf('.');
        }
        return parm;
    }
    correnciaParaFloat = (parm) => {
        parm = this.removePonto(parm);
        parm = this.trocaVigulaPonto(parm);
        parm = parm.replace('R$', '');
        parm = parm.replace(' ', '');
        return parm;
    }
}
