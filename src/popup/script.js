async function clipPage(url, title, tags, description) {
	const { clipper_opts_vault_name: vaultName } =
		await browser.storage.local.get("clipper_opts_vault_name");
	const { clipper_opts_path: vaultPath } = await browser.storage.local.get(
		"clipper_opts_path"
	);

	if (!vaultName || !vaultPath) {
		console.log("Need to fill out settings!");
		browser.runtime.openOptionsPage();
		return;
	}

	const { clipper_opts_template: template } = await browser.storage.local.get(
		"clipper_opts_template"
	);
	const defaultTemplate = `## {title} {tags}\n- *{description}*\n- {url}`;

	const bookmarkTemplate = template || defaultTemplate;

	let str = bookmarkTemplate
		.replace("{title}", title)
		.replace("{url}", url)
		.replace("{description}", description)
		.replace("{tags}", tags)
		.replace(/\\n/g, "\n");
	let newStr = encodeURIComponent(str);

	const obsidianURI = `obsidian://advanced-uri?vault=${vaultName}&filepath=${vaultPath}&data=${newStr}&mode=append`;

	const tab = await browser.tabs.create({ url: obsidianURI, active: false });
	console.log("Created tab with ID:", tab.id);

	// Use Promise.resolve() for a microtask delay
	Promise.resolve().then(() => {
		browser.tabs.remove(tab.id).catch(() => {});
	});
}

window.addEventListener("DOMContentLoaded", async () => {
	let url, title;
	await browser.tabs
		.query({ currentWindow: true, active: true })
		.then((tabs) => {
			url = tabs[0].url;
			title = tabs[0].title;
		}, console.error);
	let description = "";
	document.querySelector("#description").placeholder = "Loading...";

	await fetch(url)
		.then((response) => response.text())
		.then((html_string) => {
			let parser = new DOMParser();
			let doc = parser.parseFromString(html_string, "text/html");
			let metaDescription = doc.querySelector('meta[name="description"]');
			if (metaDescription) {
				description = metaDescription.getAttribute("content");
			} else {
				description = "";
				console.log("No description found");
			}
		})
		.catch((err) => {
			description = "";
			console.log("Failed to fetch page: ", err);
		});

	document.querySelector("#description").placeholder = "No description...";
	document.querySelector("#description").value = description;
	document.querySelector("#title").value = title;

	function addBookmarkToObsidian() {
		const tags = document.querySelector("#tags").value;
		const title = document.querySelector("#title").value;
		const desc = document.querySelector("#description").value;
		clipPage(url, title, tags, desc);
	}

	document
		.querySelector("#submit-bookmark")
		.addEventListener("click", addBookmarkToObsidian);

	document.querySelector("#tags").addEventListener("keyup", ({ key }) => {
		if (key === "Enter") {
			addBookmarkToObsidian();
		}
	});
});
