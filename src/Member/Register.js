import axios from "axios";
import { useState } from "react";
import FormError from "./FormErrors";

function Register() {
    const [inputs, setInput] = useState({
        add: "",
        ten: "",
        email: "",
        password: "",
        sdt: "",
        level: "0"
    })
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInput(state => ({...state, [nameInput]: value }));
    }
    const [errors, setError] = useState({})
    const [file, setFile] = useState("")
    const [avatar, setAvatar] = useState("")
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let typeAvartar = ["png", "jpg", "jpeg", "PNG", "JPG"]
    function handleFile(e) {
        const file = e.target.files
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFile(file[0]);
        };
        reader.readAsDataURL(file[0])
    } 
    // console.log(avatar);
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
        if (inputs.password === "") {
            errorsSubmit.password = "Vui long nhap password"
            flag = false;
        }
        if (inputs.sdt === "") {
            errorsSubmit.sdt = "Vui long chon SDT"
            flag = false;
        }
        if (inputs.add === "") {
            errorsSubmit.add = "Vui long chon dia chi"
            flag = false;
        }
        if (file === "") {
            errorsSubmit.avatar = "Vui long chon Anh"
            flag = false;
        } else {
            let x = (file['name']).split(".", 10)
            let type = (x[x.length - 1])
            if (file['size'] > 1000000) {
                errorsSubmit.avatar = "Anh khong hop le";
                flag = false;
            } else if (!typeAvartar.includes(type)) {
                errorsSubmit.avatar = "Anh khong hop le";
                flag = false;
            }
        }
        if (!flag) {
            setError(errorsSubmit)
        } else {
            console.log(inputs.password);
            const data = {
                name: inputs.ten,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.sdt,
                address: inputs.add,
                level: inputs.level,
                avatar: avatar
            }
            axios.post('http://localhost/laravel8/public/api/register', data)
                .then((res) => {
                    if (res.data.errors) {
                        setError(res.data.errors)
                    } else {
                        alert('Dang ky thanh cong')
                    }
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
    return (
        <div className="signup-form">{/*sign up form*/}
            <h2>New User Signup!</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    name="ten"
                    onChange={handleInput}
                />
                <input
                    type="text"
                    placeholder="Email "
                    name="email"
                    onChange={handleInput}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    name="sdt"
                    onChange={handleInput}
                />
                <input
                    type="text"
                    placeholder="Address"
                    name="add"
                    onChange={handleInput}
                />
                <input
                    type="file"
                    placeholder="Avatar"
                    name="avatar"
                    onChange={handleFile}
                />
                <button type="submit" className="btn btn-default">Signup</button>
                <FormError errors={errors} />
            </form>
        </div>
    )
}
export default Register