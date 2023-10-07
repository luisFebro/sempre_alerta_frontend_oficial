import generateAlphaNumeric from "./generateAlphaNumeric";
import removeDiacritics from "./removeDiacritics";
// SKU (Stock Keeping Unit - Unidade de Manuntenção de Estoque)

// code exemple: GO-Q3-1F3C2DEW (plano-quantidade-id)
const getPlanBr = (plan) => {
    if (typeof plan !== "string") return null;

    if (plan.toLowerCase() === "ouro") return "OU";
    if (plan.toLowerCase() === "prata") return "PR";
    if (plan.toLowerCase() === "bronze") return "BR";

    return "BR";
};

const getPeriodBr = (per, options = {}) => {
    const { gotFullPlan } = options;

    // like when the user buy ONLY a service with no expiration like SMS. In this case, it should not add any date to the service
    const isInfinite = per === "infinite" || !gotFullPlan;

    if (isInfinite) return "I"; // monthly, yearly, infinity duration. This latter is for services like SMS and upcoming ones like buy games
    if (per === "yearly") return "A";
    if (per === "monthly") return "M";

    return "";
};

const getQuantity = (total) => `Q${total}`;

const getServiceSKU = (options = {}) => {
    const { isPro, planBr, total = 0, period, itemList = [] } = options;
    const gotFullPlan = itemList.some((i) => i.range === "fullPlan");

    const SKU = [
        getPlanBr(planBr),
        getQuantity(total),
        getPeriodBr(period, { gotFullPlan }),
        gotFullPlan ? "PL" : "SE", // identify Range if included fullPlan it is P, or SE for selected for any Extra services without a fullPlan or any service from Bronze plan
        generateAlphaNumeric(7, "A#"),
        "P", // if user has purchased priorly
    ];
    if (!isPro) SKU.pop();
    return SKU.join("-");
};

const getProductSKU = (productName) => {
    productName = removeDiacritics(productName);
    const abbrev = productName
        .split(" ")
        .map((each) => each.substr(0, 1).toUpperCase());

    return abbrev.join("");
};

export { getProductSKU, getServiceSKU };

/* COMMENTS
ideally generate the SKU on the orders page right before payment.
n1: ABOUT SKU
O código SKU deve trazer em sua numeração algumas informações sobre o produto, o que torna mais simples a sua identificação. As informações contidas podem ser:

tamanho do material;
cor;
tipo de produto;
quem fabricou;
tipo de produto;
embalagem.
Com essa referência, o produto pode ser encontrado facilmente dentro do armazém, os inventários podem ser feitos com mais agilidade e assertividade, todas as operações relacionadas à saída e entrada dos materiais na empresa podem ser vinculadas a essa identidade, trazendo inúmeros benefícios.

Continuando o exemplo da empresa de vestuário. Digamos que você queira criar um código para uma coleção de camisetas que acabou de chegar. Uma camiseta do fabricante X, da coleção número 10, modelo gola V, que seja do tamanho 12 e da cor branca, poderia ser nomeada como: CX-10-GV-12-BRA.

PLAN-GO-Q3-123cd
Sendo assim, todos os outros produtos devem seguir a mesma lógica e sequência: fabricante, coleção, modelo, tamanho e cor. Para alguém de fora da empresa, essa sequência não terá significado, porém, para a equipe que trabalha com os códigos diariamente, o SKU será comum.
*/
