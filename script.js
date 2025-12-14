// Maritime Gold - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Maritime Gold project loaded');

    // Add any interactive functionality here
    // For example, drag and drop functionality for the visual editor

    const draggableElements = document.querySelectorAll('[data-cursor-element-id]');

    draggableElements.forEach(element => {
        element.addEventListener('mousedown', function(e) {
            // Basic drag functionality placeholder
            console.log('Element clicked:', element.dataset.cursorElementId);
        });
    });
});
