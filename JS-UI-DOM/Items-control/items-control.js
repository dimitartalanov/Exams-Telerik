function solve() {
    return function(selector, isCaseSensitive) {
        var container = document.querySelector(selector);
        container.className = 'items-control';
        isCaseSensitive = isCaseSensitive || false;
        var fr = document.createDocumentFragment();
        var addDiv = document.createElement('div');
        addDiv.className = 'add-controls';
        var label = document.createElement('label');
        label.innerHTML = 'Enter text';
        var input = document.createElement('input');
        var buttonAdd = document.createElement('a');
        buttonAdd.style.display = 'inline-block';
        buttonAdd.className = 'button';
        buttonAdd.innerHTML = 'Add';
        //buttonAdd.href = '#'; //-ne e anchor element
        label.appendChild(input);
        label.appendChild(buttonAdd);
        addDiv.appendChild(label);

        var divSearch = document.createElement('div');
        divSearch.className = 'search-controls';
        var labelSearch = document.createElement('label');
        labelSearch.innerHTML = 'Search:';
        var inputSearch = document.createElement('input');
        labelSearch.appendChild(inputSearch);
        divSearch.appendChild(labelSearch);

        var divResult = document.createElement('div');
        divResult.className = 'result-controls';
        var ul = document.createElement('ul');
        ul.className = 'items-list';
        var li = document.createElement('li');
        li.className = 'list-item';
        var deleteButton = document.createElement('a');
        deleteButton.className = 'button';
        deleteButton.innerHTML = 'X';
        var strong = document.createElement('strong');
        li.appendChild(strong);
        li.appendChild(deleteButton);
        divResult.appendChild(ul);

        buttonAdd.addEventListener('click', function(ev) {
            var textInputAdd = ev.target.previousElementSibling.value;
            ev.target.previousElementSibling.value = '';
            var createLi = li.cloneNode(true);
            createLi.firstElementChild.innerHTML = textInputAdd;
            ul.appendChild(createLi);
        });
        ul.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'A') {
                ev.target.parentElement.remove();
            }
        });
        inputSearch.addEventListener('input', function(ev) {
            var alStrong = ul.getElementsByTagName('strong');
            var alLi = ul.getElementsByClassName('list-item');
            var textSearch = ev.target.value;
            if (isCaseSensitive === false) {
                textSearch = textSearch.toLowerCase();
            }
            for (var i = 0; i < alStrong.length; i += 1) {
                if (isCaseSensitive === false) {
                    alStrong[i].innerHTML = alStrong[i].innerHTML.toLowerCase();
                }
                if (alStrong[i].innerHTML.indexOf(textSearch) >= 0) {
                    alLi[i].style.display = '';
                } else {
                    alLi[i].style.display = 'none';
                }
            }
        });

        fr.appendChild(addDiv);
        fr.appendChild(divSearch);
        fr.appendChild(divResult);
        container.appendChild(fr);
    };
}
