import { useContext } from 'react';
import { AuthContext } from 'utils/authentication';

function useCurrentUser() {
  const state = useContext(AuthContext);
  return { ...state };
}

export default useCurrentUser;
