let num_days = 1
let params = new URLSearchParams(window.location.search)
let day = parseInt(params.get("day"))
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
}
)


document.addEventListener("keydown", onArrowKey)
function onArrowKey(e)
{
	url = new URL(window.location.href)
	if(e.key == "ArrowRight")
	{
		url.searchParams.set("day", Math.max(1,day-1))
		window.location.href = url
	}
	else if(e.key == "ArrowLeft")
	{
		url.searchParams.set("day", Math.min(num_days, day+1))
		window.location.href = url
	}
}