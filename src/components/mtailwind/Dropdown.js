import { autocompleteClasses } from "@mui/material";
import { useState, useEffect, useRef } from "react";

export default function Dropdown() {
    const [show, setShow] = useState(false);

    const wrapperRef = useRef(null);

    const handleShow = (state) => {
        setShow(state);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                show &&
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                handleShow(false);
            }
        }

        const screenDetect = document.addEventListener(
            "mousedown",
            handleClickOutside
        );
        if (!show) document.removeEventListener("mousedown", () => null);
    }, [show]);

    const showUserAccessData = () => (
        <div className="mb-5">
            <h3 className="text-center text-base text-black py-1 font-bold">
                ACESSO
            </h3>
            <div className="mb-2">
                <p className="pl-3 m-0 text-base text-gray-500">
                    &#8226; Usuário:
                </p>
                <p className="pl-3 m-0 text-base font-bold text-yellow-600 text-left">
                    John Doe
                    <br />
                    (admin)
                </p>
            </div>
            <div
                style={{
                    fontSize: "20px",
                    width: "100%",
                    margin: "10px 0",
                    border: 0,
                    height: "2px",
                    backgroundImage: `linear-gradient(
                        to right,
                        rgba(0, 0, 0, 0),
                        rgba(126, 34, 206, 1),
                        rgba(0, 0, 0, 0)`,
                }}
            />
        </div>
    );

    return (
        <section ref={wrapperRef}>
            <button
                className="flex items-center justify-center gap-1 font-bold outline-none capitalize tracking-wider focus:outline-none transition-all duration-300 rounded-full p-2.5 pl-7 pr-5 text-sm leading-normal text-white"
                type="button"
                aria-expanded={show}
                onClick={() => handleShow((prev) => !prev)}
                style={{ padding: 0, color: "transparent" }}
            >
                <div
                    className={`w-12 relative ${
                        show ? "-top-8 md:top-0" : ""
                    } mx-5 sm:mx-5 md:mx-1 xl:mx-6`}
                >
                    <img
                        src="/img/profile/avatar.svg"
                        height="100"
                        width="100"
                        className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                    />
                    <p className="mt-1 text-white text-small text-center">
                        admin
                    </p>
                </div>
                <span className="hidden material-icons text-lg leading-none align-middle">
                    arrow_drop_up
                </span>
            </button>
            <div
                data-tippy-root=""
                id="tippy-1"
                style={{
                    zIndex: 9999,
                    visibility: show ? "visible" : "hidden",
                    position: "absolute",
                    inset: "0px 0px auto auto",
                    margin: "0px",
                    marginRight: 10,
                    transform: "translate3d(-5px, 80px, 0px)",
                }}
            >
                <div
                    className="tippy-box"
                    data-state={show ? "visible" : "hidden"}
                    tabIndex="-1"
                    data-animation="scale"
                    role="tooltip"
                    style={{
                        maxWidth: "350px",
                        transitionDuration: "300ms",
                    }}
                    data-placement="bottom-end"
                >
                    <div
                        className="tippy-content"
                        data-state={show ? "visible" : "hidden"}
                        style={{
                            transitionDuration: "300ms",
                        }}
                    >
                        <section>
                            <div
                                className="bg-white text-base z-50 float-left list-none text-left rounded-lg shadow-lg mt-1 p-2 overflow-hidden transition-all duration-500"
                                style={{
                                    minWidth: "10rem",
                                }}
                            >
                                {showUserAccessData()}
                                <span className="block w-full text-sm py-3 px-4 font-normal cursor-pointer text-center whitespace-no-wrap rounded-md text-yellow-600 hover:text-white hover:bg-yellow-400 hover:shadow-md-purple transition-all duration-300">
                                    SAIR
                                </span>
                            </div>
                        </section>
                    </div>
                    <div
                        className="tippy-arrow"
                        style={{
                            position: "absolute",
                            left: "0px",
                            transform: "translate3d(134px, 0px, 0px)",
                        }}
                    ></div>
                </div>
            </div>
        </section>
    );
}
