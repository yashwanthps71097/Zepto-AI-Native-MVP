const fs = require('fs');
const path = require('path');

// Mock browser globals
global.window = {};

// We want to create elements that can hold children and event listeners
class MockElement {
  constructor(tag, id = '', className = '') {
    this.tag = tag;
    this.id = id;
    this.className = className;
    this.children = [];
    this.listeners = {};
    this.style = {};
    this.innerText = '';
  }

  addEventListener(event, cb) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(cb);
  }

  dispatchEvent(event) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb({ target: this }));
    }
  }

  appendChild(child) {
    this.children.push(child);
  }

  get classList() {
    const self = this;
    return {
      add: (cls) => {
        if (!self.className.includes(cls)) {
          self.className += ' ' + cls;
        }
      },
      remove: (cls) => {
        self.className = self.className.replace(cls, '').trim();
      },
      contains: (cls) => self.className.includes(cls)
    };
  }

  querySelector(sel) {
    // Basic selector mock
    if (sel.startsWith('.')) {
      const cls = sel.substring(1);
      return this.children.find(c => c.className.includes(cls)) || new MockElement('div', '', cls);
    }
    return new MockElement('div');
  }

  querySelectorAll(sel) {
    return this.children;
  }
}

global.document = {
  elements: {},
  getElementById(id) {
    if (!this.elements[id]) {
      this.elements[id] = new MockElement('div', id);
    }
    return this.elements[id];
  },
  querySelector(sel) {
    if (sel.startsWith('#')) {
      return this.getElementById(sel.substring(1));
    }
    return new MockElement('div');
  },
  querySelectorAll() {
    return [new MockElement('div')];
  },
  createElement(tag) {
    return new MockElement(tag);
  }
};

global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true, recommendations: [] }) });
global.setInterval = () => {};

// Read app.js code and run it
const appJsPath = path.join(__dirname, '../public/app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

try {
  eval(appJsCode);
  console.log("SUCCESS: app.js evaluated.");

  // Let's populate the categories sidebar and products
  selectedCategoryName = "Fruits & Vegetables";
  renderCategoriesSidebar();
  renderCategoryProducts();

  const list = document.getElementById("category-products-list");
  console.log("Initial products list size:", list.children.length);

  // Find the first product row's ADD button and dispatch click
  const firstRow = list.children[0];
  const addBtn = firstRow.querySelector(".btn-p-add");
  
  console.log("Simulating click on + ADD button...");
  addBtn.dispatchEvent("click");

  console.log("After click, products list size:", list.children.length);
  console.log("Cart items count:", cartItems.length);

} catch (e) {
  console.error("ERROR:", e);
}
