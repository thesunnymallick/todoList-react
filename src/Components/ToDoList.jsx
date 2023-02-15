import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import TableData from './TableData';
import { Modal, Select } from "antd"

function ToDoList() {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [status, setStatus] = useState("OPEN");
    const [todoId, setTodoId] = useState("");
    const [isUpated, setUpdate] = useState(false)

    const OPTIONS = ['Nodejs', 'Recatjs', 'MongoDB', 'Html'];
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

    // ADD TO DO LIST
    const SubmitHandel = (e) => {
        e.preventDefault();
        let date = new Date().toLocaleDateString();
        let id = parseInt(Math.random() * 1000);
        let newDodoItem = {
            id: id,
            Timestamp: date,
            Newtitle: title,
            Newdescription: description,
            NewdueDate: dueDate,
            NewTags: selectedItems,
            Newstatus: status
        }
        dispatch({
            type: "ADD_TO_DO_LIST",
            payload: newDodoItem
        })
        setTitle('');
        setStatus('');
        setDescription('');
        dueDate('');
        selectedItems('')
    }

    // UPDATE TO DO ITEMS
    const UpdateItem = (element) => {
        window.scrollTo(0, 0);
        setTodoId(element.id)
        setUpdate(true);
        setTitle(element.Newtitle)
        setStatus(element.Newstatus);
        setDescription(element.Newdescription);
        setDueDate(element.NewdueDate);
        setSelectedItems(element.NewTags)
    }
    const UpdateHandel = (e) => {
        e.preventDefault();
        let date = new Date().toLocaleDateString();
        let upDateItem = {
            Timestamp: date,
            Newtitle: title,
            Newdescription: description,
            NewdueDate: dueDate,
            NewTags: selectedItems,
            Newstatus: status

        }
        dispatch(
            {
                type: "UPDATE_TO_DO_LIST_ITEM",
                payload: {
                    todoId,
                    upDateItem
                }
            }
        )

        setUpdate(false);
        setTitle('');
        setStatus('');
        setDescription('');
        setDueDate("")
        setSelectedItems("")

    }

    //DELETE ITEMS
    const DeleteItem = (item) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this employee record ?',
            onOk: () => {
                dispatch({
                    type: "DELETE_TO_DO_LIST_ITEM",
                    payload: item.id,
                })
            }
        })
    }






    return (
        <div className="container">

            <div className="box">

                <div className="box-item">

                    <form action="myForm" onSubmit={isUpated ? UpdateHandel : SubmitHandel}>
                        <div>
                            <label>Title</label>
                            <input maxLength="100" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title.." required />
                        </div>

                        <div>
                            <label>Description</label>
                            <textarea maxLength="1000" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description.."></textarea>
                        </div>
                        <div>
                            <label>Due Date</label>
                            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        </div>
                       
                        <div>
                        <label>Tag</label>
                        <Select 
                                mode="tags"
                                className='special-item'
                                placeholder="Inserted are removed"
                                value={selectedItems}
                                onChange={setSelectedItems}
                                options={filteredOptions.map((item) => ({
                                    value: item,
                                    label: item,
                                }))}
                            />
                        </div>

                        <div>
                            <label>Status</label>
                            <select required value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="OPEN">OPEN</option>
                                <option value="WORKING">WORKING</option>
                                <option value="DONE">DONE</option>
                                <option value="OVERDUE">OVERDUE</option>
                            </select>
                        </div>
                        <div>
                            {
                                isUpated ? <button >Update</button> : <button>ADD</button>
                            }
                        </div>
                    </form>
                </div>

            </div>
            <TableData UpdateItem={UpdateItem} DeleteItem={DeleteItem} />
        </div>
    )
}







export default ToDoList