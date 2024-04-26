import { effect, signal } from '@preact/signals-react';
import Axios from 'axios'; // Remove curly braces around Axios

export const userExists = signal(false);
export const userDetails = signal({});

effect(async () => {
  try {
    const response = await Axios.post(
      `${import.meta.env.VITE_REACT_APP_HOST}/api/auth/checkuser`,
      null,
      {
        withCredentials: true
      }
    );
    console.log('try : signla effect is running');
    if (response.data.success) {
      userExists.value = true;
      userDetails.value = response.data.user;
    } else {
      userExists.value = false;
      userDetails.value = {};
    }
  } catch (error) {
    console.log(error);
    console.log('catch : signla effect is running');
    userExists.value = false; // Set userExists to false in case of error
    userDetails.value = {}; // Clear userDetails in case of error
  }
});
