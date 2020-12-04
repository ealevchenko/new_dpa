/* ----------------------------------------------------------
    Обработчики ajax - функций
-------------------------------------------------------------*/
// Событие перед запросом
var AJAXBeforeSend = function () {
    //OnBegin();
}
// Обработка ошибок
var OnAJAXError = function (x, y, z) {
    //LockScreenOff();
    if (x.status != 404) {
        alert(x + '\n' + y + '\n' + z);
    }
    //LockScreenOff();
};
// Событие после выполнения
var AJAXComplete = function () {
    //LockScreenOff();
};

// Обработка ошибок
var OnAJAXMetodError = function (metod, x, y, z) {
    var status = "";
    var status_text = "";
    var message = "";

    if (x && x.status) {
        status = x.status;
    }
    if (x && x.statusText) {
        status_text = x.statusText;
    }
    if (x && x.responseJSON) {
        message = x.responseJSON.Message;
    }
    alert('Metod js : ' + metod + '\nStatus : ' + status + '\nStatusText : ' + status_text + '\nMessage : ' + message);
    LockScreenOff();
};