
var g = null;
var project_step_detali = {
    prj: null,
    loadReference: function (callback) {
        var count = 1;
        // Згрузка библиотек project
        project_step_detali.prj.load(['tsp'], function () {
            count -= 1;
            if (count <= 0) {
                if (typeof callback === 'function') {
                    LockScreenOff();
                    callback();
                }
            }
        });
    },
    project_step_tree: null,
    project_steps_detali_edit: null,
    project_steps_edit: null,
    project_steps_template: null,
    project_steps_save: null,
    project_steps_cancel: null,

    project_steps_tree_detali_view: null,
    project_steps_tree_detali_edit: null,
    // view
    project_step_name_view: null,
    project_step_group_view: null,
    project_step_range_view: null,

    project_step_resource_view: null,
    project_step_compile_view: null,

    project_step_current_view: null,
    project_step_skip_view: null,
    select_project_step_parent_view: null,
    select_project_step_depend_view: null,
    project_step_coment_view: null,
    // edit
    project_step_name_edit: null,
    project_step_group_edit: null,
    project_step_start_edit: null,
    project_step_stop_edit: null,
    project_step_resource_edit: null,
    project_step_compile_edit: null,
    project_step_compile_handle_edit: null,
    project_step_current_edit: null,
    project_step_skip_edit: null,
    select_project_step_parent_edit: null,
    select_project_step_depend_edit: null,
    project_step_coment_edit: null,

    project_step_create: null,
    project_step_edit: null,
    project_step_delete: null,
    project_step_cancel: null,
    project_step_save: null,

    lang: 'ru',
    langs: [],

    mode_step: 0,
    id_project: 0,              // id проекта
    steps_project: [],          // шаги проета проекта
    steps_buffer: [],           // шаги проета проекта (буфер для редактирования)

    curent_step: null,  // текущий шаг
    //data_step: [],      // загруженные шаги
    start_step: null,
    stop_step: null,
    //---------------------------------------------------------
    // Инициализация
    //---------------------------------------------------------
    // Инициализация объектов 
    init_obj: function () {
        this.project_steps_detali_edit = $('div#steps-edit');
        // Инициализация дерева
        this.project_step_tree = $('div#project-step-tree').jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "themes": { "stripes": true },
                'data': []
            },
        });
        // Обработка события выбора шага
        this.project_step_tree.on('changed.jstree', function (e, data) {
            //e.stopPropagation();

            var i, j = [];
            var r;
            // Кнопки спрятать
            //project_step_detali.project_step_edit.hide();
            //project_step_detali.project_step_delete.hide();
            for (i = 0, j = data.selected.length; i < j; i++) {
                r = data.instance.get_node(data.selected[i]);
                //project_step_detali.switch_mode_step(0);
                // Получить шаг
                var step = project_step_detali.get_step_of_data_step(r.id);
                if (step) {
                    project_step_detali.view_step(step, 0); // Показать шаг
                    // Кнопки показать
                    // project_step_detali.project_step_edit.show();
                    //project_step_detali.project_step_delete.show();
                }
            }
        });
        this.project_steps_tree_detali_view = $('div#steps-tree-detali-view');
        this.project_steps_tree_detali_edit = $('div#steps-tree-detali-edit');
        // Инициализация детального ввода
        this.project_step_name_edit = $('input#project-step-name-edit');
        this.project_step_name_view = $('input#project-step-name-view');
        //
        this.project_step_group_edit = $('input#project-step-group-edit').checkboxradio({ icon: true });
        this.project_step_group_view = $('input#project-step-group-view').checkboxradio({ icon: true });
        // Начало и конец
        this.project_step_range_edit = $('#select-range-project-edit').dateRangePicker(
            {
                language: 'ru',
                format: 'DD.MM.YYYY HH:mm',
                separator: '-',
                autoClose: false,
                time: {
                    enabled: false
                },
                setValue: function (s, s1, s2) {
                    if (s1 !== s2) {
                        project_step_detali.project_step_start_edit.val(s1);
                        project_step_detali.project_step_stop_edit.val(s2);
                    } else {
                        project_step_detali.project_step_start_edit.val("");
                        project_step_detali.project_step_stop_edit.val("");
                    }

                }
            }).
            bind('datepicker-change', function (evt, obj) {
                project_step_detali.start_step = obj.date1,
                    project_step_detali.stop_step = obj.date2
            })
            .bind('datepicker-closed', function () {

            }).bind('datepicker-open', function (evt) {
                evt.stopPropagation();
            });
        this.project_step_start_edit = $('input#project-step-start-edit');
        this.project_step_stop_edit = $('input#project-step-stop-edit');
        this.project_step_range_view = $('input#project-step-range-view');
        //
        this.project_step_resource_edit = $('input#project-step-resource-edit');
        this.project_step_resource_view = $('input#project-step-resource-view');
        //
        this.project_step_compile_handle_edit = $("#custom-handle-edit");
        this.project_step_compile_edit = $('#slider-compile-edit').slider({
            create: function () {
                project_step_detali.project_step_compile_handle_edit.text($(this).slider("value"));
            },
            slide: function (event, ui) {
                project_step_detali.project_step_compile_handle_edit.text(ui.value);
            }
        });
        this.project_step_compile_view = $('input#project-step-compile-view');
        //
        this.project_step_current_edit = $('input#project-step-current-edit').checkboxradio({ icon: true });
        this.project_step_current_view = $('input#project-step-current-view').checkboxradio({ icon: true });
        //
        this.project_step_skip_edit = $('input#project-step-skip-edit').checkboxradio({ icon: true });
        this.project_step_skip_view = $('input#project-step-skip-view').checkboxradio({ icon: true });
        //
        this.select_project_step_parent_edit = initSelect(
            $('select#project-step-parent-edit'),
            { lang: this.lang },
            [],
            null,
            -1,
            function (event) {
                event.preventDefault();
                var id = $(this).val();
            },
            null);
        this.select_project_step_parent_view = $('input#project-step-parent-view');
        //
        this.select_project_step_depend_edit = initSelect(
            $('select#project-step-depend-edit'),
            { lang: this.lang },
            [],
            null,
            -1,
            function (event) {
                event.preventDefault();
                var id = $(this).val();
            },
            null);
        this.select_project_step_depend_view = $('textarea#project-step-depend-view');
        //
        this.project_step_coment_edit = $('textarea#project-step-coment-edit');
        this.project_step_coment_view = $('textarea#project-step-coment-view');
        //--------------------------------------------------
        // Основные кнопки управления
        //--------------------------------------------------
        this.project_steps_edit = $('button#edit-steps').on('click', function () {
            project_step_detali.mode_edit_steps();
        });
        this.project_steps_template = $('button#template-steps').on('click', function () {
            project_step_detali.steps_buffer = project_step_detali.get_steps_template();
            project_step_detali.view_steps_project(1);

        });
        this.project_steps_save = $('button#save-steps').on('click', function () {
            project_step_detali.save_steps_project();
        });
        this.project_steps_cancel = $('button#cancel-steps').on('click', function () {
            project_step_detali.steps_buffer = project_step_detali.get_steps_buffer(project_step_detali.steps_project);
            project_step_detali.view_steps_project(0);
            //project_step_detali.mode_view_steps();
        });
        //--------------------------------------------------------------------------
        // Кнопки для редактирования выбранного шага
        //--------------------------------------------------------------------------
        // Добавить шаг
        this.project_step_create = $('button#create-step').on('click', function () {
            project_step_detali.view_step(null, 1);
        });
        // Править шаг
        this.project_step_edit = $('button#edit-step').on('click', function () {
            project_step_detali.view_step(project_step_detali.curent_step, 1);
        });
        // Удалить шаг
        this.project_step_delete = $('button#delete-step').on('click', function () {
            var step = getObjects(project_step_detali.steps_buffer, 'id_tree', project_step_detali.curent_step.id_tree);
            if (step.length) {
                // Обновить 
                var step_del = step[0];
                // Проверим на потомков
                if (project_step_detali.isChieldOfIDStep(project_step_detali.steps_buffer, step_del.id_tree)) return;
                // Проверить на зависисмости
                if (project_step_detali.isDependOfIDStep(project_step_detali.steps_buffer, step_del.id_tree)) return;
                // Удалить
                var new_buffer = [];
                var position = 1;
                $.each(project_step_detali.steps_buffer, function (i, el) {
                    if (step_del.id_tree !== el.id_tree) {
                        el.position = position;
                        new_buffer.push(el);
                        position += 1;
                    }
                });
                project_step_detali.steps_buffer = new_buffer;
                project_step_detali.view_step(null, 0); // отобразить пустой шаг (обнулим и текущий шаг)
                project_step_detali.view_steps_project(1);
            }
        });
        // Отмена шаг
        this.project_step_cancel = $('button#cancel-step').on('click', function () {
            project_step_detali.view_step(project_step_detali.curent_step, 0);
            //project_step_detali.switch_mode_step(0);
        });
        // Сохранить шаг
        this.project_step_save = $('button#save-step').on('click', function () {
            // Найти шаг в буфере
            var step = getObjects(project_step_detali.steps_buffer, 'id_tree', project_step_detali.curent_step.id_tree);
            if (step.length) {
                // Обновить 
                var step_upd = step[0];
                project_step_detali.curent_step = project_step_detali.get_new_step(step_upd);
            } else {
                // Создать новый
                project_step_detali.curent_step.get_new_step(null);
                project_step_detali.view_step(project_step_detali.curent_step, 0);
            }
            project_step_detali.view_steps_project(1);
        });
    },
    // Общая иициализация
    init: function (lang) {
        this.lang = lang;
        this.langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
            this.prj = prj = new Project(lang), // Создадим класс Project
            // Загрузим справочники
            this.loadReference(function () {
                project_step_detali.init_obj();
                // Перевести в режим просмотра
                project_step_detali.mode_view_steps();
            });
    },
    //--------------------------------------------------
    // Перевести в режим
    switch_mode_steps: function (mode) {
        switch (mode) {
            case 0: this.mode_view_steps(); break;
            case 1: this.mode_edit_steps(); break;
        }
    },
    // Перевести в режим просмотра шаги проекта
    mode_view_steps: function () {
        this.project_steps_detali_edit.hide();
        this.project_steps_edit.show();
        this.project_steps_template.hide();
        this.project_steps_save.hide();
        this.project_steps_cancel.hide();
        this.switch_mode_step(0);
    },
    // Перевести в режим редактирования шаги проекта
    mode_edit_steps: function () {
        this.project_steps_detali_edit.show();
        this.project_steps_edit.hide();
        this.project_steps_template.show();
        this.project_steps_save.show();
        this.project_steps_cancel.show();
        this.view_tree(this.steps_buffer !== null ? this.steps_buffer : []);
    },
    //--------------------------------------------------
    // Показать шаги проекта
    load_steps_project: function (id_project, steps_project) {
        this.id_project = id_project;
        // Сохранить отсортированный по возрастанию
        this.steps_project = steps_project.sort(function compareNumbers(a, b) {
            return a.position - b.position;
        });
        this.steps_buffer = this.get_steps_buffer(this.steps_project);
        this.curent_step = null;
        this.view_steps_project(0);
    },
    // Преобразовать список шагов в список шагов для редактирования (buffer)
    get_steps_buffer: function (steps) {
        var steps_buffer = [];
        $.each(steps, function (i, el) {
            var buf = el;
            buf['id_tree'] = el.id;
            buf['parent_id_tree'] = el.parent_id;
            steps_buffer.push(buf);
        });
        return steps_buffer;
    },
    //-----------------------------------------------------------------
    // Преобразование шаблонов
    //-----------------------------------------------------------------
    // Получить буферный шаблон
    get_template_step: function (i, el, group) {
        return {
            id_tree: el.id,
            id: 0,
            id_project: project_step_detali.id_project,
            id_templates_stages_project: el.id,
            position: i,
            start: group !== true ? new Date() : null,
            stop: group !== true ? moment(new Date()).add(1, 'days')._d : null,
            current: false,
            skip: false,
            mile: null,
            resource: '?',
            persent: 0,
            group: group,
            parent_id_tree: el.parent_id,
            parent_id: el.parent_id,
            depend: null,
            coment: null,
            TemplatesStagesProject: el
        };
    },
    // Упорядочивание шаблона при помощи рекурсии
    find_steps_template: function (list, obj, res) {
        var root = getObjects(list, 'parent_id', obj.id);
        if (root.length > 0) {
            $.each(root, function (i, el) {
                res.push(el);
                res = project_step_detali.find_steps_template(list, el, res);
            });
        }
        return res;
    },
    // Упорядочивание шаблона из масива данных
    get_steps_template_root: function (data) {
        var list_root = getObjects(data, 'parent_id', null)
        var res = [];
        $.each(list_root, function (i, el) {
            res.push(el);
            res = project_step_detali.find_steps_template(data, el, res)
        });
        return res;
    },
    // Преобразовать список шагов шаблона в список шагов шаблона для редактирования (buffer)
    get_steps_template: function () {
        var temp = this.prj.list_templates_stages_project;
        var steps_template = [];
        $.each(this.get_steps_template_root(temp), function (i, el) {
            var root = getObjects(temp, 'parent_id', el.id);
            var buf = project_step_detali.get_template_step(i + 1, el, (root.length > 0 ? true : false));
            steps_template.push(buf);
        });
        return steps_template;
    },
    //----------------------------------------------------------------
    // Показать шаги проекта в указанном режиме
    view_steps_project: function (mode) {
        this.view_gantt(this.steps_buffer !== null ? this.steps_buffer : [], 'month');
        this.switch_mode_steps(mode);
    },
    // Перевести в режим панель информации по шугу
    switch_mode_step: function (mode_step) {
        switch (mode_step) {
            case 0: this.mode_view_step(); break;
            case 1: this.mode_edit_step(); break;
            default: this.mode_null_step(); break;
        }
    },
    // Перевести в режим неопределенного шага проекта
    mode_null_step: function () {
        this.mode_step = -1;
        this.project_steps_tree_detali_view.hide();
        this.project_steps_tree_detali_edit.hide();
    },
    // Перевести в режим просмотра шаг проекта
    mode_view_step: function () {
        this.mode_step = 0;
        this.project_steps_tree_detali_view.show();
        // Спрятать кнопки
        project_step_detali.project_step_create.hide();
        project_step_detali.project_step_edit.hide();
        project_step_detali.project_step_delete.hide();

        this.project_steps_tree_detali_edit.hide();
    },
    // Перевести в режим редактирования шаг проекта
    mode_edit_step: function () {
        this.mode_step = 1;
        this.project_steps_tree_detali_view.hide();
        this.project_steps_tree_detali_edit.show();
    },
    // Показать шаг
    view_step: function (step, mode_step) {
        project_step_detali.curent_step = step;
        project_step_detali.switch_mode_step(mode_step);
        if (mode_step === 0) {
            if (step) {
                project_step_detali.project_step_create.show();
                project_step_detali.project_step_edit.show();
                project_step_detali.project_step_delete.show();
            } else {
                project_step_detali.project_step_create.hide();
                project_step_detali.project_step_edit.hide();
                project_step_detali.project_step_delete.hide();
            }
            // Просмотр
            project_step_detali.project_step_name_view.val(step !== null ? step.TemplatesStagesProject.stages_project_ru : '');
            project_step_detali.project_step_group_view.prop('checked', step !== null ? step.group : false).checkboxradio((step !== null ? "disable" : "enable")).checkboxradio("refresh");
            project_step_detali.project_step_range_view.val(step !== null ? (step.start !== null && step.stop !== null ? moment(step.start).format("DD.MM.YYYY") + " - " + moment(step.stop).format("DD.MM.YYYY") : ""): "");
            project_step_detali.project_step_resource_view.val(step !== null ? step.resource: "");
            project_step_detali.project_step_compile_view.val(step !== null ? step.persent + "%" : "");
            project_step_detali.project_step_current_view.prop('checked', step !== null ? step.current : false).checkboxradio((step !== null ? "disable" : "enable")).checkboxradio("refresh");
            project_step_detali.project_step_skip_view.prop('checked', step !== null ? step.skip : false).checkboxradio((step !== null ? "disable" : "enable")).checkboxradio("refresh");

            // Получим родителя
            var step_parent = project_step_detali.get_step_of_data_step(step.parent_id_tree);
            project_step_detali.select_project_step_parent_view.val(step_parent !== null ? step_parent.TemplatesStagesProject.stages_project_ru : ""); // Процент выполнения

            // Получим зависимость
            var list_depend_str = "";
            var list_depend = step.depend !== null ? step.depend.split(',') : [];
            $.each(list_depend, function (i, el) {
                var step_depend = project_step_detali.get_step_of_data_step(el);
                list_depend_str += step_depend !== null ? step_depend.TemplatesStagesProject.stages_project_ru + "; " : "";
            });
            project_step_detali.select_project_step_depend_view.text(list_depend_str);

            project_step_detali.project_step_coment_view.text(step !== null ? step.coment: "");     // коментарий


        }
        if (mode_step === 1) {
            // Правка
            project_step_detali.project_step_name_edit.val(step !== null ? step.TemplatesStagesProject.stages_project_ru : '');
            project_step_detali.project_step_group_edit.prop('checked', step !== null ? step.group : false).checkboxradio("refresh");
            project_step_detali.project_step_range_edit.data('dateRangePicker').setDateRange(step !== null && step.start !== null ? moment(step.start).format("DD.MM.YYYY") : "", step !== null && step.stop !== null ? moment(step.stop).format("DD.MM.YYYY") : "", true);
            project_step_detali.start_step = (step !== null ? step.start :null);
            project_step_detali.stop_step = (step !== null ? step.stop : null);
            project_step_detali.project_step_resource_edit.val(step !== null ? step.resource : "");
            project_step_detali.project_step_compile_edit.slider("value", step !== null ? step.persent : 0); // Процент выполнения
            project_step_detali.project_step_compile_handle_edit.text(step !== null ? step.persent : 0);      // отразить Процент выполнения
            project_step_detali.project_step_current_edit.prop('checked', step !== null ? step.current : false).checkboxradio("refresh");
            project_step_detali.project_step_skip_edit.prop('checked', step !== null ? step.skip : false).checkboxradio("refresh");

            // Получим родителя
            var list_exceptions_value = [];
            list_exceptions_value.push(step.id_tree);
            updateOptionSelect(
                project_step_detali.select_project_step_parent_edit,
                project_step_detali.steps_buffer,
                function (row) {
                    return { value: Number(row.id), text: row.TemplatesStagesProject.stages_project_ru };
                },
                step.parent_id_tree !== null ? step.parent_id_tree : -1,
                list_exceptions_value.length > 0 ? list_exceptions_value : null);

            // Получим зависимость
            var list_depend_str = "";
            var list_depend = step.depend !== null ? step.depend.split(',') : [];
            $.each(list_depend, function (i, el) {
                var step_depend = project_step_detali.get_step_of_data_step(el);
                list_depend_str += step_depend !== null ? step_depend.TemplatesStagesProject.stages_project_ru + "; " : "";
            });
            updateOptionSelect(
                project_step_detali.select_project_step_depend_edit,
                project_step_detali.steps_buffer,
                function (row) {
                    return { value: Number(row.id), text: row.TemplatesStagesProject.stages_project_ru };
                },
                list_depend.length > 0 ? Number(list_depend[0]) : -1,
                list_exceptions_value.length > 0 ? list_exceptions_value : null);


            project_step_detali.project_step_coment_edit.text(step !== null ? step.coment: "");      // коментарий

        }
    },
    // Показать диаграмму ганта
    view_gantt: function (data, format) {
        if (data) {
            $('div#GanttChartDIV').empty();
            //g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), format);
            g = new JSGantt.GanttChart('g', $('div#GanttChartDIV')[0], format);
            g.setShowRes(1); // Show/Hide Responsible (0/1)
            g.setShowDur(1); // Show/Hide Duration (0/1)
            g.setShowComp(1); // Show/Hide % Complete(0/1)
            g.setCaptionType('Resource');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
            if (g) {
                //g.AddTaskItem(new JSGantt.TaskItem(1, 'Define Chart API', '', '', 'ff0000', 'http://google.com', 0, 'Brian', 0, 1, 0, 1));
                //g.AddTaskItem(new JSGantt.TaskItem(11, 'Chart Object', '20.07.2019', '21.08.2019', 'ff00ff', 'http://www.yahoo.com', 1, 'Shlomy', 100, 0, 1, 1));
                $.each(data, function (i, el) {
                    //var d = moment(el.start).format("MM.DD.YYYY");
                    g.AddTaskItem(new JSGantt.TaskItem(el.id_tree,
                        el.TemplatesStagesProject.stages_project_ru,
                        el.start !== null ? moment(el.start).format("DD.MM.YYYY") : '',
                        el.stop !== null ? moment(el.stop).format("DD.MM.YYYY") : '',
                        'ff00ff',
                        '',
                        el.mile !== null ? el.mile : 0,
                        el.resource !== null ? el.resource : '',
                        el.persent,
                        el.group,
                        el.parent_id_tree !== null ? el.parent_id_tree : 0,
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
        }
    },
    // Показть дерево загрузи в новые данные
    view_tree: function (data) {
        var data_tree = [];
        if (data) {
            $.each(data, function (i, el) {
                data_tree.push({ id: el.id_tree, parent: el.parent_id !== null ? el.parent_id_tree : "#", text: el.TemplatesStagesProject.stages_project_ru, state: { opened: true, selected: false } });
            });
            //project_step_detali.project_step_tree.off('changed.jstree');
            project_step_detali.project_step_tree.jstree(true).settings.core.data = data_tree;
            project_step_detali.project_step_tree.jstree(false).refresh();
            //project_step_detali.project_step_tree.on('changed.jstree');
        }
        //// Alternative format of the node (id & parent are required)
        //{
        //    id          : "string" // required
        //    parent      : "string" // required
        //    text        : "string" // node text
        //    icon        : "string" // string for custom
        //    state       : {
        //            opened    : boolean  // is the node open
        //            disabled  : boolean  // is the node disabled
        //            selected  : boolean  // is the node selected
        //    },
        //    li_attr     : {}  // attributes for the generated LI node
        //    a_attr      : {}  // attributes for the generated A node
        //}
    },
    // Вернуть шаг по указаному id
    get_step_of_data_step: function (id_step) {
        if (this.steps_buffer.length > 0) {
            var step = getObjects(this.steps_buffer, 'id_tree', id_step);
            if (step.length) {
                return step[0];
            }
        }
        return null;
    },
    // Вернуть новый шаг (Обновленный или новый)
    get_new_step: function (step_old) {
        var new_step;
        if (step_old !== null) {
            step_old.start = project_step_detali.start_step;
            step_old.stop = project_step_detali.stop_step;
            step_old.current = project_step_detali.project_step_current_edit.prop('checked');
            step_old.skip = project_step_detali.project_step_skip_edit.prop('checked');
            step_old.resource = project_step_detali.project_step_resource_edit.val();
            step_old.persent = project_step_detali.project_step_compile_edit.slider("value");
            step_old.group = project_step_detali.project_step_group_edit.prop('checked');
            step_old.parent_id = project_step_detali.select_project_step_parent_edit.val() !== "-1" ? Number(project_step_detali.select_project_step_parent_edit.val()) : null;
            step_old.depend = project_step_detali.select_project_step_depend_edit.val() !== "-1" ? project_step_detali.select_project_step_depend_edit.val() : null;
            step_old.coment = project_step_detali.project_step_coment_edit.text();
            new_step = step_old;
        } else {

        }
        return new_step;
        //var old_step = project_step_detali.curent_step;
        //return {
        //    id: old_step !== null ? old_step.id : 0,
        //    id_project: old_step !== null ? old_step.id_project : 0,
        //    id_templates_stages_project: old_step !== null ? old_step.id_templates_stages_project : 0,
        //    position: old_step !== null ? old_step.position : 0,
        //    start: project_step_detali.start_step,
        //    stop: project_step_detali.stop_step,
        //    current: project_step_detali.project_step_current_edit.prop('checked'),
        //    skip: project_step_detali.project_step_skip_edit.prop('checked'),
        //    mile: null,
        //    resource: project_step_detali.project_step_resource_edit.val(),
        //    persent: project_step_detali.project_step_compile_edit.slider("value"),
        //    group: project_step_detali.project_step_group_edit.prop('checked'),
        //    parent_id: project_step_detali.select_project_step_parent_edit.val(),
        //    depend: project_step_detali.select_project_step_depend_edit.val(),
        //    coment: project_step_detali.project_step_coment_edit.text()
        //};
    },
    //--------------------------------------------------------------
    // Сохранение и обновление
    //--------------------------------------------------------------
    // Сравнить существющие и новые шаги и вернуть список для удаления
    get_delete_steps_project: function () {
        var list_del = [];
        $.each(this.steps_project, function (i, el) {
            var step = getObjects(project_step_detali.steps_buffer, 'id', el.id)
            if (step.length === 0) {
                list_del.push(el);
            }
        });
        return list_del;
    },
    // Вернуть список шагов для добавления
    get_add_steps_project: function () {
        return getObjects(project_step_detali.steps_buffer, 'id', 0);
    },
    // Удалить шаги вернув список результатов удаления 1-ок, -1-error
    delete_steps_project: function (steps, callback) {
        var count = steps.length;
        // Удаление шагов
        var res_del = [];
        $.each(steps, function (i, el) {
            prj.deleteAsyncStagesProject(el.id, function (res) {
                res_del.push({ 'id': el.id, 'res': res });
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        callback(res_del);
                    }
                }
            })
        });
    },
    // Добавить шаги вернув список добавленных шагов с новыми id
    add_steps_project: function (steps, callback) {
        var count = steps.length;
        // Добавление шагов
        var res_add = [];
        $.each(steps, function (i, el) {
            if (el.id === 0) {
                // Надо добавить
                var el_new = {
                    id: 0,
                    id_project: el.id_project,
                    id_templates_stages_project: el.id_templates_stages_project,
                    position: el.position,
                    start: el.start,
                    stop: el.stop,
                    current: el.current,
                    skip: el.skip,
                    mile: el.mile,
                    resource: el.resource,
                    persent: el.persent,
                    group: el.group,
                    parent_id: el.parent_id,
                    depend: el.depend,
                    coment: el.coment,
                    TemplatesStagesProject: null,
                }
                prj.postAsyncStagesProject(el_new, function (res) {
                    el.id = res;
                    res_add.push(el);
                    count -= 1;
                    if (count <= 0) {
                        if (typeof callback === 'function') {
                            callback(res_add);
                        }
                    }
                })
            } else {
                // Надо обновить
                res_add.push(el);
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        callback(res_add);
                    }
                }
            }

        });
    },
    // Обновить шаги
    update_steps_project: function (steps, callback) {
        var count = steps.length;
        // Добавление шагов
        var res_upd = [];
        $.each(steps, function (i, el) {
            // Надо добавить
            var el_new = {
                id: el.id,
                id_project: el.id_project,
                id_templates_stages_project: el.id_templates_stages_project,
                position: el.position,
                start: el.start,
                stop: el.stop,
                current: el.current,
                skip: el.skip,
                mile: el.mile,
                resource: el.resource,
                persent: el.persent,
                group: el.group,
                parent_id: el.parent_id,
                depend: el.depend,
                coment: el.coment,
                TemplatesStagesProject: null
            };
            prj.putAsyncStagesProject(el_new, function (res) {
                res_upd.push({ 'id': el.id, 'res': res });
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        callback(res_upd);
                    }
                }
            });
        });
    },
    // Добавить новые скорректировать ссылки на родителя и зависимости и обновить шаги в базе
    save_add_update_steps_project: function (callback) {
        project_step_detali.add_steps_project(project_step_detali.steps_buffer, function (res_add) {
            //project_step_detali.add_steps_project(list_add, function (res_add) {
            // обновим данные 
            var list_upd = [];
            $.each(res_add, function (i, el) {
                // Перестроим владельца
                var parent = el.parent_id_tree;
                if (parent !== null) {
                    var step = getObjects(res_add, 'id_tree', parent);
                    if (step.length > 0) {
                        var id = step[0].id;
                        el.parent_id_tree = id;
                        el.parent_id = id;
                    }
                }
                // Перестроим зависимости
                var depend = el.depend;
                if (depend !== null && depend !== '') {
                    var list_depend = depend.split(',');
                    // Пройдемся по всем зависемостям
                    var list_new_depend = [];
                    $.each(list_depend, function (i, el_depend) {
                        var step_depend = getObjects(res_add, 'id_tree', el_depend);
                        if (step_depend.length > 0) {
                            var id = step_depend[0].id;
                            list_new_depend.push(id);
                        }
                    });
                    el.depend = list_new_depend.join(',');
                }
                list_upd.push(el);
            });

            $.each(list_upd, function (i, el) {
                el.id_tree = el.id;
            });
            // Обновить изменения
            project_step_detali.update_steps_project(list_upd, function (res_upd) {
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(res_upd);
                }
            });
        });
    },
    // Сохранить шаги проекта
    save_steps_project: function () {
        // Удалить не нужные шаги
        LockScreen(langView('mess_save', this.langs));
        var list_delete = this.get_delete_steps_project();
        if (list_delete.length > 0) {
            this.delete_steps_project(list_delete, function (res_del) {
                project_step_detali.save_add_update_steps_project(project_step_detali.view_steps_project(0));
            });
        } else {
            project_step_detali.save_add_update_steps_project(project_step_detali.view_steps_project(0));
        };

    },
    //--------------------------------------------------------------
    // Вспомогательные функции
    //--------------------------------------------------------------
    // Поиск в списке шагов зависимости от указаного id
    isDependOfIDStep: function (list_steps, id) {
        var result = false;
        $.each(project_step_detali.steps_buffer, function (i, el_depend) {
            var list_depend = el_depend.depend !== null ? el_depend.depend.split(',') : [];
            $.each(list_depend, function (i, el_depend_chield) {
                if (Number(el_depend_chield) === id)
                    result = true;
            });
        });
        return result;
    },
    // Поиск в списке шагов потомков от указаного id
    isChieldOfIDStep: function (list_steps, id) {
        var step_chield = getObjects(list_steps, 'parent_id_tree', id);
        if (step_chield.length > 0) { return true; } else { return false; }
    }

};

//var out_grGantt = function () {

//    g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day');
//    g.setShowRes(1); // Show/Hide Responsible (0/1)
//    g.setShowDur(1); // Show/Hide Duration (0/1)
//    g.setShowComp(1); // Show/Hide % Complete(0/1)
//    g.setCaptionType('Resource');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
//    //var gr = new Graphics();
//    if (g) {
//        g.AddTaskItem(new JSGantt.TaskItem(1, 'Define Chart API', '', '', 'ff0000', 'http://google.com', 0, 'Brian', 0, 1, 0, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(11, 'Chart Object', '7/20/2008', '7/20/2008', 'ff00ff', 'http://www.yahoo.com', 1, 'Shlomy', 100, 0, 1, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(12, 'Task Objects', '', '', '00ff00', '', 0, 'Shlomy', 40, 1, 1, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(121, 'Constructor Proc', '7/21/2008', '8/9/2008', '00ffff', 'http://www.yahoo.com', 0, 'Brian T.', 60, 0, 12, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(122, 'Task Variables', '8/6/2008', '8/11/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 12, 1, 121));
//        g.AddTaskItem(new JSGantt.TaskItem(123, 'Task by Minute/Hour', '8/6/2008', '8/11/2008 12:00', 'ffff00', 'http://google.com', 0, 'Ilan', 60, 0, 12, 1, 121));
//        g.AddTaskItem(new JSGantt.TaskItem(124, 'Task Functions', '8/9/2008', '8/29/2008', 'ff0000', 'http://google.com', 0, 'Anyone', 60, 0, 12, 1, 0, 'This is another caption'));
//        g.AddTaskItem(new JSGantt.TaskItem(2, 'Create HTML Shell', '8/24/2008', '8/25/2008', 'ffff00', 'http://google.com', 0, 'Brian', 20, 0, 0, 1, 122));
//        g.AddTaskItem(new JSGantt.TaskItem(3, 'Code Javascript', '', '', 'ff0000', 'http://google.com', 0, 'Brian', 0, 1, 0, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(31, 'Define Variables', '7/25/2008', '8/17/2008', 'ff00ff', 'http://google.com', 0, 'Brian', 30, 0, 3, 1, '', 'Caption 1'));
//        g.AddTaskItem(new JSGantt.TaskItem(32, 'Calculate Chart Size', '8/15/2008', '8/24/2008', '00ff00', 'http://google.com', 0, 'Shlomy', 40, 0, 3, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(33, 'Draw Taks Items', '', '', '00ff00', 'http://google.com', 0, 'Someone', 40, 1, 3, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(332, 'Task Label Table', '8/6/2008', '8/11/2008', '0000ff', 'http://google.com', 0, 'Brian', 60, 0, 33, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(333, 'Task Scrolling Grid', '8/9/2008', '8/20/2008', '0000ff', 'http://google.com', 0, 'Brian', 60, 0, 33, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(34, 'Draw Task Bars', '', '', '990000', 'http://google.com', 0, 'Anybody', 60, 1, 3, 0));
//        g.AddTaskItem(new JSGantt.TaskItem(341, 'Loop each Task', '8/26/2008', '9/11/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(342, 'Calculate Start/Stop', '9/12/2008', '10/18/2008', 'ff6666', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(343, 'Draw Task Div', '10/13/2008', '10/17/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
//        g.AddTaskItem(new JSGantt.TaskItem(344, 'Draw Completion Div', '10/17/2008', '11/04/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1, "342,343"));
//        g.AddTaskItem(new JSGantt.TaskItem(35, 'Make Updates', '12/17/2008', '2/04/2009', 'f600f6', 'http://google.com', 0, 'Brian', 30, 0, 3, 1));
//        g.Draw();
//        g.DrawDependencies();
//    }
//    else {
//        alert("not defined");
//    }
//};

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
                    //pm.id = 1; // !!!!!!!!! тест
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
            });
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
                //------------------------------------------------------------------------------------------------
                // STEPS ------------------------------------------------------------
                //----------------------------------------------------------------------
                project_step_detali.init(lang);

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
                        project_step_detali.load_steps_project(project.id, project.StagesProject);
                        //project_step_detali.view_gantt(project.StagesProject, 'month');
                        //project_step_detali.view_tree(project.StagesProject);

                        //var data = [];
                        //var data_step = project.StagesProject;
                        //var select_step;
                        //$.each(project.StagesProject, function (i, el) {
                        //    data.push({ id: el.id, parent: el.parent_id != null ? el.parent_id : "#", text: el.TemplatesStagesProject.stages_project_ru, state: { opened: true, selected: false } });
                        //});
                        //$('div#project-step-tree').jstree({
                        //    "core": {
                        //        "animation": 0,
                        //        "check_callback": true,
                        //        "themes": { "stripes": true },
                        //        'data': data
                        //    },
                        //});
                        //$('button#create-step').on('click', function () {
                        //    event.preventDefault();
                        //    var ref = $('div#project-step-tree').jstree(true),
                        //		sel = ref.get_selected();
                        //    if (!sel.length) { return false; }
                        //    sel = sel[0];
                        //    sel = ref.create_node(sel, { "type": "file" });
                        //    if (sel) {
                        //        ref.edit(sel);
                        //    }

                        //});




                        //$('div#project-step-tree').jstree({
                        //    'core': {
                        //        'data': [
                        //           { "id": "ajson1", "parent": "#", "text": "Simple root node" },
                        //           { "id": "ajson2", "parent": "#", "text": "Root node 2" },
                        //           { "id": "ajson3", "parent": "ajson2", "text": "Child 1" },
                        //           { "id": "ajson4", "parent": "ajson2", "text": "Child 2" },
                        //        ]
                        //    }
                        //});
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

