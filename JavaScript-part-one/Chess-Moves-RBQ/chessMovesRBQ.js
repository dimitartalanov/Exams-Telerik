/**
 * Created by dimitar on 12/18/2016.
 */
function solve(args) {
    const r = +args[0],
        board = args.slice(2, r + 2),
        moves = args.slice(r + 3);
    let cells,yes;

    function parseMoves(move) {
        cells = move;//.split(' ');//за да го направи на масив
        return {
            from: {

                r: r - (Number(cells[1])),//взимаме цифрата и явадим за да ги обърнем огледално
                c: cells[0].charCodeAt(0) - 97
            },
            to: {
                r: r - (+cells[4]),//взимаме цифрата и явадим за да ги обърнем огледално
                c: cells[3].charCodeAt(0) - 97
            }
        }

    };
    function canMoveRook(from, to) {
        //console.log('vleznah');
        if(from.r===to.r&&from.c===to.c){
          return false;
        };
        if ((from.c !== to.c) && (from.r !== to.r)) {//ако топа си смени едновременно и колоната и реда да върне фалсе
            return console.log('no');
        }
        ;
        let deltaCellc = from.c > to.c ? -1 : 1;
        let deltaRow = from.r > to.r ? -1 : 1;
        if (from.c === to.c) {
            deltaCellc = 0;
        }
        ;
        if (from.r === to.r) {
            deltaRow = 0;
        }
        ;
        while ((from.c !== to.c) || (from.r !== to.r)) {
            from.c += deltaCellc;
            from.r += deltaRow;
            if (board[from.r][from.c] !== ('-')) {
                //console.log(from.r,from.c);
                //console.log(board[from.r][from.c])
                yes='no';
                break;
            } else {
                yes='yes';
            }

        }
        ;
        console.log(yes)
    };
    function canMoveBishop(from, to) {
        if(from.r===to.r&&from.c===to.c){
            return false;
        };
        //console.log(Math.abs(from.c-to.c),Math.abs(from.r-to.r));
        if ((Math.abs(from.c - to.c)) !== (Math.abs(from.r - to.r))) {//ако не ги смени и колоната и реда еднакво на брой значи не еофицер
            return console.log('no');//false;//tuka trqbwa da e log no
        }
//kogato e caritata e kato top i popadne tuk-ne trqbwa da e log a return false, obache a3-a3-toest nagore, trqbwa da se izpishe no ne moje kato top,toest kogato idwa ot caricata da ne izpiswa
        ;
        let deltaCellc = from.c > to.c ? -1 : 1;
        let deltaRow = from.r > to.r ? -1 : 1;

        while ((from.c !== to.c) && (from.r !== to.r)) {
            from.c += deltaCellc;
            from.r += deltaRow;
            if (board[from.r][from.c] !== ('-')) {
                //console.log(from.r,from.c);
                //console.log(board[from.r][from.c])
                yes='no';
                break;
            } else {
                yes = 'yes';
            }
        }
        console.log(yes);
    };

    function caMoveQueen(from,to) {
      if((from.r===to.r)||(from.c===to.c)){
          return  canMoveRook(from, to);
      }else{

        return canMoveBishop(from, to)
      }
      ;
       //return canMoveBishop(from, to) || canMoveRook(from, to);
//tuka neshto proverka predwaritelno top ili oficer i tam da o prata
    };

    for (let m in moves) {

        let temp=parseMoves(moves[m]);
        //console.log(board[temp.from.r][temp.from.c]);
        if(board[temp.from.r][temp.from.c]==='-') {
            console.log('no');

        }
        else if(board[temp.from.r][temp.from.c]==='R') {
            canMoveRook(temp.from, temp.to);

        }
        //console.log(temp.from,temp.to);
        else if(board[temp.from.r][temp.from.c]==='Q') {
            caMoveQueen(temp.from, temp.to);

        }
        else if(board[temp.from.r][temp.from.c]==='B') {
            canMoveBishop(temp.from, temp.to);

        };

        //console.log(moves);
        //console.log(m);
    }
    ;

    var abc = {};
    //moves.forEach((x, i)=>(abc = parseMoves(moves[i]), console.log(abc)));
    //canMoveRook(abc.from, abc.to);


};
