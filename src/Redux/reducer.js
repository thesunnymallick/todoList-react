 import {createReducer} from "@reduxjs/toolkit"

   
 const intialTodoList=localStorage.getItem("todoList")!=null?JSON.parse(localStorage.getItem("todoList")):[]


  export const newReducer =createReducer(
    {
      item:intialTodoList
    },
   {
      ADD_TO_DO_LIST: (state, action)=>{
       
      
       state.item.push(action.payload);
       localStorage.setItem("todoList",JSON.stringify(state.item))
       window.scrollTo(0, document.body.scrollHeight);

      },

      DELETE_TO_DO_LIST_ITEM: (state, action)=>{
       const filterItem=state.item.filter((element)=>element.id!==action.payload)
       localStorage.setItem("todoList",JSON.stringify(filterItem));
       window.location.reload();
      },

      UPDATE_TO_DO_LIST_ITEM: (state, action)=>{
     
        console.log("ItemArray--",action.payload)

         const {todoId, upDateItem}=action.payload
        
        const TodoListItem=window.localStorage.getItem("todoList")
       
        if(TodoListItem)
        {
          const todolistArray=JSON.parse(TodoListItem);
              
          todolistArray.forEach((item, index)=>{
            if(item.id===todoId)
            {
              item.Newdescription=upDateItem.Newdescription
              item.Newstatus= upDateItem.Newstatus
              item.Newtitle=upDateItem.Newtitle
              item.NewTags=upDateItem.NewTags
              item.Timestamp=upDateItem.Timestamp
            }

          })
          localStorage.setItem("todoList",JSON.stringify(todolistArray));
          state.item=todolistArray;
          window.scrollTo(0, document.body.scrollHeight);

        }   
   

      }
   }
   )