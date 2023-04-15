var treeElem = document.getElementById("tree");
var inputElem = document.getElementById("input-array");
var btnElem = document.getElementById("btn-build-tree");
var selectedNode = null;

function TreeNode(value) {
    this.value = value;
    this.left = null;
    this.right = null;
} 

function insertNode(arr, root, i, n) {
	if (i < n) {
		var temp = new TreeNode(arr[i]);
		root = temp;
		root.left = insertNode(arr, root.left, 2 * i + 1, n);
		root.right = insertNode(arr, root.right, 2 * i + 2, n);
	}
	return root;
}
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
	var colorIndex = getColorIndex(node);
	nodeElem.style.backgroundColor = COLORS[colorIndex];
	nodeElem.addEventListener("mouseenter", function() {
		nodeElem.classList.add("hover");
	});
	nodeElem.addEventListener("mouseleave", function() {
		nodeElem.classList.remove("hover");
	});
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

function getColorIndex(node) {
	var siblings = getSiblings(node);
	var colorIndex = Math.floor(Math.random() * COLORS.length);
	for (var i = 0; i < siblings.length; i++) {
		if (siblings[i] !== node && siblings[i].style.backgroundColor === COLORS[colorIndex]) {
			return getColorIndex(node);
		}
	}
	return colorIndex;
}

function getSiblings(node) {
	if (!node || !node.parentElement) {
		return [];
	}
	var siblings = [];
	var childNodes = node.parentElement.childNodes;
	for (var i = 0; i < childNodes.length; i++) {
		if (childNodes[i].nodeType === Node.ELEMENT_NODE && childNodes[i] !== node) {
			siblings.push(childNodes[i]);
		}
	}
	return siblings;
}

var COLORS = ["#f94144", "#f8961e", "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#6c757d", "#343a40", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d", "#343a40"];


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
