jQuery(document).ready(function ($) {

    // Список общесистемных слов 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'text_link_tabs_cars_list': 'ру',
            },
            'en':  //default language: English
            {
                'text_link_tabs_cars_list': 'ru',
            }
        };

    var lang = $.cookie('lang'),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        list_users = [],

        user = null,
        pm = null,
        chain_pm = null,
        while_pm = '0',
        list_project = null,
        list_pm = [],
        list_ss = [],
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
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
            })
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
                                    list_ss.push(el.id_structural_subdivisions);
                                }
                            });
                            LockScreenOff();
                            if (typeof callback === 'function') {
                                LockScreenOff();
                                callback();
                            }
                        })
                    })
                })
            })
        }

    // Загрузка библиотек
    loadReference(function (result) {
        // Загрузка данных
        loadData(function (result) {

            //$("section.cd-gallery ul").append('<li><a href="/user/messages"><span class="tab">Message Center</span></a></li>');

            $.each(list_project, function (i, el) {
                // Определим тип
                var type = null;
                var type_title = null;
                switch(el.id_type_project){
                    case 1: type = 'strategic'; type_title= 'Стратегический'; break;
                    case 2: type = 'normative'; type_title= 'Нормативный'; break;
                }
                var status = null;
                switch (el.id_status_project) {
                    case 0: status = 'status-open'; break;
                    case 1: status = 'status-close'; break;
                    case 2: status = 'status-pause'; break;
                }
                $("section.cd-gallery ul")
                    .append('<li class="mix ' + type + ' check1 ' + status + ' subdivisions' + el.id_structural_subdivisions + '"><a href="#' + el.id + '"><img src="../../Images/project/pm' + el.id_project_manager + '.jpg" alt=""><div class="project-men"><p>' + el.name_project_ru + '</p></div><div class="project-info"><h2>' + type_title + '</h2><p>' + el.name_project_ru + '</p></div></a></li>')
            });

            //' + el.id_project_manager + '
            //'<li class="mix strategic check1 status-open subdivisions3"><a href="#0"><img src="~/Images/project/img.png" alt="Image 1"><div class="project-info"><h2>Project 1</h2><p>Lorem ipsum dolor sit amet.</p></div></a></li>'

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
            })

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