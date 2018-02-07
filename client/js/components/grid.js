import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-virtualized';
import styles from './grid_layout.css';
// import 'react-virtualized/styles.css'


let Chart = ({data}) => {

    let imageCell = () =>{

        let linkPath="http://www.slate.com/content/dam/slate/articles/sports/sports_nut/2014/07/lionel_messi_2014_world_cup_the_world_s_best_player_has_figured_out_how/451556452-argentinas-forward-and-captain-lionel-messi-runs-with.jpg.CROP.promo-mediumlarge.jpg";
        return (<div className={"container"}>
             
             <img src={linkPath} className="image" ></img>

                <div className="middle">
            <div className="btn-group">
                <button className="btn btn-primary" onClick={()=>console.log("Like")}><i className="em em---1"></i></button>
                <button className="btn btn-primary" onClick={()=>console.log("DisLike")}><i className="em em--1"></i></button>
                                
                </div>
                
            </div>

            </div>)
    }

    function cellRenderer ({columnIndex, key, rowIndex, style }) {

        if(rowIndex % 2 == 0){
            return (
                <div
                key={key}
                style={style}
                >
                {imageCell()}
                </div>
            )              
        } 
        return (
            <div
            key={key}
            style={style}
            >
            {imageCell()}
            </div>
        )  

    }


    return   <Grid
    cellRenderer={cellRenderer}
    columnCount={4}
    rowCount={data.length}
    columnWidth={280}    
    rowHeight={200}
    height={800}    
    width={1200}
    />
}

export default Chart
