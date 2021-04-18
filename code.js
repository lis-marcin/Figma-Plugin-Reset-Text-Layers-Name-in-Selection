let changedLayersCount = 0;
const emojiFail = ["🤡", "💩", "😔"];
const emojiSuccess = ["🧡", "🥳", "💪"];
if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(`${emojiFail[Math.floor(Math.random() * emojiFail.length)]} Select at least one Frame, Group or Text Layer.`);
}
const resetName = (textNode) => {
    textNode.name = "";
    changedLayersCount++;
};
figma.currentPage.selection.forEach(selectionNode => {
    if (selectionNode.type === "TEXT") {
        resetName(selectionNode);
    }
    else if (selectionNode.type === "FRAME" || selectionNode.type === "GROUP") {
        const textNodes = selectionNode.findAll(node => node.type === "TEXT");
        textNodes.forEach(node => resetName(node));
    }
    else {
        figma.closePlugin(`${emojiFail[Math.floor(Math.random() * emojiFail.length)]}  Select at least one Frame, Group or Text layer.`);
    }
});
if (changedLayersCount >= 1)
    figma.notify(`${emojiSuccess[Math.floor(Math.random() * emojiSuccess.length)]}  ${changedLayersCount} text layer names reset.`);
figma.closePlugin();
