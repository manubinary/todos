import React, {useEffect, useState} from 'react';
import './Home.scss';
import {Row, Col} from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import { connect , useDispatch } from "react-redux";
import { retrieveTodos, retrieveTodo, updateTodo, createTodo } from "../actions/action";


function Home(props) {
  const [details, setDetails] = useState([]);
  const [notification, setNotification] = useState('');
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [createTodoFlag, setCreateTodoFlag] = useState(false);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  });

  useEffect(() => {
    dispatch(retrieveTodos());
  }, []);

  const editContact = (id) => {
    dispatch(retrieveTodo(id));
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const submitData = (id) => {
    setOpen(false);
    const result = details;
    result['id'] = id;
    dispatch(updateTodo(id, result)).then(response => {
        !response.error
          ? setNotification("Updated")
          : setNotification("Updated Failed");
      });
  };

 const createNewTodo = () => {
   setCreateTodoFlag(false);
   const result =  details;
   result['userId'] = 5;
   dispatch(createTodo(result)).then(response => {
       !response
         ? setNotification("Created")
         : setNotification("Not Created");
     });
 };

  const getContactList = () => {
    return (
      <React.Fragment>
        <Row className="headerContainer">
          <Col md={2} sm={2} lg={2} xl={2}>Id</Col>
          <Col md={2} sm={2} lg={2} xl={2}>User Id</Col>
          <Col md={5} sm={5} lg={5} xl={5}>Title</Col>
          <Col md={2} sm={2} lg={2} xl={2}>Status</Col>
          <Col md={1} sm={1} lg={1} xl={1}></Col>
        </Row>
        {props.todos && props.todos.map((item, key) => (
          (key >= paginationIndex && key < paginationIndex + 15) ?
            <Row className="dataContainer">
              <Col md={2} sm={2} lg={2} xl={2}>{item.id}</Col>
              <Col md={2} sm={2} lg={2} xl={2}>{item.userId}</Col>
              <Col md={5} sm={5} lg={5} xl={5}>{item.title}</Col>
              <Col md={2} sm={2} lg={2} xl={2}>{item.completed ? 'Completed' : 'Not Completed'}</Col>
              <Col md={1} sm={1} lg={1} xl={1} className="editIconContainer"><EditIcon onClick={() => editContact(item.id)} className='iconStyle editIcon'/></Col>
            </Row> : ''
        ))}
      </React.Fragment>
    );
  };

  const updateValues = (value, key) => {
    const result = createTodoFlag ? {} : props.selectedTodo;
    result[key] = value;
    setDetails(result);
  };

  const getModalContent = () => {
    return (<div className="modalContainer" key={props.selectedTodo.id}>
        <Row>
          <Col md={6} className="editHeaderContainer">Update TODO</Col>
          <Col md={6}><CloseIcon onClick={() => closeModal()} className='iconStyle closeIcon'/></Col>
          <Col md={4}>Title</Col><Col md={5}><input type="text" name="email" defaultValue={props.selectedTodo.title} onChange={(e) => updateValues(e.target.value, 'title')}/></Col>
          <Col md={4}>Status</Col><Col md={5}><input type="text" name="contact" defaultValue={props.selectedTodo.completed} onChange={(e) => updateValues(e.target.value, 'completed')}/></Col>
          <Col md={12} className="submitContainer"><Button variant="contained" color="primary" onClick={() => { submitData(props.selectedTodo.id);}}> Submit </Button> </Col>
        </Row>
      </div>);
  };

  const getCreateModalContent = () => {
    return (<div className="modalContainer">
        <Row>
          <Col md={6} className="editHeaderContainer">Add TODO</Col>
          <Col md={6}><CloseIcon onClick={() => setCreateTodoFlag(false)} className='iconStyle closeIcon'/></Col>
          <Col md={4}>Title</Col><Col md={5}><input type="text" name="email" onChange={(e) => updateValues(e.target.value, 'title')}/></Col>
          <Col md={4}>Status</Col><Col md={5}><input type="text" name="contact" onChange={(e) => updateValues(e.target.value, 'completed')}/></Col>
          <Col md={12} className="submitContainer"><Button variant="contained" color="primary" onClick={() => { createNewTodo();}}> Submit </Button> </Col>
        </Row>
      </div>);
  };

  const getDetails = () => {
    return (
      <Dialog
        open={open}
        onClose={()=> {setOpen(false); setDetails([]);}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="detailsModal">
          <DialogContentText id="alert-dialog-description">
            {(!createTodoFlag && props.selectedTodo) &&  getModalContent()}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };

  const getCreateTodo = () => {
    return (
      <Dialog
        open={createTodo}
        onClose={()=> {setCreateTodoFlag(false); }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="detailsModal">
          <DialogContentText id="alert-dialog-description">
            {getCreateModalContent()}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };

  return(
    <div className="mainHome">
    {console.log("3333", createTodo)}
      <Row className="mainHeader">
        <Col className="header">
          <h1>Simple CURD App</h1>
        </Col>
      </Row>
        {show && <div className="notificationContainer">{notification}</div>}
      <Row className="content" >
        <div className="addIconContainer"><AddCircleIcon onClick={() => setCreateTodoFlag(!createTodoFlag)  } className='iconStyle addIcon' alt="Create"/></div>
        <Col>{props.todos &&  getContactList()}</Col>
        {(props.todos && props.todos.length > 0) &&<div> <Pagination className="paginationContainer" count={Math.ceil(props.todos.length/15)} size="small" onChange={(e, val)=> setPaginationIndex((val-1)*15)}/></div>}
      </Row>
      {open && getDetails()}
      {createTodoFlag && getCreateTodo()}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    todos: state.action[0] && state.action[0].todos,
    selectedTodo: state.action[1] && state.action[1].selectedTodo
  };
};

export default connect(mapStateToProps, { retrieveTodos, retrieveTodo, updateTodo , createTodo})(Home)
