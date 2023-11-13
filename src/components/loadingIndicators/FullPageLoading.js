import styled, { keyframes } from "styled-components";
import { HOST_URL } from "../../config/root";

export default function FullPageLoading({ color, backgroundColor }) {
    return (
        <DivWrapper color={color} backgroundColor={backgroundColor}>
            <img
                className="svg-elevation pulse-it"
                id="logo"
                src={`${HOST_URL}/img/official-logo-white.png`}
                alt="logo carregando..."
                height="150px"
            />
            <section className="loading-container">
                <h2 className="loading-text">Carregando</h2>
                <div className="spinner">
                    <div className="bounce1" />
                    <div className="bounce2" />
                    <div className="bounce3" />
                </div>
            </section>
        </DivWrapper>
    );
}

const bounceDots = keyframes`
    0%, 80%, 100% {
      transform: scale(0);
    } 40% {
      transform: scale(1.0);
    }
`;

const DivWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: ${({ backgroundColor }) =>
        backgroundColor || "var(--mainWhite)"};
    color: var(--mainDark);
    z-index: 999;

    //Three-dot bouncing loading effect
    //Resource: https://codepen.io/danielmorosan/pen/XmYBVx
    .loading-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
    }

    .loading-text {
        color: ${({ color }) => color || "var(--mainPurple)"};
        fontweight: bold;
    }

    & .spinner {
        //margin: 100px auto 0;
        width: 70px;
        text-align: center;
    }

    & .spinner > div {
        margin: 5px;
        width: 6px;
        height: 6px;
        background-color: #333;

        border-radius: 100%;
        display: inline-block;
        animation: ${bounceDots} 1.4s infinite ease-in-out both;
    }

    & .spinner .bounce1 {
        animation-delay: -0.32s;
    }

    & .spinner .bounce2 {
        animation-delay: -0.16s;
    }
`;

/* ARCHIVES
// const loadImage = () => {
//     var img = new Image(),
//         x = document.querySelector("babadoo-logo");

//     img.onload = function() {
//         x.src = img.src;
//     };

//     img.src = "img/babadoo-logo_no-slogon.png";
// }
<section>
    <h1 className="text-title text-center">
        <strong>
            <span>L</span>ingeries <br />e<br /> Acessórios Eróticos
        </strong>
    </h1>
</section>
*/
