import { Fragment } from "react";

export default function NavMenus({ Link, path }) {
    return (
        <Fragment>
            <nav className="hide-sm push-right">
                <ul className="nav-menu no-list-style">
                    <li className="nav-menu-item">
                        <Link
                            href={{
                                pathname: "/acesso",
                                query: { usuario: "sim" },
                            }}
                        >
                            <a
                                className={`link-nav ${
                                    path === "/acesso" && "current-item"
                                }`}
                                rel="nofollow"
                            >
                                Acesso
                            </a>
                        </Link>
                    </li>
                    <li className="nav-menu-item">
                        <Link href="/blog">
                            <a
                                className={`link-nav ${
                                    path.includes("/blog") && "current-item"
                                }`}
                            >
                                Blog
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <style jsx>
                {`
                    .current-item {
                        text-decoration: underline wavy var(--themeS) !important;
                    }

                    .link-nav {
                        color: var(--themeS);
                        text-decoration: none;
                    }

                    .push-right {
                        margin-left: auto;
                    }

                    .nav-menu {
                        display: flex;
                        align-items: center;
                        flex-flow: wrap;
                        justify-content: flex-end;
                    }

                    .nav-menu-item {
                        padding: 15px;
                        font-size: 1.2em;
                        line-height: 0.01;
                        margin: 0 10px;
                    }

                    @media screen and (min-width: 1200px) {
                        .nav-menu-item {
                            margin: 0 20px;
                        }
                    }
                `}
            </style>
        </Fragment>
    );
}
