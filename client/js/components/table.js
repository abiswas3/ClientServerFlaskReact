import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-virtualized';
import { connect } from 'react-redux'
import {binary_feedback} from '../actions'
import { Column, Table } from 'react-virtualized';


let Scores = ({feedback, items}) => {

    const list = [
        {'name': 'Brian Vaughn8', 'description': "goalkeeper"},
        {'name': 'Brian Vaughn8', 'description': "defender"},
        {'name': 'Brian Vaughn8', 'description': "midfielder"},
        {'name': 'Brian Vaughn8', 'description': "striker"},
        {'name': 'Brian Vaughn8', 'description': "goalkeeper"},
        {'name': 'Brian Vaughn8', 'description': "defender"},
        {'name': 'Brian Vaughn8', 'description': "midfielder"},
        {'name': 'Brian Vaughn8', 'description': "striker"},
        {'name': 'Brian Vaughn8', 'description': "goalkeeper"},
        {'name': 'Brian Vaughn8', 'description': "defender"},
        {'name': 'Brian Vaughn8', 'description': "midfielder"},
        {'name': 'Brian Vaughn8', 'description': "striker"},
        {'name': 'Brian Vaughn8', 'description': "goalkeeper"},
        {'name': 'Brian Vaughn8', 'description': "defender"},
        {'name': 'Brian Vaughn8', 'description': "midfielder"},
        {'name': 'Brian Vaughn8', 'description': "striker"},
        {'name': 'Brian Vaughn8', 'description': "goalkeeper"},
        {'name': 'Brian Vaughn8', 'description': "defender"},
        {'name': 'Brian Vaughn8', 'description': "midfielder"},
        {'name': 'Brian Vaughn8', 'description': "striker"},
        {'name': 'Brian Vaughn8', 'description': "goalkeeper"},
        {'name': 'Brian Vaughn8', 'description': "defender"},
        {'name': 'Brian Vaughn8', 'description': "midfielder"},
        {'name': 'Brian Vaughn8', 'description': "striker"},
        {'name': 'Brian Vaughn8', 'description': "goalkeeper"},
        {'name': 'Brian Vaughn8', 'description': "defender"},
        {'name': 'Brian Vaughn8', 'description': "midfielder"},
        {'name': 'Brian Vaughn8', 'description': "striker"},
        
    ];


    // eventually replace with feedback mechanism
    let interaction = (cellData, debug)=>{console.log(debug);}
    
    let clickCell = ({cellData,
                  columnData,
                  columnIndex,
                  dataKey,
                  isScrolling,
                  rowData,
                  rowIndex
                 }) => {
                     
                     let clickable_button = <div>            
            <button
        className="btn btn-primary"
        onClick={() => interaction(cellData, rowData)}>{cellData}
            </button>

        </div>
            
        return clickable_button

    }
    
    return <Table
    width={800}
    height={300}
    headerHeight={20}
    rowHeight={30}
    rowCount={list.length}
    rowGetter={({ index }) => list[index]}
        >
        <Column
    label='Name'
    dataKey='name'
    width={300}
        />
        <Column
    width={200}
    label='Description'
    cellRenderer={clickCell}
    dataKey='description'
        />
    </Table>

}


const mapDispatchToProps = {

    feedback : binary_feedback
}

const mapStateToProps = state => ({

    items: state.items
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(Scores)
