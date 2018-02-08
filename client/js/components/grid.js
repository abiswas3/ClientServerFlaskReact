import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-virtualized';
import { connect } from 'react-redux'
import {binary_feedback} from '../actions'

const COLUMN_COUNT = 3
let Chart = ({feedback, items}) => {
 
    let imageCell = (id) =>{

	console.log(id);

	let linkPath = ""
	if(id < items.length)
            linkPath="http://www.slate.com/content/dam/slate/articles/sports/sports_nut/2014/07/lionel_messi_2014_world_cup_the_world_s_best_player_has_figured_out_how/451556452-argentinas-forward-and-captain-lionel-messi-runs-with.jpg.CROP.promo-mediumlarge.jpg";
	
        return (<div className={"container"}>
             
             <img src={linkPath} className="image" ></img>

                <div className="middle">
            <div className="btn-group">
                <button className="btn btn-primary" onClick={()=>feedback(1, id)}><i className="em em---1"></i></button>
                <button className="btn btn-primary" onClick={()=>feedback(-1, id)}><i className="em em--1"></i></button>
                                
                </div>
                
            </div>

            </div>)
    }

    function cellRenderer ({columnIndex, key, rowIndex, style }) {

	let index = COLUMN_COUNT*rowIndex + columnIndex
	    
        return (
            <div
            key={key}
            style={style}
            >
            {imageCell(index)}
            </div>
        )  

    }


    return   <Grid
    cellRenderer={cellRenderer}
    columnCount={COLUMN_COUNT}
    rowCount={Math.ceil(items.length/COLUMN_COUNT)}
    columnWidth={280}    
    rowHeight={200}
    height={800}    
    width={1200}
    />
}


const mapDispatchToProps = {

    feedback : binary_feedback
}

const mapStateToProps = state => ({

    items: state.items
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(Chart)
