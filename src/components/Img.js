import { Fragment } from "react";
import Image from "next/image";

export default function Img({
    src,
    height, // integer
    width, // integer n5
    alt,
    title, // n8 do not use alt as the same as title
    layout = "intrinsic", // n6
    id,
    className, // Image does not accept style, use className instead.
    needFigure = false,
    figcaption = "",
    priority = false, // n4
    quality = 75, // n1
    sizes, // for dataSrc
    unoptimized = false,
    // objectFit, // only used along with layout=fill n7
    // objectPosition, // not recognized by react DOM only used along with layout=fill n3
}) {
    const imgBody = () => (
        <Image
            src={src}
            alt={alt}
            title={title}
            height={height}
            width={width}
            id={id}
            className={className}
            onLoad={null}
            onError={null}
            priority={priority}
            quality={quality}
            sizes={sizes}
            layout={layout}
            loading={!priority ? "lazy" : "eager"} // b2
            unoptimized={unoptimized}
        />
    );

    if (needFigure) {
        return <FigureWrap figcaption={figcaption}>{imgBody()}</FigureWrap>;
    }

    return imgBody();
}

function FigureWrap({ children, figcaption }) {
    return (
        <Fragment>
            <figure className="full-img">
                {children}
                {figcaption && <figcaption>{figcaption}</figcaption>}
            </figure>
            <style jsx>
                {`
                    .full-img {
                        position: relative;
                        width: 100%;
                        height: 300px;
                    }
                    @media only screen and (min-width: 600px) {
                        .full-img {
                            height: 400px;
                        }
                    }
                    @media only screen and (min-width: 900px) {
                        .full-img {
                            height: 470px;
                        }
                    }
                `}
            </style>
        </Fragment>
    );
}

/* DOC
n1: The quality of the optimized image, an integer between 1 and 100 where 100 is the best quality. Defaults to 75.

n2:
When lazy, defer loading the image until it reaches a calculated distance from the viewport.
When eager, load the image immediately.

n3:
The object-position CSS property specifies the alignment of the selected replaced element's contents within the element's box. Areas of the box which aren't covered by the replaced element's object will show the element's background.
e.g object-position: 50% 50%;
https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
https://developer.mozilla.org/en-US/docs/Web/CSS/object-position*

n4:
When true, the image will be considered high priority and preload.
Should only be used when the image is visible above the fold. Defaults to false.

n5:
The width (or height) of the image, in pixels. Must be an integer without a unit.
Required unless layout="fill"`.

n6:
The layout behavior of the image as the viewport changes size. Defaults to intrinsic.

When fixed, the image dimensions will not change as the viewport changes (no responsiveness) similar to the native img element.

When intrinsic, the image will scale the dimensions down for smaller viewports but maintain the original dimensions for larger viewports.

When responsive, the image will scale the dimensions down for smaller viewports and scale up for larger viewports.

When fill, the image will stretch both width and height to the dimensions of the parent element, usually paired with object-fit.


n7:
The object-fit CSS property sets how the content of a replaced element, such as an <img> or <video>, should be resized to fit its container.
contain - The replaced content is scaled to maintain its aspect ratio while fitting within the element’s content box. The entire object is made to fill the box, while preserving its aspect ratio, so the object will be "letterboxed" if its aspect ratio does not match the aspect ratio of the box.
fill - The replaced content is sized to fill the element’s content box. The entire object will completely fill the box. If the object's aspect ratio does not match the aspect ratio of its box, then the object will be stretched to fit.
cover - For background pictures The replaced content is sized to maintain its aspect ratio while filling the element’s ENTIRE CONTENT box. If the object's aspect ratio does not match the aspect ratio of its box, then the object will be CLIPPED to fit.
none - The replaced content is not resized.
scale-down

n8 - The title attribute is not an acceptable substitute for the alt attribute. Additionally, avoid duplicating the alt attribute's value in a title attribute declared on the same image. Doing so may cause some screen readers to announce the description twice, creating a confusing experience.


n9 - Only one <figcaption> element may be nested within a <figure>, although the <figure> element itself may contain multiple other child elements be it a block of code, images, audios.

Note: Figure tag is not only restricted to images, but we can also use figure tag to wrap up some audios, videos or even some charts or tables, blocks of codes.
But it can`t be used to wrap up anything and everything. For example, any graphical content should not be embedded under the figure tag. Instead, use the img tag.
 */
