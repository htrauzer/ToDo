/** @jsx MiniFramework.createElement */

function addEntry(task) {
  localStorage.setItem("state", JSON.stringify(task));
};
var existingEntries = JSON.parse(localStorage.getItem("state"));


const root = document.getElementById("root");

let task;

class TodoItem extends MiniFramework.Component {
  constructor(props) {
    super(props);
    this.logging = false;
  }

  handleEdit = task => {
    this.props.onUpdateTask(task.id, this.textInput.value);
  };

   itemKeyDown(e) {
    if (e.which === 13) {
      this.handleEdit(this.props.task);
    }
};


  editView = props => {
    if (props.task.edit) {
      return (
        <span  >
          <input
            type="text"
            style={{
              border:"none",
              fontSize: "24px",
              width: "400px",
              boxShadow:"none",
            }}
            value={props.task.title}
            ref={input => (this.textInput = input)}
            onKeyDown={(e)=>this.itemKeyDown(e)}
          />
          <i  style={{fontSize:" 24px"}}  onClick={() => this.handleEdit(this.props.task)} className="material-icons">save</i>
        </span>
      );
    }
    return props.task.title;
  };

  render() {
    let className = "";
    if (this.props.task.completed) {
      className += "completed";
    }

    let style = ""
    if (this.props.task.edit === true) {
      style = {boxShadow: "inset 0 0 10px #a6a6a6;"}
    }


    let styleDone = ""
    if (this.props.task.completed === true) {
      styleDone = {
        boxShadow: "none",
        textAlign: "center",
        width: "40px",
        height: "auto",
        position: "absolute",
        top: "0",
        bottom: "0",
        margin: "auto 0",
        border: "none", 
        appearance: "none",
        backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E')",
        backgroundRepeat: "no-repeat",
	      backgroundPosition: "center left",
      }
      
    }else{
      styleDone = {
        boxShadow: "none",
        outline: "none",
        textAlign: "center",
        width: "40px",
        height: "auto",
        position: "absolute",
        top: "0",
        bottom: "0",
        margin: "auto 0",
        border: "none", 
        appearance: "none",
        backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')",
        backgroundRepeat: "no-repeat",
	      backgroundPosition: "center left",
      }

    };





    return (
      <li
        key={this.props.key}
        className={className}
      >
        <div className="view">
          <input style={styleDone}  type="checkbox" onClick={() => this.props.onToggleComplete(this.props.task)} />
          <label style={style} onDblClick={() => this.props.onToggleEdit(this.props.task)} >{this.editView(this.props)}</label>
          <button className="destroy" onClick={() => this.props.onDelete(this.props.task)}></button>
        </div>

        
    
      </li>
    );
  }
}






class TodoApp extends MiniFramework.Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.onToggleEdit = this.onToggleEdit.bind(this);
    this.onUpdateTask = this.onUpdateTask.bind(this);
    this.onToggleComplete = this.onToggleComplete.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.completeAll = this.completeAll.bind(this);
    this.deleteAllDone = this.deleteAllDone.bind(this);
    this.allDoneToggeler = this.allDoneToggeler.bind(this)


    this.state = (existingEntries === null)? {
      tasks: [],
      allDone: false,
      hashState:"",
      count: 0

    }: existingEntries;
  
    
  }
 


  onKeyDown(e) {
    if (e.which === 13) {
      this.addTodo();
    }
  }
  deleteTodo(task) {
    var tasks = this.state.tasks.filter(t => {
      return t.id != task.id;
    });
    
    this.setState({
      tasks
    });

    let num = 0;
    let counter = this.state.tasks.map(t => {
      if(t.completed === false){
        num = num +1
      }
    });

  
    this.setState({
      count: num
    });
    addEntry(this.state)
  }

  deleteAllDone() {
    var tasks = this.state.tasks.filter(t => {
      return t.completed != true;
    });
    
    this.setState({
      tasks
    });

    let num = 0;
    let counter = this.state.tasks.map(t => {
      if(t.completed === false){
        num = num +1
      }
    });

  
    this.setState({
      count: num
    });
    addEntry(this.state)
  }

  addTodo() {
    if (this.newTodo.value.trim() == "") {
      alert("You don't wanna do anything !");
      return;
    }
    let newTodo = {
      id: +new Date(),
      title: this.newTodo.value,
      edit: false,
      completed: false
    };
    this.setState({
      tasks: [...this.state.tasks, newTodo],
      count: this.state.count + 1
    });
    this.newTodo.value = "";
    this.newTodo.focus();
    addEntry(this.state)
  }

  

  onUpdateTask(taskId, newTitle) {
    var tasks = this.state.tasks.map(t => {
      return t.id !== taskId ?
        t :
        Object.assign({}, t, { title: newTitle, edit: !t.edit });
    });

    this.setState({
      tasks
    });
    addEntry(this.state)
  }

  // Uses setstate with fn argument
  onToggleEdit(task) {
    let tasks = this.state.tasks.map(t => {
      return t.id !== task.id ?
        t :
        Object.assign({}, t, { edit: !t.edit });

    });

    this.setState({
      tasks
    });
    addEntry(this.state)
  }

  onToggleComplete(task) {
    
    let tasks = this.state.tasks.map(t => {
      return t.id !== task.id ?
        t :
        Object.assign({}, t, { completed: !t.completed });
    });

    this.setState({
      tasks
    });

    let num = 0;
    let counter = this.state.tasks.map(t => {
      if(t.completed === false){
        num = num +1
      }
    });

  
    this.setState({
      count: num
    });
    addEntry(this.state)
  }

  completeAll() {
    if(this.state.allDone === false){
      let tasks = this.state.tasks.map(t => {
        return t.completed === true ?
          t :
          Object.assign({}, t, { completed: true});
      });
  
      this.setState({
        tasks
      });
      this.setState({
        allDone: true,
        count: 0
      })
    }else{
      let tasks = this.state.tasks.map(t => {
        return t.completed === false ?
          t :
          Object.assign({}, t, { completed: false});
      });
      
      this.setState({
        tasks
      });
      this.setState({
        allDone: false,
        count: tasks.length
      })
      
    }

   
    addEntry(this.state)
  }

  

  allDoneToggeler =()=>{
    this.completeAll();
    
  }



  render() {

    const router = new MiniFramework.Router({
      mode: 'hash',
      root: '/'
    });
    
    router
      .add(/completed/, () => {
        this.setState({hashState: "completed"});

       
      })
      .add(/active/, () => {
        this.setState({hashState: "active"});
        
      })
      .add('', () => {
        this.setState({hashState: ""})
      });
    
    if(this.state.hashState === "active"){
      task = this.state.tasks.map((task, index) => {
        if(task.completed === false){
          return (
            <TodoItem
              key={task.id}
              task={task}
              index={index}
              onDelete={this.deleteTodo}
              onToggleEdit={this.onToggleEdit}
              onToggleComplete={this.onToggleComplete}
              onUpdateTask={this.onUpdateTask}
            />
          );
        }
      });
    }else if(this.state.hashState === "completed"){
      task = this.state.tasks.map((task, index) => {
        if(task.completed === true){
          return (
            <TodoItem
              key={task.id}
              task={task}
              index={index}
              onDelete={this.deleteTodo}
              onToggleEdit={this.onToggleEdit}
              onToggleComplete={this.onToggleComplete}
              onUpdateTask={this.onUpdateTask}
            />
          );
        }
       
      });
    }else{
      task = this.state.tasks.map((task, index) => {
        return (
          <TodoItem
            key={task.id}
            task={task}
            index={index}
            onDelete={this.deleteTodo}
            onToggleEdit={this.onToggleEdit}
            onToggleComplete={this.onToggleComplete}
            onUpdateTask={this.onUpdateTask}
          />
        );
      });
    }
    

   

    return (
      <div>
        <h1 style={{color:"#B83F45"}}>todos</h1>
         <header className="header" >
            <input
              style={{boxShadow: "none"}}
              id="new-todo" 
              type="text"
              className="new-todo"
              onKeyDown={this.onKeyDown}
              ref={newTodo => (this.newTodo = newTodo)}
              placeholder="What needs to be done?"
              autofocus
          />
        </header>
        <section className="main">
          {this.state.tasks.length === 0 ?"" :<input  style={{boxShadow: "none"}} onClick={this.allDoneToggeler} type="checkbox" className="toggle-all" id="toggle-all"/>}
          <label for="toggle-all" style={{boxShadow: "none"}}></label>
          <ul className="todo-list">{task}</ul>
        </section>
          

        {this.state.tasks.length === 0 ? "" :
        <footer className="footer">
          <ul className="filters">
          <span class="todo-count " style={{paddingLeft:"12px"}}>{ this.state.count === 1? this.state.count + " item left"  : this.state.count + " items left" } </span>
              <li>
                  <a  href="#/" >All</a>
              </li>
              <li>
                  <a  href="#/active">Active</a>
              </li>
              <li>
                  <a href="#/completed">Completed</a>
              </li>
              <li>
                {this.state.tasks.length >this.state.count ? <button className="clear-completed"  style={{paddingRight:"12px"}} onClick={this.deleteAllDone}>Clear completed</button>: ""}
              </li>
          </ul>
         </footer>
        }
      </div>
      
      
    );
  }
}

MiniFramework.render(<TodoApp />, root);