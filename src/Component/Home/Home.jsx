import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import $ from 'jquery'
export default function Home() {
  let [homeList, setHomeList] = useState([])
  useEffect(() => {
    getHomeData()
  }, [])
  async function getHomeData() {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: { 'sort-by': 'popularity' },
      headers: {
        'X-RapidAPI-Key': '7e5459cb8cmsh9e15f0722147d97p16a88cjsn5688b3201589',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      // console.log(response.data);
      $(".loading").fadeOut(1500)
      setHomeList(response.data)
    }).catch(function (error) {
      // console.log(error.response.data.message);
      alert(error.response?.data.message)
    });
  }
  return (
    <div>
       <>
      <div className="loading">
        <span className="loader"></span>
      </div>
      </>
      <div className="main-header">
        <div className="container">
          <h1>Find & track the best <span className="text-primary">free-to-play</span>  games!</h1>
          <p className="text-muted">Track what you've played and search for what to play next! Plus get free premium loot!</p>
          <Link className="btn btn-bg mb-4" to='/all'>Browse Games</Link>
        </div>
      </div>
      <div className="container py-5">
        <h3 className="pb-5"><i className="fa-solid fa-robot"></i> Personalized Recommendations</h3>
        <div className="row g-3">
          {homeList?.slice(0,3).map((el) => {
            return <div className="col-lg-4 col-md-6 col-sm-12 link" key={el.id}>
              <Link to={"/datelies/" + el.id}>
                <div className="item h-100">
                  <img src={el.thumbnail} alt="image" className="w-100" />
                  <div className="text d-flex justify-content-between align-items-center p-3 shadow rounded-bottom">
                    <h5>{el.title}</h5>
                    <span className="p-2 bg-primary text-white rounded-2 fw-bold">Free</span>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}