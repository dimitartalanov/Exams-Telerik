function solve() {

    return function(selector, defaultLeft, defaultRight) {
        var container = document.querySelector(selector);
        var fr = document.createDocumentFragment();
        var leftArr;
        // if (Array.isArray(defaultLeft)) {
        leftArr = defaultLeft || [];
        // } else { leftArr = []; }
        var rightArr; //= defaultRight || [];
        // if (Array.isArray(defaultRight)) {
        rightArr = defaultRight || [];
        //  } else { rightArr = []; }
        var divContainer = document.createElement('div');
        divContainer.className = 'column-container';
        //left
        var divLeft = document.createElement('div');
        divLeft.className = 'column';
        var divSelect = document.createElement('div');
        divSelect.className = 'select';
        var inputRadio = document.createElement('input');
        inputRadio.type = 'radio';
        inputRadio.name = 'column-select';
        inputRadio.id = 'select-left-column';
        var label = document.createElement('label');
        label.setAttribute('for', 'select-left-column');
        //label.innerHTML = 'Add here';
        label.textContent = 'Add here';
        divSelect.appendChild(inputRadio);
        divSelect.appendChild(label);
        divLeft.appendChild(divSelect);
        var olLeft = document.createElement('ol');
        divLeft.appendChild(olLeft);
        var liLeft = document.createElement('li');
        liLeft.className = 'entry';
        var imgLeft = document.createElement('img');
        imgLeft.className = 'delete';
        imgLeft.src = 'imgs/Remove-icon.png';
        //rigth
        var divRight = document.createElement('div');
        divRight.className = 'column';
        var divSelectRight = document.createElement('div');
        divSelectRight.className = 'select';
        var inputRadioRigth = document.createElement('input');
        inputRadioRigth.type = 'radio';
        inputRadioRigth.name = 'column-select';
        inputRadioRigth.id = 'select-right-column';
        // inputRadioRigth.onclick = "asd1();";
        var labelRight = document.createElement('label');
        labelRight.setAttribute('for', 'select-right-column');
        //  labelRight.innerHTML = 'Add here';
        labelRight.textContent = 'Add here';

        divSelectRight.appendChild(inputRadioRigth);
        divSelectRight.appendChild(labelRight);
        divRight.appendChild(divSelectRight);
        var olRight = document.createElement('ol');
        divRight.appendChild(olRight);
        var liRight = document.createElement('li');
        liRight.className = 'entry';
        var imgRight = document.createElement('img');
        imgRight.className = 'delete';
        imgRight.src = 'imgs/Remove-icon.png';

        var inputAdd = document.createElement('input');
        var buttonAdd = document.createElement('button');
        //buttonAdd.href = '#';
        //buttonAdd.innerHTML = 'Add';
        buttonAdd.textContent = 'Add';

        inputAdd.setAttribute('size', '40px');

        function createLi(x) {
            for (var i = 0; i < x.length; i += 1) {
                if (x[i].trim() !== '') {
                    var crLi = liLeft.cloneNode(true);
                    //  crLi.innerHTML = x[i].trim();
                    crLi.textContent = x[i].trim();
                    var crimg = imgLeft.cloneNode(true);
                    crLi.appendChild(crimg);
                    if (x === rightArr) {
                        olRight.appendChild(crLi);
                    } else {
                        olLeft.appendChild(crLi);
                    }
                }
            }
        }
        createLi(leftArr);
        createLi(rightArr);
        var leftRadio = divSelect.getElementsByTagName('input')[0];
        var rightRadio = divSelectRight.getElementsByTagName('input')[0];
        leftRadio.checked = true;

        buttonAdd.addEventListener('click', function(ev) {
            var textAdd = ev.target.previousElementSibling.value;
            textAdd.trim();
            var leLi = liLeft.cloneNode(true);
            // leLi.innerHTML = textAdd;
            leLi.textContent = textAdd;

            var leimg = imgLeft.cloneNode(true);
            if (leftRadio.checked === true && textAdd !== '') {
                leLi.appendChild(leimg);
                olLeft.appendChild(leLi);
            }
            if (rightRadio.checked === true && textAdd !== '') {
                leLi.appendChild(leimg);
                olRig.appendChild(leLi);
            }
            ev.target.previousElementSibling.value = '';
        });

        var olRig = divRight.getElementsByTagName('ol')[0];
        var olLef = divLeft.getElementsByTagName('ol')[0];

        olRig.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'IMG') {
                // var tLi = ev.target.parentElement.textContent; //innerHTML.split('<')[0]; //text
                var tLi = ev.target.parentElement.childNodes[0].nodeValue; //innerHTML.split('<')[0]; //text

                inputAdd.value = tLi;
                ev.target.parentElement.remove();
            }

        });
        olLef.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'IMG') {
                var tLi1 = ev.target.parentElement.childNodes[0].nodeValue; //innerHTML.split('<')[0] //innerText;

                inputAdd.value = tLi1;
                ev.target.parentElement.remove();
            }
        });
        // var asd = divSelectRight.getElementsByTagName('label')[0];

        /* divSelectRight.addEventListener('change', function(ev) {
             if (ev.target.tagName === 'INPUT') {
                 rightRadio.checked = true;
                 leftRadio.checked = false;
             }
         });
         divSelect.addEventListener('change', function(ev) {
             if (ev.target.tagName === 'INPUT') {
                 rightRadio.checked = false;
                 leftRadio.checked = true;
             }
         });*/
        divContainer.appendChild(divLeft);
        divContainer.appendChild(divRight);
        fr.appendChild(divContainer);
        fr.appendChild(inputAdd);
        fr.appendChild(buttonAdd);
        container.appendChild(fr);
    };
}
