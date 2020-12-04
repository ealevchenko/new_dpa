jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'field_way_park': 'Парк',
            'field_way_name': 'Путь',
            'field_way_count': 'Стоит',
            'field_way_capacity': 'Вмещ.',

            'field_position': '№ позиции',
            'field_num': '№ вагона',
            'field_num_valid': 'Тип нумерации',
            'field_note': 'Дислокация на АМКР',
            'field_create_wagon': 'Добавил',
            'field_change_wagon': 'Правил',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',
            'title_button_clear_wagon': 'Убрать вагоны',

            'field_': '',
        },
        'en':  //default language: English
        {
            'field_': '',
        }
    };

    //*************************************************************************************
    // ОБЪЯВЛЕНИЕ ОСНОВНЫХ ОБЪЕКТОВ ПРИЛОЖЕНИЯ
    //*************************************************************************************
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
                langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        date_curent = moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }).add('days', -1),
        ng = new DPA_NG(lang), // Создадим класс DPA_NG

    //*************************************************************************************
    // ОСНОВНАЯ ПАНЕЛЬ ВЫБОРА
    //*************************************************************************************
    pn_select = {
        report_for: $('input#report_for'),
        // Инициализация
        init: function () {
            // настроим компонент выбора времени
            pn_select.report_for = cd_initDateTimeRangePicker(pn_select.report_for, { lang: lang, time: false }, function (datetime) {
                table_balance.load(datetime, 1)
            });
            pn_select.report_for.setDateTime(moment(date_curent));
        }
    },
    // Таблица путей
    table_balance = {
        html_table: $('table#balance-ng'),
        obj: null,
        list_ng: null,                        // Список 
        init: function () {
            var groupColumn = 0;
            this.obj = this.html_table.DataTable({
                "paging": false,
                "searching": false,
                "ordering": false,
                "info": false,
                "keys": true,
                select: {
                    style: "single",
                    toggleable: false,
                },
                "autoWidth": true,
                //sScrollX: "100%",
                //scrollX: true,
                language: language_table(langs),
                jQueryUI: false,
                "createdRow": function (row, data, index) {
                    //$(row).attr('id', data.id);
                },
                "columnDefs": [
                    { "visible": false, "targets": groupColumn }
                ],
                "order": [[groupColumn, 'asc']],
                "displayLength": 25,
                "drawCallback": function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    api.column(groupColumn, { page: 'current' }).data().each(function (group, i) {
                        if (last !== group) {
                            $(rows).eq(i).before(
                                '<tr class="group"><td colspan="3">' + group + '</td></tr>'
                            );

                            last = group;
                        }
                    });
                },
                columns: [
                    {
                        data: function (row, type, val, meta) {
                            return row.first===1 ? 'На входе':'Потребители';
                        },
                        title: '', width: "100px", orderable: false, searchable: false
                    },
                    {
                        data: function (row, type, val, meta) {
                            return row.metering_units_name;
                        },
                        title: 'Учетный узел', width: "250px", orderable: false, searchable: false
                    },
                    {
                        data: function (row, type, val, meta) {
                            return row.value;

                        },
                        title: 'Значение', width: "30px", orderable: false, searchable: false
                    },
                    {
                        data: function (row, type, val, meta) {
                            return '';

                        },
                        title: 'Производство', width: "200px", orderable: false, searchable: false
                    },
                ],
            });
        },

        load: function (date, root) {
            //var date = get_datetime_value(pn_select.report_for.val(), lang);
            ////toISOStringTZ()
            ng.getViewBalanceNG3(toISOStringTZ(date), root, function (data) {
                table_balance.view(data);
            });
        },
        // Показать таблицу с данными
        view: function (data) {
            table_balance.list_ng = data;
            table_balance.obj.clear();
            if (table_balance.list_ng && table_balance.list_ng.length > 0) {
                table_balance.obj.rows.add(table_balance.list_ng.sort(function (a, b) { return a.id_metering_units - b.id_metering_units; }));
            } else {

            };
            table_balance.obj.draw();
            LockScreenOff();
        },
        // Сбрость данные таблицы
        clear: function () {
            table_balance.view(null);
        }
    };


    pn_select.init();
    table_balance.init();
    //var f = moment(date_curent).format('DD.MM.YYYY');
    //pn_select.report_for.setDateTime(moment(date_curent).format('DD.MM.YYYY'));
    //var list = ng.getViewBalanceNG3(toISOStringTZ(date_curent._d), 1);
    // Инициализация окна править группу ограничений
    LockScreenOff();
});