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