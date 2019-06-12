import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Search from './search_main'
import Hint from './list'
import Scores from './table'
import 'react-virtualized/styles.css'; // only needs to be imported once

let ChatWindow = ({chat_history, page_type, status, room})=>{

    console.log(chat_history)

    if(status){
        let status_message = "Awaiting connection with an idle partner.";        
        return(<div className="container">
               <div className="row">
               <div className="col-xs-12">
               <h3>{status_message}</h3>
               </div>
               </div>
               </div>);

    }
    
    if(page_type == 'wizard'){

        return(<div className="container">

               <div className="row">
               <div className="col-xs-4">
               <h3>{"I am a " + page_type}</h3>
               <p>{"My room id is " + room}</p>
               </div>                   
               </div>
               <br></br>
               
               <div className="row">
               <div className="col-xs-4" style={{"border":"", "height": "400px"}}>
               <Hint chat_history={chat_history}/>
               </div>                   
               </div>
               <br></br>
               
               <div className="row">
               <div className="col-xs-4">
               <Search/>
               </div>
               </div>
               
               </div>);
    }
    else{
        return(<div className="container">

               <div className="row">               
               <div className="col-xs-4">
               <h3>{"I am a " + page_type}</h3>
               <p>{"My room id is " + room}</p>
               </div>                   
               </div>
               <br></br>
               
               <div className="row">
               <div className="col-xs-4" style={{"border":"", "height": "400px"}}>
               <Hint chat_history={chat_history}/>
               </div>                   
               </div>
               <br></br>               
               <div className="row">
               <div className="col-xs-4">
               <Search/>
               </div>
               </div>               
               </div>);
    }
    // Grid data as an array of arrays
    // <div className="col-xs-9"><Scores/></div>
}

const mapDispatchToProps = {
}

const mapStateToProps = state => ({

    chat_history : state.chat_history,
    page_type: state.page_type,
    status: state.available,
    room: state.room
})

export default connect(mapStateToProps,
                       null)(ChatWindow);
