import { Link } from "react-router-dom";
import FaqAccordion from "components/expansion-panels/faq/FaqAccordion";
import useBackColor from "hooks/useBackColor";

// ref: https://politicaprivacidade.com/

const text2 = (
    <section className="section-accordion font-normal">
        <h2 className="text-lg pt-5 font-bold">
            Chave de Sessão e Rotas Protegidas
        </h2>
        <p>
            A chave de sessão é uma proteção para assegurar que todas as sessões
            de acesso sejam autênticas. Provar quem está acessando sua conta é
            realmente você. Prevenimos que terceiros tenham a possibilidade de
            acessar a conta de outros clientes com a chave ou por inspeção de
            rotas e API.
        </p>
        <p>
            Implementamos{" "}
            <strong>mecanismos especializados em seus servidores</strong> para
            bloquear quaisquer sites ou servidores não autorizados de fazerem
            requerimentos em nossas APIs.
        </p>
        <p>
            As rotas mais sensíveis possuem ainda outras medidas adicionais de
            segurança.
        </p>
    </section>
);

const text4 = (
    <section className="section-accordion font-normal">
        <p>
            Este documento tem como o objetivo de explicar de forma clara e
            transparente das práticas usadas pela Sempre Alerta SOS para
            coletar, usar, tratar, armazenar, remover e proteger os dados
            pessoais de todos os usuários no painel e/ou nos apps.
        </p>
        <p>
            No cadastro, a Sempre Alerta SOS solicita os seguintes dados com
            suas respectivas finalidades:
        </p>
        <ul className="list-disc ml-8">
            <li>
                <strong>email: </strong>garantir que o acesso da conta seja
                único ao sistema, comunicados importantes e autentificação.
            </li>
            <li>
                <strong>nome completo: </strong>identificação nominal nos
                serviços e registros.
            </li>
            <li>
                <strong>telefone: </strong> essencial para as funcionalidades do
                serviço envio de alertas.
            </li>
        </ul>

        <p>
            Se for cadastro de instituição, podemos solicitar e coletar dados
            adicionais como relacionados ao endereço.
        </p>

        <h2 className="text-lg pt-5 font-bold">Dados de Análise adicionais</h2>
        <p>
            Quando você visita nossa plataforma ou apps, serviços de análise
            podem ser utilizados.
        </p>
        <p>
            Dados adicionais podem ser coletados, tais como: endereço IP,
            registro de acesso, geolocalização, tipo do navegador utilizado,
            versão do sistema operacional, modelo e características do aparelho
            móvel, duração da visita, caminhos de navegação ao site e páginas
            visitadas.
        </p>
        <p>
            É importante salientar que os dados de análises{" "}
            <strong>não coletará ou associará com nenhum dado pessoal</strong>.
            Servirá exclusivamente para mensurar desempenho, preferências,
            perspectivas e melhorias de nossos serviços.
        </p>
    </section>
);

const text6 = (
    <section className="section-accordion font-normal">
        <p>
            A Sempre Alerta SOS está de acordo com a nova Lei Geral de Proteção
            de Dados (LGPD) - artigo 18 - e{" "}
            <strong>
                respeita o direito dos usuários de remover ou alterar seus dados
            </strong>
            .
        </p>
        <p>
            Você como usuário de nossos serviços, possui direitos de proteção de
            dados, tais como:
        </p>

        <ul className="list-disc ml-8">
            <li>
                <strong>Direito de Restrição de Processamento</strong> –
                Solicitar que restrinjamos o processamento de seus dados
                pessoais, sob certas condições.
            </li>
            <li>
                <strong>Direito de Acesso</strong> – Solicitar cópias de seus
                dados pessoais.
            </li>
            <li>
                <strong>Direito ao Esquecimento</strong> – Solicitar que
                apaguemos seus dados pessoais, sob certas condições.
            </li>
            <li>
                <strong>Direito de Retificação</strong> – Solicitar que
                corrijamos qualquer informação que você acredita estar
                incorreta. Também tem o direito de solicitar que completemos as
                informações que acredita estar incompletas.
            </li>

            <li>
                <strong>Direito à Portabilidade de Dados</strong> – Solicitar
                que transfiramos os dados que coletamos para outra organização
                ou diretamente para você, sob certas condições.
            </li>

            <li>
                <strong>Direito de Oposição ao Processamento</strong> – Se opor
                ao nosso processamento de seus dados pessoais, sob certas
                condições.
            </li>
        </ul>
        <p>
            Temos até <strong>15 dias</strong> para excluir todos seus dados de
            nossos servidores de acordo com a{" "}
            <a
                href="https://www.trf5.jus.br/index.php/lgpd/lgpd-direitos-do-titular"
                target="_blank"
                className="underline"
            >
                lei de proteção de dados LGPD (Art. 19, inciso II).
            </a>
        </p>

        <p>
            O usuário pode pedir a exclusão de dados, acessando a página de{" "}
            <a
                href="https://semprealertasos.com/conta/exclusao"
                target="_blank"
                className="underline"
            >
                exclusão de conta
            </a>
        </p>
        <p>
            Para alterar algum dado, favor acesse o app ou painel para
            alterações. Você também pode entrar em contato conosco.
        </p>
    </section>
);

const text7 = (
    <section className="section-accordion font-normal">
        <p>
            Reservamos o direito de modificar esta política de privacidade a
            qualquer momento.
        </p>
        <p>
            Caso aconteça mudanças significativas, avisaremos por email a todos
            os usuários cadastrados.
        </p>
        <p>
            Esta política é efetiva a partir de{" "}
            <strong>5 de Dezembro de 2023</strong>
        </p>
    </section>
);

const dataArray = [
    {
        title: "Dados coletados e finalidades",
        text: text4,
    },
    {
        title: "LGPD (Lei Geral da Proteção de Dados) e remoção de dados",
        text: text6,
    },
    {
        title: "Protocolos de Segurança",
        text: text2,
    },
    {
        title: "Mudanças nas políticas de privacidade",
        text: text7,
    },
];

export default function PrivacyPolicy() {
    // useScrollUp();

    useBackColor("bg-[#243B55]");

    return (
        <>
            <section className="text-white my-5 mx-3 text-center text-titl">
                <section className="flex flex-col items-center">
                    <img
                        className="my-5"
                        src="/img/logo/logo_sempre_alerta_s.png"
                        width={80}
                        height={80}
                    />
                    <h1
                        className="text-title text-center"
                        style={{ color: "var(--txtPrimaryLight)" }}
                    >
                        Política de Privacidade - Sempre Alerta SOS
                    </h1>
                    <h2
                        className="text-subtitle px-5 md:w-[700px] text-justify md:text-center"
                        style={{ color: "var(--txtPrimaryLight)" }}
                    >
                        Entenda como lidamos com seus dados e práticas de
                        segurança usados em nossos serviços.
                    </h2>
                </section>
            </section>
            <section className="flex justify-center">
                <section className="my-5 px-5 md:w-[700px] text-justify">
                    <FaqAccordion dataArray={dataArray} />
                    <style>{`
                        .section-accordion p {
                            margin-top: 0.75rem
                        }
                    `}</style>
                </section>
            </section>
        </>
    );
}

/* ARCHIVES
<p>
            A Sempre Alerta SOS monitora vunerabilidades e investe na segurança,
            privacidade e integridade dos dados de toda sua base de usuários
            usando - dentre outras práticas reconhecidas pela indústria - a
            criptografia com os algoritmos e mecanismos modernos como{" "}
            <strong>
                aqueles reconhecidos pela comunidade de cybersegurança do Bcrypt
                e AES-256
            </strong>{" "}
            para o combate contra cenários de vazamentos e invasões que afetam
            centenas de negócios todos os anos devido à constante evolução da
            tecnologia, desatualização de sistemas, engenharia social ou mesmo
            negligência.
        </p>
        <p>
            <strong>Acreditamos na prevenção</strong> e usamos desde o começo
            tais medidas de segurança para proteger{" "}
            <strong>os dados sensíveis tais como email</strong> de todos nossos
            usuários.
        </p>
        <h2 className="font-weight-bold text-normal">PROTEÇÃO DE SENHAS</h2>
        <p>
            Com exceção do App do cliente, que não possui senha de acesso -
            apenas acesso por EMAIL, todos os outros tipos de apps da Sempre Alerta SOS
            exigem senha.
        </p>
        Veja a relação das senhas exigidas em cada app:
        <ul>
            <li>
                <strong>App cliente:</strong> sem senha
            </li>
            <li>
                <strong>App admin e Sempre Alerta SOS:</strong>exige senha de cadastro
            </li>
            <li>
                <strong>App membro:</strong>exige senha definida pelo
                cliente-administrador
            </li>
        </ul>
        <p>
            A Sempre Alerta SOS{" "}
            <strong>
                não armazena senhas de acessos diretamente no banco de dados
            </strong>{" "}
            em pleno texto. Em vez disso, faz o uso de um modelo de criptografia
            forte e seguro do BCrypt.
        </p>
        <p>
            É um algoritmo que transforma senhas em uma longa chave usando uma
            série de camada de caracteres aleatórios para não serem
            decriptogradas ou não sejam passíveis de técnicas de reengenharia
            reversa.
        </p>
        <p>
            Somente essa chave é mantida no banco de dados e usada para comparar
            e validar pelo próprio algoritmo se ela corresponde com a senha
            digitada a cada acesso. Além do mais, o BCrypt é performático e pode
            gerar uma chave em milésimos de segundos.
        </p>

        <h2 className="font-weight-bold text-normal">CADASTRO COM PONTOS</h2>
        <p>
            Quando um cliente é cadastrado com pontos, há um protocolo de
            segurança para que{" "}
            <strong>
                não aconteça uma duplicação ou alteração da pontuação
            </strong>{" "}
            nos links de convite.
        </p>
        <p>
            É um cenário comum onde os clientes fazem suas compras e já entram
            para o clube de compras se cadastrando com seus primeiros pontos.
        </p>
        <p>
            Em resumo, os <strong>pontos são criptografados no link</strong> e a
            página do convite para ter acesso ao app fica limitada apenas e
            durante o <strong>processo de cadastro do cliente</strong>.
        </p>
        <p>
            Após o cadastro, o link é considerado{" "}
            <strong>usado e invalidado automaticamente</strong>, impedindo o
            acesso e uma pontuação indevida do usuário.
        </p>

*/

/* ARCHIVES


const text3 = (
    <>
        <p>
            Em alguns casos específicos, a Sempre Alerta SOS pode divulgar seus dados.
            São eles:
            <ul>
                <li>
                    Se você violar nossos <strong>termos de uso</strong> e seja
                    preciso revelar seus dados;
                </li>
                <li>
                    Caso sejamos <strong>obrigados por lei</strong> para tal
                    divulgação.
                </li>
            </ul>
            Tirando esses casos acima, a Sempre Alerta SOS manterá seus dados de forma
            privada, íntegra e armazenada com segurança.
        </p>
    </>
);

<DateWithIcon
                style={{ color: "var(--mainWhite)" }}
                date="2021-02-28T03:39:46.915Z" // first time: "2021-02-17T02:57:13.873Z"
                msgIfNotValidDate="Nenhuma alteração."
                marginTop={-10}
                needTxtShadow
            />

*/

// // ref: https://worldofdragon.us.eu.org/information/

// const PrivacyPolicy = () => {
//     return (
//         <div className="px-5 lg:px-80 mb-96">
//             <h1 className="text-center text-4xl font-bold py-5">
//                 Política de Privacidade - Sempre Alerta SOS
//             </h1>

//             <p className="text-normal">
//                 Na Sempre Alerta SOS (semprealertasos.com), a privacidade dos
//                 nossos visitantes é uma das nossas principais prioridades. Este
//                 documento de Política de Privacidade contém tipos de informações
//                 coletadas e registradas pela Sempre Alerta SOS e como as
//                 utilizamos.
//             </p>

//             <p className="text-normal">
//                 Se tiver perguntas adicionais ou precisar de mais informações
//                 sobre nossa Política de Privacidade, não hesite em entrar em
//                 contato conosco.
//             </p>

//             <h2 className="text-xl pt-5 font-bold">Consentimento</h2>
//             <p className="text-normal">
//                 Ao usar nosso site ou app, você consente com nossa Política de
//                 Privacidade e concorda com seus termos.
//             </p>

//             <h2 className="text-xl pt-5 font-bold">
//                 Informações que coletamos
//             </h2>
//             <p className="text-normal">
//                 As informações pessoais solicitadas e os motivos pelos quais são
//                 solicitadas ficarão claros no momento em que pedirmos que
//                 forneça suas informações pessoais.
//             </p>

//             <p className="text-normal">
//                 Se entrar em contato diretamente conosco, podemos receber
//                 informações adicionais sobre você, como seu nome, endereço de
//                 e-mail, número de telefone, o conteúdo da mensagem e/ou anexos
//                 que nos enviar, e qualquer outra informação que escolher
//                 fornecer.
//             </p>

//             <p className="text-normal">
//                 Ao se registrar para uma conta, podemos solicitar suas
//                 informações de contato, incluindo itens como nome, endereço de
//                 e-mail e número de telefone.
//             </p>

//             <h2 className="text-xl pt-5 font-bold">
//                 Como usamos suas informações
//             </h2>
//             <p className="text-normal">
//                 Usamos as informações coletadas de várias maneiras, incluindo
//                 para:
//             </p>

//             <ul className="list-disc ml-8 text-normal">
//                 <li>Fornecer, operar e manter nosso site</li>
//                 <li>Melhorar, personalizar e expandir nosso site</li>
//                 <li>Compreender e analisar como você usa nosso site</li>
//                 <li>
//                     Desenvolver novos produtos, serviços, recursos e
//                     funcionalidades
//                 </li>
//                 <li>
//                     Comunicar-se com você, diretamente ou por meio de um de
//                     nossos parceiros, para atendimento ao cliente, fornecer
//                     atualizações e outras informações relacionadas ao site, e
//                     para fins de marketing e promoção
//                 </li>
//                 <li>Enviar e-mails</li>
//                 <li>Encontrar e prevenir fraudes</li>
//             </ul>

//             <h2 className="text-xl pt-5 font-bold">
//                 Políticas de Privacidade de Terceiros
//             </h2>

//             <p className="text-normal">
//                 A Política de Privacidade da Sempre Alerta SOS não se aplica a
//                 outros anunciantes ou sites. Portanto, aconselhamos que consulte
//                 as respectivas Políticas de Privacidade desses servidores de
//                 anúncios de terceiros para obter informações mais detalhadas.
//                 Isso pode incluir práticas e instruções sobre como optar por não
//                 participar de certas opções.
//             </p>

//             <p className="text-normal">
//                 Você pode optar por desativar cookies através das opções
//                 individuais do seu navegador. Para obter informações mais
//                 detalhadas sobre o gerenciamento de cookies com navegadores
//                 específicos, consulte os sites respectivos dos navegadores.
//             </p>

//             <h2 className="text-xl pt-5 font-bold">
//                 Direitos de Privacidade do CCPA (Não Venda das Minhas
//                 Informações Pessoais)
//             </h2>

//             <p className="text-normal">
//                 Sob o CCPA, entre outros direitos, os consumidores têm o direito
//                 de:
//             </p>

//             <ul className="list-disc ml-8">
//                 <li className="text-normal">
//                     Solicitar que um negócio que coleta dados pessoais de um
//                     consumidor divulgue as categorias e peças específicas de
//                     dados pessoais coletados sobre os consumidores.
//                 </li>
//                 <li className="text-normal">
//                     Solicitar que um negócio exclua qualquer dado pessoal sobre
//                     o consumidor que o negócio tenha coletado.
//                 </li>
//                 <li className="text-normal">
//                     Solicitar que um negócio que vende os dados pessoais de um
//                     consumidor não venda esses dados pessoais do consumidor.
//                 </li>
//             </ul>

//             <p className="text-normal">
//                 Se você fizer uma solicitação, temos um mês para responder. Se
//                 desejar exercer qualquer um desses direitos, entre em contato
//                 conosco.
//             </p>

//             <h2 className="text-xl pt-5 font-bold">
//                 Direitos de Proteção de Dados do GDPR
//             </h2>

//             <p className="text-normal">
//                 Queremos garantir que você esteja plenamente ciente de todos os
//                 seus direitos de proteção de dados. Todo usuário tem direito aos
//                 seguintes:
//             </p>

//             <ul className="list-disc ml-8">
//                 <li className="text-normal">
//                     <strong>Direito de Acesso</strong> – Você tem o direito de
//                     solicitar cópias de seus dados pessoais.
//                 </li>
//                 <li className="text-normal">
//                     <strong>Direito de Retificação</strong> – Você tem o direito
//                     de solicitar que corrijamos qualquer informação que acredita
//                     estar incorreta. Você também tem o direito de solicitar que
//                     completemos as informações que acredita estar incompletas.
//                 </li>
//                 <li className="text-normal">
//                     <strong>Direito ao Esquecimento</strong> – Você tem o
//                     direito de solicitar que apaguemos seus dados pessoais, sob
//                     certas condições.
//                 </li>
//                 <li className="text-normal">
//                     <strong>Direito de Restrição de Processamento</strong> –
//                     Você tem o direito de solicitar que restrinjamos o
//                     processamento de seus dados pessoais, sob certas condições.
//                 </li>
//                 <li className="text-normal">
//                     <strong>Direito de Oposição ao Processamento</strong> – Você
//                     tem o direito de se opor ao nosso processamento de seus
//                     dados pessoais, sob certas condições.
//                 </li>
//                 <li className="text-normal">
//                     <strong>Direito à Portabilidade de Dados</strong> – Você tem
//                     o direito de solicitar que transfiramos os dados que
//                     coletamos para outra organização ou diretamente para você,
//                     sob certas condições.
//                 </li>
//             </ul>

//             <p className="text-normal">
//                 Se você fizer uma solicitação, temos um mês para responder. Se
//                 desejar exercer qualquer um desses direitos, entre em contato
//                 conosco.
//             </p>
//         </div>
//     );
// };

// export default PrivacyPolicy;
