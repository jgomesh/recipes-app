import { useEffect, useState } from 'react';

function useProfileEffects() {
  const [savedEmail, setSavedEmail] = useState('');
  useEffect(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      const { email } = user;
      setSavedEmail(email);
    }
  }, []);

  return { savedEmail };
}

export default useProfileEffects;
