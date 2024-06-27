import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignals } from '@preact/signals-react/runtime';
import google from '/google.svg';
import { userExists } from '@/signals/user.js';

// Validation logic outside the component
const validate = ({ name, email, password }) => {
  const errors = {};
  const nameRegex = /^[a-zA-Z ]+$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}?$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!name.trim()) {
    errors.name = 'Name is required';
  } else if (!nameRegex.test(name)) {
    errors.name = 'Name should only contain letters and spaces';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password.trim()) {
    errors.password = 'Password is required';
  } else if (!passwordRegex.test(password)) {
    errors.password = 'Password should be at least 8 characters long and contain at least one letter and one number';
  }

  return errors;
};

export function SignUpForm() {
  useSignals();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [signupError, setSignupError] = useState(null);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setFormErrors({});
    setSignupError(null);

    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/auth/signup`,
          formData,
          { withCredentials: true }
        );

        if (data.emailExists) {
          setSignupError('Email already exists');
        } else {
          navigate('/signin');
        }
      } catch (error) {
        console.error('Signup error:', error);
        setSignupError('An error occurred. Please try again.');
      }
    }
  }, [formData, navigate]);

  const handleGoogleSignup = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_HOST}/api/auth/googleAuth`)
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
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>Enter your details below to create an account</CardDescription>
        {signupError && <div className="text-red-500">{signupError}</div>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Stanly"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
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
            <img src={google} alt="Google Logo" className="mr-2 h-6 w-auto" /> Sign up with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}