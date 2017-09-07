function solve() {
    return function(fileContentsByName) {
        function propInObject(obj, prop) {
            return obj[prop];
        }
        //var asd = propInObject(fileContentsByName, 'wallpaper.png');
        var divAdd = document.getElementsByClassName('add-wrapper')[0];
        var addBtn = document.getElementsByClassName('add-btn')[0];
        var ul = document.getElementsByClassName('items')[0];
        var liFile = ul.getElementsByClassName('file-item')[0];
        var liDir = ul.getElementsByClassName('dir-item');
        var input = divAdd.getElementsByTagName('input')[0];
        //artice
        var resultArticle = document.getElementsByClassName('file-preview')[0];
        ul.addEventListener('click', function(ev) {
            if (ev.target.className === 'item-name') {

                if (ev.target.parentElement.classList[0] === 'file-item') {
                    var prop = ev.target.innerHTML;
                    var text = propInObject(fileContentsByName, prop);
                    console.log(resultArticle)
                    resultArticle.firstElementChild.innerText = text;
                }
                if (ev.target.parentElement.classList[0] === 'dir-item') {
                    ev.target.parentElement.classList.toggle('collapsed');
                }
            }

            if (ev.target.className === 'del-btn') {
                ev.target.parentElement.remove();
            }

        });
        addBtn.addEventListener('click', function(ev) {
            ev.target.classList.toggle('visible');
            ev.target.nextElementSibling.classList.toggle('visible');
        });
        input.addEventListener('keyup', function(ev) {
            var textAdd = ev.target.value;
            var isFolder = true;
            // if (ev.which === 13 && isFolder === false) {
            var textExtend = ev.target.value;
            var index = 0;

            for (var i = 0; i < liDir.length; i += 1) {
                if (textAdd.includes(liDir[i].firstElementChild.innerHTML + '/')) {
                    index = i;
                    isFolder = false;
                }
            }
            if (ev.which === 13 && isFolder === false) {
                textExtend = textExtend.split('/')[1];
                var createdLi = createLi(textExtend, true);
                liDir[index].children[1].appendChild(createdLi);
                ev.target.classList.toggle('visible');
                ev.target.previousElementSibling.classList.toggle('visible');
            }
            if (ev.which === 13 && isFolder === true) {
                createLi(textAdd, false);
                ev.target.classList.toggle('visible');
                ev.target.previousElementSibling.classList.toggle('visible');
            }
        });

        function createLi(x, isFolder) {

            var createLi = document.createElement('li');
            createLi.className = 'file-item item';
            var aText = document.createElement('a');
            aText.className = 'item-name';
            aText.innerHTML = x;
            var delBtn = document.createElement('a');
            delBtn.className = 'del-btn';
            createLi.appendChild(aText);
            createLi.appendChild(delBtn);
            if (isFolder) {
                return createLi;
            } else {
                ul.appendChild(createLi);
            }
        }
    };
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}
