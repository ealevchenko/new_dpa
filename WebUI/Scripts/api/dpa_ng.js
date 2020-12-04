var DPA_NG = function (lang) {
    this.lang = lang;
};

DPA_NG.prototype.getViewBalanceNG3 = function (datetime,root, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/reporting/ng/balance/n3/date/' + datetime.substring(0, 19) + '/root/' + root,
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
            OnAJAXMetodError("DPA_NG.getViewBalanceNG3", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};