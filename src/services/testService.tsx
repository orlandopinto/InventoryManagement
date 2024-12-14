import { Users } from "../types/Users"
import { API } from "../utilities/Constants.d"

const testService = {
     getTodoList() {
          return Promise.resolve((
               fetch(API.URL_BASE)
                    .then(res => res.json())
                    .catch(err => {
                         console.log('error:' + err)
                    })
          ))
          
     },
     getTodo(id: string) {
          return Promise.resolve((
               fetch(API.URL_BASE + id)
                    .then(res => res.json())
                    .catch(err => {
                         console.log('error:' + err)
                    })
          ))
     },
     // addTodo(todo: Todo) {
     //      const data = {
     //           id: todo.id,
     //           title: todo.title,
     //           completed: todo.completed
     //      };

     //      const requestOptions = {
     //           method: 'POST',
     //           headers: { 'Content-type': 'application/json' },
     //           body: JSON.stringify(data)
     //      };

     //      return Promise.resolve((
     //           fetch(API.URL_BASE, requestOptions).then(response => response.json())
     //                .catch(err => {
     //                     console.log('error:' + err)
     //                })
     //      ))
     // },
     // updateTodo(todo: Users) {
     //      const data = {
     //           id: todo.id,
     //           title: todo.title,
     //           completed: todo.completed
     //      };

     //      const requestOptions = {
     //           method: 'PUT',
     //           headers: { 'Content-type': 'application/json' },
     //           body: JSON.stringify(data)
     //      };

     //      return Promise.resolve((
     //           fetch(API.URL_BASE, requestOptions).then(response => response.json())
     //                .catch(err => {
     //                     console.log('error:' + err)
     //                })
     //      ))
     // },
     deleteTodo(id: string) {
          return Promise.resolve((
               fetch(API.URL_BASE + id, { method: "DELETE" }).then(response => response.json())
                    .catch(err => {
                         console.log('error:' + err)
                    })
          ))
     }
}

export default testService;