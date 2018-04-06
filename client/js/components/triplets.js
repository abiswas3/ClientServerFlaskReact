import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import Hint from './list'
import {binary_feedback} from '../actions'

let Pair = ({left, right, feedback}) => {

    let linkPath = "http://www.slate.com/content/dam/slate/articles/sports/sports_nut/2014/07/lionel_messi_2014_world_cup_the_world_s_best_player_has_figured_out_how/451556452-argentinas-forward-and-captain-lionel-messi-runs-with.jpg.CROP.promo-mediumlarge.jpg";

    let cell =(
	    <div className={"row"} style={{"height":"50%"}}>
	    <div className="col-xs-4">
	    <img className="image" src={'static/Images/'+left} onClick={()=>{feedback("left")}}></img>
	    </div>

	    <div className="col-xs-4">
	    <img className="image" src={'static/Images/'+right} onClick={()=>{feedback("right")}}></img>
	    </div>

	    <div className="col-xs-3" style={{"border":"2px solid red"}}><Hint/> </div>
	    </div>)

    return cell
}


const mapDispatchToProps = {

    feedback : binary_feedback
}

const mapStateToProps = state => ({

    left: state.left,
    right: state.right

})

export default connect(mapStateToProps,
                       mapDispatchToProps)(Pair)
