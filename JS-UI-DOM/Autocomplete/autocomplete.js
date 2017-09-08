function solve() {
    return function(selector, initialSuggestions) {
        var container = document.querySelector(selector);
        var input = container.getElementsByClassName('tb-pattern')[0];
        var button = container.getElementsByClassName('btn-add')[0];
        var ul = container.getElementsByClassName('suggestions-list')[0];

        var li = document.createElement('li');
        li.className = 'suggestion';
        li.style.display = 'none';
        var a = document.createElement('a');
        a.href = '#';
        a.className = 'suggestion-link';
        li.appendChild(a);

        var initialLower = [];
        initialSuggestions.forEach(function(i, index) {
            initialLower[index] = i.toLowerCase();
        });
        var suggest = [];

        function createLi(x) {
            var createLi = li.cloneNode(true);
            createLi.firstChild.innerHTML = x;
            ul.appendChild(createLi);
            // ul.style.display = 'none';
        }
        for (var i = 0; i < initialSuggestions.length; i += 1) {
            if (initialLower.indexOf(initialSuggestions[i].toLowerCase()) == i) {
                suggest.push(initialSuggestions[i]);
                /*var createLi = li.cloneNode(true);
                createLi.firstChild.innerHTML = initialSuggestions[i];
                ul.appendChild(createLi);*/
                createLi(initialSuggestions[i]);
            }
        }
        var isHasSuggest = false;

        function uniqAdd(x) {

            for (var i = 0; i < suggest.length; i += 1) {
                if (suggest[i].toLowerCase() === x.toLowerCase()) {
                    isHasSuggest = true;
                    return;
                } else {
                    isHasSuggest = false;
                }
            }
        }

        button.addEventListener('click', function(ev) {
            ul.style.display = 'none';
            var text = ev.target.parentNode.firstElementChild.value;
            ev.target.parentNode.firstElementChild.value = '';
            uniqAdd(text);
            if (isHasSuggest === false) {
                /* var crLi = li.cloneNode(true);
                 crLi.firstChild.innerHTML = text;
                 ul.appendChild(crLi);*/
                createLi(text);
                suggest.push(text);
            }
        });
        input.addEventListener('input', function(ev) {
            ul.style.display = '';
            var textInput = ev.target.value;
            var allLiElemnts = ul.getElementsByClassName('suggestion');

            for (var i = 0; i < allLiElemnts.length; i += 1) {
                if (allLiElemnts[i].firstElementChild.innerHTML.toLowerCase().indexOf(textInput.toLowerCase()) >= 0 && textInput !== '') {
                    allLiElemnts[i].style.display = '';
                } else {
                    allLiElemnts[i].style.display = 'none';
                }
            }
        });
        ul.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'A') {
                var textAnchor = ev.target.innerHTML;
                input.value = textAnchor;
            }
        });
    };
}
