export default function validateMobilePhone(phone = "") {
    const isLandlineNumber = String(phone).replace(/\D/g, "").length === 10;
    if (isLandlineNumber) return false;

    const regEx = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/;
    return regEx.test(String(phone));
}

// reference: https://www.ramoncp.com.br/snippets/mascara-de-telefone-para-input-em-js
/* VALIDAÇÃO NÚMERO CELULAR
Não existe ddd que inicia com 0
Hoje em dia todos os telefones celulares no Brasil têm nove dígitos e iniciam com o dígito 9
Todos os telefones fixos têm 8 dígitos e nunca iniciam com o dígito 9.
Telefones fixos começam com dígitos de 2 a 8.
Telefones celulares começam com 9 e têm um segundo dígito de 1 a 9.
O primeiro dígito nunca será 0 ou 1.
Celulares não podem começar com 90 porque esse é o prefixo para ligações a cobrar.
invalid num = "92902817363"
Número máximo de dígitos com DDD: 11
 */

// ref: https://pt.stackoverflow.com/questions/46672/como-fazer-uma-express%C3%A3o-regular-para-telefone-celular
// https://iqcode.com/code/javascript/regex-para-telefone-celular

/* ARCHIVES
/^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/;

*/
