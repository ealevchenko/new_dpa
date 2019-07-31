
/* ----------------------------------------------------------
    AJAX функции
-------------------------------------------------------------*/
//======= ProjectManager ======================================
// Веруть список менеджеров проектов
function getAsyncProjectManager(callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/pm/all',
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError(x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
}
// Веруть менеджера проекта по id пользователя
function getAsyncProjectManagerOfIDUser(id_user, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/pm/user/id/' + id_user,
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError(x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
}
// Веруть цепочку всех менеджеров проекта по id главного менеджера проекта
function getAsyncChainProjectManagerOfIDPM(id_pm, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/pm/chain_manager/id/' + id_pm,
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError(x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
}
//======= ListProjects ======================================
// Веруть список проектов
function getAsyncListProjects(callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/lp/all',
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError(x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
}
// Веруть список проектов по указаному перечнь id-менеджеров
function getAsyncListProjectsOfListIDPM(list_id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/lp/pm/list_id/' + list_id,
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError(x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
}
