import { Fragment } from "react";

export default function Logo({ Link, path }) {
    const handleLogoPath = () => {
        if (path.includes("/blog"))
            return "/img/logo/logo-name-header-blog.svg";

        return "/img/logo/logo-name-header.svg";
    };

    return (
        <Fragment>
            <Link href="/">
                <a className="text-decoration-none">
                    <img
                        className="logo"
                        src={handleLogoPath()}
                        alt="logo da vocariza"
                    />
                </a>
            </Link>
            <style jsx>
                {`
                    .logo {
                        display: block;
                        width: 200px;
                        height: 50px;
                        padding: 5px;
                        margin-bottom: 5px;
                    }

                    @media screen and (min-width: 768px) {
                        .logo {
                            display: block;
                            padding: 5px 20px;
                        }
                    }
                `}
            </style>
        </Fragment>
    );
}
