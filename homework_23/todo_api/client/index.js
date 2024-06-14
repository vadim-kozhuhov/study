'use strict';

document.addEventListener('DOMContentLoaded', async function () {
    document.querySelector('.js--form').addEventListener('submit', function (e) {
        e.preventDefault();
    });
    const getResponse = async () => {
        return fetch('http://localhost:5001/todos', {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
    }
    const response = await getResponse();
    let state = await response.json();
    state = state.map((item) => {
        item.checked = item.checked !== "false";
        return item;
    })

    document.querySelector('.js--form').reset();
    const itemList = document.querySelector('.js--todos-wrapper');

    renderItemsList(state);

    function clearItemList() {
        document.querySelector('.js--todos-wrapper').innerHTML = '';
    }

    function renderItemsList(state) {
        state.forEach((item) => {
            renderItem(item);
        })
    }

    const getItemsFromStorage = async () => {
        return fetch('http://localhost:5001/todos', {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
    }

    function renderItem(item) {
        const newItem = document.createElement('li');
        const itemCheckbox = document.createElement('input');
        const delBtn = document.createElement('button');
        const itemDescription = document.createElement('span');
        itemCheckbox.addEventListener('click', function (event) {
            updateStatus(item);
        })
        delBtn.addEventListener('click', function (event) {
            deleteItem(item);
        })
        itemDescription.classList.add('todo-item__description');
        delBtn.classList.add('todo-item__delete');
        itemCheckbox.type = 'checkbox';
        itemCheckbox.checked = item.checked;
        delBtn.textContent = 'Delete';
        itemDescription.textContent = `${item.text}`;
        newItem.appendChild(itemCheckbox);
        newItem.appendChild(itemDescription);
        newItem.appendChild(delBtn);

        if (itemCheckbox.checked) {
            newItem.classList.add('todo-item--checked');
        }
        newItem.classList.add('todo-item');
        itemList.appendChild(newItem);
    }

    async function updateStatus(item) {
        const elementId = item._id;
        item.checked = !item.checked;
        await putResponse(item);
        clearItemList();
        renderItemsList(state);
    }

    const putResponse = async (item) => {
        const body = Object.assign({}, item);
        body.checked = item.checked.toString();
        return fetch(`http://localhost:5001/todos/${item._id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
    }

    async function deleteItem(item) {
        const elementId = item._id;
        state = state.filter((item) => item._id !== elementId);
        await deleteResponse(item);
        clearItemList();
        renderItemsList(state);
    }

    const deleteResponse = async (item) => {
        return fetch(`http://localhost:5001/todos/${item._id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
        })
    }

    document.querySelector('.js--form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const description = document.querySelector('#description').value;
        const postResponse = async () => {
            return fetch('http://localhost:5001/todos', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    text: description,
                    checked: "false",
                })
            })
        }
        const response = await postResponse();
        const item = await response.json();
        item.checked = item.checked !== "false";
        let taskDescription = document.querySelector('.js--form__input');
        if (!taskDescription.value) {
            alert('Enter task name first');
            return;
        }
        state.push(item);
        renderItem(item);
        taskDescription.value = '';
    })

})



