import React from 'react';
import {useFormik} from 'formik';


function Register() {
    const initialValues = {
        username: "",
        name: "",
        password: "",
        confirmPassword: "",

    }
    const onSubmit = (values) => {
        console.log('submit clicked')
    }
    const validate = (values) => {
        console.log('validation')
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
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Name"
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
