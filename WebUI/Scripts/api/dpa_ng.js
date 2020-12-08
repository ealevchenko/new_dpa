var DPA_NG = function (lang) {
    this.lang = lang;
};

DPA_NG.prototype.getViewDailyIntakeNG = function (datetime, root, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/reporting/ng/daily_intake/date/' + datetime.substring(0, 19) + '/root/' + root,
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
            OnAJAXMetodError("DPA_NG.getViewDailyIntakeNG", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Показать расходы за сутки
DPA_NG.prototype.getDailyIntakeOfDate = function (date, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/reporting/ng/daily_intake/date/' + date.substring(0, 19),
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
            OnAJAXMetodError("DPA_NG.getDailyIntakeOfDate", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Показать расходы за сутки
DPA_NG.prototype.getCreateDailyIntakeOfDate = function (date, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/reporting/ng/create/daily_intake/date/' + date.substring(0, 19),
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
            OnAJAXMetodError("DPA_NG.getCreateDailyIntakeOfDate", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

//Править показания расхода 
DPA_NG.prototype.postListDailyIntake = function (list, callback) {
    $.ajax({
        url: '../../api/reporting/ng/daily_intake/list/',
        type: 'POST',
        data: JSON.stringify(list),
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
            OnAJAXError("IDS_RWT.postListDailyIntake", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//Править показания производства 
DPA_NG.prototype.postDailyProduction = function (list, callback) {
    $.ajax({
        url: '../../api/reporting/ng/daily_production/list/',
        type: 'POST',
        data: JSON.stringify(list),
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
            OnAJAXError("IDS_RWT.postDailyProduction", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};