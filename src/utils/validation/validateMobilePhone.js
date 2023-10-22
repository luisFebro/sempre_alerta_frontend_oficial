// ref: https://iqcode.com/code/javascript/regex-para-telefone-celular
export default function validateMobilePhone(phone) {
    const regEx = /^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/;
    return regEx.test(phone);
}
