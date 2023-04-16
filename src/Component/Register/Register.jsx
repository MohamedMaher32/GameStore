import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import mainBg from '../../Assets/main-bg.jpg'
export default function Register() {
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
    name: Yup.string().required().min(2, "Name must be minmum 2 letters").max(16, "Name must be maxmum 16 letters"),
    email: Yup.string().required().email("Enter your valid email"),
    phone: Yup.string().required().matches(/^(010|012|011|015)[0-9]{8}$/, "Enter your Egyption phone number"),
    password: Yup.string().required().matches(/^[A-Za-z0-9!@#$%&*_-]{3,16}$/, "Enter valid password"),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], "Re-passwoed not matched")
  })
  // dateiles form
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
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
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signup`, info).catch((error) => {
      console.log(error)
      setErrMes(error.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.message == 'success') {
      navigate("/login")
    }
  }
  // design form
  return (
      <div className="container py-5">
        <div className='row m-0 gray'>
          <div className="col-lg-6 col-sm-12 p-0">
            <img src={mainBg} alt="play games" className='w-100 h-100' />
          </div>
          <div className='col-lg-6 col-sm-12 p-4  '>
            <h2 className='h4 text-center pt-4 pb-2'>Create My Account!</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="row my-3">
                <div className="col-6">
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control bg-dark border-0 text-muted' id='name' name='name' placeholder='Name' />
                  <p className='text-danger m-0'>{formik.errors.name}</p>
                </div>
                <div className="col-6">
                  <input onChange={formik.handleChange} type="email" className='form-control bg-dark border-0 text-muted' id='email' name='email' placeholder='Email' />
                  <p className='text-danger m-0'>{formik.errors.email}</p>
                </div>
              </div>
              <div className='my-3'>
                <input onChange={formik.handleChange} type="password" className='form-control bg-dark border-0 text-muted' id='password' name='password' placeholder='Password' />
                <p className='text-danger'>{formik.errors.password}</p>
              </div>
              <div className='my-3'>
                <input onChange={formik.handleChange} type="password" className='form-control bg-dark border-0 text-muted' id='rePassword' name='rePassword' placeholder='Re-Password' />
                <p className='text-danger'>{formik.errors.rePassword}</p>
              </div>
              <div className='my-3'>
                <input onChange={formik.handleChange} type="text" className='form-control bg-dark border-0 text-muted' id='phone' name='phone' placeholder='Phone' />
                <p className='text-danger'>{formik.errors.phone}</p>
              </div>
              {errMsg != "" ? <div className='alert alert-danger'>{errMsg}</div> : ""}
              {loading ? <button type='button' className='btn btn-bg w-100'><i className='fa-solid fa-spinner fa-spin'></i></button>
                :
                <button disabled={!formik.isValid} type='submit' className='btn btn-bg w-100'>Create Account</button>}
              <p className='text-center small text-muted py-3 border-bottom border-light border-opacity-25'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
              <p className='text-center small'>Already a member ? <Link to='/login' className='text-decoration-none'>Login</Link></p>
            </form>
          </div>
        </div>
      </div>

  )
}
