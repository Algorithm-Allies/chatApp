export const handleLogout = (navigate) => {
  localStorage.clear();
  navigate("/");
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = decodedToken.exp * 1000;

    if (Date.now() >= expirationTime) {
      return true;
    }
  }

  return false;
};
