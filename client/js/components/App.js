import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Chart from './grid'
import Hint from './list'

let App = function({searchQuery}){

    // Grid data as an array of arrays
    const list = [
        ['Brian Vaughn8', 'Software Engineer', 'San Jose', ],
        ['Brian Vaughn8', 'Software Engineer', 'San Jose', ],
        ['Brian Vaughn8', 'Software Engineer', 'San Jose', ],
        ['Brian Vaughn8', 'Software Engineer', 'San Jose', ],
        ['Brian Vaughn8', 'Software Engineer', 'San Jose', ],
        ['Brian Vaughn8', 'Software Engineer', 'San Jose', ],
        ['Brian Vaughn8', 'Software Engineer', 'San Jose', ],
        ['Brian Vaughn8', 'Software Engineer', 'San Jose', ],
        ['Brian Vaughn8', 'Software Engineer', 'San Jose', ],        
        // And so on...
    ];

        // <div className="col-xs-3" style={{"border":"2px solid red"}}><Hint/> </div>
    return <div className="row">

        <div className="col-xs-12"> <Chart data={list}/></div>        
        </div>
}

const mapDispatchToProps = {
}

const mapStateToProps = state => ({

    
})

export default connect(null,
                       null)(App);
