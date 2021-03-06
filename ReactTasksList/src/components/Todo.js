import React from 'react';

export default class Todo extends React.Component {
  constructor(){
    super();

    this.state = {
      isEditing: false
    }
  }

  onSaveClick(event){
    event.preventDefault();
    this.props.saveTodo(this.props.index, this.refs.edtiInput.value);
    this.setState({
      isEditing: false
    });
  }

  onEditClick(){
    this.setState({
      isEditing: true
    });
  }

  onCancelClick(){
    this.setState({
      isEditing: false
    });
  }

  completeTodo(){
    this.props.isCompleted = !this.props.isCompleted;
    console.log(this.props.isCompleted);
  }

  render() {
    return (
      <tr>
        {this.renderTask()}
        {this.renderActions()}
      </tr>
    );
  }

  renderTask() {
    const { task, isCompleted, index } = this.props;

    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={task} ref="edtiInput" />
          </form>
        </td>
      );
    }

    const todoStyle = {
      color: isCompleted ? "green" : "red",
      cursor: 'pointer'
    }

    return (
      <td onClick={this.props.toggleTodo.bind(this, index)} style={todoStyle}>
        {task}
      </td>
    );
  }

  renderActions() {
    const { index } = this.props;

    if (this.state.isEditing) {
      return (
        <td>
          <button onClick={this.onSaveClick.bind(this)}>Salvar</button>
          <button onClick={this.onCancelClick.bind(this)}>Cancelar</button>
        </td>
      );
    }

    return (
      <td>
        <button onClick={this.onEditClick.bind(this)}>Editar</button>
        <button onClick={this.props.deleteTodo.bind(this, index)}>Remover</button>
      </td>
    );
  }
}
