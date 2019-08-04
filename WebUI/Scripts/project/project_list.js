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
            },
            'en':  //default language: English
            {
                'text_type_title_strategic': 'Strategic',
                'text_type_title_normative': 'Normative',
                'text_title_project': ' CAPEX',
                'text_status_open': 'In progress',
                'text_status_close': 'Completed',
                'text_status_pause': 'Stopped',
            }
        };

    var lang = $.cookie('lang'),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        list_users = [],
        list_structural_subdivisions = [],
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
            // Загрузка пользователей
            getAsyncUsers(function (result_users) {
                list_users = result_users;
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
            // Загрузка структурных подразделений
            getAsyncStructuralSubdivisions(function (result_structural_subdivisions) {
                list_structural_subdivisions = result_structural_subdivisions;
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
            getAsyncUsersOfName(user_name, function (result_user) {
                user = result_user;
                getAsyncProjectManagerOfIDUser(user.id, function (result_pm) {
                    pm = result_pm;
                    pm.id = 1; // !!!!!!!!! тест
                    getAsyncChainProjectManagerOfIDPM(pm.id, function (result_chain_pm) {
                        chain_pm = result_chain_pm;

                        while_pm = '0';
                        for (i = 0, count_i = chain_pm.length; i < count_i; i++) {
                            while_pm += ',' + chain_pm[i].id
                        }

                        getAsyncListProjectsOfListIDPM(while_pm, function (result_lp) {
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
                                    list_ss.push(getObjOflist(list_structural_subdivisions, 'id', el.id_structural_subdivisions));
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
        };


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
                var user = getObjOflist(list_users, 'id', el.id_user);
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
                var ss = getObjOflist(list_structural_subdivisions, 'id', el.id_structural_subdivisions);

                $("section.cd-gallery ul")
                    .append('<li class="mix ' + type + ' pm' + el.id_project_manager + ' ' + status + ' subdivisions' + el.id_structural_subdivisions + '"><a href="#" id="' + el.id + '"><img src="../../Images/project/pm' + el.id_project_manager + '.jpg" alt=""><div class="project-men"><p class="' + status + '">' + el.name_project_ru + '</p></div><div class="project-info"><h2>' + (ss !== null ? ss.name_subdivisions_ru : '?') + '</h2><p>' + type_title + (el.spp_sap !== "" ? ' (' + el.spp_sap + ')' : '') + '</p></div></a></li>');
            });



            //************************
            // Показать проект детально
            //*************************
            singleProjectContent = $('.cd-project-content');
            // Событие выбора проекта
            $('.cd-gallery ul li a').on('click', function () {
                event.preventDefault();
                // Определим id проекта
                var id = $(this).attr('id');
                // загрузим проект
                var project = getObjOflist(list_project, 'id', id);
                // Определим тип проекта
                var type_project = '';
                switch (project.id_type_project) {
                    case 1: type_project = langView('text_type_title_strategic', langs); break;
                    case 2: type_project = langView('text_type_title_normative', langs); break;
                }
                // Статус проекта
                var status_project = null;
                switch (project.id_status_project) {
                    case 0: status_project = langView('text_status_open', langs); $('.cd-project-content div h2').removeClass().addClass('status-open'); break;
                    case 1: status_project = langView('text_status_close', langs); $('.cd-project-content div h2').removeClass().addClass('status-close'); break;
                    case 2: status_project = langView('text_status_pause', langs); $('.cd-project-content div h2').removeClass().addClass('status-pause'); break;
                }

                // тип пректа и название

                $('.cd-project-content div h2').text(type_project + langView('text_title_project', langs) + ' (' + status_project + ')');
                $('.cd-project-content div em').text(lang === 'ru' ? project.name_project_ru : project.name_project_en);

                // цели проекта
                $('textarea#goals-project').val(lang === 'ru' ? project.goals_project_ru : project.goals_project_en);
                // Структурное подразделение где реализуется проект
                var structural_subdivisions = getObjOflist(list_structural_subdivisions, 'id', project.id_structural_subdivisions);
                $('input#structural-subdivisions').val(lang === 'ru' ? structural_subdivisions.name_subdivisions_full_ru : structural_subdivisions.name_subdivisions_full_en);
                // Структурное подразделение заказчик
                var project_customer = getObjOflist(list_structural_subdivisions, 'id', project.id_project_customer);
                $('input#project-customer').val(lang === 'ru' ? project_customer.name_subdivisions_full_ru : project_customer.name_subdivisions_full_en);
                // СПП-элемент и владелец строки
                var spp_owner = getObjOflist(list_structural_subdivisions, 'id', project.id_spp_owner);
                $('input#spp-element').val((project.spp_sap !== "" ? "(" + project.spp_sap + ")" : "") + ' ' + (spp_owner !== undefined ? (lang === 'ru' ? spp_owner.name_subdivisions_full_ru : spp_owner.name_subdivisions_full_en) : ''));
                // Начало и окончание проекта
                $('input#start-project').val(toDate(project.start_project));
                $('input#stop-project').val(toDate(project.stop_project_contract));
                // Исполнитель работ
                if (project.WorkPerformers !== null) {
                    $('input#name-performer').val(lang === 'ru' ? project.WorkPerformers.name_performer_ru : project.WorkPerformers.name_performer_en);
                    $('input#email-performer').val(project.WorkPerformers.email_performer);
                    $('input#phone-performer').val(project.WorkPerformers.phone_performer);
                    $('input#name-boss-performer').val(project.WorkPerformers.phone_performer);
                    $('input#phone-boss-performer').val(project.WorkPerformers.name_boss);
                }
                // Бюджет
                $('input#contract-value').val(toValueCurrency(project.contract_value, project.contract_currency, lang));
                $('input#budget-value').val(toValueCurrency(project.budget, project.budget_currency, lang));

                $('input#contract-engineering-value').val(toValueCurrency(project.contract_engineering_value, project.contract_engineering_currency, lang));
                $('input#payment-engineering-value').val(toValueCurrency(project.payment_engineering_value, project.payment_engineering_currency, lang));
                $('input#contract-equipment-value').val(toValueCurrency(project.contract_equipment_value, project.contract_equipment_currency, lang));
                $('input#payment-equipment-value').val(toValueCurrency(project.payment_equipment_value, project.payment_equipment_currency, lang));
                $('input#contract-construction-value').val(toValueCurrency(project.contract_construction_value, project.contract_construction_currency, lang));
                $('input#payment-construction-value').val(toValueCurrency(project.payment_construction_value, project.payment_construction_currency, lang));
                $('input#contract-commissioning-value').val(toValueCurrency(project.contract_commissioning_value, project.contract_commissioning_currency, lang));
                $('input#payment-commissioning-value').val(toValueCurrency(project.payment_commissioning_value, project.payment_commissioning_currency, lang));
                $('input#contract-other-value').val(toValueCurrency(project.contract_other_value, project.contract_other_currency, lang));
                $('input#payment-other-value').val(toValueCurrency(project.payment_other_value, project.payment_other_currency, lang));
                // Руководитель проектов и программ
                if (project.ProjectManager !== null) {
                    var user = getObjOflist(list_users, 'id', project.ProjectManager.id_user);
                    $('input#project-manager-fio').val(user.surname + ' ' + user.name + ' ' + user.patronymic);
                    $('input#project-manager-email').val(project.ProjectManager.email);
                    $('input#project-manager-phone-work').val(project.ProjectManager.phone_work);
                    $('input#project-manager-phone-mobile').val(project.ProjectManager.phone_mobile);
                }




                singleProjectContent.addClass('is-visible');
            });

            $('fieldset legend').on('click', function (event) {
                event.preventDefault();
                $(this).siblings('.view-info').slideToggle();
            });

            //close single project content
            singleProjectContent.on('click', '.close', function (event) {
                event.preventDefault();
                singleProjectContent.removeClass('is-visible');
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
                    }
                }, 200);
            });
            //************************

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

        // Send the output string to MixItUp via the 'filter' method:    
        if (self.$container.mixItUp('isLoaded')) {
            self.$container.mixItUp('filter', self.outputString);
        }
    }
};