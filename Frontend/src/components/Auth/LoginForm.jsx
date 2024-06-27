import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userExists } from '@/signals/user.js';
import { useSignals } from '@preact/signals-react/runtime';
import google from '/google.svg';

export function LoginForm() {
  useSignals();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [signupError, setSignupError] = useState(null);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setSignupError(null);

    try {
      const { data } = await axios.post(
        ${import.meta.env.VITE_REACT_APP_HOST}/api/auth/signin,
        formData,
        { withCredentials: true }
      );

      if (data.google) {
        setSignupError('Login with Google');
      } else if (!data.emailExists && !data.google) {
        setSignupError('Email/Password does not match');
      } else {
        userExists.value = true;
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setSignupError('An error occurred. Please try again.');
    }
  }, [formData, navigate]);

  const handleGoogleSignup = useCallback(() => {
    axios
      .get(${import.meta.env.VITE_REACT_APP_HOST}/api/auth/googleAuth)
      .then((res) => {
        window.location.href = res.data.authURL;
      })
      .catch((error) => {
        console.error('Google auth error:', error);
      });
  }, []);

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
        {signupError && <div className="text-red-500">{signupError}</div>}
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
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
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
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}