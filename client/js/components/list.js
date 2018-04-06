import React from 'react';
import ReactDOM from 'react-dom';
import { List } from 'react-virtualized';
import { connect } from 'react-redux'

let Hints = ({ranks}) => {


    let textCell = (text) =>{
	
	return (

		<img src={text} className="image" ></img>)
		
    }
        
    function rowRenderer ({
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        style        // Style object to be applied to row (to position it)
    })
    {
        
        let fontSize = 100/(Math.log10(index+2))+"%";        
        let heightPad = 300 + 20/(index+1);
        
        style = {...style, "top" : heightPad*index + 15,
                 "height": heightPad,
                 "textAlign": "center",
                 "fontSize": fontSize};
                 
        return (
                <div
            key={key}
            style={style}
                >
                {textCell('static/Images/'+ranks[index])}
            </div>
        )
    }
    
    return (<List
              width={300}
              height={800}
              rowCount={ranks.length}
              rowHeight={400}
              rowRenderer={rowRenderer}
             />) 
}


const mapStateToProps = state => ({

    ranks: state.ranks
})

export default connect(mapStateToProps,
                       null)(Hints)
