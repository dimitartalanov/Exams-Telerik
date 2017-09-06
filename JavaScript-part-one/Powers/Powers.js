function solve(params){
    var nk = params[0].split(' ').map(Number),
        s = params[1].split(' ').map(Number),
        result=[];
    
    let arr = s.slice(0);
    for (var i = 0; i < nk[1]; i+=1) {
      
       for (var j = 0; j < s.length; j++) {
//            •	each 0 - with the absolute difference of its neighboring numbers
// •	all other even numbers - with the maximum of its neighboring numbers
// •	each 1 - with the sum of its neighboring numbers
// •	all other odd numbers - with the minimum of its neighboring numbers
if(j===0){
    arr[-1]=arr[arr.length-1];
}
if(j===arr.length-1){
    arr[j+1]=arr[0];
}
           if(arr[j]===0){
result[j]=Math.abs(arr[j-1]-arr[j+1]);
           }
           else if(arr[j]==1){
result[j]=Math.abs(arr[j-1]+arr[j+1]);
               
           }
           else if(arr[j]%2===0){
               result[j]=Math.max(arr[j-1],arr[j+1]);
           }else{
              result[j]=Math.min(arr[j-1],arr[j+1]);
               
           }
       }
          arr = result.slice(0);
    }
var total=0;
for(var i in result) { total += result[i]; }
console.log(total);
}
// solve([
// '10 3',
// '1 9 1 9 1 9 1 9 1 9',

// ]);
