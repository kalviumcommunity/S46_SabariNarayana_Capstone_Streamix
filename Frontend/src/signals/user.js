import { effect, signal } from '@preact/signals-react';
import Axios from 'axios';

export const userExists = signal(false);
export const userDetails = signal({});

effect(async () => {
  try {
    const { data } = await Axios.post(
      `${import.meta.env.VITE_REACT_APP_HOST}/api/auth/checkuser`,
      null,
      { withCredentials: true }
    );

    console.log('Signal effect is running');

    if (data.success) {
      userExists.value = true;
      userDetails.value = data.user;
    } else {
      userExists.value = false;
      userDetails.value = {};
    }
  } catch (error) {
    console.error('Error in signal effect:', error);

    userExists.value = false;
    userDetails.value = {};
  }
});
