import Register from "./Register"
import Login from "./Login"
function Index1(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4 col-sm-offset-1">
                    <Login/>
                </div>
                <div className="col-sm-1">
                    <h2 className="or">OR</h2>
                </div>
                <div className="col-sm-4">
                    <Register/>
                </div>
            </div>
        </div>
    )
}
export default Index1