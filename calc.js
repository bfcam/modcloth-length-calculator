(function($) {
    function getLengths(p0, p1, sizes) {
        var lens = [];

        for (var i = 0; i < sizes; i++) {
            /* use basic linear interpolation */
            var len = p0[1] + ((i - p0[0]) * ((p1[1] - p0[1]) / (p1[0] - p0[0])));

            lens[i] = Math.round(len * 10) / 10;
        }

        return lens;
    }

    var $form = $('form');
    var $table = $form.find('table');
    var $button = $form.find('input[type="submit"]');

    $form.on('submit', function() {
        var $l = $form.find('.l');
        var $input = $l.find('input');
        var $text = $l.find('div');

        if ($table.hasClass('readonly')) {
            $table.removeClass('readonly');
            $button.val('Gimme The Rest!');

            return false;
        }

        $l.removeClass('error');

        var p0 = null;
        var p1 = null;

        $input.each(function(i) {
            var val = $(this).val();

            if (val) {
                var p = [i, parseFloat(val)];

                if (!p0) {
                    p0 = p;
                }
                else {
                    p1 = p;
                }
            }
        });

        if (!p0 || !p1) {
            $l.each(function() {
                var val = parseFloat($(this).find('input').val());
                if (!val) {
                    $(this).addClass('error');
                }
            });

            return false;
        }

        var sizes = $input.length;
        var lens = getLengths(p0, p1, sizes);

        $text.each(function(i) {
            $(this).html(lens[i] + '"');
        });

        $table.addClass('readonly');
        $button.val('Let\'s Do That Again!');

        return false;
    });
})(jQuery);