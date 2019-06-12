import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-virtualized';
import { connect } from 'react-redux'

import 'react-virtualized/styles.css'; // only needs to be imported once

const COLUMN_COUNT = 3
let Chart = ({feedback, items}) => {
 
    let imageCell = (id) =>{

	console.log(id);

	let linkPath = ""
	if(id < items.length)
            linkPath="https://www.formula1.com/content/fom-website/en/drivers/hall-of-fame/Ayrton_Senna/_jcr_content/featureContent/manual_gallery/image1.img.640.medium.jpg/1421858452652.jpg";
	
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

}

const mapStateToProps = state => ({

    items: state.items
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(Chart)
