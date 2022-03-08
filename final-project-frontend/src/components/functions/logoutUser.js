const logoutUser = () => {
  localStorage.removeItem("token");
  console.log("You have logged out");
};

export default logoutUser;
