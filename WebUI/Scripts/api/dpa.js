
var Dpa = function (lang) {
    this.lang = lang;

};

Dpa.list_users = [];

Dpa.list_structural_subdivisions = [];

Dpa.prototype.load = function (list, callback) {
    var count = list.length;
    var obj = this;
    $.each(list, function (i, el) {
        if (el === 'user') {
            Dpa.prototype.getAsyncUsers(function (result_users) {
                obj.list_users = result_users;
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        };
        if (el === 'ss') {
            Dpa.prototype.getAsyncStructuralSubdivisions(function (result_structural_subdivisions) {
                obj.list_structural_subdivisions = result_structural_subdivisions;
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        };
    });
};
/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= Users ======================================
Dpa.prototype.getAsyncUsers = function (callback) {
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
};

Dpa.prototype.getAsyncUsersOfName = function (user_name, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/users/user_name/' + user_name.replace(/EUROPE\\/g, '').replace(/HP_EDIK\\/g, ''),
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
};
//======= StructuralSubdivisions ======================================
Dpa.prototype.getAsyncStructuralSubdivisions = function (callback) {
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
};
/* ----------------------------------------------------------
Функции
-------------------------------------------------------------*/
//======= ListProjects ======================================
Dpa.prototype.getSNPofIDUsers = function (id_user) {
    var user = getObjOflist(this.list_users, 'id', id_user);
    if (user) return user.surname + ' ' + user.name + ' ' + user.patronymic;
};
// Получить название структурного подразделения
Dpa.prototype.getNameStructuralSubdivisions = function (ss) {
    if (ss) {
        return this.lang === 'ru' ? ss.name_subdivisions_ru : ss.name_subdivisions_en;
    } else return null;
};
// Получить полное название структурного подразделения
Dpa.prototype.getFullNameStructuralSubdivisions = function (ss) {
    if (ss) {
        return this.lang === 'ru' ? ss.name_subdivisions_full_ru : ss.name_subdivisions_full_en;
    } else return null;
};

