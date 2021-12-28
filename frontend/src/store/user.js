import React, { createContext } from "react";

// user 정보를 담을 context를 만드는 곳
export const UserContext = createContext();

const UserStore = (props) => {
    const users = {
        "id": "",
        "nickname": "",
        "login": false
}

    return (<UserContext.Provider value={users}>{props.children}</UserContext.Provider>
    );
};

export default UserStore;