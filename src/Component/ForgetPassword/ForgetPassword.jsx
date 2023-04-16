import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Logo from '../../Assets/logo.png'
import mainBg from '../../Assets/main-bg.jpg'
export default function ForgetPassword() {
  // main Api link
  let baseUrl = "https://route-ecommerce.onrender.com"
  // error element to display erroe message)
  let [errMsg, setErrMsg] = useState("")
  // btn loading
  let [loading, setLoading] = useState(false)
  // programming routing
  let navigate = useNavigate()
  // validation form
  let validationSchema = Yup.object({
    email: Yup.string().required().email("Enter your valid email")
  })
  // dateiles form
  let formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: (value) => {
      forgetPassword(value)
    },
    validationSchema,
  })
  // api function
  async function forgetPassword(info) {
    setLoading(true)
    let { data } = await Axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, info).catch((error) => {
      console.log(error);
      setErrMsg(error.response.data.message)
      console.log(error.response.data.message);
      setLoading(false)
    })
    console.log(data);
    if (data.statusMsg == 'success') {
      navigate('/resetCode')
    }
  }
  return (
      <div className="container py-5">
        <div className='row move gray mx-0'>
          <div className="col-lg-6 col-sm-12 p-0">
            <img src={mainBg} alt="play games" className='w-100 h-100' />
          </div>
          <div className='col-lg-6 col-sm-12 p-5  '>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <img src={Logo} alt="logo" className='w-25' />
              <h2 className='h4 text-center py-2'>Forget Password</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className='my-3'>
                <input onChange={formik.handleChange} type="email" className='form-control bg-dark border-0 text-muted' id='email' name='email' placeholder='Email' />
                <p className='text-danger'>{formik.errors.email}</p>
              </div>
              {errMsg != "" ? <div className='alert alert-danger'>{errMsg}</div> : ""}
              {loading ? <button type='button' className='btn btn-bg w-100 mb-2'><i className='fa-solid fa-spinner fa-spin'></i></button>
                :
                <button disabled={!formik.isValid} type="submit" className='btn btn-bg w-100 mb-2'>Send Message</button>}
            </form>
          </div>
        </div>
      </div>
  )
}