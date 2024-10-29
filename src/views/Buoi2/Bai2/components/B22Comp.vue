<script setup>
import { reactive, ref } from 'vue';

const todoList = reactive([
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
])

function changeStatus(selected) {
    todoList.forEach(item => {
        if (item.id === selected) {
            item.completed = !item.completed;
        }
    });
}

const todo = ref('');
function addTodoList(newToDo) {
    if(newToDo ==''){
        alert('Không được để trống !!');
        return;
    }
    const newTodo = {
        id: Math.max(...todoList.map(item => item.id)) + 1,
        title: newToDo,
        completed: false,
    };
    todoList.push(newTodo);
    todo.value = '';
}

</script>
<template>
    <div>
        <h1>Todo List</h1>
        <input v-model="todo" placeholder="Enter a new todo" />
        <input type="button" value="Add Todo" @click="addTodoList(todo)">
        <table class="product-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Task</th>
                    <th>Is Completed</th>
                    <th>Done</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in todoList" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.completed ? 'Hoàn thành' : 'Chưa hoàn thành' }}</td>
                    <td><button @click="changeStatus(item.id)">Check</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
.product-table {
    width: 80%;
    border-collapse: collapse;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.product-table th,
.product-table td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
}

.product-table th {
    background-color: #4CAF50;
    color: white;
}

.product-table td img {
    width: 50px;
    height: auto;
}

.product-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.product-table tr:hover {
    background-color: #f1f1f1;
}

.product-table .hot {
    color: red;
    font-weight: bold;
}
</style>