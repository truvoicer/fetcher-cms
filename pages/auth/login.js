import { useState } from 'react';
import { useRouter } from 'next/router'
const { login } = require("../../library/api/authenticate")

export default function Login() {

    const router = useRouter();
    const [ loginData, setLoginData ] = useState({
       email: "",
       password: ""
    });

    const formChangeHandler = e => {
      console.log(e.target.value);
      setLoginData({...loginData, [e.target.name]: e.target.value});
      console.log(loginData);
    };
    const submitHandler = async e => {
        e.preventDefault();
        const response = await login(loginData);
        if (response.status === 200) {
            console.log("router");
            await router.push("/admin/dashboard");
        }
    };
    return (
            <div class="login-box">
            <div class="login-logo">
            <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>
            {/* <!-- /.login-logo --> */}
            <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>

                <form method="post" onSubmit={submitHandler}>
                <div class="input-group mb-3">
                    <input type="email" class="form-control" name="email" placeholder="Email" onChange={formChangeHandler} />
                    <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                    </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="password" class="form-control" placeholder="Password" name="password" onChange={formChangeHandler} />
                    <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                    <div class="icheck-primary">
                        <input type="checkbox" id="remember"/>
                        <label for="remember">
                        Remember Me
                        </label>
                    </div>
                    </div>
                    {/* <!-- /.col --> */}
                    <div class="col-4">
                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                    </div>
                    {/* <!-- /.col --> */}
                </div>
                </form>
            </div>
            {/* <!-- /.login-card-body --> */}
            </div>
        </div>
    )
}