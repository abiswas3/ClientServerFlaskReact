import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Chart from './grid'
import Hint from './list'
import Chat from './chat'

let App = function({items, chat_history}){


    // List of check boxes
    // <div className="col-xs-3" style={{"border":"2px solid red"}}><Hint/> </div>

    // Tiles that flip
    //
    return <div className="row">

        <div className="col-xs-9"> <Chart items={items}/></div>
        <div className={"col-xs-3"}>
        <Chat chat_history={chat_history}/>
        </div>

        </div>
}

const mapDispatchToProps = {
}

const mapStateToProps = state => ({

    items: state.items,
    chat_history: state.chat_history
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(App);
