
var Dpa = function (lang) {
    this.lang = lang;

};

Dpa.list_users = [];

Dpa.list_structural_subdivisions = [];

Dpa.prototype.load = function (list, lockOff, callback) {
    var count = list.length;
    var obj = this;
    $.each(list, function (i, el) {
        if (el === 'user') {
            Dpa.prototype.getAsyncUsers(function (result_users) {
                obj.list_users = result_users;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
                        callback();
                    }
                }
            });
        };
        if (el === 'ss') {
            Dpa.prototype.getAsyncStructuralSubdivisions(function (result_structural_subdivisions) {
                obj.list_structural_subdivisions = result_structural_subdivisions;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        if (lockOff) { LockScreenOff(); }
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
функции для работы с объектами
-------------------------------------------------------------*/
Dpa.prototype.getValueObj = function (obj, name) {
    return obj ? obj[name] : null;
};
//
Dpa.prototype.getValueCultureObj = function (obj, name) {
    return obj ? obj[name + '_' + this.lang] : null;
};
/* ----------------------------------------------------------
Функции
-------------------------------------------------------------*/
//======= Users ======================================
Dpa.prototype.getSNPofIDUsers = function (id_user) {
    var user = getObjOflist(this.list_users, 'id', id_user);
    if (user) return user.surname + ' ' + user.name + ' ' + user.patronymic;
};
// Получить пользователя по ID
Dpa.prototype.getUsersOfID = function (id_user) {
    return getObjOflist(this.list_users, 'id', id_user);
};
// Фамилия пользователя
Dpa.prototype.getSurnameUsers = function (user) {
    if (user) return user.surname;
    return null;
};
// Имя пользователя
Dpa.prototype.getNameUsers = function (user) {
    if (user) return user.name;
    return null;
};
// Отчество пользователя
Dpa.prototype.getPatronymicUsers = function (user) {
    if (user) return user.patronymic;
    return null;
};
// email пользователя
Dpa.prototype.getEmailUsers = function (user) {
    if (user) return user.email;
    return null;
};
//======= StructuralSubdivisions ======================================
//
Dpa.prototype.getStructuralSubdivisions_Internal_Of_ID = function (id) {
    if (this.list_structural_subdivisions) {
        var obj = getObjects(this.list_structural_subdivisions, 'id', id);
        return obj && obj.length > 0 ? obj[0] : null;
    }
};
//
Dpa.prototype.getValue_StructuralSubdivisions_Of_ID = function (id, name) {
    var obj = this.getStructuralSubdivisions_Internal_Of_ID(id);
    return obj ? obj[name] : null;
};
//
Dpa.prototype.getValueCulture_StructuralSubdivisions_Of_ID = function (id, name) {
    var obj = this.getStructuralSubdivisions_Internal_Of_ID(id);
    return obj ? obj[name + '_' + this.lang] : null;
};
//
Dpa.prototype.getListStructuralSubdivisions = function (fvalue, ftext, lang) {
    var list = [];
    if (this.list_structural_subdivisions) {
        for (i = 0, j = this.list_structural_subdivisions.length; i < j; i++) {
            var l = this.list_structural_subdivisions[i];
            if (lang) {
                list.push({ value: l[fvalue], text: l[ftext + '_' + lang] });
            } else {
                list.push({ value: l[fvalue], text: l[ftext] });
            }

        }
    }
    return list;
};

Dpa.prototype.getStructuralSubdivisions_Internal_Of_Type = function (id, type) {
    if (this.list_structural_subdivisions) {
        var obj = getObjects(this.list_structural_subdivisions, 'id', id);
        if (obj && obj.length > 0) {
            var res = obj[0];
            if (res.type > type) {
                return this.getStructuralSubdivisions_Internal_Of_Type(res.parent_id, type);
            } else {
                return res;
            }
        } else {
            return null;
        }
    }
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



