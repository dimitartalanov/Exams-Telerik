/**
 * Created by dimitar on 1/13/2017.
 */
function solve(args) {
//destucturing assignments
    const [rows,cols]=args[0].split(' ').map(Number);
//��� ���� rows=5;col=5;
    let field = new Array(rows);
    for (let i = 0; i <= cols; i += 1) {
        field[i] = new Array(cols);
        field[i].fill('-');
    }


    let tankPosition = [
        {
            rows: 0, cols: 0
        },//towa e tank 0-� ���� ������,
        {rows: 0, cols: 1}, {rows: 0, cols: 2}, {rows: 0, cols: 3},//����� �� ����� ������ ������� � ������ ������� 0 � 1, 0 � 2 � ����� �� �� �������� ���� ������ � �����
        //����2-������
        {rows: rows - 1, cols: cols - 1}, {rows: rows - 1, cols: cols - 2}, {
            rows: rows - 1,
            cols: cols - 3
        }, {rows: rows - 1, cols: cols - 4}
    ];
    let playerTank = [4, 4];
    for (let i in tankPosition) {
        field[tankPosition[i].rows][tankPosition[i].cols] = i;��������� 1 �� 7
    }

    //field[0][0] = 0, field[0][1] = 1, field[0][2] = 2,//��������� ��������� � ��������
    //    field[0][3] = 3,
    //    //field[0][4] = 4;//��������� ���������
    //field[rows - 1][cols - 1] = 4,
    //    field[rows - 1][cols - 2] = 5,
    //    field[rows - 1][cols - 3] = 6,
    //    field[rows - 1][cols - 4] = 7;

    args[1].split(';').forEach(function (coordinateDebris) {
        const [x,y]=coordinateDebris.split(' ').map(Number);//������������� ��������� � x=2;y=0;
        field[x][y] = 'x';//����������� �������
    });

    function moveTank(id, n, dir) {//id-wzimame nomera na masiwa-ot obekta wednaga mu znaem kordinatite-n-� ����� ������ �� �� ��������-� dir- �� ������ �� � ������ ����� �� 4 ������ ������ � �����row i deltacol
        //da smetnem delta row i delta col
        let deltaRow = 0, deltaCol = 0;
        if (dir === 'u') {
            deltaRow -= 1;
        } else if (dir === 'd') {
            deltaRow += 1;
        }
        if (dir === 'l') {
            deltaCol -= 1;
        } else if (dir === 'r') {
            deltaCol += 1;
        }
        //���� ��� ����� ��������� ��
        let tankRow = tankPosition[id].rows;
        let tankCol = tankPosition[id].cols;
        field[tankRow][tankCol] = '-';
        while (n > 0) {
            ///////////////////////32 min
            let newPosRow = tankRow + deltaRow;
            let newPosCol = tankCol + deltaCol;
            if (newPosRow < 0 || newPosRow >= rows) {
                break;
            }
            if (newPosCol < 0 || newPosCol >= rows) {
                break;
            }
            if (field[newPosRow][newPosCol] !== '-') {
                break;
            }
            tankRow = newPosRow;
            tankCol = newPosCol;
            n -= 1;
        }
        tankPosition[id].rows = tankRow;
        tankPosition[id].cols = tankCol;
        field[tankRow][tankCol] = id;
    }

    function shooting(id, dir) {
        let deltaRow = 0, deltaCol = 0;
        if (dir === 'u') {
            deltaRow -= 1;
        } else if (dir === 'd') {
            deltaRow += 1;
        }
        if (dir === 'l') {
            deltaCol -= 1;
        } else if (dir === 'r') {
            deltaCol += 1;
        }
        let shootRow = tankPosition[id].rows + deltaRow;
        let shootCol = tankPosition[id].cols + deltaCol;

        while (true){//(shootRow > 0 && shootRow <= rows && shootCol > 0 && shootCol <= cols) {
            if (field[shootRow][shootCol] === '-') {
                shootRow += deltaRow;
                shootCol += deltaCol;
            }
            else if (shootRow < 0 || shootRow >= rows) {
                break;
            }
            else if (shootCol < 0 || shootCol >= cols) {
                break;
            }
            else if (field[shootRow][shootCol] === 'x') {
                field[shootRow][shootCol] = '-';
                break;
            }
            else{
                const tankDead = field[shootRow][shootCol];//da wzeme id-to na tanka
                console.log(`Tank ${tankDead} is gg`);
                const playerId = tankDead < 4 ? 0 : 1;
                playerTank[playerId] -= 1;
                const loserName = ['Koceto', 'Cuki'][playerId];
                if (playerTank[playerId] === 0) {
                    console.log(`${loserName} is gg`);
                }
                field[shootRow][shootCol] = '-';
                //console.log(field);
                break;
            }//else{break;}
        }
    }

    const nCommands = args[2];

    for (let i = 3; i < nCommands+3; i += 1) {
        //console.log(args[i].split(' '));
        const command = args[i].split(' ');
        if (command[0] === 'mv') {
            moveTank(+command[1], +command[2], +command[3]);
        } else if (command[0] === 'x') {
            shooting(+command[1], +command[2]);
        } else {
            //TO do
        }

    }

    //console.log(field);//21min
};
solve([
    '5 5',
    '2 0;2 1;2 2;2 3;2 4',
    '13',
    'mv 7 2 l',
    'x 7 u',
    'x 0 d',
    'x 6 u',
    'x 5 u',
    'x 2 d',
    'x 3 d',
    'mv 4 1 u',
    'mv 4 4 l',
    'mv 1 1 l',
    'x 4 u',
    'mv 4 2 r',
    'x 2 d'
]);
