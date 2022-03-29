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
                                                {/* <img class="img-fluid" alt="100%x280" src={fash} width="30" height="30" /> */}
                                                <div className="card-body">
                                                    <h4 className="card-title">Rapide et Fiable</h4>
                                                    <p className="card-text">
                                                    Grace à Lelbled , j’ai pu envoyé rapidement des documents urgent en une journée 
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
                                                                    <p>Mourad</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>7-3-2021</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card wddth cardShadow p-3">
                                                {/* <img class="img-fluid" alt="100%x280" src={img} width="30" height="30" /> */}
                                                <div className="card-body">
                                                    <h4 className="card-title">Merci Beaucoup!</h4>
                                                    <p className="card-text">
                                                    Lya chHaar w ena N7awim kifeh neb3eth kathya il weldi mit8arrib , ikether 5erkom 3awentouni
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
                                                                    <p>Fatima</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>10-9-2021</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card wddth cardShadow p-3">
                                                {/* <img class="img-fluid" alt="100%x280" src={img} width="30" height="30" /> */}
                                                <div className="card-body">
                                                    <h4 className="card-title">à recommander .. </h4>
                                                    <p className="card-text">
                                                    J’ai pu économiser 30% de mon billet d’avion en transportant des colis. 
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
                                                                    <p>Lilia</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>4-5-2021</p>
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
                                                {/* <img class="img-fluid" alt="100%x280" src={fash} width="30" height="30" /> */}
                                                <div className="card-body">
                                                    <h4 className="card-title">Service Très Sérieux</h4>
                                                    <p className="card-text">
                                                    Wousslitni kathiitii kemlé w fi assra3 wa9t, je recommande vivement ces services
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
                                                                    <p>Skander</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>9-12-2021</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card wddth cardShadow p-3">
                                                {/* <img class="img-fluid" alt="100%x280" src={img} width="30" height="30" /> */}
                                                <div className="card-body">
                                                    <h4 className="card-title">Bonne solution!</h4>
                                                    <p className="card-text">
                                                    Je voyage souvent en bateau et sur lelbled je trouve rapidement ce que je peux transporter 
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
                                                                    <p>Rami</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>8-2-2022</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card wddth cardShadow p-3">
                                                {/* <img class="img-fluid" alt="100%x280" src={img} width="30" height="30" /> */}
                                                <div className="card-body">
                                                    <h4 className="card-title">Service rapide!</h4>
                                                    <p className="card-text">
                                                    Est7akiit bich neb3eth dwa Lelbled, me l9iiit il 7ell ken fi lelbled , Merci beaucoup!
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
                                                                    <p>Ahmed</p>
                                                                </div>
                                                                <div className="col">
                                                                    <p>12-1-2022</p>
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
