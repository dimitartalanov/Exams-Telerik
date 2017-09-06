Ivo and Niki were on a conference. Of course they arrived late for the conference. They had nothing to do and decided to count the number of wheels of all vehicles in the hotel parking. The number of all wheels were S. In the parking there were 3 types of vehicles:
•	Cars with 4 wheels
•	Trucks with 10 wheels
•	Trikes with 3 wheels
Niki and Ivo are not smart enough and managed to remember only the number of wheels, but not the number of vehicles („celata im rabota e takava“). Now they are wondering how many vehicles were there in the parking. No one can help them, but you can at least find the number of all possible combinations of cars, trucks and trikes with exactly S wheels.
Input
The input data should be read from the console. 
On the only input line there will be the number S.
The input data will always be valid and in the format described. There is no need to check it explicitly.
Output
The output should be printed on the console.
Output the number of all possible combinations of cars, trucks and trikes with exactly S wheels
Sample solution code (in JavaScript)
function solve(params) {
    var s = params[0];
    var count = 0;
    // Your solution here
    console.log(count);
}
Constraints
•	S will be between 1 and 200, inclusive.
•	Allowed working time for your program: 0.15 seconds.
•	Allowed memory: 16 MB.
Examples
Input	Output		Input	Output		Input	Output
7	1		10	2		40	11
One way only:
•	1 car and 1 trike		Two ways:
•	1 car and 2 trikes
•	1 truck		11 ways altogether
So much many wheels. Wow.
