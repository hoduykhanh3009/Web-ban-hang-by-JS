import { useState } from "react"
import FormError from "../../../Member/FormErrors"
import axios from "axios"

function Comment(props) {
    const [cmt, setCmt] = useState(
        {message: ''}
    )
    const handleCmt = (e) => {
        const nameCmt = e.target.name
        const value = e.target.value
        setCmt(state => ({ ...state, [nameCmt]: value }))
    }
    const [errors, setError] = useState({})
    function handleSubmit(e) {
        let x = localStorage.getItem("x")
        e.preventDefault();
        let errorsSubmit = {};
        let flag = true
        if (x) {
            x = JSON.parse(x)
            // console.log(x);
        } else {
            alert('Vui long Login')
        }
        if (cmt.message === "") {
            errorsSubmit.message = "Vui long nhap Comment"
            flag = false
        }
        if (!flag) {
            setError(errorsSubmit)
        } else {
            setError('')
            const userData = x
            let url = 'http://localhost/laravel8/public/api/blog/comment/' + props.idBlog
            let accessToken = userData.token;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            const formData = new FormData();
            formData.append('id_blog', props.idBlog  )
            formData.append('id_user', userData.Auth.id);
            formData.append('id_comment', 0)
            formData.append('comment', cmt.message)
            formData.append('image_user', userData.Auth.avatar)
            formData.append('name_user', userData.Auth.name)
            axios.post(url, formData, config)
            .then(res =>{
                console.log(res.data.data);
            })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <div className="blank-arrow">
                                <label>Your Name</label>
                            </div>
                            <span>*</span>
                            <textarea name="message" rows={11} defaultValue={""} onChange={handleCmt} />
                            <button className="btn btn-primary" href>post comment</button>
                            <FormError errors={errors} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default Comment