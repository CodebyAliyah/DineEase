import {forgotPassword} from '../../../store/slices/userSlice';
import {useAppDispatch, useAppSelector} from '../../../hooks/useStore';

export const useForgetPassword = () => {
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(
    state => state.user as {loading: boolean; error: string | null},
  );

  const resetPassword = async (email: string) => {
    try {
      await dispatch(forgotPassword(email)).unwrap();
    } catch (err) {
      console.error('Error resetting password:', err);
    }
  };

  return {resetPassword, loading, error};
};
