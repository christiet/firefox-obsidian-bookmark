async function clipPage(url, title, tags, description, vaultPath) {
	const { clipper_opts_vault_name: vaultName } =
		await browser.storage.local.get("clipper_opts_vault_name");

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

	// Use Promise.resolve() for a microtask delay
	Promise.resolve().then(() => {
		browser.tabs.remove(tab.id).catch(() => {});
	});
}

async function loadDocumentPaths() {
	const { clipper_opts_paths } = await browser.storage.local.get(
		"clipper_opts_paths"
	);

	if (!clipper_opts_paths) {
		console.log("No document paths configured");
		return;
	}

	const paths = clipper_opts_paths
		.split("\n")
		.map((path) => path.trim())
		.filter((path) => path.length > 0);

	const select = document.querySelector("#path-select");

	// Clear existing options
	select.innerHTML = "";

	// Add each path as an option
	paths.forEach((path) => {
		const option = document.createElement("option");
		option.value = path;
		option.textContent = path;
		select.appendChild(option);
	});

	// First path is selected by default
	if (paths.length > 0) {
		select.value = paths[0];
	}
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
			}
		})
		.catch((err) => {
			description = "";
			console.log("Failed to fetch page: ", err);
		});

	document.querySelector("#description").placeholder = "No description...";
	document.querySelector("#description").value = description;
	document.querySelector("#title").value = title;

	await loadDocumentPaths();

	const { clipper_opts_vault_name: vaultName } =
		await browser.storage.local.get("clipper_opts_vault_name");
	const { clipper_opts_paths } = await browser.storage.local.get(
		"clipper_opts_paths"
	);

	if (!vaultName || !clipper_opts_paths) {
		console.log("Need to fill out settings!");
		browser.runtime.openOptionsPage();
		return;
	}

	function addBookmarkToObsidian() {
		const tags = document.querySelector("#tags").value;
		const title = document.querySelector("#title").value;
		const desc = document.querySelector("#description").value;
		const selectedPath = document.querySelector("#path-select").value; // Get selected path

		clipPage(url, title, tags, desc, selectedPath); // Pass selected path
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
