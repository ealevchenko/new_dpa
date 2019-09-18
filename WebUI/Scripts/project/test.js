jQuery(document).ready(function ($) {
    var d = new Dpa('en');
    var d1 = new Dpa('ru');
    var p = new Project('en');
    var p1 = new Project('ru');

    d.load(['user', 'ss'],
        function (result) {
            var s1 = d.list_users;
            var s2 = d.list_structural_subdivisions;
            var user = d.getSNPofIDUsers(1);
        });

    d1.load(['ss'],
        function (result) {
            var s1 = d1.list_users;
            var s2 = d1.list_structural_subdivisions;
            var user = d.getSNPofIDUsers(2);
        });

    p.load(['type', 'wp'],
        function (result) {
            var sp1 = p.list_type_project;
            var sp2 = p.list_work_performers;
            var sp3 = p.getStructuralSubdivisionsOfID(1);
            //var userp = d.getSNPofIDUsers(2);
        });
    p1.load(['type'],
        function (result) {
            var sp1 = p1.list_type_project;
            var sp2 = p1.list_work_performers;
            var sp3 = p1.getStructuralSubdivisionsOfID(2);
            //var userp = d.getSNPofIDUsers(2);
        });
});

