import { useEffect, useState } from "react";
import FormError from "../FormErrors";
import axios from "axios";

function Update() {
    const [user, setUser] = useState({
        ten: "",
        email: "",
        add: "",
        sdt: "",
        password: "",
    })
    useEffect(()=>{
        let userData = localStorage.getItem("x")
        if(userData){
            userData = JSON.parse(userData);
            setUser({
                ten: userData.Auth.name,
                email: userData.Auth.email,
                add: userData.Auth.address,
                sdt: userData.Auth.phone,
                password: userData.Auth.pass
            })
        }
    },[])
    const handleInput = (e) => {
        const getName = e.target.name;
        const value = e.target.value;
        setUser(state => ({ ...state, [getName]: value }))
    }
    const [errors, setError] = useState({})
    const [file, setFile] = useState("")
    const [avatar, setAvatar] = useState("")
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
        if (user.ten === "") {
            errorsSubmit.ten = "vui nong nhap Ten"
            flag = false;
        }
        if (user.sdt === "") {
            errorsSubmit.sdt = "Vui long chon SDT"
            flag = false;
        }
        if (user.add === "") {
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
        }else{
            setError("")
            let userData = localStorage.getItem("x")
            if(userData) {
                userData = JSON.parse(userData)
            }
            let url = 'http://localhost/laravel8/public/api/user/update/' + userData.Auth.id
            let accessToken = userData.token
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            const formData = new FormData();
            formData.append('name', user.ten)
            formData.append('email', user.email)
            formData.append('phone', user.sdt)
            formData.append('address', user.add)
            formData.append('avatar', file)
            formData.append('password', "")
            axios.post(url, formData, config)
            .then(res =>{
                console.log(res);
                let x = res.data
                localStorage.setItem("x", JSON.stringify(x))
            })          
        }
    }
    return (
        <div className="signup-form">{/*sign up form*/}
            <h2>User Update!</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    name="ten"
                    value={user.ten}
                    onChange={handleInput}
                    />
                <input
                    type="text"
                    placeholder="Email "
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    readOnly
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={user.passwords}
                    onChange={handleInput}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    name="sdt"
                    value={user.sdt}
                    onChange={handleInput}
                />
                <input
                    type="text"
                    placeholder="Address"
                    name="add"
                    value={user.add}
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
}export default Update