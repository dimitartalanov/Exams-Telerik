/**
 * Created by dimitar on 1/19/2017.
 */
function solve(args) {
    let rowCol = args[0].split(' ').map(Number),
        R = rowCol[0], C = rowCol[1],nCheck=[]; //currentposition - number of cells
        firstPosition = {
            r: R / 2 - 0.5,
            c: C / 2 - 0.5
        };
    let currentCells = [];
    currentCells[0] = firstPosition.r;
    currentCells[1] = firstPosition.c;

    let matrix = args.slice(1);//.forEach(function(x,i){});

    for (let i = 0; i < R; i += 1) {//����� ����� �� ����� �� �� �� �������� ���� � =
        matrix[i] = matrix[i].split(' ').map(Number);
    }
    let currentPosition = matrix[firstPosition.r][firstPosition.c];

    function checkWasPosition(r, c, n) {
        n = n.toString(2);
        var str = "" + n;
        var pad = "0000";//���� �������� ���� � �� �� �������� �������(0111)-�� ������ 4
        n = pad.substring(0, pad.length - str.length) + str;

        n = n.split('');//����� ����� �� ���� ����� ������� ������� �� ���� �� �������� ������� ��������
//if(matrix[r - 1]===undefined||matrix[r + 1]===undefined||matrix[c - 1]===undefined||matrix[c + 1]===undefined){stopWhile=false; return `No rakiya, only JavaScript ${r} ${c}`;}//nqkak si da dobawa prowerka za undefine-toest izbqgalss
//���� �� ���������� ������ �������� � �� ��������� ���� �� � ����� �� �� �� ���� ���� ������ ������� �� ���� �����, ������ � ������ canMovie-�� �� �������
        if (matrix[r - 1][c] === '-') {//up
            n[n.length - 1] = '0'
        }
        if (matrix[r][c + 1] === '-') {//right
            n[n.length - 2] = '0'
        }
        if (matrix[r+1][c] === '-') {//down
            n[n.length - 3] = '0'
        }
        if (matrix[r][c-1] === '-') {//left
            n[n.length - 4] = '0'
        }

        //console.log(n);
nCheck=[...n];//������� �� ������ �� �� ���� � whileto da go prekusna
        //console.log(n.join().replace( /,/g, "" ));
        if(n.join().replace( /,/g, "" )==='0000'){
            return `No JavaScript, only rakiya ${r} ${c}`;}//����� � � ������� �� �� �� ������ � 0
        canMovie(n);
    }

    function canMovie(n) {
        // n=n.toString(2);
        //'-' �������� ������� � ��� ��� ��� � � '-'-�� �� ���� � �� �������� ������ �� ��������� ������� � �������


        if (+n[n.length - 1] === 1) {//up
            currentPosition = matrix[currentCells[0] - 1][currentCells[1]];
            matrix[currentCells[0]][currentCells[1]] = '-';
            currentCells[0] -= 1;
            if(matrix[currentCells[0]]===undefined){stopWhile=false; return `No rakiya, only JavaScript ${currentCells[0]} ${currentCells[2]}`;}
            //��� ��� ���������� �� ...
            return currentPosition;
        }
        else if (+n[n.length - 2] === 1) {//right
            //if(matrix[currentCells[0]][currentCells[1]+1]==='-'){}
            currentPosition = matrix[currentCells[0]][currentCells[1] + 1];
            matrix[currentCells[0]][currentCells[1]] = '-';
            currentCells[1] += 1;
            if(matrix[currentCells[1]]===undefined){stopWhile=false; return `No rakiya, only JavaScript ${currentCells[0]} ${currentCells[2]}`;}

            return currentPosition;
        }
        else if (+n[n.length - 3] === 1) {//down
            currentPosition = matrix[currentCells[0] + 1][currentCells[1]];
            matrix[currentCells[0]][currentCells[1]] = '-';
            currentCells[0] += 1;
            if(matrix[currentCells[0]]===undefined){stopWhile=false; return `No rakiya, only JavaScript ${currentCells[0]} ${currentCells[2]}`;}

            return currentPosition;
        }
        else if (+n[n.length - 4] === 1) {//left
            currentPosition = matrix[currentCells[0]][currentCells[1] - 1];
            matrix[currentCells[0]][currentCells[1]] = '-';
            currentCells[1] -= 1;
            if(matrix[currentCells[1]]===undefined){stopWhile=false; return `No rakiya, only JavaScript ${currentCells[0]} ${currentCells[2]}`;}

            return currentPosition;
        }



    }
    function positionIsUndefine(n,stopWhil){
        if(n[currentCells[0] ]===undefined){stopWhile=false; return false}
        if(n[currentCells[0] ]===undefined){stopWhile=false; return false}
        if(n[currentCells[1] ]===undefined){stopWhile=false; return false}
        if(n[currentCells[1] ]===undefined){stopWhile=false; return false}


    }
    var stopWhile=true;
    let result;
    do{
       result = checkWasPosition(currentCells[0], currentCells[1], currentPosition);
        if(!(result===undefined)){console.log(result)}
    //console.log(parseInt(nCheck,2));
        //positionIsUndefine(matrix,stopWhile);
       // console.log(stopWhile===false);
    }
   while((!(nCheck.join().replace( /,/g, "" )==='0000'))&& !(stopWhile===false));//positionIsUndefine(matrix)===false);//(!(matrix[currentCells[0] - 1]===undefined))||(!(matrix[currentCells[0] + 1]===undefined))||(!(matrix[currentCells[1] - 1]===undefined))||(!(matrix[currentCells[1] + 1]===undefined)));//{
       console.log(matrix);
       //if(matrix[currentCells[0]][currentCells[1]]===undefined) {
         //  break
      // }
       //canMovie(matrix[currentCells[0]][currentCells[1]])
       //console.log(checkWasPosition(currentCells[0], currentCells[1], currentPosition));
   //}
    //console.log(currentPosition);
    //console.log(checkWasPosition(currentCells[0], currentCells[1], currentPosition));
    //console.log(checkWasPosition(currentCells[0], currentCells[1], currentPosition));
    //console.log(checkWasPosition(currentCells[0], currentCells[1], currentPosition));
    //console.log(nCheck);
    //console.log(checkWasPosition(currentCells[0], currentCells[1], currentPosition));
    //console.log(checkWasPosition(currentCells[0], currentCells[1], currentPosition));//poneje gore kato prowerqwa za up mu idwa izvun matricata





    //canMovie(currentPosition);canMovie(currentPosition);canMovie(currentPosition);canMovie(currentPosition);canMovie(currentPosition);canMovie(currentPosition);
    //canMovie(matrix[currentCells[0]][currentCells[1]]);canMovie(matrix[currentCells[0]][currentCells[1]]);
    //console.log(matrix);
}
  /*  solve([
    '5 7',
    '9 5 3 11 9 5 3',
    '10 11 10 12 4 3 10',
    '10 10 12 7 13 6 10',
    '12 4 3 9 5 5 2',
    '13 5 4 6 13 5 6'
]);
solve([
    '7 5',
    '9 3 11 9 3',
    '12 12 4 6 10',
    '12 3 13 1 6',
    '9 6 11 12 3',
    '10 9 6 13 6',
    '10 12 5 5 3',
    '12 5 5 5 6'
]);*/
solve([
    '7 5',
    '9 3 11 9 3',
    '7 7 12 6 10',
    '12 3 13 1 6',
    '9 6 11 12 3',
    '10 9 6 13 6',
    '10 12 5 5 3',
    '12 5 5 5 6'
]);
