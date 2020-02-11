jQuery(document).ready(function ($) {

    $.Text_View =
        {
            'default':  //default language: ru
            {
                'text_select_all': 'Все',
                //'text_type_title_strategic': 'Стратегический',
                //'text_type_title_normative': 'Нормативный',
                //'text_title_project': ' CAPEX',
                //'text_status_open': 'В работе',
                //'text_status_close': 'Завершен',
                //'text_status_pause': 'Остановлен',
                //'text_status_delete': 'Удален',
                //'text_kgrivna': 'тыс. грн.',
                //'text_kdolar': 'тыс. $',
            },
            'en':  //default language: English
            {
                'text_select_all': 'All',
                //'text_type_title_strategic': 'Strategic',
                //'text_type_title_normative': 'Normative',
                //'text_title_project': ' CAPEX',
                //'text_status_open': 'In progress',
                //'text_status_close': 'Completed',
                //'text_status_pause': 'Stopped',
                //'text_status_delete': 'Deleted',
                //'text_kgrivna': 'kUAH',
                //'text_kdolar': 'k$',
            }
        };

    //================================================================
    // Объявление обектов
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        //dpa = new Dpa(lang), // Создадим класс Dpa
        prj = new Project(lang), // Создадим класс Project
        //g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day'),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        // Список открытых проектов
        list_open_project = null,
        // Список структурных подразделений
        list_ss = null,
        // Список департаментов
        list_department = null,
        // Загрузка справочников
        loadReference = function (callback) {
            //LockScreen(langView('mess_load', langs));
            var count = 2;
            // Згрузка библиотек project
            prj.load(['dpa', 'type', 'wp'], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        //LockScreenOff();
                        callback();
                    }
                }
            });
            //
            prj.getAsyncOpenListProjects(function (list_result) {
                list_open_project = list_result;
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        //LockScreenOff();
                        callback();
                    }
                }

            });
        },
        // Обработка и подготовка данных
        loadData = function (callback) {
            // Определим список структурных подразделений по которым идут проекты

            var uniqueNames_ss = [];
            var uniqueNames_dep = [];
            list_ss = [];
            list_department = [];
            $.each(list_open_project, function (i, el) {
                var subdivisions = getObjOflist(prj.dpa_obj.list_structural_subdivisions, 'id', el.id_structural_subdivisions);
                if ($.inArray(el.id_structural_subdivisions, uniqueNames_ss) === -1) {
                    uniqueNames_ss.push(el.id_structural_subdivisions);
                    list_ss.push(subdivisions);
                }
                var dep = prj.dpa_obj.getStructuralSubdivisions_Internal_Of_Type(el.id_structural_subdivisions, 1);
                if ($.inArray(dep.id, uniqueNames_dep) === -1) {
                    uniqueNames_dep.push(dep.id);
                    list_department.push(dep);
                }
                el['department'] = dep;
                el['subdivisions'] = subdivisions;
            });
            // Сортируем 
            list_department.sort(function (a, b) {
                if (a.type > b.type) return 1;
                if (a.type < b.type) return -1;
                return 0;
            });
            //
            if (typeof callback === 'function') {
                LockScreenOff();
                callback();
            }
        },
        // Добавить карту к галереи
        addCardGallery = function (project) {
            if (project) {
                var type = getTypeProjectGallery(project.id_type_project);
                var type_title = prj.getValueCultureObj(project.TypeProject, 'type_project');
                var department = project.department;
                var subdivisions = project.subdivisions;
                var fon_class = "dark";
                switch (department.id) {
                    case 1: {
                        fon_class = "dark";
                        break;
                    }
                    case 2: {
                        fon_class = "primary";
                        break;
                    }
                    case 16: {
                        fon_class = "info";
                        break;
                    }
                    case 17: {
                        fon_class = "warning";
                        break;
                    }
                    case 3: {
                        fon_class = "success";
                        break;
                    }
                    case 13: {
                        fon_class = "danger";
                        break;
                    }
                    default: {
                        fon_class = "secondary";
                        break;
                    }
                }

                var li = '<li class="mix ' + type + ' departmen' + department.id + ' subdivisions' + subdivisions.id + '"><a href="#" id="' + project.id + '">' +
                            '<div class="card border-' + fon_class + '">' +
                                '<div class="card-header bg-' + fon_class + ' text-white">' +
                                    '<h1>' + type_title + ' (' + prj.dpa_obj.getValueCultureObj(department, 'name_subdivisions') + ')' + '</h1>' +
                                 '</div>' +
                                '<div class="card-body">' +
                                    '<div class="row">' +
                                    '<div class="col-xl-6">' +
                                        '<img class="card-img-top" src="../../Images/project/' + (project.id_type_project === 1 ? "pm-card-str.png" : "pm-card-norm.png") + '" alt="Card image cap">' +
                                    '</div>' +
                                    '<div class="col-xl-6" id="prj-info">' +
                                        '<h2 class="card-title text-' + fon_class + '">' + prj.dpa_obj.getValueCultureObj(subdivisions, 'name_subdivisions') + '</h2>' +
                                        '<p class="card-text">' + prj.dpa_obj.getValueCultureObj(project, 'name_project') + '</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</a></li>';
                $("section.cd-gallery ul").append(li);
                // Привяжим событие выбора проекта
                $("section.cd-gallery ul li a#" + project.id).on('click', function () {
                    event.preventDefault();
                    // Определим id проекта
                    var id = $(this).attr('id');
                    project_detali.view(id);
                });
            }
        },
        // Загрузить галерею
        loadGallery = function (list_project) {
            $("section.cd-gallery ul").empty();
            $.each(list_project, function (i, el) {
                addCardGallery(el);
            });
        },
        //--------------------------------------
        // Получить тип проекта для формирования галереи
        getTypeProjectGallery = function (id_type_project) {
            switch (id_type_project) {
                case 1: return 'strategic';
                case 2: return 'normative';
            }
        },
        //-------------------------------------------
        //
                // Окно проекты детально
        project_detali = {
            content: $('.cd-project-content'),
            init: function () {
                // Настройка закрыть детали проекта
                project_detali.content.on('click', '.close', function (event) {
                    event.preventDefault();
                    project_detali.content.removeClass('is-visible');
                });
            },
            // Отобразить указаный проект в указанном режиме
            view: function (id) {
                var project_status = getObjOflist(list_open_project, 'id', id);
                if (project_status) {
                    $('#name_project_title').text(prj.getValueCultureObj(project_status, 'name_project'));
                    $('#name_project').text(prj.getValueCultureObj(project_status, 'name_project'));
                    $('#goals_project').text($.trim(prj.getValueCultureObj(project_status, 'goals_project')));
                    $('#type_project').text(prj.getValueCultureObj(project_status.TypeProject, 'type_project'));
                    $('#structural_subdivisions').text(prj.dpa_obj.getValueCulture_StructuralSubdivisions_Of_ID(project_status.id_structural_subdivisions, 'name_subdivisions_full'));
                    $('#customer').text(prj.dpa_obj.getValueCulture_StructuralSubdivisions_Of_ID(project_status.id_project_customer, 'name_subdivisions_full'));
                    $('#spp_sap').text(project_status.spp_sap);
                    $('#spp_owner').text(prj.dpa_obj.getValueCulture_StructuralSubdivisions_Of_ID(project_status.id_spp_owner, 'name_subdivisions_full'));
                    $('#start_project').text(project_status.start_project ? moment(project_status.start_project).format('DD.MM.YYYY') : '');
                    $('#stop_project_contract').text(project_status.start_project ? moment(project_status.stop_project_contract).format('DD.MM.YYYY') : '');
                    // Показать страницу детально
                    this.content.addClass('is-visible');
                }

            },
        };

    //================================================================
    // Основной вход
    //=================================================================

    LockScreen(langView('mess_delay', langs));

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

    // Загрузка библиотек
    loadReference(function (result) {
        loadData(function (result) {
            // Создадим список структурных подразделений
            $("select#select-subdivisions").empty().append('<option value="">' + langView('text_select_all', langs) + '</option>');
            $.each(list_ss, function (i, el) {
                $("select#select-subdivisions")
                    .append('<option value=".subdivisions' + el.id + '">' + prj.dpa_obj.getValueCultureObj(el, 'name_subdivisions_full') + '</option>');
            });
            // Создадим список департаментов
            $("select#select-department").empty().append('<option value="">' + langView('text_select_all', langs) + '</option>');
            $.each(list_department, function (i, el) {
                $("select#select-department")
                    .append('<option value=".departmen' + el.id + '">' + prj.dpa_obj.getValueCultureObj(el, 'name_subdivisions_full') + '</option>');
            });
            var list = null;
            $("select#select-department").change(function () {
                $("select#select-department option:selected").each(function () {
                    var id = $(this).val();
                    if (id) {
                        id = id.replace('.departmen', '');
                        list = getObjects(list_ss, 'parent_id', id);
                    } else {
                        list = list_ss;
                    }
                    // Создадим список структурных подразделений
                    $("select#select-subdivisions").empty().append('<option value="">' + langView('text_select_all', langs) + '</option>');
                    $.each(list, function (i, el) {
                        $("select#select-subdivisions")
                            .append('<option value=".subdivisions' + el.id + '">' + prj.dpa_obj.getValueCultureObj(el, 'name_subdivisions_full') + '</option>');
                    });
                });
            });
            // Загрузим галерею
            loadGallery(list_open_project);

            project_detali.init();

            // Отсортируем по открытым проектам
            $('.cd-gallery ul').mixItUp('filter', 'all');

            // !!!!!!!!!!!!!!!!!! тест убрать
            //project_detali.view(17);
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