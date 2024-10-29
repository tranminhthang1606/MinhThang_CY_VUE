<script setup>
import { reactive, ref, computed, watch } from 'vue';

const formatDate = (date) => {
    const today = new Date(date);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayOfWeek = days[today.getDay()];
    const day = today.getDate();
    const month = months[today.getMonth()];
    return dayOfWeek + ', ' + day + ' ' + month;
}


const todoList = reactive([
    {
        id: 1,
        title: 'Task 1',
        published: new Date(),
        expiredDate: new Date(),
        completed: false
    },
    {
        id: 2,
        title: 'Task 2',
        published: new Date(),
        expiredDate: new Date(),
        completed: true
    },
    {
        id: 3,
        title: 'Task 3',
        published: new Date(),
        expiredDate: new Date(),
        completed: false
    },
])

function changeStatus(selected) {
    console.log(selected);

    todoList.forEach(item => {
        if (item.id === selected) {
            item.completed = !item.completed;
        }
    });
}


function toggleFlag() {
    addNewFlag.value = !addNewFlag.value;
}


const todo = ref('');
const expiredDate = ref('');
let addNewFlag = ref(false);
function handleAddTodo(newToDo, expiredDate) {
    if (newToDo == '') {
        alert('Không được để trống !!');
        return;
    }

    if (!expiredDate) {
        alert('Hãy chọn ngày')
        return;
    }
    expiredDate = new Date(expiredDate);
    expiredDate = expiredDate.getTime();
    const newTodo = {
        id: Math.max(...todoList.map(item => item.id)) + 1,
        title: newToDo,
        published: Date.now(),
        expiredDate: expiredDate,
        completed: false,
    };
    todoList.push(newTodo);
    todo.value = '';
    addNewFlag.value = false;
}

const successJob = computed(() => {
    return todoList.filter(item => (item.completed == true && item.expiredDate - item.published >= 0))
})

const notDoneJob = computed(() => {
    return todoList.filter(item => (item.completed == false && item.expiredDate - item.published >= 0))
})

const errorJob = computed(() => {
    return todoList.filter(item => (item.expiredDate - item.published < 0))
})

const currentList = ref('');
let today = ref(new Date().getDay())
watch(() => today, () => {
    todoList.forEach(item => {
        if (item.completed == false && item.expiredDate - today.value < 0) {
            item.completed = true;
        }
    });
})
</script>
<template>
    <div class="task-container">

        <div class="tab-menu">
            <span class="tab active">Today's Task</span>
        </div>


        <div class="task-header">
            <div>
                <h2>Today's Task</h2>
                <p>{{ formatDate(Date.now()) }}</p>
            </div>
            <button @click="toggleFlag()" class="new-task-button">+ New Task</button>
        </div>
        <div v-show="addNewFlag" class="task-insert">
            <form @submit.prevent="handleAddTodo(todo, expiredDate)">
                <label for="todo">Todo</label>
                <br>
                <input type="text" id="todo" v-model="todo">
                <label for="date">Deadline</label>
                <input type="date" id="date" v-model="expiredDate">
                <input type="submit" value="Thêm Todo">
            </form>
        </div>


        <div class="filter-options">
            <span @click="currentList = ''" class="filter active">All <span class="count">{{
                todoList.length }}</span></span>
            <span @click="currentList = 'not_done'" class="filter">Chưa hoàn thành <span class="count">{{
                    notDoneJob.length }}</span></span>
            <span @click="currentList = 'success'" class="filter">Hoàn thành <span class="count">{{ successJob.length
                    }}</span></span>
            <span @click="currentList = 'error'" class="filter">Job lỗi <span class="count">{{ errorJob.length
                    }}</span></span>
        </div>

        <div v-if="currentList == ''" class="task-list">
            <div v-for="item in todoList" class="task-item" :key="item.id">
                <div>
                    <h3>{{ item.title }}</h3>
                    <span class="time">Start: {{ formatDate(item.published) }}</span>
                    <br>
                    <span class="time">End: {{ formatDate(item.expiredDate) }}</span>
                </div>
                <div @click="() => changeStatus(item.id)" class="task-info">
                    <span v-show="item.completed == true" class="status_success">&#10003;</span>
                    <span v-show="item.completed == false" class="status_error">&#10007;</span>
                </div>
            </div>
        </div>

        <div v-if="currentList == 'not_done'" class="task-list">
            <div v-for="item in notDoneJob" class="task-item" :key="item.id">
                <div>
                    <h3>{{ item.title }}</h3>
                    <span class="time">Start: {{ formatDate(item.published) }}</span>
                    <br>
                    <span class="time">End: {{ formatDate(item.expiredDate) }}</span>
                </div>
                <div @click="() => changeStatus(item.id)" class="task-info">
                    <span v-show="item.completed == true" class="status_success">&#10003;</span>
                    <span v-show="item.completed == false" class="status_error">&#10007;</span>
                </div>
            </div>
        </div>

        <div v-if="currentList == 'success'" class="task-list">
            <div v-for="item in successJob" class="task-item" :key="item.id">
                <div>
                    <h3>{{ item.title }}</h3>
                    <span class="time">Start: {{ formatDate(item.published) }}</span>
                    <br>
                    <span class="time">End: {{ formatDate(item.expiredDate) }}</span>
                </div>
                <div @click="() => changeStatus(item.id)" class="task-info">
                    <span v-show="item.completed == true" class="status_success">&#10003;</span>
                    <span v-show="item.completed == false" class="status_error">&#10007;</span>
                </div>
            </div>
        </div>

        <div v-if="currentList == 'error'" class="task-list">
            <div v-for="item in errorJob" class="task-item" :key="item.id">
                <div>
                    <h3>{{ item.title }}</h3>
                    <span class="time">Start: {{ formatDate(item.published) }}</span>
                    <br>
                    <span class="time">End: {{ formatDate(item.expiredDate) }}</span>
                </div>
                <div @click="() => changeStatus(item.id)" class="task-info">
                    <span v-show="item.completed == true" class="status_success">&#10003;</span>
                    <span v-show="item.completed == false" class="status_error">&#10007;</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.task-container {
    width: 360px;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tab-menu {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    color: #7a7a7a;
    margin-bottom: 16px;
}

.tab {
    padding: 8px 16px;
    cursor: pointer;
}

.tab.active {
    color: #000;
    font-weight: bold;
    border-bottom: 2px solid #000;
}

.task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.task-insert input {
    width: 80%;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;
}

.task-header h2 {
    font-size: 20px;
    font-weight: bold;
}

.task-header p {
    font-size: 14px;
    color: #7a7a7a;
}

.new-task-button {
    padding: 8px 16px;
    background-color: #e6f0ff;
    color: #0066ff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
}

.filter-options {
    display: flex;
    justify-content: space-between;
    margin: 8px 0 16px;
    color: #7a7a7a;
}

.filter {
    font-size: 14px;
    cursor: pointer;
}

.filter.active {
    color: #0066ff;
    font-weight: bold;
}

.filter .count {
    background-color: #e6f0ff;
    color: #0066ff;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 12px;
    margin-left: 4px;
}

.task-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #f8f9fc;
    border-radius: 12px;
}

.task-item h3 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
}

.task-item p {
    font-size: 14px;
    color: #7a7a7a;
    margin-bottom: 4px;
}

.task-item .time {
    font-size: 12px;
    color: #a1a1a1;
}

.task-info {
    display: flex;
    align-items: center;
}

.avatars {
    display: flex;
    align-items: center;
    margin-right: 8px;
}

.avatars img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: -8px;
    border: 2px solid #ffffff;
}

.more {
    font-size: 12px;
    color: #7a7a7a;
}

.status_success {
    color: green;
    font-size: 16px;
}

.status_error {
    color: red;
    font-size: 16px;
}

input[type="submit"] {
    cursor: pointer;
    background: transparent;
}
</style>