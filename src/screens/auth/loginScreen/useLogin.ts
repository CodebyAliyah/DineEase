import {loginUser} from '../../../store/slices/userSlice';
import {useAppDispatch, useAppSelector} from '../../../hooks/useStore';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const {loading, error, user} = useAppSelector(
    state => state.user as {loading: boolean; error: string | null; user: any},
  );

  const login = (email: string, password: string) => {
    dispatch(loginUser({email, password}));
  };

  return {login, loading, error, user};
};
