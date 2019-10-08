
var g = null;

var out_grGantt = function () {

    g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day');
    g.setShowRes(1); // Show/Hide Responsible (0/1)
    g.setShowDur(1); // Show/Hide Duration (0/1)
    g.setShowComp(1); // Show/Hide % Complete(0/1)
    g.setCaptionType('Resource');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
    //var gr = new Graphics();
    if (g) {
        g.AddTaskItem(new JSGantt.TaskItem(1, 'Define Chart API', '', '', 'ff0000', 'http://google.com', 0, 'Brian', 0, 1, 0, 1));
        g.AddTaskItem(new JSGantt.TaskItem(11, 'Chart Object', '7/20/2008', '7/20/2008', 'ff00ff', 'http://www.yahoo.com', 1, 'Shlomy', 100, 0, 1, 1));
        g.AddTaskItem(new JSGantt.TaskItem(12, 'Task Objects', '', '', '00ff00', '', 0, 'Shlomy', 40, 1, 1, 1));
        g.AddTaskItem(new JSGantt.TaskItem(121, 'Constructor Proc', '7/21/2008', '8/9/2008', '00ffff', 'http://www.yahoo.com', 0, 'Brian T.', 60, 0, 12, 1));
        g.AddTaskItem(new JSGantt.TaskItem(122, 'Task Variables', '8/6/2008', '8/11/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 12, 1, 121));
        g.AddTaskItem(new JSGantt.TaskItem(123, 'Task by Minute/Hour', '8/6/2008', '8/11/2008 12:00', 'ffff00', 'http://google.com', 0, 'Ilan', 60, 0, 12, 1, 121));
        g.AddTaskItem(new JSGantt.TaskItem(124, 'Task Functions', '8/9/2008', '8/29/2008', 'ff0000', 'http://google.com', 0, 'Anyone', 60, 0, 12, 1, 0, 'This is another caption'));
        g.AddTaskItem(new JSGantt.TaskItem(2, 'Create HTML Shell', '8/24/2008', '8/25/2008', 'ffff00', 'http://google.com', 0, 'Brian', 20, 0, 0, 1, 122));
        g.AddTaskItem(new JSGantt.TaskItem(3, 'Code Javascript', '', '', 'ff0000', 'http://google.com', 0, 'Brian', 0, 1, 0, 1));
        g.AddTaskItem(new JSGantt.TaskItem(31, 'Define Variables', '7/25/2008', '8/17/2008', 'ff00ff', 'http://google.com', 0, 'Brian', 30, 0, 3, 1, '', 'Caption 1'));
        g.AddTaskItem(new JSGantt.TaskItem(32, 'Calculate Chart Size', '8/15/2008', '8/24/2008', '00ff00', 'http://google.com', 0, 'Shlomy', 40, 0, 3, 1));
        g.AddTaskItem(new JSGantt.TaskItem(33, 'Draw Taks Items', '', '', '00ff00', 'http://google.com', 0, 'Someone', 40, 1, 3, 1));
        g.AddTaskItem(new JSGantt.TaskItem(332, 'Task Label Table', '8/6/2008', '8/11/2008', '0000ff', 'http://google.com', 0, 'Brian', 60, 0, 33, 1));
        g.AddTaskItem(new JSGantt.TaskItem(333, 'Task Scrolling Grid', '8/9/2008', '8/20/2008', '0000ff', 'http://google.com', 0, 'Brian', 60, 0, 33, 1));
        g.AddTaskItem(new JSGantt.TaskItem(34, 'Draw Task Bars', '', '', '990000', 'http://google.com', 0, 'Anybody', 60, 1, 3, 0));
        g.AddTaskItem(new JSGantt.TaskItem(341, 'Loop each Task', '8/26/2008', '9/11/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
        g.AddTaskItem(new JSGantt.TaskItem(342, 'Calculate Start/Stop', '9/12/2008', '10/18/2008', 'ff6666', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
        g.AddTaskItem(new JSGantt.TaskItem(343, 'Draw Task Div', '10/13/2008', '10/17/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
        g.AddTaskItem(new JSGantt.TaskItem(344, 'Draw Completion Div', '10/17/2008', '11/04/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1, "342,343"));
        g.AddTaskItem(new JSGantt.TaskItem(35, 'Make Updates', '12/17/2008', '2/04/2009', 'f600f6', 'http://google.com', 0, 'Brian', 30, 0, 3, 1));
        g.Draw();
        g.DrawDependencies();
    }
    else {
        alert("not defined");
    }
};

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
        //g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day'),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        list_currency = [{ value: 1, text: langView('text_kgrivna', langs) }, { value: 2, text: langView('text_kdolar', langs) }], // Валюта
        user = null,
        pm = null,
        chain_pm = null,
        while_pm = '0',
        list_project = [],
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
                    //pm.id = 10; // !!!!!!!!! тест
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
                            list_project.length === 0 ? list_pm.push(pm) : [];
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
        // Получить статус проекта
        getStatusProject = function (id_status_project) {
            switch (id_status_project) {
                case 0: $('.cd-project-content div h2').removeClass('status-close status-pause').addClass('status-open'); return langView('text_status_open', langs);
                case 1: $('.cd-project-content div h2').removeClass('status-open status-pause').addClass('status-close'); return langView('text_status_close', langs);
                case 2: $('.cd-project-content div h2').removeClass('status-open status-close').addClass('status-pause'); return langView('text_status_pause', langs);
                default: return null;
            }
        },
        // Получить тип проекта для формирования галереи
        getTypeProjectGallery = function (id_type_project) {
            switch (id_type_project) {
                case 1: return 'strategic';
                case 2: return 'normative';
            }
        },
        // Получить статус для формирования галереи
        getStatusProjectGallery = function (id_status_project) {
            switch (id_status_project) {
                case 0: return 'status-open';
                case 1: return 'status-close';
                case 2: return 'status-pause';
            }
        },
        // Добавить карту к галереи
        addCardGallery = function (project) {
            if (project) {
                var type = getTypeProjectGallery(project.id_type_project);
                var type_title = prj.getTypeProjectOfProject(project);
                var status = getStatusProjectGallery(project.id_status_project);
                var ss = prj.getStructuralSubdivisionsOfID(project.id_structural_subdivisions);
                $("section.cd-gallery ul")
                    .append('<li class="mix ' + type + ' pm' + project.id_project_manager + ' ' + status + ' subdivisions' + project.id_structural_subdivisions + '"><a href="#" id="' + project.id + '"><img src="../../Images/project/pm' + project.id_project_manager + '.jpg" alt=""><div class="project-men"><p class="' + status + '">' + project.name_project_ru + '</p></div><div class="project-info"><h2>' + (ss !== null ? ss.name_subdivisions_ru : '?') + '</h2><p>' + type_title + (project.spp_sap !== "" ? ' (' + project.spp_sap + ')' : '') + '</p></div></a></li>');
                // Привяжим событие выбора проекта
                $("section.cd-gallery ul li a#" + project.id).on('click', function () {
                    event.preventDefault();
                    // Определим id проекта
                    var id = $(this).attr('id');
                    project_detali.view(id, 0);

                });
            }
        },
        // Обновить карту в галерее
        updateCardGallery = function (project) {
            if (project) {
                var type = getTypeProjectGallery(project.id_type_project);
                var type_title = prj.getTypeProjectOfProject(project);
                var status = getStatusProjectGallery(project.id_status_project);
                var ss = prj.getStructuralSubdivisionsOfID(project.id_structural_subdivisions);
                // Привяжим событие выбора проекта
                var li = $("section.cd-gallery ul li a#" + project.id).parent();
                var a = li.children()[0];
                var img = $(a).children()[0];
                var p_div_men = $($(a).children()[1]).children()[0];
                var h2_div_info = $($(a).children()[2]).children()[0];
                var p_div_info = $($(a).children()[2]).children()[1];
                li.removeClass().addClass("mix " + type + " pm" + project.id_project_manager + " " + status + " subdivisions" + project.id_structural_subdivisions);
                $(img).attr('src', "../../Images/project/pm" + project.id_project_manager + ".jpg").attr('alt', '');
                $(p_div_men).removeClass().addClass(status).text(project.name_project_ru);
                $(h2_div_info).text((ss !== null ? ss.name_subdivisions_ru : '?'));
                $(p_div_info).text(type_title + (project.spp_sap !== "" ? ' (' + project.spp_sap + ')' : ''));
            }
        },
        // Загрузить галерею
        loadGallery = function (list_project) {
            $("section.cd-gallery ul").empty();
            $.each(list_project, function (i, el) {
                addCardGallery(el);
            })
        },
        // Окно проекты детально
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
            edit_select_name_performer_project: null,                   // Подрдная организаия
            view_input_name_performer_project: null,                    // Подрдная организаия
            view_input_email_performer_project: null,                   // Email подрядной организации
            view_input_phone_performer_project: null,                   // Телефон подрядной организации
            view_input_name_boss_performer_project: null,               // ФИО BOSSa подрядной организации
            view_input_phone_boss_performer_project: null,              // Телефон BOSSa подрядной организации
            //  BUDGET ------------------------------------------------------------
            edit_input_budget_project: null,                            // Бюджет проекта
            edit_select_budget_currency_project: null,                  // Бюджет валюта проекта
            view_input_budget_project: null,                            // Бюджет проекта

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
            //  MANAGER ------------------------------------------------------------
            view_input_project_manager_surname: null,                   // Фамилия менеджера проектов
            view_input_project_manager_name: null,                      // Имя менеджера проектов
            view_input_project_manager_patronymic: null,                // Отчество менеджера проектов
            view_input_project_manager_email: null,                     // Email менеджера проектов
            view_input_project_manager_mobil_phone: null,               // Моб. телефон менеджера проектов
            view_input_project_manager_work_phone: null,                // Раб. телефон менеджера проектов

            edit_select_project_manager: null,                          // Менеджер проекта
            //  SYSTEM ------------------------------------------------------------
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

                //  BUDJET --------------------------------------------------------------------------------
                if (mode === 1 || mode === 4) {


                    if (project_detali.edit_input_budget_project.val() !== null && project_detali.edit_input_budget_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_budget_currency_project, "validate-budget", "Укажите валюту бюджета");
                    } else {
                        if (Number(project_detali.edit_select_budget_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_budget_project, "validate-budget", "Укажите сумму бюджета")
                        }
                    }
                    if (project_detali.edit_input_contract_project.val() !== null && project_detali.edit_input_contract_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_contract_currency_project, "validate-budget", "Укажите валюту контракта");
                    } else {
                        if (Number(project_detali.edit_select_contract_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_contract_project, "validate-budget", "Укажите сумму контракта")
                        }
                    }
                    if (project_detali.edit_input_contract_engineering_project.val() !== null && project_detali.edit_input_contract_engineering_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_contract_engineering_currency_project, "validate-budget", "Укажите валюту оплаты ИР (по контракту)");
                    } else {
                        if (Number(project_detali.edit_select_contract_engineering_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_contract_engineering_project, "validate-budget", "Укажите сумму оплаты ИР (по контракту)")
                        }
                    }
                    if (project_detali.edit_input_contract_equipment_project.val() !== null && project_detali.edit_input_contract_equipment_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_contract_equipment_currency_project, "validate-budget", "Укажите валюту оплаты оборудования (по контракту)");
                    } else {
                        if (Number(project_detali.edit_select_contract_equipment_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_contract_equipment_project, "validate-budget", "Укажите сумму оплаты оборудования (по контракту)")
                        }
                    }
                    if (project_detali.edit_input_contract_construction_project.val() !== null && project_detali.edit_input_contract_construction_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_contract_construction_currency_project, "validate-budget", "Укажите валюту оплаты СМР (по контракту)");
                    } else {
                        if (Number(project_detali.edit_select_contract_construction_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_contract_construction_project, "validate-budget", "Укажите сумму оплаты СМР (по контракту)")
                        }
                    }
                    if (project_detali.edit_input_contract_commissioning_project.val() !== null && project_detali.edit_input_contract_commissioning_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_contract_commissioning_currency_project, "validate-budget", "Укажите валюту оплаты ПНР (по контракту)");
                    } else {
                        if (Number(project_detali.edit_select_contract_commissioning_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_contract_commissioning_project, "validate-budget", "Укажите сумму оплаты ПНР (по контракту)")
                        }
                    }
                    if (project_detali.edit_input_contract_other_project.val() !== null && project_detali.edit_input_contract_other_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_contract_other_currency_project, "validate-budget", "Укажите валюту оплаты других работ (по контракту)");
                    } else {
                        if (Number(project_detali.edit_select_contract_other_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_contract_other_project, "validate-budget", "Укажите сумму оплаты других работ (по контракту)")
                        }
                    }
                    //---------
                    if (project_detali.edit_input_payment_engineering_project.val() !== null && project_detali.edit_input_payment_engineering_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_payment_engineering_currency_project, "validate-budget", "Укажите валюту оплаты ИР (по факту)");
                    } else {
                        if (Number(project_detali.edit_select_payment_engineering_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_payment_engineering_project, "validate-budget", "Укажите сумму оплаты ИР (по факту)")
                        }
                    }
                    if (project_detali.edit_input_payment_equipment_project.val() !== null && project_detali.edit_input_payment_equipment_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_payment_equipment_currency_project, "validate-budget", "Укажите валюту оплаты оборудования (по факту)");
                    } else {
                        if (Number(project_detali.edit_select_payment_equipment_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_payment_equipment_project, "validate-budget", "Укажите сумму оплаты оборудования (по факту)")
                        }
                    }
                    if (project_detali.edit_input_payment_construction_project.val() !== null && project_detali.edit_input_payment_construction_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_payment_construction_currency_project, "validate-budget", "Укажите валюту оплаты СМР (по факту)");
                    } else {
                        if (Number(project_detali.edit_select_payment_construction_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_payment_construction_project, "validate-budget", "Укажите сумму оплаты СМР (по факту)")
                        }
                    }
                    if (project_detali.edit_input_payment_commissioning_project.val() !== null && project_detali.edit_input_payment_commissioning_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_payment_commissioning_currency_project, "validate-budget", "Укажите валюту оплаты ПНР (по факту)");
                    } else {
                        if (Number(project_detali.edit_select_payment_commissioning_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_payment_commissioning_project, "validate-budget", "Укажите сумму оплаты ПНР (по факту)")
                        }
                    }
                    if (project_detali.edit_input_payment_other_project.val() !== null && project_detali.edit_input_payment_other_project.val() !== "") {
                        valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_payment_other_currency_project, "validate-budget", "Укажите валюту оплаты других работ (по факту)");
                    } else {
                        if (Number(project_detali.edit_select_payment_other_currency_project.val()) !== -1) {
                            valid = valid && project_detali.checkIsNullOfMessage(project_detali.edit_input_payment_other_project, "validate-budget", "Укажите сумму оплаты других работ (по факту)")
                        }
                    }
                }
                //  MANAGER --------------------------------------------------------------------------------
                if (mode === 1 || mode === 5) {
                    valid = valid && project_detali.checkSelectValOfMessage(project_detali.edit_select_project_manager, "validate-manager", "Укажите руководителя проектов и программ");
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
                // Настройка перемещения названия полей на форме
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
                // Инициализаия кнопки "Добавить проект save-all"
                $('input#save-all').on('click', function () {
                    var valid = project_detali.validationConfirm(1);
                    if (valid) {
                        var project = project_detali.get_project(1);
                        prj.postAsyncListProjects(project, function (result_id) {
                            if (result_id > 0) {
                                // Окей, записали
                                project_detali.view(result_id, 0,
                                    function (result_project) {
                                        // Добавим в галерею
                                        addCardGallery(result_project);
                                        // Отобразить в галерее
                                        var selected_filter = $('.cd-tab-filter .selected').parent().attr('data-filter');
                                        $('.cd-gallery ul').mixItUp('filter', selected_filter !== undefined ? selected_filter : 'all');
                                    });

                            } else {
                                project_detali.updateTips("validate-info", "Ошибка добавления нового проекта");
                            }
                        });

                    }

                });
                $('input#cancel-all').on('click', function () {
                    event.preventDefault();
                    project_detali.content.removeClass('is-visible');
                });
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
                                project_detali.view(project_detali.id_project, 0,
                                    function (result_project) {
                                        updateCardGallery(result_project);
                                    });
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
                                project_detali.view(project_detali.id_project, 0,
                                    function (result_project) {
                                        updateCardGallery(result_project);
                                    });
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
                                project_detali.view(project_detali.id_project, 0,
                                    function (result_project) {
                                        updateCardGallery(result_project);
                                    });
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
                //------------------------------------------------------------------------------------------------
                // MANAGER ------------------------------------------------------------
                // Инициализаия кнопки "Редактировать manager"
                //----------------------------------------------------------------------
                $('input#edit-manager').on('click', function () {
                    project_detali.view(project_detali.id_project, 5);
                });
                // Инициализаия кнопки "Редактировать save-manager"
                $('input#save-manager').on('click', function () {
                    var valid = project_detali.validationConfirm(5);
                    if (valid) {
                        var project = project_detali.get_project(5);
                        prj.putAsyncListProjects(project, function (result_id) {
                            if (result_id > 0) {
                                // Окей, записали
                                project_detali.view(project_detali.id_project, 0,
                                    function (result_project) {
                                        updateCardGallery(result_project);
                                    });
                            } else {
                                project_detali.updateTips("validate-manager", "Ошибка записи проекта MANAGER");
                            }
                        });
                    }
                });
                // Инициализаия кнопки "Отмена cancel-budget"
                $('input#cancel-manager').on('click', function () {
                    project_detali.view(project_detali.id_project, 0);
                });
                // Менеджер проекта показать
                this.view_input_project_manager_surname = $('input#cd-project-manager-surname-view').val('');
                this.view_input_project_manager_name = $('input#cd-project-manager-name-view').val('');
                this.view_input_project_manager_patronymic = $('input#cd-project-manager-patronymic-view').val('');
                this.view_input_project_manager_email = $('input#cd-project-manager-email-view').val('');
                this.view_input_project_manager_mobil_phone = $('input#cd-project-manager-mobil-phone-view').val('');
                this.view_input_project_manager_work_phone = $('input#cd-project-manager-work-phone-view').val('');
                // Менеджер проекта править
                this.edit_select_project_manager = cd_initSelect(
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
            view: function (id, mode, callback) {
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
                        project_detali.set_mode(mode, result_project.id_project_manager == pm.id);
                        //!!! Добавить обновление списка и карточек на эеране
                        LockScreenOff();
                        if (typeof callback === 'function') {
                            callback(result_project);
                        }
                    });
                }
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
                    case 5: project_detali.mode_project_edit_manager(project); break;
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
                    //  MANAGER ------------------------------------------------------------
                    if (project.ProjectManager) {
                        var user = prj.getUsersOfID(project.ProjectManager.id_user)
                        if (user) {
                            project_detali.viewCheckVal(this.view_input_project_manager_surname, dpa.getSurnameUsers(user));
                            project_detali.viewCheckVal(this.view_input_project_manager_name, dpa.getNameUsers(user));
                            project_detali.viewCheckVal(this.view_input_project_manager_patronymic, dpa.getPatronymicUsers(user));
                            project_detali.viewCheckVal(this.view_input_project_manager_email, prj.getEmailProjectManagerOfID(project.ProjectManager));
                            project_detali.viewCheckVal(this.view_input_project_manager_mobil_phone, prj.getPhoneMobileProjectManagerOfID(project.ProjectManager));
                            project_detali.viewCheckVal(this.view_input_project_manager_work_phone, prj.getPhoneWorkProjectManagerOfID(project.ProjectManager));
                        }
                    }
                    //  STEPS ------------------------------------------------------------
                    if (project.StagesProject) {
                        g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'month');
                        g.setShowRes(1); // Show/Hide Responsible (0/1)
                        g.setShowDur(1); // Show/Hide Duration (0/1)
                        g.setShowComp(1); // Show/Hide % Complete(0/1)
                        g.setCaptionType('Resource');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
                        if (g) {
                                //g.AddTaskItem(new JSGantt.TaskItem(1, 'Define Chart API', '', '', 'ff0000', 'http://google.com', 0, 'Brian', 0, 1, 0, 1));
                                //g.AddTaskItem(new JSGantt.TaskItem(11, 'Chart Object', '20.07.2019', '21.08.2019', 'ff00ff', 'http://www.yahoo.com', 1, 'Shlomy', 100, 0, 1, 1));
                                $.each(project.StagesProject, function (i, el) {
                                    //var d = moment(el.start).format("MM.DD.YYYY");
                                g.AddTaskItem(new JSGantt.TaskItem(el.id,
                                    el.TemplatesStagesProject.stages_project_ru,
                                    el.start != null ? moment(el.start).format("DD.MM.YYYY") : '',
                                    el.stop != null ? moment(el.stop).format("DD.MM.YYYY") : '',
                                    'ff00ff',
                                    '',
                                    el.mile != null ? el.mile : 0,
                                    el.resource != null ? el.resource : '',
                                    el.persent,
                                    el.group,
                                    el.parent_id != null ? el.parent_id : 0,
                                    1,
                                    el.depend));
                            });

                            //TaskItem (pID, pName, pStart, pEnd, pColor, pLink, pMile, pRes, pComp, pGroup, pParent, pOpen, pDepend)
                            //pID: (обязательно) - уникальный идентификатор, используемый для идентификации каждой строки родительских функций и для установки идентификатора домена для скрытия / отображения
                            //pName: (обязательно) это ярлык задачи
                            //pStart: (обязательно) дата начала задачи, можно ввести пустую дату ('') для групп. Вы также можете ввести конкретное время (2/10/2008 12:00) для дополнительного разрешения или полдня.
                            //    pEnd: (обязательно) дата окончания задачи, можно ввести пустую дату ('') для групп
                            //pColor: (требуется) цвет html для этой задачи; например '00ff00'
                            //pLink: (необязательно) любая http-ссылка, по которой переходили при щелчке панели задач.
                            //    pMile: (необязательно) представляет веху
                            //pRes: (необязательно) имя ресурса
                            //pComp: (обязательно) процент выполнения
                            //pGroup: (необязательно) указывает, является ли это группа (родительская) - 0 = НЕ родительский; 1 = IS Parent
                            //pParent: (обязательно) идентифицирует родительский pID, это делает эту задачу дочерней по отношению к идентифицированной задаче
                            //pOpen: изначально можно установить закрытие папки при первом рисовании графика
                            //pDepend: необязательный список идентификаторов, эта задача зависит от ... линии, нарисованной из зависимых от этого элемента
                            //pCaption: необязательный заголовок, который будет добавлен после панели задач, если для CaptionType установлено значение «Caption»
                            // * Вы должны иметь возможность добавлять элементы на график в режиме реального времени с помощью JavaScript и выполнения команды "g.Draw ()".
                            g.Draw();
                            g.DrawDependencies();
                        } else {
                            alert("not defined");
                        }

                    };
                    //out_grGantt();
                    //g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day');
                    //g.setShowRes(1); // Show/Hide Responsible (0/1)
                    //g.setShowDur(1); // Show/Hide Duration (0/1)
                    //g.setShowComp(1); // Show/Hide % Complete(0/1)
                    //g.setCaptionType('Resource');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
                    ////var gr = new Graphics();
                    //if (g) {
                    //    g.AddTaskItem(new JSGantt.TaskItem(1, 'Define Chart API', '', '', 'ff0000', 'http://google.com', 0, 'Brian', 0, 1, 0, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(11, 'Chart Object', '7/20/2008', '7/20/2008', 'ff00ff', 'http://www.yahoo.com', 1, 'Shlomy', 100, 0, 1, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(12, 'Task Objects', '', '', '00ff00', '', 0, 'Shlomy', 40, 1, 1, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(121, 'Constructor Proc', '7/21/2008', '8/9/2008', '00ffff', 'http://www.yahoo.com', 0, 'Brian T.', 60, 0, 12, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(122, 'Task Variables', '8/6/2008', '8/11/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 12, 1, 121));
                    //    g.AddTaskItem(new JSGantt.TaskItem(123, 'Task by Minute/Hour', '8/6/2008', '8/11/2008 12:00', 'ffff00', 'http://google.com', 0, 'Ilan', 60, 0, 12, 1, 121));
                    //    g.AddTaskItem(new JSGantt.TaskItem(124, 'Task Functions', '8/9/2008', '8/29/2008', 'ff0000', 'http://google.com', 0, 'Anyone', 60, 0, 12, 1, 0, 'This is another caption'));
                    //    g.AddTaskItem(new JSGantt.TaskItem(2, 'Create HTML Shell', '8/24/2008', '8/25/2008', 'ffff00', 'http://google.com', 0, 'Brian', 20, 0, 0, 1, 122));
                    //    g.AddTaskItem(new JSGantt.TaskItem(3, 'Code Javascript', '', '', 'ff0000', 'http://google.com', 0, 'Brian', 0, 1, 0, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(31, 'Define Variables', '7/25/2008', '8/17/2008', 'ff00ff', 'http://google.com', 0, 'Brian', 30, 0, 3, 1, '', 'Caption 1'));
                    //    g.AddTaskItem(new JSGantt.TaskItem(32, 'Calculate Chart Size', '8/15/2008', '8/24/2008', '00ff00', 'http://google.com', 0, 'Shlomy', 40, 0, 3, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(33, 'Draw Taks Items', '', '', '00ff00', 'http://google.com', 0, 'Someone', 40, 1, 3, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(332, 'Task Label Table', '8/6/2008', '8/11/2008', '0000ff', 'http://google.com', 0, 'Brian', 60, 0, 33, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(333, 'Task Scrolling Grid', '8/9/2008', '8/20/2008', '0000ff', 'http://google.com', 0, 'Brian', 60, 0, 33, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(34, 'Draw Task Bars', '', '', '990000', 'http://google.com', 0, 'Anybody', 60, 1, 3, 0));
                    //    g.AddTaskItem(new JSGantt.TaskItem(341, 'Loop each Task', '8/26/2008', '9/11/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(342, 'Calculate Start/Stop', '9/12/2008', '10/18/2008', 'ff6666', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(343, 'Draw Task Div', '10/13/2008', '10/17/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
                    //    g.AddTaskItem(new JSGantt.TaskItem(344, 'Draw Completion Div', '10/17/2008', '11/04/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1, "342,343"));
                    //    g.AddTaskItem(new JSGantt.TaskItem(35, 'Make Updates', '12/17/2008', '2/04/2009', 'f600f6', 'http://google.com', 0, 'Brian', 30, 0, 3, 1));
                    //    g.Draw();
                    //    g.DrawDependencies();
                    //}
                    //else {
                    //    alert("not defined");
                    //}
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
                project_detali.viewCheckVal(this.edit_input_budget_project, '');
                project_detali.viewCheckVal(this.edit_select_budget_currency_project, -1);
                project_detali.viewCheckVal(this.edit_input_contract_project, '');
                project_detali.viewCheckVal(this.edit_select_contract_currency_project, -1);

                project_detali.viewCheckVal(this.edit_input_contract_engineering_project, '');
                project_detali.viewCheckVal(this.edit_select_contract_engineering_currency_project, -1);
                project_detali.viewCheckVal(this.edit_input_payment_engineering_project, '');
                project_detali.viewCheckVal(this.edit_select_payment_engineering_currency_project, -1);

                project_detali.viewCheckVal(this.edit_input_contract_equipment_project, '');
                project_detali.viewCheckVal(this.edit_select_contract_equipment_currency_project, -1);
                project_detali.viewCheckVal(this.edit_input_payment_equipment_project, '');
                project_detali.viewCheckVal(this.edit_select_payment_equipment_currency_project, -1);

                project_detali.viewCheckVal(this.edit_input_contract_construction_project, '');
                project_detali.viewCheckVal(this.edit_select_contract_construction_currency_project, -1);
                project_detali.viewCheckVal(this.edit_input_payment_construction_project, '');
                project_detali.viewCheckVal(this.edit_select_payment_construction_currency_project, -1);

                project_detali.viewCheckVal(this.edit_input_contract_commissioning_project, '');
                project_detali.viewCheckVal(this.edit_select_contract_commissioning_currency_project, -1);
                project_detali.viewCheckVal(this.edit_input_payment_commissioning_project, '');
                project_detali.viewCheckVal(this.edit_select_payment_commissioning_currency_project, -1);

                project_detali.viewCheckVal(this.edit_input_contract_other_project, '');
                project_detali.viewCheckVal(this.edit_select_contract_other_currency_project, -1);
                project_detali.viewCheckVal(this.edit_input_payment_other_project, '');
                project_detali.viewCheckVal(this.edit_select_payment_other_currency_project, -1);
                // EDIT MANAGER
                project_detali.viewCheckVal(this.edit_select_project_manager, pm.id !== null ? pm.id : -1);
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
            // EDIT MANAGER
            mode_project_edit_manager: function (project) {
                if (project) {
                    project_detali.viewCheckVal(this.edit_select_project_manager, project.id_project_manager !== null ? project.id_project_manager : -1);
                }
            },

            // Установить режим окна детально
            set_mode: function (mode, edit) {
                $('.mode-view, .mode-add, .mode-edit, .mode-edit-info, .mode-edit-performer, .mode-edit-budget, .mode-edit-manager').hide();
                $('div.mode-edit').removeClass('mode-edit');
                $(".validate-info").text('');
                $(".validate-performer").text('');
                $(".validate-budget").text('');
                $(".validate-manager").text('');
                switch (mode) {
                    case 0:
                        project_detali.mode = 0;
                        $('.mode-view').show();
                        if (edit) {
                            $('input#edit-info').show();
                            $('input#edit-performer').show();
                            $('input#edit-budget').show();
                            $('input#edit-manager').show();

                        } else {
                            $('input#edit-info').hide();
                            $('input#edit-performer').hide();
                            $('input#edit-budget').hide();
                            $('input#edit-manager').hide();
                        }
                        break;
                    case 1:
                        project_detali.mode = 1;
                        $('.mode-add').show();
                        $('div#accordion-info').addClass('mode-edit');
                        $('div#accordion-performer').addClass('mode-edit');
                        $('div#accordion-budget').addClass('mode-edit');
                        $('div#accordion-manager').addClass('mode-edit');
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
                    case 5:
                        project_detali.mode = 5;
                        $('.mode-edit-manager').show();
                        $('div#accordion-manager').addClass('mode-edit');
                        break;
                }
            },
            // Получить новый проект
            get_project: function (mode) {

                var project = {
                    id: mode !== 1 ? project_detali.project.id : 0,
                    id_type_project: mode !== 1 ? project_detali.project.id_type_project : null,
                    id_structural_subdivisions: mode !== 1 ? project_detali.project.id_structural_subdivisions : null,
                    name_project_ru: mode !== 1 ? project_detali.project.name_project_ru : null,
                    name_project_en: mode !== 1 ? project_detali.project.name_project_en : null,
                    goals_project_ru: mode !== 1 ? project_detali.project.goals_project_ru : null,
                    goals_project_en: mode !== 1 ? project_detali.project.goals_project_en : null,
                    id_project_customer: mode !== 1 ? project_detali.project.id_project_customer : null,
                    spp_sap: mode !== 1 ? project_detali.project.spp_sap : null,
                    id_spp_owner: mode !== 1 ? project_detali.project.id_spp_owner : null,
                    start_project: mode !== 1 ? project_detali.project.start_project : null,
                    id_work_performer: mode !== 1 ? project_detali.project.id_work_performer : null,
                    stop_project_contract: mode !== 1 ? project_detali.project.stop_project_contract : null,
                    budget: mode !== 1 ? project_detali.project.budget : null,
                    budget_currency: mode !== 1 ? project_detali.project.budget_currency : null,
                    contract_value: mode !== 1 ? project_detali.project.contract_value : null,
                    contract_currency: mode !== 1 ? project_detali.project.contract_currency : null,
                    contract_engineering_value: mode !== 1 ? project_detali.project.contract_engineering_value : null,
                    contract_engineering_currency: mode !== 1 ? project_detali.project.contract_engineering_currency : null,
                    contract_equipment_value: mode !== 1 ? project_detali.project.contract_equipment_value : null,
                    contract_equipment_currency: mode !== 1 ? project_detali.project.contract_equipment_currency : null,
                    contract_construction_value: mode !== 1 ? project_detali.project.contract_construction_value : null,
                    contract_construction_currency: mode !== 1 ? project_detali.project.contract_construction_currency : null,
                    contract_commissioning_value: mode !== 1 ? project_detali.project.contract_commissioning_value : null,
                    contract_commissioning_currency: mode !== 1 ? project_detali.project.contract_commissioning_currency : null,
                    contract_other_value: mode !== 1 ? project_detali.project.contract_other_value : null,
                    contract_other_currency: mode !== 1 ? project_detali.project.contract_other_currency : null,
                    payment_engineering_value: mode !== 1 ? project_detali.project.payment_engineering_value : null,
                    payment_engineering_currency: mode !== 1 ? project_detali.project.payment_engineering_currency : null,
                    payment_equipment_value: mode !== 1 ? project_detali.project.payment_equipment_value : null,
                    payment_equipment_currency: mode !== 1 ? project_detali.project.payment_equipment_currency : null,
                    payment_construction_value: mode !== 1 ? project_detali.project.payment_construction_value : null,
                    payment_construction_currency: mode !== 1 ? project_detali.project.payment_construction_currency : null,
                    payment_commissioning_value: mode !== 1 ? project_detali.project.payment_commissioning_value : null,
                    payment_commissioning_currency: mode !== 1 ? project_detali.project.payment_commissioning_currency : null,
                    payment_other_value: mode !== 1 ? project_detali.project.payment_other_value : null,
                    payment_other_currency: mode !== 1 ? project_detali.project.payment_other_currency : null,
                    workspace: mode !== 1 ? project_detali.project.workspace : null,
                    id_project_manager: mode !== 1 ? project_detali.project.id_project_manager : null,
                    id_status_project: mode !== 1 ? project_detali.project.id_status_project : null,
                    create: mode !== 1 ? project_detali.project.create : null,
                    create_user: mode !== 1 ? project_detali.project.create_user : null,
                    change: mode !== 1 ? project_detali.project.change : null,
                    change_user: mode !== 1 ? project_detali.project.change_user : null
                };
                //  INFO
                if (mode === 1 || mode === 2) {
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
                if (mode === 1 || mode === 3) {
                    project.id_work_performer = Number(project_detali.edit_select_name_performer_project.val()) > -1 ? Number(project_detali.edit_select_name_performer_project.val()) : null;
                }
                // EDIT BUDJET
                if (mode === 1 || mode === 4) {

                    project.budget = project_detali.edit_input_budget_project.val() !== null && project_detali.edit_input_budget_project.val() !== "" ? Number(project_detali.edit_input_budget_project.val()) : null;
                    project.budget_currency = Number(project_detali.edit_select_budget_currency_project.val()) > -1 ? Number(project_detali.edit_select_budget_currency_project.val()) : null;

                    project.contract_value = project_detali.edit_input_contract_project.val() !== null && project_detali.edit_input_contract_project.val() !== "" ? Number(project_detali.edit_input_contract_project.val()) : null;
                    project.contract_currency = Number(project_detali.edit_select_contract_currency_project.val()) > -1 ? Number(project_detali.edit_select_contract_currency_project.val()) : null;

                    project.contract_engineering_value = project_detali.edit_input_contract_engineering_project.val() !== null && project_detali.edit_input_contract_engineering_project.val() !== "" ? Number(project_detali.edit_input_contract_engineering_project.val()) : null;
                    project.contract_engineering_currency = Number(project_detali.edit_select_contract_engineering_currency_project.val()) > -1 ? Number(project_detali.edit_select_contract_engineering_currency_project.val()) : null;

                    project.contract_equipment_value = project_detali.edit_input_contract_equipment_project.val() !== null && project_detali.edit_input_contract_equipment_project.val() !== "" ? Number(project_detali.edit_input_contract_equipment_project.val()) : null;
                    project.contract_equipment_currency = Number(project_detali.edit_select_contract_equipment_currency_project.val()) > -1 ? Number(project_detali.edit_select_contract_equipment_currency_project.val()) : null;

                    project.contract_construction_value = project_detali.edit_input_contract_construction_project.val() !== null && project_detali.edit_input_contract_construction_project.val() !== "" ? Number(project_detali.edit_input_contract_construction_project.val()) : null;
                    project.contract_construction_currency = Number(project_detali.edit_select_contract_construction_currency_project.val()) > -1 ? Number(project_detali.edit_select_contract_construction_currency_project.val()) : null;

                    project.contract_commissioning_value = project_detali.edit_input_contract_commissioning_project.val() !== null && project_detali.edit_input_contract_commissioning_project.val() !== "" ? Number(project_detali.edit_input_contract_commissioning_project.val()) : null;
                    project.contract_commissioning_currency = Number(project_detali.edit_select_contract_commissioning_currency_project.val()) > -1 ? Number(project_detali.edit_select_contract_commissioning_currency_project.val()) : null;

                    project.contract_other_value = project_detali.edit_input_contract_other_project.val() !== null && project_detali.edit_input_contract_other_project.val() !== "" ? Number(project_detali.edit_input_contract_other_project.val()) : null;
                    project.contract_other_currency = Number(project_detali.edit_select_contract_other_currency_project.val()) > -1 ? Number(project_detali.edit_select_contract_other_currency_project.val()) : null;

                    project.payment_engineering_value = project_detali.edit_input_payment_engineering_project.val() !== null && project_detali.edit_input_payment_engineering_project.val() !== "" ? Number(project_detali.edit_input_payment_engineering_project.val()) : null;
                    project.payment_engineering_currency = Number(project_detali.edit_select_payment_engineering_currency_project.val()) > -1 ? Number(project_detali.edit_select_payment_engineering_currency_project.val()) : null;

                    project.payment_equipment_value = project_detali.edit_input_payment_equipment_project.val() !== null && project_detali.edit_input_payment_equipment_project.val() !== "" ? Number(project_detali.edit_input_payment_equipment_project.val()) : null;
                    project.payment_equipment_currency = Number(project_detali.edit_select_payment_equipment_currency_project.val()) > -1 ? Number(project_detali.edit_select_payment_equipment_currency_project.val()) : null;

                    project.payment_construction_value = project_detali.edit_input_payment_construction_project.val() !== null && project_detali.edit_input_payment_construction_project.val() !== "" ? Number(project_detali.edit_input_payment_construction_project.val()) : null;
                    project.payment_construction_currency = Number(project_detali.edit_select_payment_construction_currency_project.val()) > -1 ? Number(project_detali.edit_select_payment_construction_currency_project.val()) : null;

                    project.payment_commissioning_value = project_detali.edit_input_payment_commissioning_project.val() !== null && project_detali.edit_input_payment_commissioning_project.val() !== "" ? Number(project_detali.edit_input_payment_commissioning_project.val()) : null;
                    project.payment_commissioning_currency = Number(project_detali.edit_select_payment_commissioning_currency_project.val()) > -1 ? Number(project_detali.edit_select_payment_commissioning_currency_project.val()) : null;

                    project.payment_other_value = project_detali.edit_input_payment_other_project.val() !== null && project_detali.edit_input_payment_other_project.val() !== "" ? Number(project_detali.edit_input_payment_other_project.val()) : null;
                    project.payment_other_currency = Number(project_detali.edit_select_payment_other_currency_project.val()) > -1 ? Number(project_detali.edit_select_payment_other_currency_project.val()) : null;
                }
                // EDIT MANAGER
                if (mode === 1 || mode === 5) {
                    project.id_project_manager = Number(project_detali.edit_select_project_manager.val()) > -1 ? Number(project_detali.edit_select_project_manager.val()) : null;
                }
                if (mode === 1) {
                    project.create = toISOStringTZ(new Date());
                    project.create_user = user_name;
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
            loadGallery(list_project);
            //$.each(list_project, function (i, el) {
            //    addCardGallery(el);
            //    // Определим тип
            //    //var type = getTypeProjectGallery(el.id_type_project);
            //    //var type_title = prj.getTypeProjectOfProject(el);
            //    ////switch (el.id_type_project) {
            //    ////    case 1: type = 'strategic'; type_title = langView('text_type_title_strategic', langs); break;
            //    ////    case 2: type = 'normative'; type_title = langView('text_type_title_normative', langs); break;
            //    ////}
            //    //var status = getStatusProjectGallery(el.id_status_project);
            //    ////switch (el.id_status_project) {
            //    ////    case 0: status = 'status-open'; break;
            //    ////    case 1: status = 'status-close'; break;
            //    ////    case 2: status = 'status-pause'; break;
            //    ////}
            //    ////var ss = getObjOflist(dpa.list_structural_subdivisions, 'id', el.id_structural_subdivisions);
            //    //var ss = prj.getStructuralSubdivisionsOfID(el.id_structural_subdivisions);
            //    //$("section.cd-gallery ul")
            //    //    .append('<li class="mix ' + type + ' pm' + el.id_project_manager + ' ' + status + ' subdivisions' + el.id_structural_subdivisions + '"><a href="#" id="' + el.id + '"><img src="../../Images/project/pm' + el.id_project_manager + '.jpg" alt=""><div class="project-men"><p class="' + status + '">' + el.name_project_ru + '</p></div><div class="project-info"><h2>' + (ss !== null ? ss.name_subdivisions_ru : '?') + '</h2><p>' + type_title + (el.spp_sap !== "" ? ' (' + el.spp_sap + ')' : '') + '</p></div></a></li>');
            //});

            // Инициализация окна правки проекта 
            //confirm_edit_project.init();

            // Инициализация окна проект детально
            project_detali.init();


            // Событие выбора проекта
            //$('.cd-gallery ul li a').on('click', function () {
            //    event.preventDefault();
            //    // Определим id проекта
            //    var id = $(this).attr('id');
            //    project_detali.view(id, 0);

            //});

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
            // Отсортируем по открытым проектам
            $('.cd-gallery ul').mixItUp('filter', '.status-open');

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

