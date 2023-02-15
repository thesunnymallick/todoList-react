import React, { useState } from 'react'
import { Table } from "antd"
import { useSelector } from 'react-redux'
import { AiOutlineDelete, AiFillEdit, AiOutlineSearch} from "react-icons/ai"
function TableData({ UpdateItem, DeleteItem}) {

    const { item } = useSelector((state) => state.ToDoList)

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const[searchText, setSearchText]=useState("");
 
       const FilterData = item.filter((value) => {
            return (
                value.Newtitle.toLowerCase().includes(searchText.toLowerCase())||
                value.Newdescription.toLowerCase().includes(searchText.toLowerCase())||
                value.NewdueDate.toLowerCase().includes(searchText.toLowerCase())||
                value.Newstatus.toLowerCase().includes(searchText.toLowerCase())
            )
        })
    


   // TABLE COLUMNS
    let columns = [
        { key: "1", title: "ID", dataIndex: "id" },

        {
            key: "2", title: "Timestamp", dataIndex: "Timestamp",
            sorter: (a, b) => a.Timestamp - b.Timestamp,

        },

        {
            key: "3",
            title: "Name",
            dataIndex: "Newtitle",
            sorter: (a, b) => a.Newtitle.length - b.Newtitle.length,

        },

        {
            key: "4",
            title: "Description",
            dataIndex: "Newdescription",
            sorter: (a, b) => a.Newdescription.length - b.Newdescription.length
        },
        {
            key: "5", title: "Due Date", dataIndex: "NewdueDate",
            sorter: (a, b) => a.NewdueDate - b.NewdueDate

        },

        {
            key: "6", title: "Tags", dataIndex: "NewTags",
            filters: [
                { text: "Reactjs", value: "Reactjs" },
                { text: "Nodejs", value: "Nodejs" },
                { text: "MongoDB", value: "MongoDB" },
                { text: "Expressjs", value: "Expressjs" },
                { text: "Css", value: "Css" },
                { text: "Html", value: "Html" },
                { text: "Javascript", value: "javascript" },
            ],

            onFilter: (value, record) => record.NewTags.includes(value)

        },

        {
            key: "7",
            title: "Status",
            dataIndex: "Newstatus",
            filters: [
                { text: "OPEN", value: "OPEN" },
                { text: "WORKING", value: "WORKING" },
                { text: "DONE", value: "DONE" },
                { text: "OVERDUE", value: "OVERDUE" },
            ],

            onFilter: (value, record) => record.Newstatus.includes(value)




        },

        {
            key: "8", title: "Delete",
            render: (record) => {
                return <AiOutlineDelete className='DeleteBtn'
                    onClick={() => DeleteItem(record)}
                />
            }
        },

        {
            key: "9", title: "Update",
            render: (record) => {
                return <AiFillEdit
                        className='UpdateBtn'
                    onClick={() => UpdateItem(record)}
                />
            }
        }
    ]

    return (

        <>
            <div className="search-bar">
             <input type="text" onChange={(e) => setSearchText(e.target.value)} placeholder="Search for employee..." />
             <AiOutlineSearch/>
            </div>
             <div className="table">
             <Table 
                className='Table-data'
                columns={columns}
                dataSource={FilterData}
                pagination={{
                current: page,
                pageSize: pageSize,
                onChange: (page, pageSize) => {
                setPage(page)
                setPageSize(pageSize);
                    }
                }}

            >
            </Table>
             </div>
        </>
    )
}

export default TableData