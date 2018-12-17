var btn = document.getElementById("btn");
var div = document.getElementById("data");
var next = document.getElementById("btn1");
var sub = document.getElementById("btn2");
var radiodiv = document.getElementById("radio");
var box = document.getElementById("box");
var timer = document.getElementById("timer");
var category=[]
var questions=[]
var options=[]
var page =0
var score=0;
var opt=-1
var x;
var countdownTimer; 

for(i=0;i<10;i++)
{
	options[i]=[];
	
}
btn.addEventListener('click',function(){
	var request = new XMLHttpRequest();
	request.open('GET','https://opentdb.com/api.php?amount=10');
	request.onload = function(){
	
	var ourdata = JSON.parse(request.responseText);
	console.log(ourdata.results.length);
	changetoHtml(ourdata);
	next.style.visibility='visible';
	sub.style.visibility='visible';
	box.style.visibility='visible';
	displayhtml();
	
};
request.send();
//console.log(ourdata.results.length);
	
});

sub.addEventListener('click',function(){
	total = parseInt(page)+1;
	console.log(total);
	document.getElementById('result').style.visibility='visible';
	if(document.getElementById("radio0").checked)
	{	
		
		score+=1;
		document.getElementById('result').innerHTML='Correct answer Score '+score+'/'+total;
		document.getElementById('result').style.color='green';
		
	}else
	{
		document.getElementById('result').innerHTML='Wrong answer Score '+score+'/' +total;
		document.getElementById('result').style.color='red';
	}
	
	sub.disabled= true;
	timer.style.visibility='hidden';
	
});

next.addEventListener('click',function(){
	
	document.getElementById('result').style.visibility='hidden';
	sub.disabled= false;
	clearInterval(x);
	timer.innerHTML=" ";
	page+=1;
	displayhtml();
	timer.style.visibility='visible';
	
});

function changetoHtml(data){
	
	
	for(i=0;i<data.results.length;i++)
	{
		category.push(data.results[i].category);
		questions.push(data.results[i].question);
		options[i].push(data.results[i].correct_answer);
		for(j=0;j<data.results[i].incorrect_answers.length;j++)
		{
			options[i].push(data.results[i].incorrect_answers[j]);
		}
	}
	console.log(category);
	console.log(questions);
	console.log(options[0]);
}

function displayhtml()
{
	var questionString="";
	var optionsString="";
	var check=['False','False','False','False'];
	questionString+="<h2>"+questions[page]+"</h2><br>";
	console.log(options[page]);
	for(i=0;i<4;i++)
	{	
		//console.log(check);
		opt = generateRandom(check); 
		questionString+="<input name=\"optradio\" id=\"radio"+opt+"\" type=\"radio\">"+" "+ options[page][opt]+"</input><br>";
		
	}
	//radiodiv.innerHTML=optionsString;	
	div.innerHTML=questionString;
	countdownTimer = 30;
	x= setInterval(timerfunction,1000);
}	

function generateRandom(check){
	
	j=Math.floor(Math.random()*4);
	//console.log(j)
	while(check[j]==="True")
	{
		j=Math.floor(Math.random()*4);
		//console.log("in loop"+j);
	}
	check[j]='True';
	//console.log("from function"+ check);
	return j;
}

function timerfunction()
{
	
	timer.style.fontSize= '30px';
	timer.style.color= 'red';
		
		countdownTimer-=1;
		
		timer.innerHTML= countdownTimer + " s Remaining";
		
		if(countdownTimer <0)
		{
			clearInterval(x);
			timer.innerHTML="Timer Expired";
			timer.style.fontSize= '40px';
			sub.disabled="true";
		}
			
		
		
	}

