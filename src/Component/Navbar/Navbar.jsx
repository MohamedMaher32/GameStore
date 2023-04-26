import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../Assets/logo.png'
import { FunctionContext } from '../../Context/ShareFunction'
export default function Navbar() {
  let { userData, deleteData } = useContext(FunctionContext)
  return (
    <>
      <nav className="navbar navbar-expand-lg  shadow-sm fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/"><img src={Logo} alt="logo" className='logo' />GameStore</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="fa-solid fa-bars text-white fs-2 "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* display navlinks depended about (userData)  */}
            {userData ?
              <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? ' nav-link active ' : ' nav-link ')} to="home">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? ' nav-link  active ' : ' nav-link ')} to="all">All</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className={({ isActive }) => (isActive ? ' nav-link  dropdown-toggle active ' : ' dropdown-toggle nav-link ')} role="button" data-bs-toggle="dropdown" aria-expanded="false" to='platforms'>Platforms</NavLink>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={"/platforms/pc"} >PC</Link></li>
                    <li><Link className="dropdown-item" to={"/platforms/browser"}>Browser</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className={({ isActive }) => (isActive ? ' nav-link  dropdown-toggle active ' : ' dropdown-toggle nav-link ')} role="button" data-bs-toggle="dropdown" aria-expanded="false" to='sortBy'>SortBy</NavLink>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={"/sort-by/release-date"} >Release-date</Link></li>
                    <li><Link className="dropdown-item" to={"/sort-by/popularity"}>Popularity</Link></li>
                    <li><Link className="dropdown-item" to={"/sort-by/alphabetical"} >Alphabetical</Link></li>
                    <li><Link className="dropdown-item" to={"/sort-by/relevance"} >Relevance</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className={({ isActive }) => (isActive ? ' nav-link  dropdown-toggle active ' : ' dropdown-toggle nav-link ')} role="button" data-bs-toggle="dropdown" aria-expanded="false" to='categories'>
                    Categories
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={"/categories/racing"} >racing</Link></li>
                    <li><Link className="dropdown-item" to={"/categories/sports"}>sports</Link></li>
                    <li><Link className="dropdown-item" to={"/categories/social"} >social</Link></li>
                    <li><Link className="dropdown-item" to={"/categories/shooter"} >shooter</Link></li>
                    <li><Link className="dropdown-item" to={"/categories/open-world"} >open-world</Link></li>
                    <li><Link className="dropdown-item" to={"/categories/zombie"} >zombie</Link></li>
                    <li><Link className="dropdown-item" to={"/categories/fantasy"} >fantasy</Link></li>
                    <li><Link className="dropdown-item" to={"/categories/action-rpg"} >action-rpg</Link></li>
                    <li><Link className="dropdown-item" to={"/categories/action"} >action</Link></li>
                    <li><Link className="dropdown-item" to={"/categories/flight"} >flight</Link></li>
                    <li><Link className="dropdown-item" to={"/categories/battle-royale"} >battle-royale</Link></li>
                  </ul>
                </li>
              </ul> : ""}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* display navlinks&icons depended about (userData)  */}
              {userData ?
                <>
                  <li className="nav-item">
                    <Link to='/login' className="nav-link btn btn-bg" style={{ cursor: "pointer" }} onClick={deleteData}>Logout</Link>
                  </li>
                </>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link btn btn-bg mb-2" to="login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link btn btn-bg2" to="/">Register</Link>
                  </li>
                </>}
            </ul>
          </div>
        </div>
      </nav>
    </>

  )
}