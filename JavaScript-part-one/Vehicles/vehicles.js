function solve(params) {
    var s = params[0];
    var c1=4,c2=10,c3=3;var c1Count=0,c2Count=0,c3Count=0;
   var a=[];
    var answer = 0;
    var count=0;
    var ind=0;
    for (var i = 0; i <= s/10; i++) {
        for (var j = 0; j <= s/4; j++) {c2Count++;
            for (var v = 0; v <= s/3; v++) {c1Count++;
               var sum = (i*10)+(j*4)+(v*3);
               if(sum==s){count++;}//console.log('{0}, {1}, {2}',i,j,v);}
                if(sum<=s){answer = Math.max(answer, sum);}
                //if(sum==s){count++;}
            else{
                a[ind]=count;
                ind++;
                
              //count=0;
                break;}           
    }}}
    //console.log(answer);
    console.log(count);
    //console.log(a);
}
//solve(['7']);
