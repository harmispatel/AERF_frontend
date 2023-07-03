import React from 'react'
import Logo from "../../assets/images/Logo.png"
import './auth.css';

export const Login = () => {
  return (
    <>
        <div className='login_header'>
            <img src={Logo} height="60" alt='logo'/>
        </div>
        <div className='login_main'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-9'>
                        <div className='login_inr'>
                            <div className='row justify-content-center'>
                                <div className='col-md-8'>
                                    <div className='login_info'>
                                        <div className='login_title'>
                                            <h1>Dashboard</h1>
                                        </div>
                                        <div className='login_info_inr'>
                                            <div className='login_info_inr_title'>
                                                <h3>Welcome</h3>
                                                <p>Please enter your credentials to continue</p>
                                            </div>
                                            <form>
                                                <div className='form-group'>
                                                   <input className='form-control' type='text' placeholder='Registered Email ID' />
                                                </div>
                                                <div className='form-group'>
                                                   <input className='form-control' type='password' placeholder='Password' />
                                                </div>

                                                <div className='form-group mt-4 mb-0'>
                                                   <button className='btn login_bt'>Enter</button>
                                                   <p>Forgot Credentials? <a href='#'>Contact Administrator</a>.</p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
