function solve() {
    return function(selector, tabs) {
        var container = document.querySelector(selector);
        var fr = document.createDocumentFragment;
        var ulNav = document.createElement('ul');
        ulNav.className = 'tabs-nav';
        var liNav = document.createElement('li');
        var aNav = document.createElement('a');
        aNav.className = 'tab-link';
        var ulContent = document.createElement('ul');
        ulContent.className = 'tabs-content';
        var liContent = document.createElement('li');
        liContent.className = 'tab-content';
        var pConetnt = document.createElement('p');
        var buttonContent = document.createElement('button');
        buttonContent.className = 'btn-edit';
        buttonContent.innerHTML = 'Edit';
        for (var i = 0; i < tabs.length; i += 1) {
            var liNavigation = liNav.cloneNode(true);
            var aNavigation = aNav.cloneNode(true);
            aNavigation.innerHTML = tabs[i].title;
            liNavigation.appendChild(aNavigation);
            var liCon = liContent.cloneNode(true);
            liCon.appendChild(pConetnt.cloneNode(true));
            liCon.appendChild(buttonContent.cloneNode(true));
            liCon.firstElementChild.innerHTML = tabs[i].content;
            ulNav.appendChild(liNavigation);
            ulContent.appendChild(liCon);
        }
        var alLiContent = ulContent.getElementsByClassName('tab-content');
        alLiContent[0].className += ' visible';
        var alLiNav = ulNav.getElementsByClassName('tab-link');

        ulNav.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'A') {
                for (var i = 0; i < alLiContent.length; i += 1) {
                    //alLiContent[i].classList.remove('visible');-poneje pishe bez classList
                    alLiContent[i].className = 'tab-content'; //.split(' ')[1] = '';
                    if (alLiNav[i].innerHTML === ev.target.innerHTML) {
                        alLiContent[i].className += ' visible';
                    }
                }
            }
        });
        ulContent.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'BUTTON') {
                if (ev.target.innerHTML === 'Edit') {
                    ev.target.innerHTML = 'Save';
                    var textArea = document.createElement('textarea');
                    textArea.className = 'edit-content';
                    textArea.value = ev.target.parentNode.firstElementChild.innerHTML;
                    ev.target.parentNode.appendChild(textArea);
                } else {
                    ev.target.innerHTML = 'Edit';
                    var textInTextArea = ev.target.parentElement.lastChild.value;
                    ev.target.parentElement.firstElementChild.innerHTML = textInTextArea;
                    ev.target.parentElement.lastChild.remove();
                }
            }
        });
        //fr.appendChild(ulNav);
        //fr.appendChild(ulContent);
        container.appendChild(ulNav);
        container.appendChild(ulContent);
        //container.appendChild(fr)
    };
}
