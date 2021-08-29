let nav_sites = [
	{
		"url": "index.html",
		"text": "home"
	},
	{
		"url": "login.html",
		"text": "login"
	}
];

build_nav(nav_sites);

function build_nav(sites){
	let div = document.createElement("div");
	div.setAttribute("id", "nav_placeholder");
	document.body.appendChild(div);

	let path = window.location.pathname;
	let page = path.split("/").pop();
	if(page == ""){
		page = "index.html";
	}

	const nav = document.createElement("nav");
	//const li_template = document.createElement("li");
	const a_template = document.createElement("a");
	sites.forEach(element => {
		let a = a_template.cloneNode(1);
		
		if(element.url == page){
			a.setAttribute("class", "active");
		}
		a.setAttribute("href", element.url)
		a.innerText = element.text;
		nav.appendChild(a);
	});
	document.body.appendChild(nav);
}