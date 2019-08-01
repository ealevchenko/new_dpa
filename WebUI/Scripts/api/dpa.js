
/* ----------------------------------------------------------
    AJAX функции
-------------------------------------------------------------*/
// Веруть список пользователей
function getAsyncUsers(callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/users/all',
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
// 
function getAsyncUsersOfName(user_name, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/users/user_name/'+ user_name.replace(/EUROPE\\/g, ''),
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
// Веруть список структурных подразделений
function getAsyncStructuralSubdivisions(callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/ss/all',
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
