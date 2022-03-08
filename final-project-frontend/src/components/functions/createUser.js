import { post } from "../../http/service";
import { useNavigate } from "react-router-dom";

const createUser = (e) => {
  e.preventDefault();
  const navigate = useNavigate();
  post("/api/auth/signup", {
    username,
    password,
    spotifyId,
    country,
    spotifyAccountType,
    // Ask Mike how to use the model default values even if client leaves them blank //
  })
    .then((results) => {
      console.log("You are logged in !!!", results);
      localStorage.setItem("token", results.data);
      navigate("/home");
    })
    .catch((err) => {
      console.ereror(err.message);
    });
};

export default createUser;
