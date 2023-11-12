import { ROOT } from "api/root";
/*
 URLs ONLY
*/

// INIT, AUTH AND PASSWORD
export const login = () => `${ROOT}/auth/login`; // POST
export const register = () => `${ROOT}/auth/signup`; // POST
export const checkValidSession = () => `${ROOT}/auth/session-check`;

// USERS
export const loadDataInit = () => `${ROOT}/user/session/init`; // POST

// export const uploadImages = (fileName) =>
//     `${ROOT}/media/image/upload?fileName=${fileName}`; // POST
// export const updateImages = (userId) =>
//     `${ROOT}/media/image/update?id=${userId}`; // PUT
// export const setImgToProvider = () => `${ROOT}/media/image/provider`;

// REFERENCE
// GENERAL DATA
// export const removeUser = () => `${ROOT}/user/remove`; // DELETE
// export const pushElemToField = () => `${ROOT}/user/field/array/push`; // PUT
// export const getUserIdByName = () => `${ROOT}/user/id-by-name`; // GET
// export const checkFieldGotValue = () =>
//     `${ROOT}/user/field/check-field-got-value`; // POST

// // AUTH AND PASSWORD

// export const checkPassword = () => `${ROOT}/auth/pswd/check`;
// export const createTk = () => `${ROOT}/auth/pswd/create-tk`; // POST - directly fetch token on successful login
// export const forgotPasswordRequest = () => `${ROOT}/auth/pswd/forgot`;
// export const recoverPassword = () => `${ROOT}/auth/pswd/recover`;
// export const changePassword = () => `${ROOT}/auth/pswd/change`;
// export const createPassword = () => `${ROOT}/auth/pswd/create`;
// export const readVerificationPass = (bizId) =>
//     `${ROOT}/admin/verification-pass/${bizId}`; // GET
// export const checkVerificationPass = () => `${ROOT}/admin/verification-pass`; // POST
// export const decode = () => `${ROOT}/auth/text/decode`; // POST
// // export const makeGoogleLogin = () => `${ROOT}/auth/google`; // POST

// // CLI-USER
// // client's register
// export const readAllCliUsers = (cliAdminId) =>
//     `${ROOT}/user/list/all?bizId=${cliAdminId}`;
// export const readHighestScores = (cliAdminId) =>
//     `${ROOT}/user/list/highest-scores?bizId=${cliAdminId}`;

// // sms
// export const readContacts = (userId) =>
//     `${ROOT}/sms/read/contacts?userId=${userId}`;
// export const sendSMS = () => `${ROOT}/sms/send`; // POST
// export const readCredits = (userId) =>
//     `${ROOT}/sms/credits/read?userId=${userId}`;
// export const getGeneralTotals = (userId) =>
//     `${ROOT}/sms/history/general-totals?userId=${userId}`;
// export const readSMSMainHistory = (userId) =>
//     `${ROOT}/sms/history/read-main?userId=${userId}`;
// export const readSMSHistoryStatement = (userId, cardId) =>
//     `${ROOT}/sms/history/read-statement?userId=${userId}&cardId=${cardId}`;
// export const cancelSMS = (userId, cardId) =>
//     `${ROOT}/sms/cancel?userId=${userId}&cardId=${cardId}`;
// export const readAutoService = (userId) =>
//     `${ROOT}/sms/automatic/read?userId=${userId}`;
// export const activateAutoService = () => `${ROOT}/sms/automatic/activate`; // POST

// // PUSH NOTIFICATIONS
// export const subscribePushNotif = () => `${ROOT}/push-notification/subscribe`; // POST
// export const readOrUpdateNotifStatus = (action) =>
//     `${ROOT}/push-notification/notif-status?action=${action}`; // PUT
// export const readUserSubIds = () => `${ROOT}/push-notification/read/sub-ids`; // GET

// // IN-APP NOTIFICATIONS
// export const markOneClicked = (userId) =>
//     `${ROOT}/notification/mark-one-clicked/${userId}`; // PUT
// export const markAllAsClicked = (userId) =>
//     `${ROOT}/notification/mark-all-clicked/${userId}`; // PUT
// export const markAllAsSeen = (userId) =>
//     `${ROOT}/notification/mark-all-seen/${userId}`; // PUT
// export const readNotifications = (userId) =>
//     `${ROOT}/notification/read/${userId}`; // GET

// // MISCELLANEOUS
// export const countField = (userId, role = "cliente") =>
//     `${ROOT}/user/count/field/${userId}?thisRole=${role}`; // PUT
// export const getBuyClubRulesData = () => `${ROOT}/general/buy-club-rules-data`;
