import React, { Fragment } from "react";
import Head from "next/head";
import Navbar from "./navbar";
import Breadcrumb from "./Breadcrumb";

const name = "Luis Febro";
export const siteTitle = "Vocariza | Memorize vocabulários em inglês";
export { Breadcrumb };

export default function Layout({ children, home }) {
    return (
        <Fragment>
            <Navbar />
            <main>{children}</main>
        </Fragment>
    );
}

/* ARCHIVES
{home ? (
    <Fragment>
        <img
            src="/img/logo-name.png"
            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
            alt={name}
        />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
    </Fragment>
) : (
    <Fragment>
        <Link href="/">
            <a>
                <img
                    src="/img/logo-name.png"
                    className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                    alt={name}
                />
            </a>
        </Link>
        <h2 className={utilStyles.headingLg}>
            <Link href="/">
                <a className={utilStyles.colorInherit}>
                    {name}
                </a>
            </Link>
        </h2>
    </Fragment>
)}

{!home && (
    <div className={styles.backToHome}>
        <Link href="/">
            <a>← Back to home</a>
        </Link>
    </div>
)}
 */
