import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Logo from '../../Assets/logo.png'
import mainBg from '../../Assets/main-bg.jpg'
import { FunctionContext } from '../../Context/ShareFunction'
export default function Login() {
  let { saveUserData } = useContext(FunctionContext)
  // main Api link
  let baseUrl = "https://route-ecommerce.onrender.com"
  // display error
  let [errMsg, setErrMes] = useState("")
  // btn loading
  let [loading, setLoading] = useState(false)
  // programming routing
  let navigate = useNavigate()
  // validation form
  let validationSchema = Yup.object({
    email: Yup.string().required().email("Enter your valid email"),
    password: Yup.string().required().matches(/^[A-Za-z0-9!@#$%&*_-]{3,16}$/, "Enter valid password"),
  })
  // dateiles form
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      sendData(values)
      //  console.log(values);
    },
    validationSchema,
    // we can write up line as (validationSchema) becouse (validationSchema = validationSchema)
  })
  // api function
  async function sendData(info) {
    setLoading(true)
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, info).catch((error) => {
      console.log(error);
      setErrMes(error.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.message == 'success') {
      localStorage.setItem("token", data.token)
      saveUserData(data.user)
      navigate("/home")
    }
  }
  // design form
  return (
      <div className="container py-5">
        <div className='row m-0 gray'>
          <div className="col-lg-6 col-sm-12 p-0">
            <img src={mainBg} alt="play games" className='w-100 h-100' />
          </div>
          <div className='col-lg-6 col-sm-12 p-5  '>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <img src={Logo} alt="logo" className='w-25' />
              <h2 className='h4 text-center py-2'>Login to GameStore</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className='my-3'>
                <input onChange={formik.handleChange} type="email" className='form-control bg-dark border-0 text-muted' id='email' name='email' />
                <p className='text-danger'>{formik.errors.email}</p>
              </div>
              <div className='my-3'>
                <input onChange={formik.handleChange} type="password" className='form-control bg-dark border-0 text-muted' id='password' name='password' />
                <p className='text-danger'>{formik.errors.password}</p>
              </div>
              {errMsg != "" ? <div className='alert alert-danger'>{errMsg}</div> : ""}
              {loading ? <button type='button' className='btn btn-bg w-100'><i className='fa-solid fa-spinner fa-spin'></i></button>
                :
                <button disabled={!formik.isValid} type='submit' className='btn btn-bg w-100'>Login</button>}
              <div className='border-top border-opacity-25 border-light mt-4'>
                <p className='text-center mb-1 pt-3 small'><Link to="/ForgetFassowrd" className=' text-decoration-none'>Forget Password ?</Link></p>
                <p className='text-center small'>Not a member yet ? <Link to='/' className='text-decoration-none'>Create Account</Link></p>
              </div>

            </form>
          </div>
        </div>
      </div>
  )
}
