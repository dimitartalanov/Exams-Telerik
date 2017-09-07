/* globals module */
function solve() {
    return function(selector, items) {
        var container = document.querySelector(selector);
        var fr = document.createDocumentFragment();
        //preview
        var divPreview = document.createElement('div');
        divPreview.className = 'image-preview';
        divPreview.style.display = 'inline-block';
        divPreview.style.width = '500px';
        divPreview.style.height = '500px';
        divPreview.style.textAlign = 'center';
        divPreview.style.marginLeft = '200px';
        var headingPreview = document.createElement('h1');
        headingPreview.innerText = items[0].title;
        var imgPreview = document.createElement('img');
        imgPreview.src = items[0].url;
        imgPreview.style.width = '100%';
        imgPreview.style.height = '70%';


        divPreview.appendChild(headingPreview);
        divPreview.appendChild(imgPreview);
        //container sidebar rigth
        var divContainer = document.createElement('div');
        divContainer.className = 'image-container';
        divContainer.style.float = 'right';
        divContainer.style.width = '250px';
        divContainer.style.height = '500px';
        divContainer.style.overflowY = 'scroll';
        var labelSearch = document.createElement('label');
        labelSearch.innerText = 'Filter';
        labelSearch.style.display = 'block';
        var inputSearch = document.createElement('input');
        inputSearch.type = 'text';
        divContainer.appendChild(labelSearch);
        divContainer.appendChild(inputSearch);
        var ul = document.createElement('ul');
        divContainer.appendChild(ul);
        var li = document.createElement('li');
        li.style.listStyleType = 'none';
        var headImage = document.createElement('h3');
        li.appendChild(headImage)
        var img = document.createElement('img');
        img.style.width = '170px';
        img.style.height = '150px';
        li.appendChild(img);
        for (var i = 0; i < items.length; i += 1) {
            var tempLi = li.cloneNode(true);
            tempLi.firstElementChild.innerText = items[i].title;
            tempLi.lastElementChild.src = items[i].url;
            ul.appendChild(tempLi);
        }
        ul.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'IMG') {
                headingPreview.innerText = ev.target.previousElementSibling.innerText;
                imgPreview.src = ev.target.src;
            }
        });
        var allHeaderImage = ul.getElementsByTagName('h3');
        var allLiElement = ul.getElementsByTagName('li');

        inputSearch.addEventListener('input', function() {
            var text = this.value;
            for (var i = 0; i < allHeaderImage.length; i += 1) {
                if (allHeaderImage[i].innerText.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) >= 0) {
                    allLiElement[i].style.display = '';
                } else {
                    allLiElement[i].style.display = 'none';
                }
            }

        });
        ul.addEventListener('mouseover', function(ev) {

            if (ev.target.tagName === 'IMG' || ev.target.tagName === 'H3') {
                ev.target.style.cursor = 'pointer';
                ev.target.parentElement.style.backgroundColor = 'grey';
            }
        });
        ul.addEventListener('mouseout', function(ev) {
            if (ev.target.tagName === 'IMG' || ev.target.tagName === 'H3') {
                ev.target.parentElement.style.backgroundColor = '';
            }
        });
        fr.appendChild(divPreview);
        fr.appendChild(divContainer);
        container.appendChild(fr);
    };
}

module.exports = solve;
