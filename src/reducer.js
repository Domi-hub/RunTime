export function reducer(state = {}, action) {
    switch (action.type) {
        case "LOGIN":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            location.replace("/");
            return state;
        case "REGISTER":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            location.replace("/profile");
            return state;
        case "EDIT_PROFILE":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            location.replace("/");
            return state;
        case "GET_PROFILE":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            return {
                ...state,
                profile: action.profile
            };
        default:
            return state;
    }
}