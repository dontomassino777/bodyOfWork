import React from 'react';
import {useFormik} from 'formik';
import axios from 'axios';



function Register() {
    const initialValues = {
        
        firstName: "",
        lastName: "",
        emailAddress: "",
        username: "",
        password: "",
        confirmPassword: ""

    }
    const onSubmit = (values) => {
        axios.post('http://localhost:5000/register', values)
        .then((res) => {
            console.log(res.data)
            localStorage.setItem('user_name', res.data[0][0].user_name)
            localStorage.setItem('user_info_id', res.data[0][0].user_info_id)
            localStorage.setItem('first_name', res.data[0][0].first_name)
            localStorage.setItem('last_name', res.data[0][0].last_name)
        })
        .catch((err) => console.log(err.response.data))
    }
    const validate = (values) => {
        const errors = {}
        if(!values.username) {
            errors.username = "Username Required"
        }
        if(!values.password) {
            errors.password = "Password Required"
        } else if (values.password.length < 8) {
            errors.password = "Password must be longer than 8 characters"
        }
        if(!values.confirmPassword) {
            errors.confirmPassword = "Please confirm your password"
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Oops, passwords don't match"
        }
        if(!values.firstName) {
            errors.firstName = "Please give your first name"
        }
        if(!values.lastName) {
            errors.lastName = "Please give your last name"
        }
        if (!values.emailAddress.includes("@")) {
            errors.emailAddress = "Please enter a valid email address"
        }
        return errors
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    return <div>
      <h2>
          Register
      </h2>
      <form onSubmit={formik.handleSubmit}
      >
        <input
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            placeholder="First Name"
        />
        <input
            type="text"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            placeholder="Last Name"
        />
        <input
            type="text"
            name="emailAddress"
            onChange={formik.handleChange}
            value={formik.values.emailAddress}
            placeholder="Email"
        />
        <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Username"
        />
        <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
        />
        <input
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            placeholder="Confirm Password"
        />
        <button
            type="subit"
            disabled={!formik.isValid}
        >
            Submit
        </button>
      </form>
      {/* How do I make the following error messages only display on submit if applicable? */}
      {/* <div>
          {formik.errors.username ? <div>{formik.errors.username}</div> : null}
          {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
          {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
          {formik.errors.emailAddress ? <div>{formik.errors.emailAddress}</div> : null}
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
          {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
      </div> */}
    </div>;
}

export default Register;
