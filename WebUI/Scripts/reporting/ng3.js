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
        edit_report: $('button#edit_report').on('click',
        function (event) {
            event.preventDefault();
            pn_edit_daily_intake.Open(get_datetime_value(pn_select.report_for.val(), lang));
        }),
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
                                '<tr class="group"><td colspan="5">' + group + '</td></tr>'
                            );

                            last = group;
                        }
                    });
                },
                "footerCallback": function (row, data, start, end, display) {
                    var api = this.api(), data;

                    // Remove the formatting to get integer data for summation
                    var intVal = function (i) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '') * 1 :
                            typeof i === 'number' ?
                            i : 0;
                    };

                    // Total over all pages
                    total = api
                        .column(2)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);

                    //// Total over this page
                    //pageTotal = api
                    //    .column( 4, { page: 'current'} )
                    //    .data()
                    //    .reduce( function (a, b) {
                    //        return intVal(a) + intVal(b);
                    //    }, 0 );

                    // Update footer
                    //$( api.column( 4 ).footer() ).html(
                    //    '$'+pageTotal +' ( $'+ total +' total)'
                    //);
                },
                columns: [
                    {
                        data: function (row, type, val, meta) {
                            return row.first === 1 ? 'На входе' : 'Потребители';
                        },
                        title: '', width: "100px", orderable: false, searchable: false
                    },
                    {
                        data: function (row, type, val, meta) {
                            return row.metering_units_name;
                        },
                        title: 'Учетный узел', width: "200px", orderable: false, searchable: false, className: "metering_units_name"
                    },
                    {
                        data: function (row, type, val, meta) {
                            return row.value !== null ? row.value.toFixed(1) : null;

                        },
                        title: 'Потреб.', width: "50px", orderable: false, searchable: false, className: "value"
                    },
                    {
                        data: function (row, type, val, meta) {
                            return row.optimal_consumption !== null ? row.optimal_consumption.toFixed(1) : null;

                        },
                        title: 'Оптим. потреб.', width: "50px", orderable: false, searchable: false, className: "value"
                    },
                    {
                        data: function (row, type, val, meta) {
                            return row.production !== null ? row.production.toFixed(1) : null;

                        },
                        title: 'Произв.', width: "50px", orderable: false, searchable: false, className: "value"
                    },
                    {
                        data: function (row, type, val, meta) {
                            return row.production_unit;

                        },
                        title: 'Ед.изм.', width: "50px", orderable: false, searchable: false
                    },
                ],
            });
        },

        load: function (date, root) {
            //var date = get_datetime_value(pn_select.report_for.val(), lang);
            ////toISOStringTZ()
            LockScreen(langView('mess_delay', langs));
            if (date) {
                ng.getViewDailyIntakeNG(toISOStringTZ(date), root, function (data) {
                    table_balance.view(data);
                });
            } else {
                table_balance.clear();
            }

        },
        // Показать таблицу с данными
        view: function (data) {
            table_balance.list_ng = data;
            table_balance.obj.clear();
            if (table_balance.list_ng && table_balance.list_ng.length > 0) {
                table_balance.obj.rows.add(table_balance.list_ng.sort(function (a, b) { return a.id_metering_units - b.id_metering_units; }));
                var consumption_value = 0;
                var admission_value = 0;
                $.each(table_balance.list_ng, function (i, el) {
                    if (el.first === 0) {
                        consumption_value += el.value;
                    } else {
                        admission_value += el.value;
                    }
                });
                $('th#consumption').html(consumption_value.toFixed(1));
                $('th#imbalance').html(Number(admission_value - consumption_value).toFixed(1));
            } else {

            };
            table_balance.obj.draw();
            LockScreenOff();
        },
        // Сбрость данные таблицы
        clear: function () {
            table_balance.view(null);
        }
    },
    //*************************************************************************************
    // ОКНО ИЗМЕНИТЬ ОПЕРАТОРА ИЛИ ОГРАНИЧЕНИЯ ПО ГРУППЕ
    //*************************************************************************************
    pn_edit_daily_intake = {
        obj: null,
        alert: $('div#edit_daily_intake_alert'),                                        // Сообщения
        all_obj: null,                                                                  // массив всех элементов формы 
        val: null,                                                                      // класс валидации
        data: null,
        // Поля формы
        date_daily_intake: $('input#date_daily_intake'),
        bt_add_report: $('button#add_report').on('click',
        function (event) {
            event.preventDefault();
            ng.getCreateDailyIntakeOfDate(toISOStringTZ(get_datetime_value(pn_edit_daily_intake.date_daily_intake.val(), lang)), function (result_create) {
                pn_edit_daily_intake.Open(get_datetime_value(pn_edit_daily_intake.date_daily_intake.val(), lang));
            });
        }),
        vgs_dp9_3n: $('input#vgs_dp9_3n'),
        grp_tec_3_f: $('input#grp_tec_3_f'),
        grp_tec_3_pk_5: $('input#grp_tec_3_pk_5'),
        grp_tec_3_pk_6: $('input#grp_tec_3_pk_6'),
        grp_tec_3_pk_7: $('input#grp_tec_3_pk_7'),
        grp_tec_3_pk_8: $('input#grp_tec_3_pk_8'),

        dp_9_sw1_f: $('input#dp_9_sw1_f'),
        dp_9_sw2_f: $('input#dp_9_sw2_f'),
        dp_9_hn_f: $('input#dp_9_hn_f'),
        dp_9_f: $('input#dp_9_f'),
        dp_9_p: $('input#dp_9_p'),
        dp_9_put_f: $('input#dp_9_put_f'),
        dp_9_put_p: $('input#dp_9_put_p'),

        gr_f: $('input#gr_f'),
        ac_1_f: $('input#ac_1_f'),
        ac_1_p_am_1: $('input#ac_1_p_am_1'),
        ac_1_p_am_2: $('input#ac_1_p_am_2'),
        ac_1_p_am_3: $('input#ac_1_p_am_3'),
        ac_1_p_am_4: $('input#ac_1_p_am_4'),
        ac_1_p_am_5: $('input#ac_1_p_am_5'),
        ac_1_p_am_6: $('input#ac_1_p_am_6'),
        ac_2_f: $('input#ac_2_f'),
        ac_2_p_am_1: $('input#ac_2_p_am_1'),
        ac_2_p_am_2: $('input#ac_2_p_am_2'),
        ac_2_p_am_3: $('input#ac_2_p_am_3'),
        ac_2_p_am_4: $('input#ac_2_p_am_4'),
        ac_2_p_am_5: $('input#ac_2_p_am_5'),
        ac_2_p_am_6: $('input#ac_2_p_am_6'),

        //enable_change_limiting: $('input#enable_change_limiting'),
        //change_group_operator: $('input#change_group_operator'),
        //change_group_rent_start: $('input#change_group_rent_start'),
        //change_group_limiting: $('select#change_group_limiting'),
        // инициализвция Окна
        init: function (callback_ok) {
            pn_edit_daily_intake.date_daily_intake = cd_initDateTimeRangePicker(pn_edit_daily_intake.date_daily_intake, { lang: lang, time: false }, function (datetime) {
                pn_edit_daily_intake.Open(datetime);
            });
            // Соберем все элементы в массив
            pn_edit_daily_intake.all_obj = $([])
            //.add(pn_edit_daily_intake.change_group_operator)
            //.add(pn_edit_daily_intake.change_group_rent_start.obj)
            //.add(pn_edit_daily_intake.change_group_limiting);
            // создадим классы 
            pn_edit_daily_intake.val = new VALIDATION(lang, pn_edit_daily_intake.alert, pn_edit_daily_intake.all_obj); // Создадим класс VALIDATION
            //pn_edit_daily_intake.table_car.init();
            pn_edit_daily_intake.obj = $("div#edit_daily_intake").dialog({
                resizable: false,
                title: 'Править параметры природного газа и производства',
                modal: true,
                autoOpen: false,
                height: "auto",
                width: 600,
                classes: {
                    "ui-dialog": "card change_group_form",
                    "ui-dialog-titlebar": "card-header bg-primary text-white",
                    "ui-dialog-content": "card-body",
                    "ui-dialog-buttonpane": "card-footer text-muted"
                },
                open: function (event, ui) {

                },
                buttons: [
                    {

                        disabled: false,
                        text: "Ок",
                        class: "btn btn-outline-primary btn",
                        click: function () {
                            pn_edit_daily_intake.save(callback_ok);
                        }
                    },
                    {
                        text: "Отмена",
                        class: "btn btn-outline-primary btn",
                        click: function () {
                            $(this).dialog("close");
                        }
                    },
                ]
            });
            // Sumbit form
            pn_edit_daily_intake.obj.find("form").on("submit", function (event) {
                event.preventDefault();
            });
        },
        // открыть окно
        Open: function (date) {

            if (date) {
                pn_edit_daily_intake.date_daily_intake.setDateTime(date);
            } else {
                date = moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }).add('days', -1);
                pn_edit_daily_intake.date_daily_intake.setDateTime(date);
            }
            ng.getDailyIntakeOfDate(toISOStringTZ(date), function (data) {
                if (data && data.length > 0) {
                    pn_edit_daily_intake.data = data;

                    pn_edit_daily_intake.bt_add_report.prop('disabled', true);
                    var str_vgs_dp9_3n = data.find(function (o) { return o.id_metering_units == 1; });
                    pn_edit_daily_intake.vgs_dp9_3n.val(str_vgs_dp9_3n ? str_vgs_dp9_3n.value : 0).prop('disabled', false);
                    //------------------------------------------------------------------------------
                    //var str_grp_tec_3 = data.find(function (o) { return o.id_metering_units = 2; });
                    var str_grp_tec_3 = getObjects(data, 'id_metering_units', 2);
                    if (str_grp_tec_3 && str_grp_tec_3.length > 0) {
                        pn_edit_daily_intake.grp_tec_3_f.val(str_grp_tec_3 && str_grp_tec_3.length > 0 ? str_grp_tec_3[0].value : 0).prop('disabled', false);

                        if (str_grp_tec_3[0] && str_grp_tec_3[0].DailyProduction && str_grp_tec_3[0].DailyProduction.length > 0) {
                            var dp = str_grp_tec_3[0].DailyProduction;
                            var p_dp_1 = dp.find(function (o) { return o.id_directory_production == 2; });
                            var p_dp_2 = dp.find(function (o) { return o.id_directory_production == 3; });
                            var p_dp_3 = dp.find(function (o) { return o.id_directory_production == 4; });
                            var p_dp_4 = dp.find(function (o) { return o.id_directory_production == 5; });
                            pn_edit_daily_intake.grp_tec_3_pk_5.val(p_dp_1 ? p_dp_1.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.grp_tec_3_pk_6.val(p_dp_2 ? p_dp_2.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.grp_tec_3_pk_7.val(p_dp_3 ? p_dp_3.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.grp_tec_3_pk_8.val(p_dp_4 ? p_dp_4.value : 0).prop('disabled', false);
                        }

                    }
                    //------------------------------------------------------------------------------
                    var str_dp_9_sw1 = data.find(function (o) { return o.id_metering_units == 3; });
                    var str_dp_9_sw2 = data.find(function (o) { return o.id_metering_units == 4; });

                    pn_edit_daily_intake.dp_9_sw1_f.val(str_dp_9_sw1 ? str_dp_9_sw1.value : 0).prop('disabled', false);
                    pn_edit_daily_intake.dp_9_sw2_f.val(str_dp_9_sw2 ? str_dp_9_sw2.value : 0).prop('disabled', false);

                    var str_dp_9_hn = data.find(function (o) { return o.id_metering_units == 6; });
                    pn_edit_daily_intake.dp_9_hn_f.val(str_dp_9_hn ? str_dp_9_hn.value : 0).prop('disabled', false);

                    var str_dp_9 = getObjects(data, 'id_metering_units', 5);
                    if (str_dp_9 && str_dp_9.length > 0) {
                        pn_edit_daily_intake.dp_9_f.val(str_dp_9 && str_dp_9.length > 0 ? str_dp_9[0].value : 0).prop('disabled', false);

                        if (str_dp_9[0] && str_dp_9[0].DailyProduction && str_dp_9[0].DailyProduction.length > 0) {
                            var dp = str_dp_9[0].DailyProduction;
                            var p_dp_1 = dp.find(function (o) { return o.id_directory_production == 6; });
                            pn_edit_daily_intake.dp_9_p.val(p_dp_1 ? p_dp_1.value : 0).prop('disabled', false);
                        }
                    }
                    var str_dp_9_put = getObjects(data, 'id_metering_units', 8);
                    if (str_dp_9_put && str_dp_9_put.length > 0) {
                        pn_edit_daily_intake.dp_9_put_f.val(str_dp_9_put && str_dp_9_put.length > 0 ? str_dp_9_put[0].value : 0).prop('disabled', false);

                        if (str_dp_9_put[0] && str_dp_9_put[0].DailyProduction && str_dp_9_put[0].DailyProduction.length > 0) {
                            var dp = str_dp_9_put[0].DailyProduction;
                            var p_dp_1 = dp.find(function (o) { return o.id_directory_production == 7; });
                            pn_edit_daily_intake.dp_9_put_p.val(p_dp_1 ? p_dp_1.value : 0).prop('disabled', false);
                        }
                    }


                    //var str_dp_9 = data.find(function (o) { return o.id_metering_units = 5; });
                    //pn_edit_daily_intake.dp_9_f.val(str_dp_9 ? str_dp_9.value : 0).prop('disabled', false);
                    //pn_edit_daily_intake.dp_9_p.val('').prop('disabled', false);

                    //var str_dp_9_put = data.find(function (o) { return o.id_metering_units = 8; });
                    //pn_edit_daily_intake.dp_9_put_f.val(str_dp_9_put ? str_dp_9_put.value : 0).prop('disabled', false);
                    //pn_edit_daily_intake.dp_9_put_p.val('').prop('disabled', false);

                    var str_gr_f = data.find(function (o) { return o.id_metering_units == 11; });
                    pn_edit_daily_intake.gr_f.val(str_gr_f ? str_gr_f.value : 0).prop('disabled', false);

                    var str_ac_1 = getObjects(data, 'id_metering_units', 9);
                    if (str_ac_1 && str_ac_1.length > 0) {
                        pn_edit_daily_intake.ac_1_f.val(str_ac_1 && str_ac_1.length > 0 ? str_ac_1[0].value : 0).prop('disabled', false);

                        if (str_ac_1[0] && str_ac_1[0].DailyProduction && str_ac_1[0].DailyProduction.length > 0) {
                            var dp = str_ac_1[0].DailyProduction;
                            var p_dp_1 = dp.find(function (o) { return o.id_directory_production == 8; });
                            var p_dp_2 = dp.find(function (o) { return o.id_directory_production == 9; });
                            var p_dp_3 = dp.find(function (o) { return o.id_directory_production == 10; });
                            var p_dp_4 = dp.find(function (o) { return o.id_directory_production == 11; });
                            var p_dp_5 = dp.find(function (o) { return o.id_directory_production == 12; });
                            var p_dp_6 = dp.find(function (o) { return o.id_directory_production == 13; });

                            pn_edit_daily_intake.ac_1_p_am_1.val(p_dp_1 ? p_dp_1.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.ac_1_p_am_2.val(p_dp_2 ? p_dp_2.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.ac_1_p_am_3.val(p_dp_3 ? p_dp_3.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.ac_1_p_am_4.val(p_dp_4 ? p_dp_4.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.ac_1_p_am_5.val(p_dp_5 ? p_dp_5.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.ac_1_p_am_6.val(p_dp_6 ? p_dp_6.value : 0).prop('disabled', false);
                        }
                    }

                    var str_ac_2 = getObjects(data, 'id_metering_units', 10);
                    if (str_ac_2 && str_ac_2.length > 0) {
                        pn_edit_daily_intake.ac_2_f.val(str_ac_2 && str_ac_2.length > 0 ? str_ac_2[0].value : 0).prop('disabled', false);

                        if (str_ac_2[0] && str_ac_2[0].DailyProduction && str_ac_2[0].DailyProduction.length > 0) {
                            var dp = str_ac_2[0].DailyProduction;
                            var p_dp_1 = dp.find(function (o) { return o.id_directory_production == 14; });
                            var p_dp_2 = dp.find(function (o) { return o.id_directory_production == 15; });
                            var p_dp_3 = dp.find(function (o) { return o.id_directory_production == 16; });
                            var p_dp_4 = dp.find(function (o) { return o.id_directory_production == 17; });
                            var p_dp_5 = dp.find(function (o) { return o.id_directory_production == 18; });
                            var p_dp_6 = dp.find(function (o) { return o.id_directory_production == 19; });

                            pn_edit_daily_intake.ac_2_p_am_1.val(p_dp_1 ? p_dp_1.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.ac_2_p_am_2.val(p_dp_2 ? p_dp_2.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.ac_2_p_am_3.val(p_dp_3 ? p_dp_3.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.ac_2_p_am_4.val(p_dp_4 ? p_dp_4.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.ac_2_p_am_5.val(p_dp_5 ? p_dp_5.value : 0).prop('disabled', false);
                            pn_edit_daily_intake.ac_2_p_am_6.val(p_dp_6 ? p_dp_6.value : 0).prop('disabled', false);
                        }
                    }


                    //var str_ac_1 = data.find(function (o) { return o.id_metering_units = 9; });
                    //pn_edit_daily_intake.ac_1_f.val(str_ac_1 ? str_ac_1.value : 0).prop('disabled', false);

                    //pn_edit_daily_intake.ac_1_p_am_1.val('').prop('disabled', false);
                    //pn_edit_daily_intake.ac_1_p_am_2.val('').prop('disabled', false);
                    //pn_edit_daily_intake.ac_1_p_am_3.val('').prop('disabled', false);
                    //pn_edit_daily_intake.ac_1_p_am_4.val('').prop('disabled', false);
                    //pn_edit_daily_intake.ac_1_p_am_5.val('').prop('disabled', false);
                    //pn_edit_daily_intake.ac_1_p_am_6.val('').prop('disabled', false);

                    //var str_ac_2 = data.find(function (o) { return o.id_metering_units = 10; });
                    //pn_edit_daily_intake.ac_2_f.val(str_ac_2 ? str_ac_2.value : 0).prop('disabled', false);
                    //pn_edit_daily_intake.ac_2_p_am_1.val('').prop('disabled', false);
                    //pn_edit_daily_intake.ac_2_p_am_2.val('').prop('disabled', false);
                    //pn_edit_daily_intake.ac_2_p_am_3.val('').prop('disabled', false);
                    //pn_edit_daily_intake.ac_2_p_am_4.val('').prop('disabled', false);
                    //pn_edit_daily_intake.ac_2_p_am_5.val('').prop('disabled', false);
                    //pn_edit_daily_intake.ac_2_p_am_6.val('').prop('disabled', false);

                } else {
                    // Данных нет
                    pn_edit_daily_intake.bt_add_report.prop('disabled', false);
                    pn_edit_daily_intake.vgs_dp9_3n.val('').prop('disabled', true);
                    pn_edit_daily_intake.grp_tec_3_f.val('').prop('disabled', true);
                    pn_edit_daily_intake.grp_tec_3_pk_5.val('').prop('disabled', true);
                    pn_edit_daily_intake.grp_tec_3_pk_6.val('').prop('disabled', true);
                    pn_edit_daily_intake.grp_tec_3_pk_7.val('').prop('disabled', true);
                    pn_edit_daily_intake.grp_tec_3_pk_8.val('').prop('disabled', true);

                    pn_edit_daily_intake.dp_9_sw1_f.val('').prop('disabled', true);
                    pn_edit_daily_intake.dp_9_sw2_f.val('').prop('disabled', true);
                    pn_edit_daily_intake.dp_9_hn_f.val('').prop('disabled', true);
                    pn_edit_daily_intake.dp_9_f.val('').prop('disabled', true);
                    pn_edit_daily_intake.dp_9_p.val('').prop('disabled', true);
                    pn_edit_daily_intake.dp_9_put_f.val('').prop('disabled', true);
                    pn_edit_daily_intake.dp_9_put_p.val('').prop('disabled', true);

                    pn_edit_daily_intake.gr_f.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_1_f.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_1_p_am_1.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_1_p_am_2.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_1_p_am_3.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_1_p_am_4.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_1_p_am_5.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_1_p_am_6.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_2_f.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_2_p_am_1.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_2_p_am_2.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_2_p_am_3.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_2_p_am_4.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_2_p_am_5.val('').prop('disabled', true);
                    pn_edit_daily_intake.ac_2_p_am_6.val('').prop('disabled', true);

                }
            });
            // Сохраним и проверим список для изменения
            //pn_edit_daily_intake.list_nums = list_nums;
            //pn_search.bt_cars_search_operator.prop('disabled', true);
            //if (list_nums && list_nums.length > 0) {
            //    pn_edit_daily_intake.val.clear_all();
            //    // Сросить все элементы
            //    //pn_edit_daily_intake.change_group_operator.val("");                 // Сбросить
            //    //pn_edit_daily_intake.change_group_rent_start.setDateTime(null);     // Сбросить
            //    //pn_edit_daily_intake.change_group_limiting.val(-1)            // сбросить выбор
            //    pn_edit_daily_intake.enable_change_operator.prop('checked', false);
            //    pn_edit_daily_intake.enable_change_limiting.prop('checked', false);
            //    pn_edit_daily_intake.set_enable_change_operator(pn_edit_daily_intake.enable_change_operator.prop('checked'));
            //    pn_edit_daily_intake.set_enable_change_limiting(pn_edit_daily_intake.enable_change_limiting.prop('checked'));
            pn_edit_daily_intake.obj.dialog("open");
            //}
        },
        // Валидация оператора
        validation_operator: function (name_operator) {
            var valid = false;
            pn_edit_daily_intake.id_operation = null; // Сбросим оператора
            if (name_operator) {
                var obj = pn_edit_daily_intake.ids_dir.list_operators_wagons.find(function (o) { return o['operators_' + pn_edit_daily_intake.lang] === name_operator; });
                if (obj) {
                    pn_edit_daily_intake.id_operation = obj.id; // Определим оператора
                    pn_edit_daily_intake.val.set_control_ok(pn_edit_daily_intake.change_group_operator, "");
                    valid = true;
                } else {
                    pn_edit_daily_intake.val.set_control_error(pn_edit_daily_intake.change_group_operator, "Указаного оператора нет в справочнике ИДС");
                }
            } else {
                pn_edit_daily_intake.val.set_control_error(pn_edit_daily_intake.change_group_operator, "Не указан оператор");
            }
            return valid
        },
        // Валидация данных
        validation: function () {
            pn_edit_daily_intake.val.clear_all();
            var valid = true;

            pn_edit_daily_intake.data

            //var e_operator = pn_edit_daily_intake.enable_change_operator.prop('checked');
            //var e_limiting = pn_edit_daily_intake.enable_change_limiting.prop('checked');
            //// Проверим активные панели
            //if (e_operator || e_limiting) {
            //    if (e_operator) {
            //        valid = valid & pn_edit_daily_intake.validation_operator(pn_edit_daily_intake.change_group_operator.val());
            //        valid = valid & pn_edit_daily_intake.val.checkInputOfNull(pn_edit_daily_intake.change_group_rent_start.obj, "Укажите время начало аренды");
            //        valid = valid & pn_edit_daily_intake.val.checkInputOfDateTime(pn_edit_daily_intake.change_group_rent_start.obj, lang === 'ru' ? 'DD.MM.YYYY HH:mm:ss' : 'MM/DD/YYYY HH:mm:ss');
            //    }
            //    //if (e_limiting) {
            //    //    valid = valid & pn_edit_daily_intake.val.checkSelection(pn_edit_daily_intake.change_group_limiting, "Выберите ограничение");
            //    //}
            //} else {
            //    pn_edit_daily_intake.val.out_warning_message("Ни одно из свойств не выбрано для правки.")
            //    valid = false;
            //}
            return valid;
        },
        // Сохранить
        save: function (callback_ok) {

            var setDailyProduction = function (id_directory_production) {
                switch (id_directory_production) {
                    case 2: return get_input_number_value(pn_edit_daily_intake.grp_tec_3_pk_5);
                    case 3: return get_input_number_value(pn_edit_daily_intake.grp_tec_3_pk_6);
                    case 4: return get_input_number_value(pn_edit_daily_intake.grp_tec_3_pk_7);
                    case 5: return get_input_number_value(pn_edit_daily_intake.grp_tec_3_pk_8);
                    case 6: return get_input_number_value(pn_edit_daily_intake.dp_9_p);
                    case 7: return get_input_number_value(pn_edit_daily_intake.dp_9_put_p);
                    case 8: return get_input_number_value(pn_edit_daily_intake.ac_1_p_am_1);
                    case 9: return get_input_number_value(pn_edit_daily_intake.ac_1_p_am_2);
                    case 10: return get_input_number_value(pn_edit_daily_intake.ac_1_p_am_3);
                    case 11: return get_input_number_value(pn_edit_daily_intake.ac_1_p_am_4);
                    case 12: return get_input_number_value(pn_edit_daily_intake.ac_1_p_am_5);
                    case 13: return get_input_number_value(pn_edit_daily_intake.ac_1_p_am_6);
                    case 14: return get_input_number_value(pn_edit_daily_intake.ac_2_p_am_1);
                    case 15: return get_input_number_value(pn_edit_daily_intake.ac_2_p_am_2);
                    case 16: return get_input_number_value(pn_edit_daily_intake.ac_2_p_am_3);
                    case 17: return get_input_number_value(pn_edit_daily_intake.ac_2_p_am_4);
                    case 18: return get_input_number_value(pn_edit_daily_intake.ac_2_p_am_5);
                    case 19: return get_input_number_value(pn_edit_daily_intake.ac_2_p_am_6);
                    default: return 0;
                };
            };


            var valid = pn_edit_daily_intake.validation();
            if (valid) {
                LockScreen(langView('mess_save', langs));
                if (pn_edit_daily_intake.data && pn_edit_daily_intake.data.length > 0) {
                    var di_list = [];
                    $.each(pn_edit_daily_intake.data, function (i, el) {

                        if (el.DailyProduction && el.DailyProduction.length > 0) {
                            $.each(el.DailyProduction, function (i, el_p) {
                                var proiz = el_p;
                                proiz.value = setDailyProduction(el_p.id_directory_production);
                                di_list.push(proiz);
                            });
                        }

                        switch (el.id_metering_units) {
                            case 1: el.value = get_input_number_value(pn_edit_daily_intake.vgs_dp9_3n); break;
                            case 2: el.value = get_input_number_value(pn_edit_daily_intake.grp_tec_3_f); break;
                            case 3: el.value = get_input_number_value(pn_edit_daily_intake.dp_9_sw1_f); break;
                            case 4: el.value = get_input_number_value(pn_edit_daily_intake.dp_9_sw2_f); break;
                            case 5: el.value = get_input_number_value(pn_edit_daily_intake.dp_9_f); break;
                            case 6: el.value = get_input_number_value(pn_edit_daily_intake.dp_9_hn_f); break;
                                //case 7: el.value = get_input_number_value(pn_edit_daily_intake.); break;
                            case 8: el.value = get_input_number_value(pn_edit_daily_intake.dp_9_put_f); break;
                            case 9: el.value = get_input_number_value(pn_edit_daily_intake.ac_1_f); break;
                            case 10: el.value = get_input_number_value(pn_edit_daily_intake.ac_2_f); break;
                            case 11: el.value = get_input_number_value(pn_edit_daily_intake.gr_f); break;
                        }


                    });
                    ng.postDailyProduction(di_list, function (result) {
                        ng.postListDailyIntake(pn_edit_daily_intake.data, function (result_di) {

                            if (result_di !== null && result_di > 0) {
                                    if (typeof callback_ok === 'function') {
                                        pn_edit_daily_intake.obj.dialog("close");
                                        callback_ok(result_di);
                                    }
                                } else {
                                    pn_edit_daily_intake.val.clear_all();
                                    pn_edit_daily_intake.val.out_error_message("При обновлении информации по группе вагонов произошла ошибка. Код ошибки = " + result_di);
                                    LockScreenOff();
                                }
                        });
                    });
                }
            }
        },
    };


    pn_select.init();
    table_balance.init();
    pn_edit_daily_intake.init(function (result_upd) {
        LockScreenOff();
        table_balance.load(get_datetime_value(pn_select.report_for.val(), lang), 1);
    });
    //var f = moment(date_curent).format('DD.MM.YYYY');
    //pn_select.report_for.setDateTime(moment(date_curent).format('DD.MM.YYYY'));
    //var list = ng.getViewBalanceNG3(toISOStringTZ(date_curent._d), 1);
    // Инициализация окна править группу ограничений
    table_balance.load(get_datetime_value(pn_select.report_for.val(), lang), 1);
    //LockScreenOff();
});