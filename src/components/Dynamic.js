import dynamic from "next/dynamic";
import LoadingThreeDots from "components/loadingIndicators/LoadingThreeDots";

// LESSON: the webpackChunkName and comp will not be displayed again if you do not reload the page since the fast reload from Next.js will remember that component.

export default function Dynamic(loader, options = {}) {
    const {
        loading = () => <LoadingThreeDots />,
        ssr = true, // // ssr: You may not always want to include a module on server-side. For example, when the module includes a library that only works in the browser.
    } = options;

    return dynamic(loader, { loading, ssr });
}
