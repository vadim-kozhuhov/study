"use strict";

var ITEMS_STORAGE = 'items';
$(document).ready(function () {
  var $form = $('.js--form');
  $form[0].reset();
  var $itemList = $('.js--todos-wrapper');
  var state = getItemsFromStorage();
  renderItemsList(state);
  function clearItemList() {
    $itemList.empty();
  }
  function renderItemsList(items) {
    items.forEach(function (item) {
      return renderItem(item);
    });
  }
  function getItemsFromStorage() {
    var ITEMS_JSON = localStorage.getItem(ITEMS_STORAGE);
    return ITEMS_JSON ? JSON.parse(ITEMS_JSON) : [];
  }
  function setItemsStorage(items) {
    localStorage.setItem(ITEMS_STORAGE, JSON.stringify(items));
  }
  function renderItem(item) {
    var $newItem = $('<li>').addClass('todo-item').attr('data-id', item.id);
    var $itemCheckbox = $('<input>').attr('type', 'checkbox').prop('checked', item.status);
    var $delBtn = $('<button>').addClass('todo-item__delete').text('Delete');
    var $itemDescription = $('<span>').addClass('todo-item__description').text(item.description);
    $itemCheckbox.on('click', function () {
      var $item = $(this).closest('.todo-item');
      updateStatus($item);
    });
    $delBtn.on('click', function () {
      var $item = $(this).closest('.todo-item');
      deleteItem($item);
    });
    $newItem.on('click', function () {
      var myModal = bootstrap.Modal.getOrCreateInstance('#modal');
      $('#modal').find('.task-text').text(item.description);
      myModal.show();
    });
    $newItem.append($itemCheckbox, $itemDescription, $delBtn);
    if (item.status) {
      $newItem.addClass('todo-item--checked');
    }
    $itemList.append($newItem);
  }
  function updateStatus($itemElement) {
    var elementId = $itemElement.data('id');
    var item = state.find(function (item) {
      return item.id === elementId;
    });
    item.status = !item.status;
    setItemsStorage(state);
    clearItemList();
    renderItemsList(state);
  }
  function deleteItem($itemElement) {
    var elementId = $itemElement.data('id');
    state = state.filter(function (item) {
      return item.id !== elementId;
    });
    setItemsStorage(state);
    clearItemList();
    renderItemsList(state);
  }
  $form.on('submit', function (event) {
    event.preventDefault();
    var $taskDescription = $('.js--form__input');
    if (!$taskDescription.val()) {
      alert('Enter task name first');
      return;
    }
    var item = {
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