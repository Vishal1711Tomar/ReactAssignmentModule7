import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';

const FormPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
  const errs = {};

  if (!form.name) errs.name = 'Name is required.';
  
  if (!form.email) errs.email = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email is invalid.';
  
  if (!form.password) {
    errs.password = 'Password is required.';
  } else {
    const password = form.password;
    if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    } else if (!/[A-Z]/.test(password)) {
      errs.password = 'Password must contain at least one uppercase letter.';
    } else if (!/[a-z]/.test(password)) {
      errs.password = 'Password must contain at least one lowercase letter.';
    } else if (!/[0-9]/.test(password)) {
      errs.password = 'Password must contain at least one digit.';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errs.password = 'Password must contain at least one special character.';
    }
  }

  return errs;
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length === 0) {
      try {
        await axios.post('http://localhost:5000/users', form);
        setSubmitted(true);
        setForm({ name: '', email: '', password: '' });
      } catch (error) {
        console.error('Failed to save user data', error);
      }
    } else {
      setErrors(errs);
      setSubmitted(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Form Page</h2>
      {submitted && <Alert variant="success">Form submitted and saved successfully!</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default FormPage;
