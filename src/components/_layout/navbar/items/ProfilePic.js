import { Fragment } from "react";
import Image from "next/image";

/*
style jsx
n1 - global use jsx global when styling Components to apply to all elements in this specific page.
or simply use :global()
At times, we may need to override a certain style of a child component. To do this, Styled JSX provides :global(), giving access to one-off global selectors.
https://nextjs.org/blog/styling-next-with-styled-jsx

n2 - dynamic styles
Note that we placed the dynamic style into a separate <style jsx> tag. This isn't required, but it's recommended to split up static and dynamic styles so that only the dynamic parts are recomputed when props change.
more here: https://nextjs.org/blog/styling-next-with-styled-jsx
*/

export default function ProfilePic({ Link }) {
    return (
        <Fragment>
            <div className="nav-pic-wrap container-center">
                <Image
                    className="nav-pic"
                    src="/img/me.jpg"
                    alt="foto de perfil"
                    layout="fill"
                />
            </div>
            <style jsx>
                {`
                    .nav-pic-wrap {
                        position: absolute;
                        right: 5px;
                        border: 2px solid var(--themeS);
                        border-radius: 50%;
                        background: transparent;
                        width: 37px;
                        height: 37px;
                        margin: 0 15px;
                    }
                    :global(.nav-pic) {
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                    }

                    @media screen and (min-width: 768px) {
                        .nav-pic-wrap {
                            position: relative;
                            width: 47px;
                            height: 47px;
                        }

                        .nav-pic {
                            width: 40px;
                            height: 40px;
                            margin: 0 35px;
                        }
                    }
                `}
            </style>
        </Fragment>
    );
}
