import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Response from "./ListComment/Response";
import Comment from "./ListComment/Comment";
import Rate from "./ListComment/Rate";
function DetailApi() {
    let params = useParams();
    const [Data, setData] = useState('');
    const [idBlog, setIdBlog] = useState('')
    const [comment, setComment] = useState([])
    useEffect(() => {
        axios.get('http://localhost/laravel8/public/api/blog/detail/' + params.id)
        .then(res => {
            setData(res.data.data)
            setIdBlog(res.data.data.id)
            setComment(res.data.data.comment)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])
    function Detail() {
        let obj = Data
        return (
            <div className="single-blog-post">
                <h3>{obj['title']}</h3>
                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    {/* <span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span> */}
                </div>
                <a href>
                    <img src={"http://localhost/laravel8/public/upload/Blog/image/" + obj['image']} alt="" />
                </a>
                <p>
                    {obj['description']}
                </p>
                <div className="pager-area">
                    <ul className="pager pull-right">
                        <li><a href="#">Pre</a></li>
                        <li><a href="#">Next</a></li>
                    </ul>
                </div>
            </div>
        )
    }
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {Detail()}
            </div>{/*/blog-post-area*/}
            <Rate idBlog={idBlog}/>
            <Response comment={comment}/>
            <Comment idBlog={idBlog} />
            
        </div>
    )
}
export default DetailApi