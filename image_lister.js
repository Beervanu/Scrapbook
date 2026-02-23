const fs = require("node:fs")
const image_folder = "./Images/"
let date_folders = fs.readdirSync(image_folder)
date_folders.sort().reverse()
obj = {"dates": date_folders}
for(let i =0; i< date_folders.length; i++)
{
	image_files = fs.readdirSync(image_folder+date_folders[i], {"withFileTypes": true}).filter((s)=> !s.name.endsWith(".CR2"))
	obj[date_folders[i]] = image_files.map(i => i.name)
}

fs.writeFileSync("./photos.json", JSON.stringify(obj)) 