function toClipBoard(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "0";
    ta.style.top = "0";

    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.parentElement.removeChild(ta);
}

chrome.runtime.onInstalled.addListener(() => {
    // parent 
    chrome.contextMenus.create({
        id: "Reference generator",
        title: "Reference generator",
        type: "normal",
        contexts: ["all"]
    });
    // childs
    chrome.contextMenus.create({
        id: "MarkDownLink",
        title: "MarkDownのリンク形式で取得",
        parentId: "Reference generator",
        contexts: ["all"]
    });
    chrome.contextMenus.create({
        id: "BibTexLink",
        title: "BibTexのリンク形式で取得",
        parentId: "Reference generator",
        contexts: ["all"],
    });
    chrome.contextMenus.create({
        id: "MarkDownLink_selected",
        title: "選択部分をタイトルとしたMarkDownのリンク形式で取得",
        parentId: "Reference generator",
        contexts: ["selection"],
    });
    chrome.contextMenus.create({
        id: "BibTexLink_selected",
        title: "選択部分をタイトルとしたBibTexのリンク形式で取得",
        parentId: "Reference generator",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    const url = tab.url
    const title = tab.title
    if (info.menuItemId == "MarkDownLink") {
        const link = `[${title}](${url})`
        toClipBoard(link);
    } else if (info.menuItemId == "BibTexLink") {
        const link = `
@Misc{${title},
    title=${title},
    howpublished={\\url{${url}}}
}`;
        toClipBoard(link);
    } else if (info.menuItemId == "MarkDownLink_selected") {
        const link = `[${info.selectionText}](${url})`
        toClipBoard(link);
    } else if (info.menuItemId == "BibTexLink") {
        const link = `
@Misc{${info.selectionText},
    title=${info.selectionText},
    howpublished={\\url{${url}}}
}`;
        toClipBoard(link);
    }
});