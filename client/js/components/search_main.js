import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import {update_chat} from '../actions'

import SearchBar from './search_bar';
import styles from './search.json';

let Search = ({chat}) => {

    return (
      <SearchBar
        autoFocus
        renderClearButton
        renderSearchButton={true}
        placeholder="Start typing here"
        onChange={ ()=>{}}
        onClear={ (value)=> {}}
        onSelection={ (value)=> {}}
        onSearch={ (value)=>chat(value)}
        styles={styles}
        suggestions={[]}
      />
    );

}

const mapDispatchToProps = {
    
    chat: update_chat
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(Search)


