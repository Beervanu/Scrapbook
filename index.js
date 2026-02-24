let num_days = 1
let params = new URLSearchParams(window.location.search)
let day = parseInt(params.get("day"))
let known_scroll_x = 0
if (!day) 
{
	url = new URL(window.location.href)
	url.searchParams.set("day", 1)
	window.location.href = url
}

fetch("photos.json").then(res => res.json()).then(photos=>
{
	num_days = photos.dates.length
	date = photos.dates[day-1]
	let images = photos[date]
	let img_div = document.getElementById("images")
	for(let i =0; i<images.length; i++)
	{
		img_div.innerHTML += '<div class="photo_container" ><div class="border"><img class="photo" src="./Images/'+date +'/'+images[i]+'"></div></div>'
	}
	document.getElementById("Title").innerText = date+":"

	let left_button = document.getElementById("left")
	let right_button = document.getElementById("right")
	if (day ==1)
	{
		right_button.style.display="none"
	}
	else if (day==num_days)
	{
		left_button.style.display="none"
	}
	document.getElementById("left").addEventListener("click", (e)=> next_day(true))
	document.getElementById("right").addEventListener("click", (e)=> next_day())
})

document.getElementById("fullscreen").addEventListener("click", (e)=>{
	let ph = document.getElementById("photo_list")
	if (ph.requestFullscreen) {
		ph.requestFullscreen();
	} else if (ph.webkitRequestFullscreen) { // Safari
		ph.webkitRequestFullscreen();
	}
})

function next_day(reverse=false)
{
	url = new URL(window.location.href)
	if (!reverse)
	{
		url.searchParams.set("day", Math.max(1,day-1))
	}
	else
	{
		url.searchParams.set("day", Math.min(num_days, day+1))
	}
	window.location.href = url
}

document.addEventListener("keydown", onArrowKey)
function onArrowKey(e)
{
	
	if(e.key == "ArrowRight")
	{
		next_day()
	}
	else if(e.key == "ArrowLeft")
	{
		next_day(true)
	}
}