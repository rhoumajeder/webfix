import React, { useEffect } from 'react'
import fash from "../../assets/images/flash.png";
import img from '../../assets/images/database.png';
import './NewCarousel.css';
import {
    Face, Person
} from "@material-ui/icons";

function NewCarousel() {
    useEffect(() => {
        setInterval(() => {
            const caro = document.getElementById('carouselExampleIndicators2');
            caro.classList.add('slide');
        }, 3000);
    }, [])
    const onClickLeft = () => {
        setInterval(() => {
            const caro = document.getElementById('carouselExampleIndicators2');
            caro.classList.add('slide');
        }, 3000);

    }
    const onClickRight = () => {
        setInterval(() => {
            const caro = document.getElementById('carouselExampleIndicators2');
            caro.classList.add('slide');
        }, 3000);
    }

    return (
        <div>
            <div className="p-2">
                <div className="row mb-5">
                    <div className="col-1 d-flex align-items-center text-center">
                        <a className="shadow-lg" onClick={onClickLeft} href="#carouselExampleIndicators2" role="button" data-slide="prev">
                            <i className="fas fa-chevron-left text-dark mb-4"></i>
                        </a>
                    </div>
                    <div className="col-10 mb-3">
                        <div id="carouselExampleIndicators2" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card wddth cardShadow p-3">
                                                <img class="img-fluid" alt="100%x280" src={fash} width="30" height="30" />
                                                <div className="card-body">
                                                    <h4 className="card-title">djfjhdfh jdjf jk djfdj k djfsd jk 1</h4>
                                                    <p className="card-text">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                                        ever since the 1500s, when an unknown printer
                                                    </p>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <Person
                                                                className="rounded-circle"
                                                                style={{ color: "white", width: 50, height: 50, padding: 3, backgroundColor: 'gray' }}
                                                            />
                                                        </div>
                                                        <div className="col-9">
                                                            <div className="row mt-1">
                                                                <div className="col">
                                                                    <p>John doe</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>12-1-2021</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card wddth cardShadow p-3">
                                                <img class="img-fluid" alt="100%x280" src={img} width="30" height="30" />
                                                <div className="card-body">
                                                    <h4 className="card-title">djfjhdfh jdjf jk djfdj k djfsd jk 2</h4>
                                                    <p className="card-text">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                                        ever since the 1500s, when an unknown printer
                                                    </p>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <Person
                                                                className="rounded-circle"
                                                                style={{ color: "white", width: 50, height: 50, padding: 3, backgroundColor: 'gray' }}
                                                            />
                                                        </div>
                                                        <div className="col-9">
                                                            <div className="row mt-1">
                                                                <div className="col">
                                                                    <p>John doe</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>12-1-2021</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card wddth cardShadow p-3">
                                                <img class="img-fluid" alt="100%x280" src={img} width="30" height="30" />
                                                <div className="card-body">
                                                    <h4 className="card-title">djfjhdfh jdjf jk djfdj k djfsd jk 3</h4>
                                                    <p className="card-text">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                                        ever since the 1500s, when an unknown printer
                                                    </p>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <Person
                                                                className="rounded-circle"
                                                                style={{ color: "white", width: 50, height: 50, padding: 3, backgroundColor: 'gray' }}
                                                            />
                                                        </div>
                                                        <div className="col-9">
                                                            <div className="row mt-1">
                                                                <div className="col">
                                                                    <p>John doe</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>12-1-2021</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="carousel-item">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card wddth cardShadow p-3">
                                                <img class="img-fluid" alt="100%x280" src={fash} width="30" height="30" />
                                                <div className="card-body">
                                                    <h4 className="card-title">djfjhdfh jdjf jk djfdj k djfsd jk 4</h4>
                                                    <p className="card-text">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                                        ever since the 1500s, when an unknown printer
                                                    </p>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <Person
                                                                className="rounded-circle"
                                                                style={{ color: "white", width: 50, height: 50, padding: 3, backgroundColor: 'gray' }}
                                                            />
                                                        </div>
                                                        <div className="col-9">
                                                            <div className="row mt-1">
                                                                <div className="col">
                                                                    <p>John doe</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>12-1-2021</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card wddth cardShadow p-3">
                                                <img class="img-fluid" alt="100%x280" src={img} width="30" height="30" />
                                                <div className="card-body">
                                                    <h4 className="card-title">djfjhdfh jdjf jk djfdj k djfsd jk 5</h4>
                                                    <p className="card-text">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                                        ever since the 1500s, when an unknown printer
                                                    </p>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <Person
                                                                className="rounded-circle"
                                                                style={{ color: "white", width: 50, height: 50, padding: 3, backgroundColor: 'gray' }}
                                                            />
                                                        </div>
                                                        <div className="col-9">
                                                            <div className="row mt-1">
                                                                <div className="col">
                                                                    <p>John doe</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>12-1-2021</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card wddth cardShadow p-3">
                                                <img class="img-fluid" alt="100%x280" src={img} width="30" height="30" />
                                                <div className="card-body">
                                                    <h4 className="card-title">djfjhdfh jdjf jk djfdj k djfsd jk 6</h4>
                                                    <p className="card-text">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                                        ever since the 1500s, when an unknown printer
                                                    </p>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <Person
                                                                className="rounded-circle"
                                                                style={{ color: "white", width: 50, height: 50, padding: 3, backgroundColor: 'gray' }}
                                                            />
                                                        </div>
                                                        <div className="col-9">
                                                            <div className="row mt-1">
                                                                <div className="col">
                                                                    <p>John doe</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>12-1-2021</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 d-flex align-items-center text-center">
                        <a className="shadow-lg" onClick={onClickRight} href="#carouselExampleIndicators2" role="button" data-slide="next">
                            <i className="fas fa-chevron-right text-dark mb-4"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCarousel
