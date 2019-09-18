
var Project = function (lang) {
    this.lang = lang;
    this.dpa_obj = new Dpa(lang);
};

Project.list_type_project = [];
Project.list_work_performers = [];// Подрядная организация
Project.list_project = [];


Project.prototype.load = function (list, callback) {
    var count = list.length + 1;
    var obj = this;
    this.dpa_obj.load(['ss'], function () {
        count -= 1;
        if (count <= 0) {
            if (typeof callback === 'function') {
                LockScreenOff();
                callback();
            }
        }
    });
    $.each(list, function (i, el) {
        if (el === 'type') {
            Project.prototype.getAsyncTypeProject(function (result_type_project) {
                obj.list_type_project = result_type_project;
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        };
        if (el === 'wp') {
            Project.prototype.getAsyncWorkPerformers(function (result_work_performers) {
                obj.list_work_performers = result_work_performers;
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
}
/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= ListProjects ======================================
// Веруть список проектов
Project.prototype.getAsyncListProjects = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/project/lp/all',
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
// Веруть проект по ID
Project.prototype.getAsyncListProjectsOfID = function (id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/project/lp/id/' + id,
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
// Веруть список проектов по указаному перечнь id-менеджеров
Project.prototype.getAsyncListProjectsOfListIDPM = function (list_id, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/project/lp/pm/list_id/' + list_id,
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
//Обновить проект
Project.prototype.putAsyncListProjects = function (project, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/project/lp/' + project.id,
        data: JSON.stringify(project),
        contentType: "application/json;charset=utf-8",
        async: true,
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
// Удалить проект по id
Project.prototype.deleteAsyncListProjects = function (id, callback) {
    $.ajax({
        url: '../../api/project/lp/' + id,
        type: 'DELETE',
        contentType: "application/json;charset=utf-8",
        async: true,
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
//Добавить проект
Project.prototype.postAsyncListProjects = function (project, callback) {
    $.ajax({
        url: '../../api/project/lp/',
        type: 'POST',
        data: JSON.stringify(project),
        contentType: "application/json;charset=utf-8",
        async: true,
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            LockScreenOff();
            OnAJAXError(x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};


//======= ProjectManager ======================================
// Веруть список менеджеров проектов
Project.prototype.getAsyncProjectManager = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/project/pm/all',
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
// Веруть менеджера проекта по id пользователя
Project.prototype.getAsyncProjectManagerOfIDUser = function (id_user, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/project/pm/user/id/' + id_user,
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
// Веруть цепочку всех менеджеров проекта по id главного менеджера проекта
Project.prototype.getAsyncChainProjectManagerOfIDPM = function (id_pm, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/project/pm/chain_manager/id/' + id_pm,
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
//======= TypeProject ======================================
// Веруть список типов проекта
Project.prototype.getAsyncTypeProject = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/project/tp/all',
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
//======= WorkPerformers ======================================
// Веруть список подрядных организаций
Project.prototype.getAsyncWorkPerformers = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/project/wp/all',
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
       функции получения 
    -------------------------------------------------------------*/
    // Получить тип проекта
Project.prototype.getTypeProjectOfProject = function (project) {
    if (project && project.TypeProject) {
        return this.lang === 'ru' ? project.TypeProject.type_project_ru : project.TypeProject.type_project_en;
    } else return null;
};
    // Получить тип проекта
Project.prototype.getTypeProject = function (tp) {
    if (tp) {
        return this.lang === 'ru' ? tp.type_project_ru : tp.type_project_en;
    } else return null;
};
//
Project.prototype.getNameProject = function (project) {
    if (project) {
        return this.lang === 'ru' ? project.name_project_ru : project.name_project_en;
    } else return null;

};
// Цели проекта
Project.prototype.getGoalsProject = function (project) {
    if (project) {
        return this.lang === 'ru' ? project.goals_project_ru : project.goals_project_en;
    } else return null;

};
// Вернуть структурное подразделение по ID
Project.prototype.getFullNameStructuralSubdivisionsOfID = function (id) {
    if (id) {
        var structural_subdivisions = getObjOflist(this.dpa_obj.list_structural_subdivisions, 'id', id);
        if (structural_subdivisions)
        { return this.lang === 'ru' ? structural_subdivisions.name_subdivisions_full_ru : structural_subdivisions.name_subdivisions_full_en; }
        else return null;
    } else return null;
};
//
Project.prototype.getNameStructuralSubdivisionsOfID = function (id) {
    if (id) {
        var structural_subdivisions = getObjOflist(this.dpa_obj.list_structural_subdivisions, 'id', id);
        if (structural_subdivisions)
        { return this.lang === 'ru' ? structural_subdivisions.name_subdivisions_ru : structural_subdivisions.name_subdivisions_en; }
        else return null;
    } else return null;
};
// Вернуть структурное подразделение где реализуется проект
Project.prototype.getFullNameStructuralSubdivisions = function (project) {
    if (project) {
        return this.getFullNameStructuralSubdivisionsOfID(project.id_structural_subdivisions);
    }

};
// Вернуть структурное подразделение заказчика
Project.prototype.getFullNameGustomerProject = function (project) {
    if (project) {
        return this.getFullNameStructuralSubdivisionsOfID(project.id_project_customer);
    }

};
//
Project.prototype.getNameSAPOwnerProject = function (project) {
    if (project) {
        return this.getNameStructuralSubdivisionsOfID(project.id_spp_owner);
    }

};

Project.prototype.getStartProject = function (project) {
    if (project && project.start_project) {
        return this.lang === 'ru' ?  moment(project.start_project).format('DD.MM.YYYY') :  moment(project.start_project).format('DD/MM/YYYY');
    } else return null;
};

Project.prototype.getStopProject = function (project) {
    if (project && project.stop_project_contract) {
        return this.lang === 'ru' ? moment(project.stop_project_contract).format('DD.MM.YYYY') : moment(project.stop_project_contract).format('DD/MM/YYYY');
    } else return null;
};