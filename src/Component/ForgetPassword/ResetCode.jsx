import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import mainBg from '../../Assets/main-bg.jpg'
import Logo from '../../Assets/logo.png'
export default function ResetCode() {
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
    resetCode: Yup.string().required().matches(/^[0-9]{5,6}$/, "Enter your valid code"),
  })
  // dateiles form
  let formik = useFormik({
    initialValues: {
      resetCode: ""
    },
    onSubmit: (value) => {
      verifyResetCode(value)
      console.log(value);
    },
    validationSchema,
  })
  // api function
  async function verifyResetCode(info) {
    setLoading(true)
    let { data } = await Axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, info).catch((error) => {
      console.log(error.response.data.message);
      setErrMsg(error.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.status == 'Success') {
      navigate("/newPassword")
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
              <h2 className='h4 text-center py-2'>Reset Code</h2>
              <p className='text-center'>"Reset code sent to your email , Please check it"</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className='my-3'>
                <input onChange={formik.handleChange} type="text" className='form-control bg-dark border-0 text-muted' id='resetCode' name='resetCode' placeholder='Code' />
                <p className='text-danger'>{formik.errors.resetCode}</p>
              </div>
              {errMsg != "" ? <div className='alert alert-danger'>{errMsg}</div> : ""}
              {loading ? <button type='button' className='btn btn-bg w-100 mb-2'><i className='fa-solid fa-spinner fa-spin'></i></button>
                :
                <button disabled={!formik.isValid} type="submit" className='btn btn-bg w-100 mb-2'>Verify Code</button>}
            </form>
          </div>
        </div>
      </div>
  )
}