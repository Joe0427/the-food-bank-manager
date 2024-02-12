//with this hook, I can access current user information anywhere
export const useGetUserInfo = () => {
    const { name, profilePhoto, userID, role, isAuth } =
      JSON.parse(localStorage.getItem("auth")) || {};
  
    return { name, profilePhoto, userID, role, isAuth };
  };