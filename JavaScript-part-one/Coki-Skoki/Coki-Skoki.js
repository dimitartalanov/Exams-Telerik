function solve(args){
    let arr= args.map(Number).slice(1),result=1;
if(arr[0]%2===0){result=0};
    for(let n=0; n< arr.length;n+=1){
        if(arr[n]%2!==0){
            nIsOdd(arr[n]);
        }else{
            nIsEvene(arr[n]);
            n+=1;
        }
    }
    function nIsOdd(n){
result=(result*n)%1024;

    }
    function nIsEvene(n){
result=(result+n)%1024;
    }
    console.log(result);
};
