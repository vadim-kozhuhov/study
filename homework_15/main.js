'use strict';

const ITEMS_STORAGE = 'items';

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.js--form').reset();
    const itemList = document.querySelector('.js--todos-wrapper');

    let state = getItemsFromStorage();
    renderItemsList(state);

    function clearItemList() {
        document.querySelector('.js--todos-wrapper').innerHTML = '';
    }

    function renderItemsList(items) {
        items.forEach((item) => {
            renderItem(item);
        })
    }

    function getItemsFromStorage() {
        const ITEMS_JSON = localStorage.getItem(ITEMS_STORAGE);
        if (ITEMS_JSON === null) {
            return [];
        }
        return JSON.parse(ITEMS_JSON);
    }

    function setItemsStorage(items) {
        localStorage.setItem(ITEMS_STORAGE, JSON.stringify(items))
    }

    function renderItem(item) {
        const newItem = document.createElement('li');
        const itemCheckbox = document.createElement('input');
        const delBtn = document.createElement('button');
        const itemDescription = document.createElement('span');
        itemCheckbox.addEventListener('click', function (event) {
            const item = event.target.closest('.todo-item');
            updateStatus(item);
        })
        delBtn.addEventListener('click', function (event) {
            const item = event.target.closest('.todo-item');
            deleteItem(item);
        })
        itemDescription.classList.add('todo-item__description');
        delBtn.classList.add('todo-item__delete');
        itemCheckbox.type = 'checkbox';
        itemCheckbox.checked = item.status;
        delBtn.textContent = 'Delete';
        itemDescription.textContent = `${item.description}`;
        newItem.appendChild(itemCheckbox);
        newItem.appendChild(itemDescription);
        newItem.appendChild(delBtn);
        if (itemCheckbox.checked) {
            newItem.classList.add('todo-item--checked');
        }
        newItem.classList.add('todo-item');
        newItem.dataset.id = `${item.id}`;
        itemList.appendChild(newItem);
    }

    function updateStatus(itemElement) {
        const elementId = itemElement.dataset.id;
        const item = state.find((item) => item.id === Number(elementId));
        item.status = !item.status;
        setItemsStorage(state);
        clearItemList();
        renderItemsList(state);
    }

    function deleteItem(itemElement) {
        const elementId = itemElement.dataset.id;
        state = state.filter((item) => item.id !== Number(elementId));
        setItemsStorage(state);
        clearItemList();
        renderItemsList(state);
    }

    document.querySelector('.js--form').addEventListener('submit', function (event) {
        event.preventDefault();
        let taskDescription = document.querySelector('.js--form__input');
        if (!taskDescription.value) {
            alert('Enter task name first');
            return;
        }
        const item = {
            id: Math.floor(Math.random() * 100) + 1,
            description: taskDescription.value,
            status: false
        }
        state.push(item);
        setItemsStorage(state);
        renderItem(item);
        taskDescription.value = '';
    })

})