import axios from "axios";
import { useEffect } from "react";
import { useSnack } from "../providers/SnackbarProvider";
import { useUser } from "../users/providers/UserProvider";

const useAxios = () => {
  const snack = useSnack();
  const { token } = useUser();

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = token;

    if (snack) {
      axios.interceptors.request.use((data) => Promise.resolve(data), null);

      axios.interceptors.response.use(null, (error) => {
        const expectedError = error.response && error.response.status >= 400;
        if (expectedError) {
          if (!!error.response.data) snack("error", error.response.data);
          if (!error.response.data) snack("error", error.message);
        }
        return Promise.reject(error);
      });
    }
  }, [snack, token]);
};

export default useAxios;
