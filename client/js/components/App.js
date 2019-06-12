import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Chart from './grid'
import ChatWindow from './chatWindow'
import Scores from './table'
import Choose from './choosePage'
import 'react-virtualized/styles.css'; // only needs to be imported once

let App = function({page_type}){

    // Grid data as an array of arrays
    // <div className="col-xs-9"><Scores/></div>
    //
    console.log(page_type)
    if(page_type == "default")
        return(<Choose/>);
    else
        return(<ChatWindow/>);
}

const mapDispatchToProps = {
}

const mapStateToProps = state => ({

    page_type: state.page_type
})

export default connect(mapStateToProps,
                       null)(App);
