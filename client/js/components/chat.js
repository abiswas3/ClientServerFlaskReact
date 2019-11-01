import React from 'react';
import ReactDOM from 'react-dom';
import { AutoSizer, List } from 'react-virtualized';

let Chat = ({chat_history}) => {
    
    let row_count = chat_history.length;
    if(row_count == undefined)
        row_count = 0;

    let height_renderer = ({index}) =>{
        // Assuming 50 characters a line
        let num_lines = Math.ceil(chat_history[index]["text"].length/37)
        // console.log(index + " " + list[index]["text"].length + ", " + num_lines);
        // 14 is font size  + some buffer
        return 20*num_lines + 15;
    }
    let textCell = (row) =>{

        return (<div >
                <i style={{"paddingRight": "2px"}}>{row["text"]}</i>
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

        let fontSize = "14px";
        let background = "#bed4f7";
        if(chat_history[index]["wizard"] == true)
            background = "#aaaaaa";

        style = {...style,
                 // "height": heightPad,
                 "fontSize": fontSize,
                 "background": background};

        return (
                <div
            key={key}
            style={style}
                >
                {textCell(chat_history[index])}
            </div>
        )
    }



    return(<List
           height={900}
           rowCount={row_count}
           rowHeight={height_renderer}
           rowRenderer={rowRenderer}
           scrollToIndex={row_count - 1}
           width={400 + 10}/>);
}
export default Chat
