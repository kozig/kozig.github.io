---
title: Obsidian Templates
date: 2025-05-20 10:15 -500
categories:
  - Obsidian
tags:
  - Obsidian
  - Obsidian_Templates
---
The core templating plugin seems very limited. Especially since there is no obvious way to generate a dynamic title. Therefore, the community plugin [Templater](https://silentvoid13.github.io/Templater/introduction.html) seems to fit the bill.  
The following is an explanation on how to use the `tp.file` function:  
##### [Arguments](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/file-module.html#arguments)

- `template`: Either the template used for the new file content, or the file content as a string. If it is the template to use, you retrieve it with `tp.file.find_tfile(TEMPLATENAME)`.
    
- `filename`: The filename of the new file, defaults to "Untitled".
    
- `open_new`: Whether to open or not the newly created file. Warning: if you use this option, since commands are executed asynchronously, the file can be opened first and then other commands are appended to that new file and not the previous file.
    
- `folder`: The folder to put the new file in, defaults to Obsidian's default location. If you want the file to appear in a different folder, specify it with `"PATH/TO/FOLDERNAME"` or `app.vault.getAbstractFileByPath("PATH/TO/FOLDERNAME")`.

```
// File creation
<%* await tp.file.create_new("MyFileContent", "MyFilename") %>
// File creation with template
<%* await tp.file.create_new(tp.file.find_tfile("MyTemplate"), "MyFilename") %>
// File creation and open created note
<%* await tp.file.create_new("MyFileContent", "MyFilename", true) %>
// File creation in current folder
<%* await tp.file.create_new("MyFileContent", "MyFilename", false, tp.file.folder(true)) %>
// File creation in specified folder with string path
<%* await tp.file.create_new("MyFileContent", "MyFilename", false, "Path/To/MyFolder") %>
// File creation in specified folder with TFolder
<%* await tp.file.create_new("MyFileContent", "MyFilename", false, app.vault.getAbstractFileByPath("MyFolder")) %>
// File creation and append link to current note
[[<% (await tp.file.create_new("MyFileContent", "MyFilename")).basename %>]]
```
