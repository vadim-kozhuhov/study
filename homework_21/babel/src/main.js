const ITEMS_STORAGE = 'items';

$(document).ready(function () {
    const $form = $('.js--form');
    $form[0].reset();
    const $itemList = $('.js--todos-wrapper');

    let state = getItemsFromStorage();
    renderItemsList(state);

    function clearItemList() {
        $itemList.empty();
    }

    function renderItemsList(items) {
        items.forEach(item => renderItem(item));
    }

    function getItemsFromStorage() {
        const ITEMS_JSON = localStorage.getItem(ITEMS_STORAGE);
        return ITEMS_JSON ? JSON.parse(ITEMS_JSON) : [];
    }

    function setItemsStorage(items) {
        localStorage.setItem(ITEMS_STORAGE, JSON.stringify(items));
    }

    function renderItem(item) {
        const $newItem = $('<li>').addClass('todo-item').attr('data-id', item.id);
        const $itemCheckbox = $('<input>').attr('type', 'checkbox').prop('checked', item.status);
        const $delBtn = $('<button>').addClass('todo-item__delete').text('Delete');
        const $itemDescription = $('<span>').addClass('todo-item__description').text(item.description);

        $itemCheckbox.on('click', function () {
            const $item = $(this).closest('.todo-item');
            updateStatus($item);
        });

        $delBtn.on('click', function () {
            const $item = $(this).closest('.todo-item');
            deleteItem($item);
        });
        $newItem.on('click', function () {
            const myModal = bootstrap.Modal.getOrCreateInstance('#modal');
            $('#modal').find('.task-text').text(item.description);
            myModal.show();
        })
        $newItem.append($itemCheckbox, $itemDescription, $delBtn);

        if (item.status) {
            $newItem.addClass('todo-item--checked');
        }

        $itemList.append($newItem);
    }

    function updateStatus($itemElement) {
        const elementId = $itemElement.data('id');
        const item = state.find(item => item.id === elementId);
        item.status = !item.status;
        setItemsStorage(state);
        clearItemList();
        renderItemsList(state);
    }

    function deleteItem($itemElement) {
        const elementId = $itemElement.data('id');
        state = state.filter(item => item.id !== elementId);
        setItemsStorage(state);
        clearItemList();
        renderItemsList(state);
    }

    $form.on('submit', function (event) {
        event.preventDefault();
        const $taskDescription = $('.js--form__input');
        if (!$taskDescription.val()) {
            alert('Enter task name first');
            return;
        }
        const item = {
            id: Math.floor(Math.random() * 100) + 1,
            description: $taskDescription.val(),
            status: false
        };
        state.push(item);
        setItemsStorage(state);
        renderItem(item);
        $taskDescription.val('');
    });

});