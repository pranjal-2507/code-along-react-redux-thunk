// Here users is the successData from the API and error is the failed API request

export const fetchUserData = (users) => ({ type: "FETCH", payload: users });
export const showError = (error) => ({ type: "ERROR", payload: error });
