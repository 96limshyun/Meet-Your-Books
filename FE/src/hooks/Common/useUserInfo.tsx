const useUserInfo = () => {
    const userInfo = localStorage.getItem("USER_INFO");
    const userId = userInfo ? JSON.parse(userInfo).id.toString() : null;
    const userNickname = userInfo ? JSON.parse(userInfo).nickname : null;

    return { userId, userNickname };
};

export default useUserInfo;