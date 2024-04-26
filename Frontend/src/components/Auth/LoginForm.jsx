import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userExists } from '@/signals/user.js';
import { useSignals } from '@preact/signals-react/runtime';
import { useNavigate, useSearchParams } from 'react-router-dom';
import google from '/google.svg';

export function LoginForm() {
  useSignals();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState(null); // New state for signup error

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSignupError(null);

    // Data to be sent in the POST request
    const data = {
      email: email,
      password: password
    };
    console.log(data);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/auth/signin`,
        data,
        { withCredentials: true } // Enable sending cookies
      );
      console.log(response);
      if (response.data.google) {
        setSignupError('Login with Google');
      } else if (!response.data.emailExists && !response.data.google) {
        setSignupError('Email/Password does not match'); // Set signup error if email does not exist
      } else {
        userExists.value = true;
        console.log('-----', userExists.value);
        navigate('/');
        // You can redirect the user or display a success message here
      }
    } catch (error) {
      console.error(error);
      setSignupError('An error occurred. Please try again.'); // Set error message for any other errors
    }
  };

  const handleGoogleSignup = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_HOST}/api/auth/googleAuth`)
      .then((res) => {
        window.location.href = res.data.authURL;
      })
      .catch((error) => {
        console.error('Error checking authentication status:', error);
      });
  };

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'failed') {
      setSignupError('Google Auth Failed');
    }
  }, [searchParams]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        {signupError && <div className="text-red-500">{signupError}</div>}{' '}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <div className="pt-4">
          <Button variant="outline" className="w-full" onClick={handleGoogleSignup}>
            <img src={google} alt="Google Logo" className="mr-2 h-6 w-auto" /> Sign in with Google
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/singup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
