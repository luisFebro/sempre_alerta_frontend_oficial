import { API_URL } from "config/root";
/*
 URLs ONLY
*/

// INIT, AUTH AND PASSWORD
export const login = () => `${API_URL}/auth/login`; // POST
export const register = () => `${API_URL}/auth/signup`; // POST
export const checkValidSession = () => `${API_URL}/auth/session-check`;

// USERS
export const loadDataInit = () => `${API_URL}/user/session/init`; // POST
export const updateUser = () => `${API_URL}/user/update`; // PUT
export const removeUser = () => `${API_URL}/user/remove`; // DELETE
export const readUserListAll = () => `${API_URL}/user/list/all`; // GET

// INSTITUTES
export const updateInstitute = () => `${API_URL}/institute/update`; // PUT

// ALERTS
export const readAlertListAll = () => `${API_URL}/alert/list/all`; // GET

// GLOBAL
export const searchCEP = (cep) => `${API_URL}/global/cep/search?cep=${cep}`; // GET

// export const uploadImages = (fileName) =>
//     `${API_URL}/media/image/upload?fileName=${fileName}`; // POST
// export const updateImages = (userId) =>
//     `${API_URL}/media/image/update?id=${userId}`; // PUT
// export const setImgToProvider = () => `${API_URL}/media/image/provider`;

// REFERENCE
// GENERAL DATA
// export const pushElemToField = () => `${API_URL}/user/field/array/push`; // PUT
// export const getUserIdByName = () => `${API_URL}/user/id-by-name`; // GET
// export const checkFieldGotValue = () =>
//     `${API_URL}/user/field/check-field-got-value`; // POST

// // AUTH AND PASSWORD

// export const checkPassword = () => `${API_URL}/auth/pswd/check`;
// export const createTk = () => `${API_URL}/auth/pswd/create-tk`; // POST - directly fetch token on successful login
// export const forgotPasswordRequest = () => `${API_URL}/auth/pswd/forgot`;
// export const recoverPassword = () => `${API_URL}/auth/pswd/recover`;
// export const changePassword = () => `${API_URL}/auth/pswd/change`;
// export const createPassword = () => `${API_URL}/auth/pswd/create`;
// export const readVerificationPass = (bizId) =>
//     `${API_URL}/admin/verification-pass/${bizId}`; // GET
// export const checkVerificationPass = () => `${API_URL}/admin/verification-pass`; // POST
// export const decode = () => `${API_URL}/auth/text/decode`; // POST
// // export const makeGoogleLogin = () => `${API_URL}/auth/google`; // POST

// // CLI-USER
// // client's register
// export const readAllCliUsers = (cliAdminId) =>
//     `${API_URL}/user/list/all?bizId=${cliAdminId}`;
// export const readHighestScores = (cliAdminId) =>
//     `${API_URL}/user/list/highest-scores?bizId=${cliAdminId}`;

// // sms
// export const readContacts = (userId) =>
//     `${API_URL}/sms/read/contacts?userId=${userId}`;
// export const sendSMS = () => `${API_URL}/sms/send`; // POST
// export const readCredits = (userId) =>
//     `${API_URL}/sms/credits/read?userId=${userId}`;
// export const getGeneralTotals = (userId) =>
//     `${API_URL}/sms/history/general-totals?userId=${userId}`;
// export const readSMSMainHistory = (userId) =>
//     `${API_URL}/sms/history/read-main?userId=${userId}`;
// export const readSMSHistoryStatement = (userId, cardId) =>
//     `${API_URL}/sms/history/read-statement?userId=${userId}&cardId=${cardId}`;
// export const cancelSMS = (userId, cardId) =>
//     `${API_URL}/sms/cancel?userId=${userId}&cardId=${cardId}`;
// export const readAutoService = (userId) =>
//     `${API_URL}/sms/automatic/read?userId=${userId}`;
// export const activateAutoService = () => `${API_URL}/sms/automatic/activate`; // POST

// // PUSH NOTIFICATIONS
// export const subscribePushNotif = () => `${API_URL}/push-notification/subscribe`; // POST
// export const readOrUpdateNotifStatus = (action) =>
//     `${API_URL}/push-notification/notif-status?action=${action}`; // PUT
// export const readUserSubIds = () => `${API_URL}/push-notification/read/sub-ids`; // GET

// // IN-APP NOTIFICATIONS
// export const markOneClicked = (userId) =>
//     `${API_URL}/notification/mark-one-clicked/${userId}`; // PUT
// export const markAllAsClicked = (userId) =>
//     `${API_URL}/notification/mark-all-clicked/${userId}`; // PUT
// export const markAllAsSeen = (userId) =>
//     `${API_URL}/notification/mark-all-seen/${userId}`; // PUT
// export const readNotifications = (userId) =>
//     `${API_URL}/notification/read/${userId}`; // GET

// // MISCELLANEOUS
// export const countField = (userId, role = "cliente") =>
//     `${API_URL}/user/count/field/${userId}?thisRole=${role}`; // PUT
// export const getBuyClubRulesData = () => `${API_URL}/general/buy-club-rules-data`;
