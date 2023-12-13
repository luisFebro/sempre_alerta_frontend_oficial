// reference: https://www.ramoncp.com.br/snippets/mascara-de-telefone-para-input-em-js
/* VALIDAÇÃO TELEFONE CELULAR
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

// LESSON - the following regex pattern should include all modified patterns applied before like parantheses and space below.
export default function autoPhoneMask(phone) {
    if (!phone) return "";

    phone = String(phone);

    return (
        phone
            // \D prevent any character other than digits to be inserted
            // warning: this \D also prevents to delete non-digit characters
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d)(\d{4})$/, "$1-$2")
    );
}
