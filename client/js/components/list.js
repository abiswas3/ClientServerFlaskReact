import React from 'react';
import ReactDOM from 'react-dom';
import { List } from 'react-virtualized';

let Hints = () => {

    const list = [
	"http://www.slate.com/content/dam/slate/articles/sports/sports_nut/2014/07/lionel_messi_2014_world_cup_the_world_s_best_player_has_figured_out_how/451556452-argentinas-forward-and-captain-lionel-messi-runs-with.jpg.CROP.promo-mediumlarge.jpg",
	"http://www.slate.com/content/dam/slate/articles/sports/sports_nut/2014/07/lionel_messi_2014_world_cup_the_world_s_best_player_has_figured_out_how/451556452-argentinas-forward-and-captain-lionel-messi-runs-with.jpg.CROP.promo-mediumlarge.jpg",
	"http://www.slate.com/content/dam/slate/articles/sports/sports_nut/2014/07/lionel_messi_2014_world_cup_the_world_s_best_player_has_figured_out_how/451556452-argentinas-forward-and-captain-lionel-messi-runs-with.jpg.CROP.promo-mediumlarge.jpg",
    ];


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
        let heightPad = 300 + 10/(index+1);
        
        style = {...style, "top" : heightPad*index + 15,
                 "height": heightPad,
                 "textAlign": "center",
                 "fontSize": fontSize};
                 
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
              rowHeight={400}
              rowRenderer={rowRenderer}
             />) 
}

export default Hints
