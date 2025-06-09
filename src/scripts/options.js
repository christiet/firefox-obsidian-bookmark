document
	.getElementById("clipper_options")
	.addEventListener("submit", () => saveOptions());

browser.storage.local.get("clipper_opts_vault_name").then((resp) => {
	const { vaultName, clipper_opts_vault_name } = resp;

	if (clipper_opts_vault_name !== undefined)
		document.getElementById("clipper_opts_vault_name").value =
			clipper_opts_vault_name;
});

browser.storage.local.get("clipper_opts_path").then((resp) => {
	const { vaultPath, clipper_opts_path } = resp;

	if (clipper_opts_path !== undefined)
		document.getElementById("clipper_opts_path").value = clipper_opts_path;
});

browser.storage.local.get("clipper_opts_template").then(resp => {
  console.log('Template storage response:', resp);
  const { clipper_opts_template } = resp;

  if (clipper_opts_template !== undefined) {
    console.log('Loading template:', clipper_opts_template);
    document.getElementById('clipper_opts_template').value = clipper_opts_template;
  } else {
    console.log('No template found in storage');
  }
})

function saveOptions(){
  const vaultName = document.getElementById('clipper_opts_vault_name').value;
  const vaultPath = document.getElementById('clipper_opts_path').value;
  const template = document.getElementById('clipper_opts_template').value;

  console.log('Saving template:', template);

  browser.storage.local.set({ clipper_opts_vault_name: vaultName });
  browser.storage.local.set({ clipper_opts_path: vaultPath });
  browser.storage.local.set({ clipper_opts_template: template });
}

