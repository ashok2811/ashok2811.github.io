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
    var input = document.getElementById("input").value;
    var values = input.split(",");
    var root = null;
    for (var i = 0; i < values.length; i++) {
        var value = values[i].trim();
        if (value !== "") {
            root = insertNode(root, new TreeNode(value));
        }
    }
    renderTree(root, document.getElementById("tree"));
}


function renderNode(node, container) {
    var element = document.createElement("div");
    element.innerText = node.value;
    element.classList.add("node");
    element.style.backgroundColor = node.color;
    element.addEventListener("mouseover", function() {
        element.style.boxShadow = "0px 0px 10px #666";
    });
    element.addEventListener("mouseout", function() {
        element.style.boxShadow = "";
    });
    element.addEventListener("click", function() {
        var action = prompt("Enter 'L' to add a node to the left, 'R' to add a node to the right, or 'E' to edit the current node:");
        if (action === "L") {
            var value = prompt("Enter the value for the new node:");
            if (value !== null) {
                insertNode(node, new TreeNode(value));
                renderTree(container._root, container);
            }
        } else if (action === "R") {
            var value = prompt("Enter the value for the new node:");
            if (value !== null) {
                insertNode(node, new TreeNode(value));
                renderTree(container._root, container);
            }
        } else if (action === "E") {
            var value = prompt("Enter the new value for the node:");
            if (value !== null) {
                node.value = value;
                renderTree(container._root, container);
            }
        }
    });
    container.appendChild(element);
    if (node.left !== null) {
        renderNode(node.left, element);
    }
    if (node.right !== null) {
        renderNode(node.right, element);
    }
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
