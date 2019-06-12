import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {select_kind, update_page} from '../actions'

let Choose = ({select_kind}) =>{

    return(<div className={"container"}>

           <div className={"row"}>
           <div className={"col-xs-12"}>
           Write shit about your experiment here
           </div>           
           </div>

           <div className={"row"}>
           <div className={"col-xs-12"}>
           <button onClick = {()=> {
               select_kind("wizard");
           }}>Wizard</button>
           </div>           
           </div>
           
           <div className={"row"}>
           <div className={"col-xs-12"}>
           <button onClick = {()=> {
               select_kind("apprentice");               
           }}>Apprentice</button>
           </div>           
           </div>
           

           </div>);
}

// const mapDispatchToProps = {

//     select_kind: select_kind,
//     update_page: update_page
        
    
// }

const mapDispatchToProps = {
    select_kind: select_kind,
    update_page: update_page
}

const mapStateToProps = state => ({
})

export default connect(null,
                       mapDispatchToProps)(Choose);
