import React from 'react';
import ReactDOM from 'react-dom';

let IImgCell = ({imgToShow, feedback, hover, flagOn, stackOn, row, col}) => {

    let display = (imgToShow) => (<div onMouseEnter={()=> hover(row, col)} onMouseLeave={()=> hover(row, col)}>
                 <img src={imgToShow} className="image" ></img>           
                 <div className="middle">
                 <div className="btn-group">
                 <button className="btn btn-primary" onClick={()=>feedback(row, col)}><i className="em em---1"></i></button>
                 <button className="btn btn-primary" onClick={()=>feedback(-1, 0)}><i className="em em--1"></i></button>
                 </div>
                 </div>                                                  
                 </div>);

    let front = (<div className={"stacked"}>                
                        <span className="blue">{display(imgToShow)}</span>
                        </div>);

    // CUrrently not used if i need : a blank slate
    let back = (<div>                
                </div>);

    // console.log("Flag "+ flagOn);

    let front_stacked = (<div className={"stacked"}>                
                <span className="red">Red</span>
                <span className="green">Red</span>
                <span className="blue">{display(imgToShow)}</span>
                </div>);

    // CUrrently not used if i need : a back picture.
    let back_stacked = (<div className={"stacked"}>                
            <span className="red">Red</span>
            <span className="green">Red</span>
            <span className="blue">{display("https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/04/27/15563815885516.jpg")}</span>
            </div>);

    if(stackOn)
        return (<div className={"scene"}>
                <div className={"card" + (flagOn ? " is-flipped":"")}>
                <div className="card__face card__face--front">{front_stacked}</div>
                <div className="card__face card__face--back">{front_stacked}</div>
                </div>
                </div>);
    else
        return (<div className={"scene"}>
                <div className={"card" + (flagOn ? " is-flipped":"")}>
                <div className="card__face card__face--front">{front}</div>
                <div className="card__face card__face--back">{front}</div>
                </div>
                </div>);
}

export default IImgCell



