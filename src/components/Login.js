import React from 'react';
import {useFormik} from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login(props) {
    let navigate = useNavigate();
    const initialValues = {
        username: "",
        password: "",
    }

    const onSubmit = (values) => {
        axios.post('http://localhost:5000/login', values)
        .then((res) => {
            localStorage.setItem('user_name', res.data.user_name)
            localStorage.setItem('user_info_id', res.data.user_info_id)
            localStorage.setItem('first_name', res.data.first_name)
            localStorage.setItem('last_name', res.data.last_name)
            props.logFunction()
            navigate('/secret')
        })
        .catch((err) => {
            console.log(err.response.data)
        })
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
        return errors
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    return <div>
        <h2>Login Page</h2>
        <form onSubmit={formik.handleSubmit}>
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
            <button
                type="submit"
                disabled={!formik.isValid}
            >
                Login
            </button>
        </form>
        <div>
            Don't have an account?
            <Link to="/register">
                <button>
                    Sign up
                </button>
            </Link>
        </div>
    </div>;
}

export default Login;
