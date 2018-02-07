import React from 'react';
import ReactDOM from 'react-dom';
import { List } from 'react-virtualized';

let Hints = () => {

    const list = [
        'Lionel Messi1',
        'Lionel Messi2',
        'Lionel Messi3',
        'Lionel Messi4',        
        'Lionel Messi5',
        'Lionel Messi6',
        'Lionel Messi7',
        'Lionel Messi8',                
    ];


    let textCell = (text) =>{

        return (<div >
                <i style={{"paddingRight": "2px"}}>{text}</i>                
                <input type="radio" name="site_name"
                style={{"paddingLeft": "2cm"}}
                value={"half_marathon"}
                checked={false}
                onClick={()=>{
                    console.log("Clicked");
                }
                        }/>{}                
                </div>)
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
        let heightPad = 50 + 10/(index+1);
        
        console.log(index);
        style = {...style, "top" : heightPad*index + 15,
                 "height": heightPad,
                 "textAlign": "center",
                 "fontSize": fontSize};
                 
        console.log(style);
        return (
                <div
            key={key}
            style={style}
                >
                {textCell(list[index])}
            </div>
        )
    }
    
    return (<List
              width={300}
              height={800}
              rowCount={list.length}
              rowHeight={60}
              rowRenderer={rowRenderer}
             />) 
}

export default Hints
