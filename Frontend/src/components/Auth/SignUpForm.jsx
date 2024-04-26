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

export function SignUpForm() {
  useSignals();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [signupError, setSignupError] = useState(null); // New state for signup error

  const handleSubmit = async (event) => {
    const data = {
      name: name,
      email: email,
      password: password
    };
    console.log(data);
    event.preventDefault();
    setFormErrors({});
    setSignupError(null);
    const errors = validate(data);
    setFormErrors(errors);

    // Data to be sent in the POST request

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/auth/signup`,
          data,
          { withCredentials: true } // Enable sending cookies
        );
        if (response.data.emailExists) {
          setSignupError('Email already exists'); // Set signup error if email exists
        } else {
          navigate('/signin');
        }
      } catch (error) {
        console.error(error);
        // You can display an error message here
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const nameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}?$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!values.name.trim()) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(values.name)) {
      errors.name = 'Name should only contain letters and spaces';
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password.trim()) {
      errors.password = 'Password is required';
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        'Password should be at least 8 characters long and contain at least one letter and one number';
    }

    return errors;
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
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        {signupError && <div className="text-red-500">{signupError}</div>}{' '}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="Name"
                type="text"
                placeholder="Stanly"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
            </div>
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
              {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
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
              {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
            </div>
            <Button type="submit" className="w-full">
              Signup
            </Button>
          </div>
        </form>
        <div className="pt-4">
          <Button variant="outline" className="w-full" onClick={handleGoogleSignup}>
            <img src={google} alt="Google Logo" className="mr-2 h-6 w-auto" /> Sign in with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
