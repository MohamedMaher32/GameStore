import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery'
export default function All() {
  let [AllList, setALLList] = useState([])
  let [moreGames, setMoreGames] = useState(20)
  function more() {
    if (moreGames <= AllList.length) { setMoreGames(moreGames += 20) }
  }
  useEffect(() => {
    getAllData()
  }, [])
  async function getAllData() {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      headers: {
        'X-RapidAPI-Key': '7e5459cb8cmsh9e15f0722147d97p16a88cjsn5688b3201589',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      // console.log(response.data);
      $(".loading").fadeOut(1500)
      setALLList(response.data)
    }).catch(function (error) {
      // console.error(error);
      alert(error.response?.data.message)
    });
  }
  return (
    <>
      <div className="loading">
        <span className="loader"></span>
      </div>
      <div className='container'>
        <div className="row g-3 pt-5 pb-3">
          {AllList?.splice(0, moreGames).map((el) => {
            return <div className="col-lg-3 col-md-6 col-sm-12 link" key={el.id}>
              <Link to={"/datelies/" + el.id}>
                <div className="game rounded-bottom h-100">
                  <img src={el.thumbnail} alt="game" className='w-100' />
                  <div className="body p-3">
                    <div className="d-flex justify-content-between align-items-center ">
                      <h6>{el.title?.split(" ").slice(0, 3).join(" ")}</h6>
                      <span className="p-1 text-white rounded-2 small fw-bold" style={{ backgroundColor: "#4799eb", fontSize: "13px" }}>FREE</span>
                    </div>
                    <p className='small py-1'>{el.short_description?.split(" ").slice(0, 3).join(" ")} ...</p>
                    {(el.platform == "Web Browser") ?
                      <div className="d-flex justify-content-between align-items-center">
                        <i className="fa-solid fa-square-plus fs-5"></i>
                        <span className='rounded-pill px-2 text-dark small' style={{ fontWeight: "600", fontSize: "13px", backgroundColor: '#aaa' }}>
                          {el.genre} <i className="fa-solid fa-window-maximize"></i></span>

                      </div> :
                      <div className="d-flex justify-content-between align-items-center">
                        <i className="fa-solid fa-square-plus fs-5"></i>
                        <span className='rounded-pill px-2 text-dark small' style={{ fontWeight: "600", fontSize: "13px", backgroundColor: '#aaa' }}>
                          {el.genre} <i className="fa-brands fa-windows"></i></span>
                      </div>}
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
        <button className='btn btn-bg my-4 d-flex mx-auto justify-content-between align-items-center' onClick={more}>More Games<i className="fa-solid fa-angles-right ms-1 mt-1"></i></button>
      </div>
    </>

  )
}