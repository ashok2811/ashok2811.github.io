class Node {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  
  const root = new Node(1);
  root.left = new Node(2);
  root.right = new Node(3);
  root.left.left = new Node(4);
  root.left.right = new Node(5);
  
  function createNodeHTML(node) {
    let html = `<span>${node.val}</span>`;
    if (node.left || node.right) {
      html += '<ul>';
      if (node.left) {
        html += `<li>${createNodeHTML(node.left)}</li>`;
      }
      if (node.right) {
        html += `<li>${createNodeHTML(node.right)}</li>`;
      }
      html += '</ul>';
    }
    return html;
  }
  
  document.querySelector('.tree li').innerHTML = createNodeHTML(root);
  
  // Add a click event listener to each node to toggle its children
  const nodes = document.querySelectorAll('.tree li');
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const children = node.querySelector('ul');
    if (children) {
      node.classList.add('parent');
      node.addEventListener('click', function() {
        children.classList.toggle('open');
        node.classList.toggle('expanded');
      });
    }
  }
  