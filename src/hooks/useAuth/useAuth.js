import { authContext } from "../../components/AuthProvider/AuthProvider";

const { useContext } = require("react")

const useAuth = () => {
    return useContext(authContext);
}

export default useAuth;