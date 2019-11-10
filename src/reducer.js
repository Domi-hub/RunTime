export function reducer(state = {}, action) {
    switch (action.type) {
        case "LOGIN":
            if (action.isError) {
                return Object.assign({}, state, {
                    isError: action.isError
                });
            }
            location.replace("/");
        case "REGISTER":
            if (action.isError) {
                return Object.assign({}, state, {
                    isError: action.isError
                });
            }
            location.replace("/profile");
        default:
            return state;
    }
}