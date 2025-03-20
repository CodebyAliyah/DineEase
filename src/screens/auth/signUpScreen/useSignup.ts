import { signupUser, } from "../../../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth as { loading: boolean; error: string | null });

  const signup = (email: string, password: string) => {
    dispatch(signupUser({ email, password }));
  };

  return { signup, loading, error };
};