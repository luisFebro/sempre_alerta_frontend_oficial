// this remove format and improves img quality
export default function removeImgFormat(imgUrl, options = {}) {
    const { isBizTeam } = options;

    if (!imgUrl)
        return {
            newImg: "/img/error.png", // official-logo-name.png
            width: 190,
            height: 85,
        }; // for adjusting to fiddelize default logo.

    const newImg = imgUrl && imgUrl.replace(/\/h_100,w_100|\/h_85,w_190/gi, "");

    const isSquared = imgUrl.includes("h_100,w_100");

    let width = 190;
    let height = 85;

    if (!isBizTeam && isSquared) {
        width = 110;
        height = 110;
    }

    return {
        isSquared,
        newImg,
        width,
        height,
    };
}

/*
EXAMPLE:
const res = removeFormat("https://res.cloudinary.com/fiddelize/image/upload/h_85,w_190/v1611258139/hermes-e-renato-hrm92vn.jpg");
console.log("res", res);
res { isSquare: false,
  removedFormatImg:
   'https://res.cloudinary.com/fiddelize/image/upload/v1611258139/hermes-e-renato-hrm92vn.jpg',
  width: 190,
  height: 85 }
 */
