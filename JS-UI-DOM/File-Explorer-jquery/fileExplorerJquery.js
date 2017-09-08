function solve() {
    return function(fileContentsByName) {
        var $articleText = $(fileContentsByName);
        var $addInput = $('input');

        function read_prop(obj, prop) {
            return obj[prop];
        }

        var $ul = $('ul');
        var $article = $('article').children();
$ul.on('click', function(event) {
            var $target = $(event.target),
                $parent = $target.parent();

            if ($parent.hasClass('dir-item')) {
                $parent.toggleClass('collapsed');
            }

            if ($parent.hasClass('file-item')) {
                var prop = $target.text();
                
                var text = read_prop($articleText[0], prop); //funciq s koqto wzimam teksta ot obekta

                $('.file-content').text(text);
            }

            if ($target.hasClass('add-btn')) {
                $target.removeClass('visible');
                $addInput.addClass('visible');
            }

            if ($target.hasClass('del-btn')) {
                $parent.remove();
            }

        });

    };
}
