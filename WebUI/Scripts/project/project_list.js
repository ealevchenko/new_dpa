
jQuery(document).ready(function ($) {

    // Список общесистемных слов 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'text_type_title_strategic': 'Стратегический',
                'text_type_title_normative': 'Нормативный',
                'text_title_project': ' CAPEX',
                'text_status_open': 'В работе',
                'text_status_close': 'Завершен',
                'text_status_pause': 'Остановлен',
                'text_status_delete': 'Удален',
                'text_kgrivna': 'тыс. грн.',
                'text_kdolar': 'тыс. $',
            },
            'en':  //default language: English
            {
                'text_type_title_strategic': 'Strategic',
                'text_type_title_normative': 'Normative',
                'text_title_project': ' CAPEX',
                'text_status_open': 'In progress',
                'text_status_close': 'Completed',
                'text_status_pause': 'Stopped',
                'text_status_delete': 'Deleted',
                'text_kgrivna': 'kUAH',
                'text_kdolar': 'k$',
            }
        };

    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        dpa = new Dpa(lang), // Создадим класс Dpa
        prj = new Project(lang), // Создадим класс Project
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        list_currency = [{ value: 1, text: langView('text_kgrivna', langs) }, { value: 2, text: langView('text_kdolar', langs) }], // Валюта
        user = null,
        pm = null,
        chain_pm = null,
        while_pm = '0',
        list_project = null,
        list_pm = [],
        list_ss = [],
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 2;
            // Згрузка библиотек project
            prj.load(['type', 'wp'], function () {
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
            // Згрузка библиотек project
            dpa.load(['user', 'ss'], function () {
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        },
        loadData = function (callback) {
            LockScreen(langView('mess_delay', langs));
            dpa.getAsyncUsersOfName(user_name, function (result_user) {
                user = result_user;
                prj.getAsyncProjectManagerOfIDUser(user.id, function (result_pm) {
                    pm = result_pm;
                    pm.id = 1; // !!!!!!!!! тест
                    prj.getAsyncChainProjectManagerOfIDPM(pm.id, function (result_chain_pm) {
                        chain_pm = result_chain_pm;

                        while_pm = '0';
                        for (i = 0, count_i = chain_pm.length; i < count_i; i++) {
                            while_pm += ',' + chain_pm[i].id
                        }

                        prj.getAsyncListProjectsOfListIDPM(while_pm, function (result_lp) {
                            list_project = result_lp;
                            // Определим список руководителей проектов с проектами
                            var uniqueNames = [];
                            list_pm = [];
                            $.each(list_project, function (i, el) {
                                if ($.inArray(el.ProjectManager.id, uniqueNames) === -1) {
                                    uniqueNames.push(el.ProjectManager.id);
                                    list_pm.push(el.ProjectManager);
                                }
                            });
                            // Определим список структурных подразделений по которым идут проекты
                            uniqueNames = [];
                            list_ss = [];
                            $.each(list_project, function (i, el) {
                                if ($.inArray(el.id_structural_subdivisions, uniqueNames) === -1) {
                                    uniqueNames.push(el.id_structural_subdivisions);
                                    //list_ss.push(el.id_structural_subdivisions);
                                    list_ss.push(getObjOflist(dpa.list_structural_subdivisions, 'id', el.id_structural_subdivisions));
                                }
                            });
                            LockScreenOff();
                            if (typeof callback === 'function') {
                                LockScreenOff();
                                callback();
                            }
                        });
                    });
                });
            });
        },

        // Получить тип проекта
        //getTypeProject1 = function (id_type_project) {
        //    switch (id_type_project) {
        //        case 1: return langView('text_type_title_strategic', langs);
        //        case 2: return langView('text_type_title_normative', langs);
        //        default: return null;
        //    }
        //},
        // Получить статус проекта
        getStatusProject = function (id_status_project) {
            switch (id_status_project) {
                case 0: $('.cd-project-content div h2').removeClass('status-close status-pause').addClass('status-open'); return langView('text_status_open', langs);
                case 1: $('.cd-project-content div h2').removeClass('status-open status-pause').addClass('status-close'); return langView('text_status_close', langs);
                case 2: $('.cd-project-content div h2').removeClass('status-open status-close').addClass('status-pause'); return langView('text_status_pause', langs);
                default: return null;
            }
        },

        project_detali = {
            content: $('.cd-project-content'),
            content_accordion_project_info: $("#accordion_project_info"),
            content_accordion_project_performer: $("#accordion_project_performer"),
            content_accordion_project_budget: $("#accordion_project_budget"),
            content_accordion_project_manager: $("#accordion_project_manager"),
            content_accordion_project_steps: $("#accordion_project_steps"),
            //  КОМПОНЕНТЫ ФОРМЫ
            //  INFO -----------------------------------------------------------------------------------------------
            edit_select_status_project: null, // Статус проекта
            edit_select_type_project: null, // Тип проекта CAPEX
            edit_select_structural_subdivisions_project: null, // Структурное подразделение где внедряется проект
            view_select_structural_subdivisions_project: null, // Структурное подразделение где внедряется проект
            edit_textarea_name_project_ru: null, // Название проекта на русском
            edit_textarea_name_project_en: null, // Название проекта на английском
            edit_textarea_goals_project_ru: null, // Цели проекта на русском
            edit_textarea_goals_project_en: null, // Цели проекта на английском
            view_textarea_goals_project: null, // Цели проекта
            edit_select_customer_project: null,  // ЗАКАЗЧИК (Структурное подразделение)
            view_input_customer_project: null,  // ЗАКАЗЧИК (Структурное подразделение)
            edit_select_spp_owner_project: null,  // Владелец строки (Структурное подразделение)
            edit_input_spp_sap_project: null,  // СПП-элемент
            view_input_spp_element_owner: null,  // СПП-элемент и владелец
            edit_input_start_project: null,  // Начало проекта
            view_input_start_project: null,  // Начало проекта
            edit_input_stop_project: null,  // Конец проекта
            view_input_stop_project: null,  // Конец проекта
            //  PERFORMER ------------------------------------------------------------
            edit_select_name_performer_project: null,  // Подрдная организаия
            view_input_name_performer_project: null,  // Подрдная организаия
            //edit_input_email_performer_project: null,  // Email подрядной организации
            view_input_email_performer_project: null,  // Email подрядной организации
            //edit_input_phone_performer_project: null,  // Телефон подрядной организации
            view_input_phone_performer_project: null,  // Телефон подрядной организации
            //edit_input_name_boss_performer_project: null,  // ФИО BOSSa подрядной организации
            view_input_name_boss_performer_project: null,  // ФИО BOSSa подрядной организации
            //edit_input_phone_boss_performer_project: null,  // Телефон BOSSa подрядной организации
            view_input_phone_boss_performer_project: null,  // Телефон BOSSa подрядной организации
            //  BUDGET ------------------------------------------------------------
            edit_input_budget_project: null,                        // Бюджет проекта
            edit_select_budget_currency_project: null,              // Бюджет валюта проекта
            view_input_budget_project: null,                        // Бюджет проекта

            edit_input_contract_project: null,                          // Контракт проекта
            edit_select_contract_currency_project: null,                // Контракт валюта проекта
            view_input_contract_project: null,                          // Контракт проекта

            edit_input_contract_engineering_project: null,              // Контракт проекта
            edit_select_contract_engineering_currency_project: null,    // Контракт валюта проекта
            view_input_contract_engineering_project: null,              // Контракт проекта

            edit_input_contract_equipment_project: null,                // Контракт проекта
            edit_select_contract_equipment_currency_project: null,      // Контракт валюта проекта
            view_input_contract_equipment_project: null,                // Контракт проекта

            edit_input_contract_construction_project: null,             // Контракт проекта
            edit_select_contract_construction_currency_project: null,   // Контракт валюта проекта
            view_input_contract_construction_project: null,             // Контракт проекта

            edit_input_contract_commissioning_project: null,            // Контракт проекта
            edit_select_contract_commissioning_currency_project: null,  // Контракт валюта проекта
            view_input_contract_commissioning_project: null,            // Контракт проекта

            edit_input_contract_other_project: null,                    // Контракт проекта
            edit_select_contract_other_currency_project: null,          // Контракт валюта проекта
            view_input_contract_other_project: null,                    // Контракт проекта

            //edit_input_payment_project: null,                           // Оплата проекта
            //edit_select_payment_currency_project: null,                 // Оплата валюта проекта
            //view_input_payment_project: null,                           // Оплата проекта

            edit_input_payment_engineering_project: null,               // Оплата проекта
            edit_select_payment_engineering_currency_project: null,     // Оплата валюта проекта
            view_input_payment_engineering_project: null,               // Оплата проекта

            edit_input_payment_equipment_project: null,                 // Оплата проекта
            edit_select_payment_equipment_currency_project: null,       // Оплата валюта проекта
            view_input_payment_equipment_project: null,                 // Оплата проекта

            edit_input_payment_construction_project: null,              // Оплата проекта
            edit_select_payment_construction_currency_project: null,    // Оплата валюта проекта
            view_input_payment_construction_project: null,              // Оплата проекта

            edit_input_payment_commissioning_project: null,             // Оплата проекта
            edit_select_payment_commissioning_currency_project: null,   // Оплата валюта проекта
            view_input_payment_commissioning_project: null,             // Оплата проекта

            edit_input_payment_other_project: null,                     // Оплата проекта
            edit_select_payment_other_currency_project: null,           // Оплата валюта проекта
            view_input_payment_other_project: null,                     // Оплата проекта


            select_project_manager: null,               // Менеджер проекта

            mode: 0, // 0-view 1 -add 2 - edit-info 3 -edit-performer 4-edit-budget 5-edit-manager 6-edit-steps
            id_project: null,   // Выбранный id текущего проекта
            project: null,      // Выбранный текущий проект
            //----------------------------------------------------------------------------
            // Функции валидации
            //
            //---------------------------------------------------------------------------
            //
            updateTips: function (label, message) {
                $("." + label)
                    .text(message)
                    .addClass("ui-state-highlight");
                setTimeout(function () {
                    $("." + label).removeClass("ui-state-highlight", 1500);
                }, 500);
            },
            // -- Проверка select
            // Проверка на выбор valume >-1
            checkSelectValOfMessage: function (o, label, message) {
                if (Number(o.val()) < 0) {
                    o.addClass("error");
                    project_detali.updateTips(label, message);
                    return false;
                } else {
                    return true;
                }
            },
            // Проверка input
            // Проверка на пустой объект
            checkIsNullOfMessage: function (o, label, message) {
                if (o.val() === '' || o.val() === null) {
                    o.addClass("error");
                    project_detali.updateTips(label, message);
                    return false;
                } else {
                    return true;
                }
            },
            // Проверка правильного заполнения формы
            validationConfirm: function (mode) {
                $(".validate-info").text('');
                $(".validate-performer").text('');
                $(".error").removeClass("error");
                var valid = true;
                //  INFO -------------------------------------------------------------------------------------
                if (mode === 1 || mode === 2) {
                    valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_status_project, "validate-info", "Укажите статус проекта");
                    valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_type_project, "validate-info", "Укажите тип проекта");
                    valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_structural_subdivisions_project, "validate-info", "Укажите структурное подразделение где внедряется проект");
                    valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_textarea_name_project_ru, "validate-info", "Введите название проекта на русском.");
                    valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_textarea_name_project_en, "validate-info", "Введите название проекта на английском.");
                    valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_textarea_goals_project_ru, "validate-info", "Укажите цель проекта на русском.");
                    valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_textarea_goals_project_en, "validate-info", "Укажите цель проекта на английском.");
                    valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_customer_project, "validate-info", "Укажите структурное подразделение заказчик проект");
                };
                //  PERFORMER --------------------------------------------------------------------------------
                if (mode === 1 || mode === 3) {

                }

                return valid;
            },
            //вывести в комоненте текст с перемещением текста label
            viewCheckVal: function (inputField, val) {
                inputField.val(val);
                (inputField.val() == '') ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
            },
            // Инициализаия проект детально
            init: function () {
                //--------------------------------------------------
                // Настройка перемещения названия полей
                if ($('.floating-labels').length > 0) floatLabels();
                //
                function floatLabels() {
                    var inputFields = $('.floating-labels .cd-label').next();
                    inputFields.each(function () {
                        var singleInput = $(this);
                        //check if user is filling one of the form fields 
                        checkVal(singleInput);
                        singleInput.on('change keyup', function () {
                            checkVal(singleInput);
                        });
                    });
                }
                // Установка подписи компонента (если заполнен подпись над компонентом)
                function checkVal(inputField) {
                    (inputField.val() == '') ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
                }
                // Настройка закрыть детали проекта
                project_detali.content.on('click', '.close', function (event) {
                    event.preventDefault();
                    project_detali.content.removeClass('is-visible');
                });

                $("form.cd-form").submit(function () {
                    event.preventDefault();
                    var form = $(this);
                    return true; //отправляете ваш submit
                });
                //--------------------------------------------------
                // Настроим компоненты акардионы
                this.content_accordion_project_info.accordion({
                    heightStyle: "content",
                    collapsible: true,
                    activate: function (event, ui) {
                        var active = project_detali.content_accordion_project_info.accordion("option", "active");
                        if (active === 0) {

                        }
                    }
                });
                this.content_accordion_project_performer.accordion({
                    heightStyle: "content",
                    collapsible: true,
                    activate: function (event, ui) {
                        var active = project_detali.content_accordion_project_performer.accordion("option", "active");
                        if (active === 0) {

                        }
                    }
                });
                this.content_accordion_project_budget.accordion({
                    heightStyle: "content",
                    collapsible: true,
                    activate: function (event, ui) {
                        var active = project_detali.content_accordion_project_budget.accordion("option", "active");
                        if (active === 0) {

                        }
                    }
                });
                this.content_accordion_project_manager.accordion({
                    heightStyle: "content",
                    collapsible: true,
                    activate: function (event, ui) {
                        var active = project_detali.content_accordion_project_manager.accordion("option", "active");
                        if (active === 0) {

                        }
                    }
                });
                this.content_accordion_project_steps.accordion({
                    heightStyle: "content",
                    collapsible: true,
                    activate: function (event, ui) {
                        var active = project_detali.content_accordion_project_steps.accordion("option", "active");
                        if (active === 0) {

                        }
                    }
                });
                //--------------------------------------------------
                //  ПРИВЯЗКА КОМПОНЕНТОВ ФОРМЫ
                //  INFO -----------------------------------------------------------------------------------------------
                // Инициализаия кнопки "Редактировать info"
                $('input#edit-info').on('click', function () {
                    project_detali.view(project_detali.id_project, 2);
                });
                // Инициализаия кнопки "Редактировать save-info"
                $('input#save-info').on('click', function () {
                    var valid = project_detali.validationConfirm(2);
                    if (valid) {
                        var project = project_detali.get_project(2);
                        prj.putAsyncListProjects(project, function (result_id) {
                            if (result_id > 0) {
                                // Окей, записали
                                project_detali.view(project_detali.id_project, 0);
                            } else {
                                project_detali.updateTips("validate-info", "Ошибка записи проекта");
                            }
                        });

                    }

                });
                $('input#cancel-info').on('click', function () {
                    project_detali.view(project_detali.id_project, 0);
                });
                // Статус проекта
                this.edit_select_status_project = cd_initSelect(
                    $('select#cd-status-project-edit'),
                    { lang: lang },
                    [
                        { value: 0, text: langView('text_status_open', langs) },
                        { value: 1, text: langView('text_status_close', langs) },
                        { value: 2, text: langView('text_status_pause', langs) },
                        { value: 3, text: langView('text_status_delete', langs) },
                    ],
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Тип проекта
                this.edit_select_type_project = cd_initSelect(
                    $('select#cd-type-project-edit'),
                    { lang: lang },
                    prj.list_type_project,
                    function (row) {
                        return { value: Number(row.id), text: prj.getTypeProject(row) };
                    },
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Структурное подразделение
                this.edit_select_structural_subdivisions_project = cd_initSelect(
                    $('select#cd-structural-subdivisions-project-edit'),
                    { lang: lang },
                    dpa.list_structural_subdivisions,
                    function (row) {
                        return { value: Number(row.id), text: dpa.getFullNameStructuralSubdivisions(row) };
                    },
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                this.view_select_structural_subdivisions_project = $('input#cd-structural-subdivisions-project-view').val('');
                // Название
                this.edit_textarea_name_project_ru = $('textarea#cd-name-project-ru-edit').text('');
                this.edit_textarea_name_project_en = $('textarea#cd-name-project-en-edit').text('');
                // Цели
                this.edit_textarea_goals_project_ru = $('textarea#cd-goals-project-ru-edit').text('');
                this.edit_textarea_goals_project_en = $('textarea#cd-goals-project-en-edit').text('');
                this.view_textarea_goals_project_en = $('textarea#cd-goals-project-view').text('');
                // Заказчик
                this.edit_select_customer_project = cd_initSelect(
                    $('select#cd-customer-project-edit'),
                    { lang: lang },
                    dpa.list_structural_subdivisions,
                    function (row) {
                        return { value: Number(row.id), text: dpa.getFullNameStructuralSubdivisions(row) };
                    },
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                this.view_input_customer_project = $('input#cd-customer-project-view').val('');
                // Владелец строки
                this.edit_select_spp_owner_project = cd_initSelect(
                    $('select#cd-spp-owner-project-edit'),
                    { lang: lang },
                    dpa.list_structural_subdivisions,
                    function (row) {
                        return { value: Number(row.id), text: dpa.getNameStructuralSubdivisions(row) };
                    },
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // СПП-элемент
                this.edit_input_spp_sap_project = $('input#cd-spp-sap-edit').val('');
                // СПП-элемент и владелец
                this.view_input_spp_element_owner = $('input#cd-spp-element-owner-project-view').val('');
                // Начало пректа
                this.edit_input_start_project = $("input#cd-start-project-edit").datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    showAnim: 'slideDown',
                    //language: lang == 'en' ? 'en-GB' : 'ru',
                });
                this.view_input_start_project = $('input#cd-start-project-view').val('');
                // Окончание пректа по контракту
                this.edit_input_stop_project = $("input#cd-stop-project-edit").datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    showAnim: 'slideDown',
                    //language: lang == 'en' ? 'en-GB' : 'ru',
                });
                this.view_input_stop_project = $('input#cd-stop-project-view').val('');
                //-----------------------------------------------------------------------
                // PERFORMER ------------------------------------------------------------
                // Инициализаия кнопки "Редактировать performer"
                $('input#edit-performer').on('click', function () {
                    project_detali.view(project_detali.id_project, 3);
                });
                // Инициализаия кнопки "Редактировать save-performer"
                $('input#save-performer').on('click', function () {
                    var valid = project_detali.validationConfirm(3);
                    if (valid) {
                        var project = project_detali.get_project(3);
                        prj.putAsyncListProjects(project, function (result_id) {
                            if (result_id > 0) {
                                // Окей, записали
                                project_detali.view(project_detali.id_project, 0);
                            } else {
                                project_detali.updateTips("validate-performer", "Ошибка записи проекта PERFORMER");
                            }
                        });
                    }
                });
                // Инициализаия кнопки "Отмена cancel-performer"
                $('input#cancel-performer').on('click', function () {
                    project_detali.view(project_detali.id_project, 0);
                });
                //------------------------------------------------------------------
                // Подрядная организация
                this.edit_select_name_performer_project = cd_initSelect(
                    $('select#cd-name-performer-project-edit'),
                    { lang: lang },
                    prj.list_work_performers,
                    function (row) {
                        return { value: Number(row.id), text: (lang == 'en' ? row.name_performer_en : row.name_performer_ru) };
                    },
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val()
                    },
                    null);
                // Подрядная организация
                this.view_input_name_performer_project = $('input#cd-name-performer-project-view').val('');
                // Email подрядной организации
                this.view_input_email_performer_project = $('input#cd-email-performer-project-view').val('');
                // Телефон подрядной организации
                this.view_input_phone_performer_project = $('input#cd-phone-performer-project-view').val('');
                // Телефон bossa подрядной организации
                this.view_input_name_boss_performer_project = $('input#cd-name-boss-performer-project-view').val('');
                // Телефон bossa подрядной организации
                this.view_input_phone_boss_performer_project = $('input#cd-phone-boss-performer-project-view').val('');
                //------------------------------------------------------------------------------------------------
                // BUDGET ------------------------------------------------------------
                // Инициализаия кнопки "Редактировать budget"
                $('input#edit-budget').on('click', function () {
                    project_detali.view(project_detali.id_project, 4);
                });
                // Инициализаия кнопки "Редактировать save-budget"
                $('input#save-budget').on('click', function () {
                    var valid = project_detali.validationConfirm(4);
                    if (valid) {
                        var project = project_detali.get_project(4);
                        prj.putAsyncListProjects(project, function (result_id) {
                            if (result_id > 0) {
                                // Окей, записали
                                project_detali.view(project_detali.id_project, 0);
                            } else {
                                project_detali.updateTips("validate-budget", "Ошибка записи проекта BUDGET");
                            }
                        });
                    }
                });
                // Инициализаия кнопки "Отмена cancel-budget"
                $('input#cancel-budget').on('click', function () {
                    project_detali.view(project_detali.id_project, 0);
                });
                // Бюджет пректа
                this.view_input_budget_project = $('input#cd-budget-project-view').val('');
                this.edit_input_budget_project = $('input#cd-budget-project-edit').val('');
                this.edit_select_budget_currency_project = cd_initSelect(
                    $('select#cd-budget-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Контракт пректа
                this.view_input_contract_project = $('input#cd-contract-project-view').val('');
                this.edit_input_contract_project = $('input#cd-contract-project-edit').val('');
                this.edit_select_contract_currency_project = cd_initSelect(
                    $('select#cd-contract-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Контракт (инжиниринг)
                this.view_input_contract_engineering_project = $('input#cd-contract-engineering-project-view').val('');
                this.edit_input_contract_engineering_project = $('input#cd-contract-engineering-project-edit').val('');
                this.edit_select_contract_engineering_currency_project = cd_initSelect(
                    $('select#cd-contract-engineering-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Оплата (инжиниринг)
                this.view_input_payment_engineering_project = $('input#cd-payment-engineering-project-view').val('');
                this.edit_input_payment_engineering_project = $('input#cd-payment-engineering-project-edit').val('');
                this.edit_select_payment_engineering_currency_project = cd_initSelect(
                    $('select#cd-payment-engineering-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Контракт (оборудование)
                this.view_input_contract_equipment_project = $('input#cd-contract-equipment-project-view').val('');
                this.edit_input_contract_equipment_project = $('input#cd-contract-equipment-project-edit').val('');
                this.edit_select_contract_equipment_currency_project = cd_initSelect(
                    $('select#cd-contract-equipment-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Оплата (оборудование)
                this.view_input_payment_equipment_project = $('input#cd-payment-equipment-project-view').val('');
                this.edit_input_payment_equipment_project = $('input#cd-payment-equipment-project-edit').val('');
                this.edit_select_payment_equipment_currency_project = cd_initSelect(
                    $('select#cd-payment-equipment-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Контракт (СМР)
                this.view_input_contract_construction_project = $('input#cd-contract-construction-project-view').val('');
                this.edit_input_contract_construction_project = $('input#cd-contract-construction-project-edit').val('');
                this.edit_select_contract_construction_currency_project = cd_initSelect(
                    $('select#cd-contract-construction-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Оплата (СМР)
                this.view_input_payment_construction_project = $('input#cd-payment-construction-project-view').val('');
                this.edit_input_payment_construction_project = $('input#cd-payment-construction-project-edit').val('');
                this.edit_select_payment_construction_currency_project = cd_initSelect(
                    $('select#cd-payment-construction-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Контракт (ПНР)
                this.view_input_contract_commissioning_project = $('input#cd-contract-commissioning-project-view').val('');
                this.edit_input_contract_commissioning_project = $('input#cd-contract-commissioning-project-edit').val('');
                this.edit_select_contract_commissioning_currency_project = cd_initSelect(
                    $('select#cd-contract-commissioning-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Оплата (ПНР)
                this.view_input_payment_commissioning_project = $('input#cd-payment-commissioning-project-view').val('');
                this.edit_input_payment_commissioning_project = $('input#cd-payment-commissioning-project-edit').val('');
                this.edit_select_payment_commissioning_currency_project = cd_initSelect(
                    $('select#cd-payment-commissioning-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Контракт (Прочее)
                this.view_input_contract_other_project = $('input#cd-contract-other-project-view').val('');
                this.edit_input_contract_other_project = $('input#cd-contract-other-project-edit').val('');
                this.edit_select_contract_other_currency_project = cd_initSelect(
                    $('select#cd-contract-other-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);
                // Оплата (Прочее)
                this.view_input_payment_other_project = $('input#cd-payment-other-project-view').val('');
                this.edit_input_payment_other_project = $('input#cd-payment-other-project-edit').val('');
                this.edit_select_payment_other_currency_project = cd_initSelect(
                    $('select#cd-payment-other-currency-project-edit'),
                    { lang: lang },
                    list_currency,
                    null,
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);


                //----------------------------------------------------------------------
                // Проект менеджер
                this.select_project_manager = cd_initSelect(
                    $('select#cd-project-manager'),
                    { lang: lang },
                    list_pm,
                    function (row) {
                        return { value: Number(row.id), text: dpa.getSNPofIDUsers(row.id_user) };
                    },
                    -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val()
                    },
                    null);

                //// Активировать меню редактирования пректов
                //if ($('.cd-stretchy-nav').length > 0) {
                //    var stretchyNavs = $('.cd-stretchy-nav');

                //    stretchyNavs.each(function () {
                //        var stretchyNav = $(this),
                //            stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');

                //        stretchyNavTrigger.on('click', function (event) {
                //            event.preventDefault();
                //            stretchyNav.toggleClass('nav-is-visible');
                //        });
                //    });

                //    $(document).on('click', function (event) {
                //        (!$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span')) && stretchyNavs.removeClass('nav-is-visible');

                //        // Закрыть окно детально
                //        if ($(event.target).is('#close-detali-project') || $(event.target).is('#close-detali-project span')) {
                //            project_detali.content.removeClass('is-visible');
                //        }
                //        if ($(event.target).is('#add-detali-project') || $(event.target).is('#add-detali-project span')) {
                //            //project_detali.view(0, 1)
                //            //confirm_edit_project.open(null);
                //        }
                //        if ($(event.target).is('#edit-detali-project') || $(event.target).is('#edit-detali-project span')) {
                //            //project_detali.view(project_detali.id_project, 2)
                //            //confirm_edit_project.open(project_detali.id_project);
                //        }
                //        if ($(event.target).is('#delete-detali-project') || $(event.target).is('#delete-detali-project span')) {
                //            //project_detali.view(1, 0)
                //        }
                //    });
                //}
            },
            // Отобразить указаный проект в указанном режиме
            view: function (id, mode) {
                this.id_project = id;
                if (mode === 1) {
                    project_detali.view_mode_project(null, mode);
                    project_detali.set_mode(mode);
                } else {
                    LockScreen(langView('mess_delay', langs));
                    // Загрузим проект
                    prj.getAsyncListProjectsOfID(id, function (result_project) {
                        project_detali.project = result_project;
                        project_detali.view_mode_project(result_project, mode);
                        project_detali.set_mode(mode);
                        //!!! Добавить обновление списка и карточек на эеране
                        LockScreenOff();

                    });
                }
                //// Руководитель проектов и программ
                //if (project.ProjectManager !== null) {
                //    var user = getObjOflist(list_users, 'id', project.ProjectManager.id_user);
                //    $('input#project-manager-fio').val(user.surname + ' ' + user.name + ' ' + user.patronymic);
                //    $('input#project-manager-email').val(project.ProjectManager.email);
                //    $('input#project-manager-phone-work').val(project.ProjectManager.phone_work);
                //    $('input#project-manager-phone-mobile').val(project.ProjectManager.phone_mobile);
                //}
                // Показать страницу детально
                this.content.addClass('is-visible');
            },
            //
            view_mode_project: function (project, mode) {
                switch (mode) {
                    case 0: project_detali.mode_project_view(project); break;
                    case 1: project_detali.mode_project_add(); break;
                    case 2: project_detali.mode_project_edit_info(project); break;
                    case 3: project_detali.mode_project_edit_performer(project); break;
                    case 4: project_detali.mode_project_edit_budget(project); break;
                }
            },
            //
            mode_project_view: function (project) {
                if (project) {
                    $(".error").removeClass("error");
                    // тип пректа и название
                    $('.cd-project-content div h2').text(prj.getTypeProjectOfProject(project) + ' (' + getStatusProject(project.id_status_project) + ')');
                    $('.cd-project-content div em').text(prj.getNameProject(project));
                    //  INFO -------------------------------------------------------------------------------------
                    project_detali.viewCheckVal(this.view_select_structural_subdivisions_project, prj.getFullNameStructuralSubdivisions(project));
                    project_detali.viewCheckVal(this.view_textarea_goals_project_en, prj.getGoalsProject(project));
                    project_detali.viewCheckVal(this.view_input_customer_project, prj.getFullNameGustomerProject(project));
                    var name_spp_owner = prj.getNameSAPOwnerProject(project);
                    project_detali.viewCheckVal(this.view_input_spp_element_owner, project.spp_sap + (name_spp_owner !== null ? ' (' + name_spp_owner + ')' : ''));
                    project_detali.viewCheckVal(this.view_input_start_project, prj.getStartProject(project));
                    project_detali.viewCheckVal(this.view_input_stop_project, prj.getStopProject(project));
                    //  PERFORMER --------------------------------------------------------------------------------
                    project_detali.viewCheckVal(this.view_input_name_performer_project, prj.getNameWorkPerformersOfProject(project));
                    if (project.WorkPerformers) {
                        project_detali.viewCheckVal(this.view_input_email_performer_project, prj.getEmailWorkPerformers(project.WorkPerformers));
                        project_detali.viewCheckVal(this.view_input_phone_performer_project, prj.getPhoneWorkPerformers(project.WorkPerformers));
                        project_detali.viewCheckVal(this.view_input_name_boss_performer_project, prj.getNameBossWorkPerformers(project.WorkPerformers));
                        project_detali.viewCheckVal(this.view_input_phone_boss_performer_project, prj.getPhoneBossWorkPerformers(project.WorkPerformers));
                    }
                    //  BUDGET ------------------------------------------------------------
                    project_detali.viewCheckVal(this.view_input_budget_project, prj.getBudgetProject(project));
                    project_detali.viewCheckVal(this.view_input_contract_project, prj.getContractProject(project));
                    project_detali.viewCheckVal(this.view_input_contract_engineering_project, prj.getContractEngineeringProject(project));
                    project_detali.viewCheckVal(this.view_input_payment_engineering_project, prj.getPaymentEngineeringProject(project));
                    project_detali.viewCheckVal(this.view_input_contract_equipment_project, prj.getContractEquipmentProject(project));
                    project_detali.viewCheckVal(this.view_input_payment_equipment_project, prj.getPaymentEquipmentProject(project));
                    project_detali.viewCheckVal(this.view_input_contract_construction_project, prj.getContractConstructionProject(project));
                    project_detali.viewCheckVal(this.view_input_payment_construction_project, prj.getPaymentConstructionProject(project));
                    project_detali.viewCheckVal(this.view_input_contract_commissioning_project, prj.getContractCommissioningProject(project));
                    project_detali.viewCheckVal(this.view_input_payment_commissioning_project, prj.getPaymentCommissioningProject(project));
                    project_detali.viewCheckVal(this.view_input_contract_other_project, prj.getContractOtherProject(project));
                    project_detali.viewCheckVal(this.view_input_payment_other_project, prj.getPaymentOtherProject(project));

                }
            },
            //
            mode_project_add: function () {
                //  INFO -------------------------------------------------------------------------------------
                project_detali.viewCheckVal(this.edit_select_status_project, -1);
                project_detali.viewCheckVal(this.edit_select_type_project, -1);
                project_detali.viewCheckVal(this.edit_select_structural_subdivisions_project, -1);
                project_detali.viewCheckVal(this.edit_textarea_name_project_ru, '');
                project_detali.viewCheckVal(this.edit_textarea_name_project_en, '');
                project_detali.viewCheckVal(this.edit_textarea_goals_project_ru, '');
                project_detali.viewCheckVal(this.edit_textarea_goals_project_en, '');
                project_detali.viewCheckVal(this.edit_select_customer_project, -1);
                project_detali.viewCheckVal(this.edit_select_spp_owner_project, -1);
                project_detali.viewCheckVal(this.edit_input_spp_sap_project, '');
                project_detali.viewCheckVal(this.edit_input_start_project, '');
                project_detali.viewCheckVal(this.edit_input_stop_project, '');
                //  PERFORMER --------------------------------------------------------------------------------
                project_detali.viewCheckVal(this.edit_select_name_performer_project, -1);
                //  BUDGET ------------------------------------------------------------
            },
            // EDIT INFO
            mode_project_edit_info: function (project) {
                if (project) {
                    project_detali.viewCheckVal(this.edit_select_status_project, project.id_status_project !== null ? project.id_status_project : -1);
                    project_detali.viewCheckVal(this.edit_select_type_project, project.id_type_project !== null ? project.id_type_project : -1);
                    project_detali.viewCheckVal(this.edit_select_structural_subdivisions_project, project.id_structural_subdivisions !== null ? project.id_structural_subdivisions : -1);
                    project_detali.viewCheckVal(this.edit_textarea_name_project_ru, project.name_project_ru);
                    project_detali.viewCheckVal(this.edit_textarea_name_project_en, project.name_project_en);
                    project_detali.viewCheckVal(this.edit_textarea_goals_project_ru, project.goals_project_ru);
                    project_detali.viewCheckVal(this.edit_textarea_goals_project_en, project.goals_project_en);
                    project_detali.viewCheckVal(this.edit_select_customer_project, project.id_project_customer !== null ? project.id_project_customer : -1);
                    project_detali.viewCheckVal(this.edit_select_spp_owner_project, project.id_spp_owner !== null ? project.id_spp_owner : -1);
                    project_detali.viewCheckVal(this.edit_input_spp_sap_project, project.spp_sap);
                    project_detali.viewCheckVal(this.edit_input_start_project, prj.getStartProject(project));
                    project_detali.viewCheckVal(this.edit_input_stop_project, prj.getStopProject(project));
                }
            },
            // EDIT PERFORMER
            mode_project_edit_performer: function (project) {
                if (project) {
                    project_detali.viewCheckVal(this.edit_select_name_performer_project, project.id_work_performer !== null ? project.id_work_performer : -1);
                }
            },
            // EDIT BUDJET
            mode_project_edit_budget: function (project) {
                if (project) {
                    project_detali.viewCheckVal(this.edit_input_budget_project, project.budget);
                    project_detali.viewCheckVal(this.edit_select_budget_currency_project, project.budget_currency !== null ? project.budget_currency : -1);
                    project_detali.viewCheckVal(this.edit_input_contract_project, project.contract_value);
                    project_detali.viewCheckVal(this.edit_select_contract_currency_project, project.contract_currency !== null ? project.contract_currency : -1);

                    project_detali.viewCheckVal(this.edit_input_contract_engineering_project, project.contract_engineering_value);
                    project_detali.viewCheckVal(this.edit_select_contract_engineering_currency_project, project.contract_engineering_currency !== null ? project.contract_engineering_currency : -1);
                    project_detali.viewCheckVal(this.edit_input_payment_engineering_project, project.payment_engineering_value);
                    project_detali.viewCheckVal(this.edit_select_payment_engineering_currency_project, project.payment_engineering_currency !== null ? project.payment_engineering_currency : -1);

                    project_detali.viewCheckVal(this.edit_input_contract_equipment_project, project.contract_equipment_value);
                    project_detali.viewCheckVal(this.edit_select_contract_equipment_currency_project, project.contract_equipment_currency !== null ? project.contract_equipment_currency : -1);
                    project_detali.viewCheckVal(this.edit_input_payment_equipment_project, project.payment_equipment_value);
                    project_detali.viewCheckVal(this.edit_select_payment_equipment_currency_project, project.payment_equipment_currency !== null ? project.payment_equipment_currency : -1);

                    project_detali.viewCheckVal(this.edit_input_contract_construction_project, project.contract_construction_value);
                    project_detali.viewCheckVal(this.edit_select_contract_construction_currency_project, project.contract_construction_currency !== null ? project.contract_construction_currency : -1);
                    project_detali.viewCheckVal(this.edit_input_payment_construction_project, project.payment_construction_value);
                    project_detali.viewCheckVal(this.edit_select_payment_construction_currency_project, project.payment_construction_currency !== null ? project.payment_construction_currency : -1);

                    project_detali.viewCheckVal(this.edit_input_contract_commissioning_project, project.contract_commissioning_value);
                    project_detali.viewCheckVal(this.edit_select_contract_commissioning_currency_project, project.contract_commissioning_currency !== null ? project.contract_commissioning_currency : -1);
                    project_detali.viewCheckVal(this.edit_input_payment_commissioning_project, project.payment_commissioning_value);
                    project_detali.viewCheckVal(this.edit_select_payment_commissioning_currency_project, project.payment_commissioning_currency !== null ? project.payment_commissioning_currency : -1);

                    project_detali.viewCheckVal(this.edit_input_contract_other_project, project.contract_other_value);
                    project_detali.viewCheckVal(this.edit_select_contract_other_currency_project, project.contract_other_currency !== null ? project.contract_other_currency : -1);
                    project_detali.viewCheckVal(this.edit_input_payment_other_project, project.payment_other_value);
                    project_detali.viewCheckVal(this.edit_select_payment_other_currency_project, project.payment_other_currency !== null ? project.payment_other_currency : -1);
                }
            },

            // Установить режим окна детально
            set_mode: function (mode) {
                $('.mode-view, .mode-add, .mode-edit, .mode-edit-info, .mode-edit-performer').hide();
                $('div.mode-edit').removeClass('mode-edit');
                $(".validate-info").text('');
                $(".validate-performer").text('');
                switch (mode) {
                    case 0:
                        project_detali.mode = 0;
                        $('.mode-view').show();
                        break;
                    case 1:
                        project_detali.mode = 1;
                        $('.mode-add').show();
                        $('div#accordion-info').addClass('mode-edit');
                        $('div#accordion-performer').addClass('mode-edit');
                        break;
                    case 2:
                        project_detali.mode = 2;
                        $('.mode-edit-info').show();
                        $('div#accordion-info').addClass('mode-edit');
                        break;
                    case 3:
                        project_detali.mode = 3;
                        $('.mode-edit-performer').show();
                        $('div#accordion-performer').addClass('mode-edit');
                        break;
                    case 4:
                        project_detali.mode = 4;
                        $('.mode-edit-budget').show();
                        $('div#accordion-budget').addClass('mode-edit');
                        break;
                }
            },
            // Получить новый проект
            get_project: function (mode) {

                var project = {
                    id: project_detali.project.id,
                    id_type_project: project_detali.project.id_type_project,
                    id_structural_subdivisions: project_detali.project.id_structural_subdivisions,
                    name_project_ru: project_detali.project.name_project_ru,
                    name_project_en: project_detali.project.name_project_en,
                    goals_project_ru: project_detali.project.goals_project_ru,
                    goals_project_en: project_detali.project.goals_project_en,
                    id_project_customer: project_detali.project.id_project_customer,
                    spp_sap: project_detali.project.spp_sap,
                    id_spp_owner: project_detali.project.id_spp_owner,
                    start_project: project_detali.project.start_project,
                    id_work_performer: project_detali.project.id_work_performer,
                    stop_project_contract: project_detali.project.stop_project_contract,
                    budget: project_detali.project.budget,
                    budget_currency: project_detali.project.budget_currency,
                    contract_value: project_detali.project.contract_value,
                    contract_currency: project_detali.project.contract_currency,
                    contract_engineering_value: project_detali.project.contract_engineering_value,
                    contract_engineering_currency: project_detali.project.contract_engineering_currency,
                    contract_equipment_value: project_detali.project.contract_equipment_value,
                    contract_equipment_currency: project_detali.project.contract_equipment_currency,
                    contract_construction_value: project_detali.project.contract_construction_value,
                    contract_construction_currency: project_detali.project.contract_construction_currency,
                    contract_commissioning_value: project_detali.project.contract_commissioning_value,
                    contract_commissioning_currency: project_detali.project.contract_commissioning_currency,
                    contract_other_value: project_detali.project.contract_other_value,
                    contract_other_currency: project_detali.project.contract_other_currency,
                    payment_engineering_value: project_detali.project.payment_engineering_value,
                    payment_engineering_currency: project_detali.project.payment_engineering_currency,
                    payment_equipment_value: project_detali.project.payment_equipment_value,
                    payment_equipment_currency: project_detali.project.payment_equipment_currency,
                    payment_construction_value: project_detali.project.payment_construction_value,
                    payment_construction_currency: project_detali.project.payment_construction_currency,
                    payment_commissioning_value: project_detali.project.payment_commissioning_value,
                    payment_commissioning_currency: project_detali.project.payment_commissioning_currency,
                    payment_other_value: project_detali.project.payment_other_value,
                    payment_other_currency: project_detali.project.payment_other_currency,
                    workspace: project_detali.project.workspace,
                    id_project_manager: project_detali.project.id_project_manager,
                    id_status_project: project_detali.project.id_status_project,
                    create: project_detali.project.create,
                    create_user: project_detali.project.create_user,
                    change: project_detali.project.change,
                    change_user: project_detali.project.change_user
                };
                //  INFO
                if (mode === 2) {
                    project.id_type_project = Number(project_detali.edit_select_type_project.val());
                    project.id_status_project = Number(project_detali.edit_select_status_project.val());
                    project.id_structural_subdivisions = Number(project_detali.edit_select_structural_subdivisions_project.val());
                    project.name_project_ru = project_detali.edit_textarea_name_project_ru.text();
                    project.name_project_en = project_detali.edit_textarea_name_project_en.text();
                    project.goals_project_ru = project_detali.edit_textarea_goals_project_ru.text();
                    project.goals_project_en = project_detali.edit_textarea_goals_project_en.text();
                    project.id_project_customer = Number(project_detali.edit_select_customer_project.val());
                    project.id_spp_owner = Number(project_detali.edit_select_spp_owner_project.val()) > -1 ? Number(project_detali.edit_select_spp_owner_project.val()) : null;
                    project.spp_sap = project_detali.edit_input_spp_sap_project.val();
                    project.start_project = project_detali.edit_input_start_project.val() !== null && project_detali.edit_input_start_project.val() !== "" ? project_detali.edit_input_start_project.val() : null;
                    project.stop_project_contract = project_detali.edit_input_stop_project.val() !== null && project_detali.edit_input_stop_project.val() !== "" ? project_detali.edit_input_stop_project.val() : null;
                };
                // EDIT PERFORMER
                if (mode === 3) {
                    project.id_work_performer = Number(project_detali.edit_select_name_performer_project.val()) > -1 ? Number(project_detali.edit_select_name_performer_project.val()) : null;
                }
                // EDIT BUDJET
                if (mode === 4) {
                    //project.id_work_performer = Number(project_detali.edit_select_name_performer_project.val()) > -1 ? Number(project_detali.edit_select_name_performer_project.val()) : null;
                }
                project.change = toISOStringTZ(new Date());
                project.change_user = user_name;
                return project;
            }

        };
    //confirm_edit_project = {
    //    content: $('#add-edit-project'),            
    //    obj: null,
    //    init: function () {
    //        this.obj = this.content.dialog({
    //            resizable: false,
    //            modal: true,
    //            autoOpen: false,
    //            height: "auto",
    //            width: 900,
    //            close: function (event, ui) {

    //            },
    //            buttons: {
    //                'Сохранить': function () {

    //                },
    //                'Отмена': function () {

    //                    $(this).dialog("close");
    //                }
    //            }
    //        });
    //        // Sumbit form
    //        this.form = this.obj.find("form").on("submit", function (event) {
    //            event.preventDefault();
    //        });
    //    },
    //    open: function (id) {
    //        this.obj.dialog("open");
    //    }
    //};


    if (lang === undefined) lang = 'ru';
    // Загрузка библиотек
    loadReference(function (result) {
        // Загрузка данных
        loadData(function (result) {

            // Создадим список структурных подразделений
            $.each(list_ss, function (i, el) {
                $("select#selectThis")
                    .append('<option value=".subdivisions' + el.id + '">' + (lang === 'ru' ? el.name_subdivisions_full_ru : el.name_subdivisions_full_en) + '</option>');
            });
            // Сформировать список руководителей проектов
            $.each(list_pm, function (i, el) {
                var user = getObjOflist(dpa.list_users, 'id', el.id_user);
                $("div#list-project-manager ul")
                    .append('<li><input class="filter" data-filter=".pm' + el.id + '" type="checkbox" id="checkbox' + el.id + '"><label class="checkbox-label" for="checkbox' + el.id + '">' + user.surname + ' ' + user.name + '</label></li>');
            });
            // Создадим список проектов
            $.each(list_project, function (i, el) {
                // Определим тип
                var type = null;
                var type_title = null;
                switch (el.id_type_project) {
                    case 1: type = 'strategic'; type_title = langView('text_type_title_strategic', langs); break;
                    case 2: type = 'normative'; type_title = langView('text_type_title_normative', langs); break;
                }
                var status = null;
                switch (el.id_status_project) {
                    case 0: status = 'status-open'; break;
                    case 1: status = 'status-close'; break;
                    case 2: status = 'status-pause'; break;
                }
                var ss = getObjOflist(dpa.list_structural_subdivisions, 'id', el.id_structural_subdivisions);

                $("section.cd-gallery ul")
                    .append('<li class="mix ' + type + ' pm' + el.id_project_manager + ' ' + status + ' subdivisions' + el.id_structural_subdivisions + '"><a href="#" id="' + el.id + '"><img src="../../Images/project/pm' + el.id_project_manager + '.jpg" alt=""><div class="project-men"><p class="' + status + '">' + el.name_project_ru + '</p></div><div class="project-info"><h2>' + (ss !== null ? ss.name_subdivisions_ru : '?') + '</h2><p>' + type_title + (el.spp_sap !== "" ? ' (' + el.spp_sap + ')' : '') + '</p></div></a></li>');
            });

            // Инициализация окна правки проекта 
            //confirm_edit_project.init();

            // Инициализация окна проект детально
            project_detali.init();


            // Событие выбора проекта
            $('.cd-gallery ul li a').on('click', function () {
                event.preventDefault();
                // Определим id проекта
                var id = $(this).attr('id');
                project_detali.view(id, 0);

            });

            // Событие создание нового проекта
            $('a#new-project').on('click', function () {
                event.preventDefault();
                project_detali.view(0, 1);

            });

            //************************
            //open/close lateral filter
            $('.cd-filter-trigger').on('click', function () {
                triggerFilter(true);
            });
            $('.cd-filter .cd-close').on('click', function () {
                triggerFilter(false);
            });

            function triggerFilter($bool) {
                var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
                elementsToTrigger.each(function () {
                    $(this).toggleClass('filter-is-visible', $bool);
                });
            }

            //mobile version - detect click event on filters tab
            var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
                filter_tab_placeholder_default_value = 'Select',
                filter_tab_placeholder_text = filter_tab_placeholder.text();

            $('.cd-tab-filter li').on('click', function (event) {
                //detect which tab filter item was selected
                var selected_filter = $(event.target).data('type');

                //check if user has clicked the placeholder item
                if ($(event.target).is(filter_tab_placeholder)) {
                    (filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value);
                    $('.cd-tab-filter').toggleClass('is-open');

                    //check if user has clicked a filter already selected 
                } else if (filter_tab_placeholder.data('type') == selected_filter) {
                    filter_tab_placeholder.text($(event.target).text());
                    $('.cd-tab-filter').removeClass('is-open');

                } else {
                    //close the dropdown and change placeholder text/data-type value
                    $('.cd-tab-filter').removeClass('is-open');
                    filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
                    filter_tab_placeholder_text = $(event.target).text();

                    //add class selected to the selected filter item
                    $('.cd-tab-filter .selected').removeClass('selected');
                    $(event.target).addClass('selected');
                }
            });

            //close filter dropdown inside lateral .cd-filter 
            $('.cd-filter-block h4').on('click', function () {
                $(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
            });

            //fix lateral filter and gallery on scrolling
            $(window).on('scroll', function () {
                (!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
            });

            function fixGallery() {
                var offsetTop = $('.cd-main-content').offset().top,
                    scrollTop = $(window).scrollTop();
                (scrollTop >= offsetTop) ? $('.cd-main-content').addClass('is-fixed') : $('.cd-main-content').removeClass('is-fixed');
            }

            /************************************
                MitItUp filter settings
                More details: 
                https://mixitup.kunkalabs.com/
                or:
                http://codepen.io/patrickkunka/
            *************************************/

            buttonFilter.init();
            $('.cd-gallery ul').mixItUp({
                controls: {
                    enable: false
                },
                callbacks: {
                    onMixStart: function () {
                        $('.cd-fail-message').fadeOut(200);
                    },
                    onMixFail: function () {
                        $('.cd-fail-message').fadeIn(200);
                    }
                }
            });

            //search filtering
            //credits http://codepen.io/edprats/pen/pzAdg
            var inputText;
            var $matching = $();

            var delay = (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();

            $(".cd-filter-content input[type='search']").keyup(function () {
                // Delay function invoked to make sure user stopped typing
                delay(function () {
                    inputText = $(".cd-filter-content input[type='search']").val().toLowerCase();
                    // Check to see if input field is empty
                    if ((inputText.length) > 0) {
                        $('.mix').each(function () {
                            var $this = $(this);

                            // add item to be filtered out if input text matches items inside the title   
                            if ($this.attr('class').toLowerCase().match(inputText)) {
                                $matching = $matching.add(this);
                            } else {
                                // removes any previously matched item
                                $matching = $matching.not(this);
                            }
                        });
                        $('.cd-gallery ul').mixItUp('filter', $matching);
                    } else {
                        // resets the filter to show all item if input is empty
                        $('.cd-gallery ul').mixItUp('filter', 'all');
                        //$('.cd-gallery ul').mixItUp('filter', '.status-open');
                    }
                }, 200);
            });
            //************************
            //triggerFilter(true);
            //triggerFilter(false);

            //$('.cd-gallery ul').mixItUp('filter', 'status-open');
            $('.cd-gallery ul').mixItUp('filter', '.status-open');
            //$('.cd-fail-message').fadeOut(200);
        });
    });




});

/*****************************************************
	MixItUp - Define a single object literal 
	to contain all filter custom functionality
*****************************************************/
var buttonFilter = {
    // Declare any variables we will need as properties of the object
    $filters: null,
    groups: [],
    outputArray: [],
    outputString: '',

    // The "init" method will run on document ready and cache any jQuery objects we will need.
    init: function () {
        var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.

        self.$filters = $('.cd-main-content');
        self.$container = $('.cd-gallery ul');

        self.$filters.find('.cd-filters').each(function () {
            var $this = $(this);

            self.groups.push({
                $inputs: $this.find('.filter'),
                active: '',
                tracker: false
            });
        });

        self.bindHandlers();
    },

    // The "bindHandlers" method will listen for whenever a button is clicked. 
    bindHandlers: function () {
        var self = this;

        self.$filters.on('click', 'a', function (e) {
            self.parseFilters();
        });
        self.$filters.on('change', function () {
            self.parseFilters();
        });
    },

    parseFilters: function () {
        var self = this;

        // loop through each filter group and grap the active filter from each one.
        for (var i = 0, group; group = self.groups[i]; i++) {
            group.active = [];
            group.$inputs.each(function () {
                var $this = $(this);
                if ($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) {
                    if ($this.is(':checked')) {
                        group.active.push($this.attr('data-filter'));
                    }
                } else if ($this.is('select')) {
                    group.active.push($this.val());
                } else if ($this.find('.selected').length > 0) {
                    group.active.push($this.attr('data-filter'));
                }
            });
        }
        self.concatenate();
    },

    concatenate: function () {
        var self = this;

        self.outputString = ''; // Reset output string

        for (var i = 0, group; group = self.groups[i]; i++) {
            self.outputString += group.active;
        }

        // If the output string is empty, show all rather than none:    
        !self.outputString.length && (self.outputString = 'all');
        //!self.outputString.length && (self.outputString = '.status-open');
        // Send the output string to MixItUp via the 'filter' method:    
        if (self.$container.mixItUp('isLoaded')) {
            self.$container.mixItUp('filter', self.outputString);
        }
    }
};

/*****************************************************
Функции для работы с проектами
*****************************************************/

