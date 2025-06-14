<img src="https://raw.githubusercontent.com/patrikzudel/firefox-obsidian-bookmark/main/images/preview.jpg" alt="Preview">

# ⚡ Bookmark Firefox tab into Obsidian.
#### This extension adds a button to the address bar that allows users to create a "Bookmark" of their current tab into a specified document in Obsidian.

##### Fetches the Website Description if one is provided in the Head of HTML.

# 📃 Bookmark Example
> ## Kavita #self-hosted
> - *Lighting fast with a slick design, Kavita is a rocket fueled self-hosted digital library which supports a vast array of file formats. Install to start reading and share your server with your friends. book reader, self hosted, manga, comics, free, manhwa, e readers, electronic book readers, digital book reader, cartoon*
> - https://www.kavitareader.com/

## 📖 How to use 

1. Install the following Obsidian plugin:
   1. [**Obsidian Advanced URI**](https://github.com/Vinzent03/obsidian-advanced-uri)

2. Install the Extension from the Firefox Add-ons store:
   1. **TBA**

3. Open **Firefox Add-ons Manager** and click on "**Obsidian Website Bookmarks**"
4. Click on Options in the menu and fill out the **Vault name** and **Document Path**. Example for **Vault name** would be "My Vault", example for **Document Path** would be "Bookmarks" or if the file is placed in a folder "Folder/Bookmarks".
5. Optionally add a template for the link format. This is basic markdown and the available options are:
   * title, description, tags, url
   * Example templates:
   ```
   default:
   ## {title} {tags}\n- *{description}*\n- {url}
   
   notion importer format:
   \n> [!info] {title} {tags}\n> {description}\n> {url}\n>
   ```
   BE WARNED:  There is no validation of templates, so don't do anything you don't understand!
6. Go on a **Website** you want to bookmark and click on the **Bookmark button** in the **Address bar**.


## 🍀 Supporters

**[!["Buy Me A Ramen"](https://raw.githubusercontent.com/patrikzudel/patrikzudel/main/ramen.png)](https://www.buymeacoffee.com/patrikzero)**

> If you like this project and would like to support me, feel free to buy me a ramen! 🍜🍜🍜

> Or **Paypal:**

**[!["Buy Me A Ramen"](https://raw.githubusercontent.com/patrikzudel/patrikzudel/main/ramenpaypal.png)](https://ko-fi.com/patrikzudel)**


## ⌨️ Build
> `web-ext build --ignore-files ./images`

## ❤ Credits

- [ObsidianClip](https://github.com/ClarkAllen1556/obsidian_clip/tree/main)(Obsidian Clip by ClarkAllen1556)
- [Bookmarks-For-Obsidian](https://github.com/abhn/Bookmarks-For-Obsidian/tree/main)(Bookmarks-For-Obsidian by abhn)
- [PhosphorIcons](https://phosphoricons.com/)(Logo and Icon)

---

💻❤🍲 by [Patrik Žúdel](https://twitter.com/PatrikZero)
