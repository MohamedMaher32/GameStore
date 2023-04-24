import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function Datelies() {
    let [dateliseInfo, setDateliseInfo] = useState()
    let { id } = useParams()
    useEffect(() => {
        getDateiles()
    }, [])
    async function getDateiles() {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
            params: { id: id },
            headers: {
                'X-RapidAPI-Key': '7e5459cb8cmsh9e15f0722147d97p16a88cjsn5688b3201589',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            // console.log(response.data);
            $(".loading").fadeOut(1500)
            setDateliseInfo(response.data)
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
            <>
                {dateliseInfo ? <div className="datelies">
                    <div className="layer" >
                        <div className="container">
                            <div className="row pt-5 pb-3">
                                <div className="col-md-4 col-sm-12 mb-4">
                                    <img src={dateliseInfo.thumbnail} alt="image" className="w-100 rounded-2" />
                                    <div className="d-flex justify-content-between align-items-center mt-4 link">
                                        <span className="p-2 bg-dark text-muted rounded-2 fw-bold">FREE</span>
                                        <Link to='/home' className=" p-1 ms-2 btn-bg2 fw-bold rounded-2">HOME</Link>
                                        <a href={dateliseInfo.game_url} target="_blank" className="btn btn-bg w-100 mx-2 fw-bold">PLAY NOW <i className="fa-solid fa-right-from-bracket"></i></a>
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12">
                                    <h1 className="pb-1">{dateliseInfo.title}</h1>
                                    <p className='small' style={{ lineHeight: "1.7", letterSpacing: "1px" }}>{dateliseInfo.description}</p>
                                    <hr />
                                    {dateliseInfo.minimum_system_requirements?
                                        <><h4 className='mb-3'>Minimum System Requirements</h4>
                                            <p className='small'><span className='fw-bold'>graphics : </span>{dateliseInfo.minimum_system_requirements?.graphics}</p>
                                            <p className='small'><span className='fw-bold'>memory : </span>{dateliseInfo.minimum_system_requirements?.memory}</p>
                                            <p className='small'><span className='fw-bold'>os : </span>{dateliseInfo.minimum_system_requirements?.os}</p>
                                            <p className='small'><span className='fw-bold'>processor : </span>{dateliseInfo.minimum_system_requirements?.processor}</p>
                                            <p className='small'><span className='fw-bold'>storage : </span>{dateliseInfo.minimum_system_requirements?.storage}</p>
                                            <hr /></> : ""}

                                    <h4 className='mb-2'>{dateliseInfo.title} Screenshots</h4>
                                    <OwlCarousel className='owl-theme' loop items={1} autoplay={true} autoplayTimeout={2500} dots={false}>
                                        {dateliseInfo.screenshots.map((el) => {
                                            return <img src={el.image} alt="category" className='w-100' key={el.id} />
                                        })}
                                    </OwlCarousel>
                                    <h4 className='mt-3 mb-4'>Additional Information</h4>
                                    <hr />
                                    <div className="row my-2">
                                        <div className="col-4">
                                            <span className='text-muted'>Title</span>
                                            <p>{dateliseInfo.title}</p>
                                        </div>
                                        <div className="col-4">
                                            <span className='text-muted'>Developer</span>
                                            <p>{dateliseInfo.developer}</p>
                                        </div>
                                        <div className="col-4">
                                            <span className='text-muted'>Publisher</span>
                                            <p>{dateliseInfo.publisher}</p>
                                        </div>
                                        <div className="col-4">
                                            <span className='text-muted'>Release Date</span>
                                            <p>{dateliseInfo.release_date}</p>
                                        </div>
                                        <div className="col-4">
                                            <span className='text-muted'>Genre</span>
                                            <p>{dateliseInfo.genre}</p>
                                        </div>
                                        <div className="col-4">
                                            <span className='text-muted'>Platform</span>
                                            <p>{dateliseInfo.platform}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ""}
            </>
        </>

    )
}