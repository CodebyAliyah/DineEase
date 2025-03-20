import { forgotPassword, } from "../../../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";

export const useForgetPassword = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth as { loading: boolean; error: string | null });
  
    const resetPassword = (email: string) => {
      dispatch(forgotPassword(email));
    };
  
    return { resetPassword, loading, error };
  };