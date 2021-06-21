import React, { Component } from 'react'
// type rcc -> get react format
// default export ek hi hta h
export default class Todo extends Component { 
    constructor(props)
    {
        super(props);
        this.state={
            tasks:[{id:1,txt:'Task 1'},{id:2,txt:'Task 2'},{id:3,txt:'Task 3'}],
        }
    }
    onSubmit = (task) => {
        // making new task array -> old task array + new task object
        let nta = [...this.state.tasks,{id:this.state.tasks.length+1,txt:task}];
        this.setState({
            tasks:nta
        })
    }
    onDelete = (id) => {
        // new task array consists all elements other than passed id task
        let nta = this.state.tasks.filter(task=>{
            return task.id!=id;
        })
        this.setState({tasks:nta})
    } 
    
    render() {
        console.log('Todo render');
        return (
            <>
            <InputComponent onSubmit={this.onSubmit} />
            <TaskList tasks={this.state.tasks} onDelete={this.onDelete} />
            </>
        )
    }
}
// create input container
// a currTask to store new task
// add button 
// functions to add task and handle change of input textfield
class InputComponent extends Component {
    constructor(props)
    {
        // currTask used by only InputComponent 
        // props = onSubmit by Todo
        super(props); 
        this.state={
            currTask:''
        }
    }
    // set currTask 
    handleChange=(e)=>{
        this.setState({currTask:e.target.value})
    }
    render() {
        console.log('Input render');
        return (
            <div className='input-container'>
            <input value={this.state.currTask} onChange={this.handleChange} type='text'></input>
            <button onClick={()=>{
                this.props.onSubmit(this.state.currTask)
                this.setState({currTask:''})
                }
            } >Add</button>
            </div>
        )
    }
}
// task container
// tasks display
// delete btn
class TaskList extends Component {
    constructor(props) {
        // props = task array, onDelete function
        super(props);
    }
    render() {
        console.log('TaskList render');
        return (
            <div className='class-list'>
                <ul>
                    {
                        // can't use loop 
                        this.props.tasks.map(task => (
                            // must give key to LIs
                            <li key={task.id}>
                                <h1>{task.txt}</h1>
                                <button onClick={()=>this.props.onDelete(task.id)}>Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}