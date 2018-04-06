import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Pair from './triplets'

let App = function({ranks}){

    if (ranks.length > 0){
	return <Pair/>
    }
    else{
	return <div></div>
    }
	    
}

const mapDispatchToProps = {
}

const mapStateToProps = state => ({
    ranks : state.ranks
})

export default connect(mapStateToProps,
                       null)(App);
