import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-virtualized';
import IImgCell from './interactive_image_cell'
import { connect } from 'react-redux'
import {binary_feedback, hover} from '../actions'

const COLUMN_COUNT = 3
let Chart = ({feedback, items}) => {
 
    let imageCell = (rowIndex, columnIndex) =>{

	    // let linkPath = "https://the-drive.imgix.net/https%3A%2F%2Fapi.thedrive.com%2Fwp-content%2Fuploads%2F2019%2F03%2FGettyImages-1131427174.jpg%3Fquality%3D85?w=1440&auto=compress%2Cformat&ixlib=js-1.4.1&s=8ef2fc9b7b4746f614114b6e40c11ad9"
        let linkPath = items[rowIndex][columnIndex]['img_to_show'];

        return (<IImgCell imgToShow={linkPath} 
                          feedback={feedback} 
                          hover={hover}
                          row={rowIndex}
                          col={columnIndex}
                          flagOn={items[rowIndex][columnIndex]['is_flipped']}
                          stackOn={items[rowIndex][columnIndex]['is_stacked']}/>);
    }

    function cellRenderer ({columnIndex, key, rowIndex, style }) {

	let index = rowIndex + columnIndex
	    
        return (
            <div
            key={key}
            style={style}
            >
                {imageCell(rowIndex, columnIndex)}
            </div>
        )  

    }


    return   <Grid
    cellRenderer={cellRenderer}
    columnCount={COLUMN_COUNT}
    rowCount={Math.ceil(items.length)}
    columnWidth={300}    
    rowHeight={300}
    height={900}    
    width={900}
    />
}


const mapDispatchToProps = {

    feedback : binary_feedback
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,
                       mapDispatchToProps)(Chart)
