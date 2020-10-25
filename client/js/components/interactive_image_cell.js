import React from 'react';
import ReactDOM from 'react-dom';

let IImgCell = ({imgToShow, feedback, flagOn}) => {

    let front = (<div >
                 <img src={imgToShow} className="image" ></img>           
                 <div className="middle">
                 <div className="btn-group">
                 <button className="btn btn-primary" onClick={()=>feedback(1, 0)}><i className="em em---1"></i></button>
                 <button className="btn btn-primary" onClick={()=>feedback(-1, 0)}><i className="em em--1"></i></button>
                 </div>
                 </div>                                                  
                 </div>);

    let back = (<div>
                 <img src={"https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/04/27/15563815885516.jpg"} className="image" ></img>           
                 <div className="middle">
                 <div className="btn-group">
                 <button className="btn btn-primary" onClick={()=>feedback(1, 0)}><i className="em em---1"></i></button>
                 <button className="btn btn-primary" onClick={()=>feedback(-1, 0)}><i className="em em--1"></i></button>
                 </div>
                 </div>                                                  
                </div>);

    console.log("Flag "+ flagOn);


    return (<div className={"scene"}>
            <div className={"card" + (flagOn ? " is-flipped":"")}>
            <div className="card__face card__face--front">{front}</div>
            <div className="card__face card__face--back">{back}</div>
            </div>
            </div>);
}

export default IImgCell



