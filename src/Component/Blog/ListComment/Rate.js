import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
function Rate(props) {
    console.log(props);
    let params = useParams();
    const [rating, setRating] = useState(0)
    useEffect(() => {
        axios.get('http://localhost/laravel8/public/api/blog/rate/' + params.id)
            .then(res => {
                console.log(res.data.data);
                let s = 0
                let rate = 0
                res.data.data.map((value, key) => {
                    s = s + value.rate
                    rate = s / res.data.data.length
                    setRating(rate)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    function changeRating(newRating, name) {
        console.log(newRating);
        let x = localStorage.getItem('x')
        if (x) {
            setRating(newRating)
            x = JSON.parse(x)
            const userData = x
            let url = 'http://localhost/laravel8/public/api/blog/rate/' + props.idBlog
            let accessToken = userData.token;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            const formData = new FormData();
            formData.append('blog_id', props.idBlog)
            formData.append('user_id', userData.Auth.id);
            formData.append('rate', newRating)
            axios.post(url, formData, config)
                .then(res => {
                    // console.log(res.data);
                })
        } else {
            alert('vui long Login')
        }
    }
    return (
        <StarRatings
            rating={rating}
            starRatedColor="Yellow"
            changeRating={changeRating}
            numberOfStars={6}
            name="rating"
        />
    )
}
export default Rate