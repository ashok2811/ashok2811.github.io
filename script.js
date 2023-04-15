var treeElem = document.getElementById("tree");
var inputElem = document.getElementById("input-array");
var btnElem = document.getElementById("btn-build-tree");
var selectedNode = null;

function buildTree() {
	var arr = inputElem.value.trim().split(" ");
	arr = arr.map(function(item) {
		return parseInt(item, 10);
	});
	var root = insertNode(arr, null, 0, arr.length);
	renderTree(root, treeElem);
}

function renderTree(node, parentElem) {
	if (!node) {
		return;
	}
	var nodeElem = document.createElement("div");
	nodeElem.className = "node";
	nodeElem.innerText = node.value;
	nodeElem.addEventListener("click", function() {
		if (selectedNode) {
			selectedNode.classList.remove("selected");
		}
		nodeElem.classList.add("selected");
		selectedNode = nodeElem;
	});
	var leftEdge = document.createElement("span");
	leftEdge.className = "edge left";
	var rightEdge = document.createElement("span");
	rightEdge.className = "edge right";
	if (node.left) {
		renderTree(node.left, nodeElem);
		nodeElem.insertBefore(leftEdge, nodeElem.firstChild);
	}
	if (node.right) {
		renderTree(node.right, nodeElem);
		nodeElem.appendChild(rightEdge);
	}
	parentElem.appendChild(nodeElem);
}

function editNode() {
	if (!selectedNode) {
		return;
	}
	var oldValue = selectedNode.innerText;
	var newValue = prompt("Enter new value for node:", oldValue);
	if (newValue !== null && newValue !== "") {
		selectedNode.innerText = newValue;
	}
}

btnElem.addEventListener("click", buildTree);
document.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
		editNode();
	}
});
