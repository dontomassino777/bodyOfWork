import React from 'react';
import {useFormik} from 'formik';


function Register() {
    const initialValues = {
        
        firstName: "",
        lastName: "",
        emailAddress: "",
        username: "",
        password: "",
        confirmPassword: "",

    }
    const onSubmit = (values) => {
        console.log('submit clicked')
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
        if(!values.firstName) {
            errors.firstName = "Please give your first name"
        }
        if(!values.lastName) {
            errors.lastName = "Please give your last name"
        }
        if (!values.emailAddress.includes("@")) {
            errors.emailAddress = "Please enter a valid email address"
        }
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
    </div>;
}

export default Register;
