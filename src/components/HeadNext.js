// Lesson: do not use default as HeadNext because cause memory leaking somehow on next.js
// Fix only after rename back to original Head import name.
import { Fragment } from "react";
import Head from "next/head";
import { DOMAIN, APP_NAME, FB_APP_ID } from "../config";

const getMultiLangMeta = ({ languages, urlPath }) => {
    return languages.map((lang, ind) => {
        let hreflang = lang.trim();
        let param = `/${hreflang}`;

        if (lang === "br") {
            hreflang = "pt-br";
            param = "";
        }

        return (
            <Fragment key={ind}>
                <link
                    rel="alternate"
                    href={`${DOMAIN}${param}${urlPath}`}
                    hrefLang={hreflang}
                />
            </Fragment>
        );
    });
};

export default function HeadNext({
    metaTitle, // ideal maximo 60 characteres para não extrapolar limite visualização google | o termo de pesquisa para o qual você quer ranquear precisa, necessariamente, aparecer na title tag (geralmente no início ou no fim do texto do título).
    metaDesc, // minimum 120 characteres
    mainPhoto,
    urlPath,
    languages, // e.g ["br", "en"]
    isArticle = true,
    noSEO = false,
    noIndex = false,
    robotContent,
    postedBy = "Luis Febro",
}) {
    const currUrl = `${DOMAIN}${urlPath}`;
    const getOpenGraphMeta = () => (
        <Fragment>
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta
                property="og:type"
                content={isArticle ? "article" : "website"}
            />
            <meta property="og:url" content={currUrl} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={mainPhoto} />
            <meta property="og:image:secure_url" content={mainPhoto} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="600" />
        </Fragment>
    );

    const getRobots = () => (
        <Fragment>
            {noIndex ? (
                <meta name="robots" content="noindex" />
            ) : (
                <meta
                    name="robots"
                    content={`index, follow, ${robotContent}`}
                />
            )}
        </Fragment>
    );

    if (noSEO) {
        return (
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
        );
    }

    const needLang = languages && languages.length >= 2;
    return (
        <Head>
            <title>{metaTitle}</title>
            <link rel="canonical" href={currUrl} />
            <meta name="description" content={metaDesc} />
            <meta name="author" content={postedBy} />
            {needLang && getMultiLangMeta({ languages, urlPath })}
            {getOpenGraphMeta()}
            {getRobots()}
        </Head>
    );
}

/* COMMENTS
n1: CONTENT ATT DIRECTIVES OR REL ATTRIBUTES ON A TAG LINKS

* nofollow - if you want to suggest to Google that the hyperlink should not pass any link equity/SEO value to the link target.
 If you trust/endorse the site you’re linking to you might simply leave the link open for crawlers to follow. If you don’t endorse it, but still want to link it, you could nofollow it. Also, if someone paid you for a link or something like that
Links and seo - When you link to another website, search engines may count that as a ‘vote’ for the page you’re linking to. Pages which have many such ‘votes’, from authoritative and trusted websites, may rank higher in the search results as a result (as they, in turn, become more authoritative and trustworthy). That makes links a kind of currency.
in 2005 Google introduced a way to mark a link as untrusted; specifically, a way of saying “don’t follow this link”. By adding a nofollow attribute to your links, they’d no longer count as votes.
- also directly to links = <a href="http://www.example.com/" rel="nofollow">Anchor Text</a>
- exemples: links on blog comments, paidlinks with rel="nofollow sponsored"
When Googlebot next crawls that page and sees the tag or header, Googlebot will drop that page entirely from Google Search results, regardless of whether other sites link to it.

* rel=sponsored

* rel=ugc (user-generated content) You should use the ugc attribute whenever users of your website are able to create content or links on it; e.g., in the comment section on your site.

Combining them is a best practice for compatibility reasons, since not all browsers support the new tag directives;
This is useful, because not all search engines support the two new rel attributes, so it’s best practice to use the nofollow attribute along with the sponsored and ugc attribute.

ONLY FOR A TAG LINK
* noreferrer = Use the rel=”noreferrer” attribute on outgoing links when you don’t want other sites to know that you are linking to them. Can’t think of any valid reason why you might want to do this, but that’s the case.
https://www.reliablesoft.net/noreferrer-noopener/#:~:text=The%20rel%3D%E2%80%9Dnoreferrer%E2%80%9D%20tag,info%20from%20the%20HTTP%20header.
- Use nofollow on links that you don’t trust and use noreferrer if you don’t want the other site to know that you have linked to them.
* rel=”noopener” is an HTML attribute that can be added to external links. It prevents the opening page to gain any kind of access to the original page.
used especially with target="_blank" rel="noopener noreferrer"
If you are not on WordPress, it is recommended to add the rel=”noopener” to all your external links that open in a new tab.
Noopener has zero impact on your SEO so you can safely use it to enhance the security of your website.
Noopener is used for security reasons to avoid tabnabbing.
The noopener is needed to enhance the security of your website and prevent other websites from gaining access to your page (through the browser session).
Under standard conditions, the window.opener property in JavaStrict provides pages linked from your online platform and opened in a new tab with partial control over your pages. This makes your online platform vulnerable, exposing it to potential theft of user data, alterations to your content, or other types of phishing attacks.
remember that most of your visitors are mobile users, and mobile browsing causes them to leave your platform anyway to access a linked website, so you have little to lose by removing target=”_blank” from your URLs.
*/
