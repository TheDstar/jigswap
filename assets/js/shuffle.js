document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.pieces-container');

    function shuffleChildren(container) {
        // Convert children HTMLCollection to an array
        const elementsArray = Array.prototype.slice.call(container.children);
        
        // Shuffle array
        for (let i = elementsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [elementsArray[i], elementsArray[j]] = [elementsArray[j], elementsArray[i]];
        }

        // Remove all children from container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Append children in new order
        elementsArray.forEach(function(element) {
            container.appendChild(element);
        });
    };
    
    shuffleChildren(container);
});
