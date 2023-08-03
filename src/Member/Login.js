import { useState } from "react"
import FormError from "./FormErrors"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"

function Login() {
    const [inputs, setInput] = useState({
        ten: "",
        email: "",
        pass: "",
        level: "0",
    })
    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInput(state => ({ ...state, [nameInput]: value }))
    }
    const [errors, setError] = useState({})
    const Navigate = useNavigate()
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    function handleSubmit(e) {
        e.preventDefault();
        let errorsSubmit = {};
        let flag = true;
        if (inputs.ten === "") {
            errorsSubmit.ten = "vui nong nhap Ten"
            flag = false;
        }
        if (inputs.email === "") {
            errorsSubmit.email = "vui nong nhap Email"
            flag = false;
        }
        if (!regex.test(inputs.email) && inputs.email) {
            errorsSubmit.email = "Email ko hop le";
            flag = false;
        }
        if (inputs.pass === "") {
            errorsSubmit.pass = "Vui long nhap Pass"
            flag = false;
        }
        if (!flag) {
            setError(errorsSubmit)
        } else {
            const data = {
                email: inputs.email,
                password: inputs.pass,
                lever: inputs.level
            }
            axios.post('http://localhost/laravel8/public/api/login', data)
                .then((res) => {
                    if (res.data.errors) {
                        setError(res.data.errors)
                    } else {
                        Navigate("/")
                        let x = res.data
                        localStorage.setItem("x", JSON.stringify(x))
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
    }
    return (
        <div className="login-form">{/*login form*/}
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="ten"
                    placeholder="Name"
                    onChange={handleInput}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleInput}
                />
                <input
                    type="password"
                    name="pass"
                    placeholder="Password"
                    onChange={handleInput}
                />
                <button type="submit" className="btn btn-default">Login</button>
            </form>
            <FormError errors={errors} />
        </div>
    )
}
export default Login