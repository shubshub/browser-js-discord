var login = "Bit.ly API Username";
var api_key = "Bit.ly API Key";


var commands = [];
var functions = [];
var insults = [];
var compliments = [];
var users = [];
var uids = [];
var domNewMessage = document.getElementsByTagName("span");

function init()
{
	var a = document.getElementById("authToke");
	var u = document.getElementById("urlToke");
	authToken = a.value;
	lru = u.value;
	sendMessage("Mregal Bot is now Active");
	var handle = setTimeout(returnChat,100);
}


function addCommand(comm,resp)
{
	commands[commands.length] = comm;
	functions[functions.length] = resp;
}
function addInsult(txt)
{
	insults[insults.length] = txt;
}
function addCompliment(txt)
{
	compliments[compliments.length] = txt;
}
function addIdea(txt)
{
	ideas[ideas.length] = txt;
}

function creation()
{
	sendMessage("I was created by Shubshub using JS/jQuery with an engine built from the ground up");
}


function insult(str)
{
	//username = str.replace("$insult @","");
	username = str.replace("$insult ","");
	var rand = Math.floor(Math.random() * (insults.length - 0 + 0)) + 0;
	sendMessage(username + " " + insults[rand]);
}
function compliment(str)
{
	//username = str.replace("$compliment @","");
	username = str.replace("$compliment ","");
	//var user = getUserID(username);
	//if (user != undefined)
	//{
	//	username = "<@" + user + ">";		
	//}
	var rand = Math.floor(Math.random() * (compliments.length - 0 + 0)) + 0;
	sendMessage(username + " " + compliments[rand]);
}


function help()
{
	sendMessage("Put your help stuff here");
}

function upsideDownText(txt) 
{
	txt = txt.replace("$flip ","");
	var result = flipString(txt.toLowerCase());
	sendMessage(result);
}


function get_short_url(long_url, login, api_key)
{
    jQuery.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?", 
        { 
            "format": 'json',
            "apiKey": api_key,
            "login": login,
            "longUrl": long_url
        },
        function(response)
        {
			console.log(response.data.url);
			sendMessage("Here Try this: "+response.data.url);
        }
    );
}
function stack(resp)
{
	var str = resp;
	str = str.replace("$stackoverflow ","");
	str = str.replace(/ /g, "%20");
	str = str.split('+').join('%2b');
	get_short_url("http://stackoverflow.com/search?q="+str, login, api_key);
}

function numSeq(txt)
{
	var counted = 0;
	var finString = "";
	var looking;
	nums = txt.replace("$seqGame ","");
	var array = nums.split("");
	looking = array[0];
	for (var i = 0; i < array.length; i++)
	{
		if(looking == array[i])
		{
			counted+=1;
		}
		if (looking !=array[i+1])
		{
			looking = array[i+1];
			finString = finString + counted  + array[i];
			counted = 0;
		}
	}
	sendMessage(finString + "\nCan you figure out the next number in the sequence?\nBecause I can ^_^");
}

var chat = [];
var nextCheck = 0;
var firstTime = 1;
function returnChat()
{
	if (nextCheck == 0)
	{
		nextCheck = 1;
		$.ajax(
			{
				type: "GET",
				url: lru,
				headers: 
				{ 
					'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					'Accept-Language': "en-US",
					'Content-Type': "application/json",
					'X-Super-Properties': "Put a Super Properties Token here",
					'Authorization': authToken
				},
				success: function(response)
				{
					
					//console.log(response);
					chat = response
					handler(chat[0].content);
				}
			});			
	}
}
function chatHandler()
{
	handler(chat[0].content);
}

function handler(txt)
{
	if (chatReady == 1)
	{
		lastMessage = txt;
		for (var i = 0; i < commands.length; i++)
		{
			if ((txt.indexOf(commands[i]) !=-1))
			{
				functions[i](txt);
				chatReady = 0;
			}				
		}
		
	}
	nextCheck = 0;
	returnChat();
	domNewMessage[0].innerHTML= chat[0].content;
	
}


//Place the command adding below here 
addCommand("Command to see in Chat",'function name without quotes');