import axios from "axios";
import { useEffect, useState } from "react"
import FormError from "../FormErrors";

function AddProduct(props) {
    const [inputs, setInput] = useState({
        ten: "",
        price: "",
        category: "",
        brand: "",
        company: "",
        detail: "",
        sale: "",
        status: "",
        anh: "",
    })
    const [errors, setErrors] = useState({});
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInput((state) => ({ ...state, [nameInput]: value }));
    }
    const [getFile, setFile] = useState([])
    const handleFile = (e) => {
        const file = e.target.files
        setFile(file);
    };
    let typeAvartar = ["png", "jpg", "jpeg", "PNG", "JPG"]
    const [dataCategory, setDataCategory] = useState([])
    const [dataBrand, setDataBrand] = useState([])
    useEffect(() => {
        axios.get('http://localhost/laravel8/public/api/category-brand')
            .then((res) => {
                setDataCategory(res.data.category)
                setDataBrand(res.data.brand)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    function RenderCatelory() {
        function xxx(value, key) {
            return (
                <option value={value.id}>
                    {value.category}
                </option>
            );
        }
        return dataCategory.map(xxx);
    }
    function RenderBrand() {
        return dataBrand.map((value, key) => {
            return (
                <option value={value.id}>
                    {value.brand}
                </option>
            );
        });
    }
    function sale() {
        return (
            <input
                type="text"
                placeholder="0"
                name="sale"
                onChange={handleInput}
            />
        )
    }
    function renderStatus() {
        let status = [
            {
                id: "1",
                name: "New",
            },
            {
                id: "0",
                name: "Sale",
            },
        ]
        return status.map((value, key) => {
            if (value.id === 1) {
                return (
                    <option value={value.id}>
                        {value.name}
                    </option>
                );
            } else {
                return (
                    <option value={value.id}>
                        {value.name}
                    </option>
                );
            }
        })
    }
    function handleAddProduct(e) {
        e.preventDefault();
        let errorsSubmit = {};
        let flag = true;
        if (inputs.ten === "") {
            errorsSubmit.ten = "Vui nong nhap Ten";
            flag = false;
        }
        if (inputs.price === "") {
            errorsSubmit.price = "Vui long nhap Price";
            flag = false;
        }
        if (getFile === "") {
            errorsSubmit.anh = "Vui long chon Anh";
            flag = false;
        } else {
            Object.keys(getFile).map((value, key) => {
                let x = getFile[key]['name'].split(".", 10)
                let type = (x[x.length - 1])
                if (getFile[key]['size'] > 1000000) {
                    errorsSubmit.anh = "Anh khong hop le";
                    flag = false;
                } else if (!typeAvartar.includes(type)) {
                    errorsSubmit.anh = "Anh khong hop le";
                    flag = false;
                }
            })
        }
        if (inputs.category === "") {
            errorsSubmit.category = "Vui long chon caterory";
            flag = false;
        }
        if (!flag) {
            setErrors(errorsSubmit);
        } else {
            setErrors({})
            let x = localStorage.getItem("x")
            if (x) {
                x = JSON.parse(x)
            }
            const userData = x
            let accessToken = userData.token;
            console.log(accessToken);
            let url = 'http://localhost/laravel8/public/api/user/product/add' 
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            const formData = new FormData();
            formData.append('name', inputs.ten)
            formData.append('price', inputs.price);
            formData.append('category', inputs.category)
            formData.append('brand', inputs.brand)
            formData.append('company', inputs.company)
            formData.append('detail', inputs.detail)
            formData.append('status', inputs.status)
            formData.append('sale', inputs.sale)
            Object.keys(getFile).map((item, i) => {
                formData.append("file[]", getFile[item])
            })
            axios.post(url, formData, config)
                .then(res => {
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
    return (
        <div className="signup-form">
            <h2>Create product!</h2>
            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    placeholder="Name"
                    name="ten"
                    onChange={handleInput}
                />
                <input
                    type="text"
                    placeholder="Price "
                    name="price"
                    onChange={handleInput}
                />
                <select name="category" onChange={handleInput}>{RenderCatelory()}</select>
                <select name="brand" onChange={handleInput}>{RenderBrand()}</select>
                <select name="status" onChange={handleInput}>
                    {renderStatus()}
                </select>
                {sale()}
                <input
                    type="text"
                    placeholder="Company Profile "
                    name="company"
                    onChange={handleInput}
                />
                <input
                    type="file"
                    name="anh"
                    multiple
                    onChange={handleFile}
                />
                <textarea
                    name="detail"
                    placeholder="Detail"
                    onChange={handleInput}
                />
                <button type="submit">Add</button>
                <FormError errors={errors} />
            </form>
        </div>
    )
}
export default AddProduct