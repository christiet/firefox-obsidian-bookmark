document
	.getElementById("clipper_options")
	.addEventListener("submit", () => saveOptions());

browser.storage.local.get("clipper_opts_vault_name").then((resp) => {
	const { vaultName, clipper_opts_vault_name } = resp;

	if (clipper_opts_vault_name !== undefined)
		document.getElementById("clipper_opts_vault_name").value =
			clipper_opts_vault_name;
});

browser.storage.local.get("clipper_opts_paths").then((resp) => {
	const { clipper_opts_paths } = resp;

	if (clipper_opts_paths !== undefined)
		document.getElementById("clipper_opts_paths").value = clipper_opts_paths;
});

browser.storage.local.get("clipper_opts_template").then((resp) => {
	const { clipper_opts_template } = resp;

	if (clipper_opts_template !== undefined) {
		document.getElementById("clipper_opts_template").value =
			clipper_opts_template;
	}
});

function saveOptions() {
	const vaultName = document.getElementById("clipper_opts_vault_name").value;
	const paths = document.getElementById("clipper_opts_paths").value;
	const template = document.getElementById("clipper_opts_template").value;

	browser.storage.local.set({ clipper_opts_vault_name: vaultName });
	browser.storage.local.set({ clipper_opts_paths: paths });
	browser.storage.local.set({ clipper_opts_template: template });
}
