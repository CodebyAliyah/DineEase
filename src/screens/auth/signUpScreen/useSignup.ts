import {useAppDispatch, useAppSelector} from '../../../hooks/useStore';
import {signupUser} from '../../../store/slices/userSlice';

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.user);

  const signup = async (
    name: string,
    phone: string,
    dob: string,
    email: string,
    password: string,
  ) => {
    try {
      await dispatch(signupUser({name, phone, dob, email, password})).unwrap();
      console.log('Signup successful!');
    } catch (err: any) {
      console.log('Signup failed:', err.message || err);
    }
  };

  return {signup, loading, error};
};
