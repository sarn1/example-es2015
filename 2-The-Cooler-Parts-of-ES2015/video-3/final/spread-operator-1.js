'use strict';

const originalFlavors = ['Chocolate', 'Vanilla', 'Tomato'];

const newFlavors = ['Strawberry', 'Mint Chocolate Chip', 'Superman'];

const inventory = ['Rocky Road', ...originalFlavors, 'Neopolitan', ...newFlavors];

console.log(inventory);