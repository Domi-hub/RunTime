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
        case "UPLOAD_IMAGE":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            return {
                ...state,
                imageUrl: action.imageUrl
            };
            return state;
        case "GET_MY_EVENTS":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            return {
                ...state,
                organizedEvents: action.myEvents.organized,
                participatingEvents: action.myEvents.participating
            };
        case "GET_MAP_EVENTS":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            return {
                ...state,
                mapEvents: action.mapEvents
            };
        case "ADD_MAP_EVENT":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            return {
                ...state,
                mapEvents: [...state.mapEvents, action.mapEvent]
            };
        case "GET_NEW_EVENT_ADDRESS":
                if (action.isError) {
                    return {
                        ...state,
                        isError: action.isError
                    };
                }
                return {
                    ...state,
                    newEventAddress: action.newEventAddress
                };
        case "GET_EVENT_ADDRESS":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            return {
                ...state,
                eventAddress: action.eventAddress
            };
        case "JOIN_EVENT":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            return state;
        case "DELETE_MY_EVENT":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            return {
                ...state,
                organizedEvents: state.organizedEvents.filter((event) => event.id != action.myDeletedEventId)
            };
        case "CANCEL_MY_PARTICIPATION":
            if (action.isError) {
                return {
                    ...state,
                    isError: action.isError
                };
            }
            return {
                ...state,
                participatingEvents: state.participatingEvents.filter((event) => event.id != action.myCanceledParticipatingEventId)
            };
        default:
            return state;
    }
}