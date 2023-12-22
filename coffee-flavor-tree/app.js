/**
 * Coffee Flavor Tree: A Visualization Tool for exploring and understanding
 * the complex and varied taste profiles of different coffee beans.
 * 
 * This script dynamically generates and manages a tree-like UI representation
 * of coffee flavors.
 * 
 * Author: Dara Kilicoglu
 * Copyright: 2023
 * License: MIT
 * Version: 1.0.0
 * Maintained by: Dara Kilicoglu
 */

document.addEventListener("DOMContentLoaded", async () => {
    const rootContainer = document.getElementById('rootContainer');

    const isColorDark = (hexColor) => {
        const [r, g, b] = hexColor.match(/\w\w/g).map(hex => parseInt(hex, 16));
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance < 102;
    };

    const humanize = (string) => string.replace(/(?:^|\W)\w/g, match => match.toUpperCase());

    const toggleFlavorExpansion = (flavorElement) => {
        const isExpanded = flavorElement.classList.toggle('expanded');
        flavorElement.parentElement.classList.toggle('active', isExpanded);
    };

    const handleFlavorClick = (event) => {
        event.stopPropagation();
        const flavorElement = event.currentTarget;
    
        if (!flavorElement.classList.contains('expandable')) {
            return;
        }
    
        const isCurrentlyExpanded = flavorElement.classList.contains('expanded');
        Array.from(flavorElement.parentElement.children).forEach(child => 
            child.classList.remove('expanded'));
    
        flavorElement.classList.toggle('expanded', !isCurrentlyExpanded);
        flavorElement.parentElement.classList.toggle('active', !isCurrentlyExpanded);
    };

    const createFlavorElement = (flavor, index = 0) => {
        const element = document.createElement('div');
        element.className = 'flavor';
        element.style.backgroundColor = flavor.color;
        element.style.animation = `fadeIn 0.6s ease ${index * 0.1}s forwards`;
    
        const label = document.createElement('div');
        label.className = 'label';
        label.style.color = isColorDark(flavor.color) ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.8)';
    
        const nameLabel = document.createElement('span');
        nameLabel.textContent = humanize(flavor.name);
        label.appendChild(nameLabel);
    
        if (flavor.children?.length > 0) {
            const countLabel = document.createElement('span');
            countLabel.className = 'count-label';
            countLabel.textContent = `(${flavor.children.length})`;
            label.appendChild(countLabel);
    
            element.classList.add('expandable');
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'flavor-container';
            flavor.children.forEach((childFlavor, childIndex) => 
                childrenContainer.appendChild(createFlavorElement(childFlavor, childIndex)));
            element.appendChild(childrenContainer);
        }
    
        element.appendChild(label);
        element.addEventListener('click', handleFlavorClick);
    
        return element;
    };    

    try {
        const response = await fetch('coffee-flavors.json');
        const data = await response.json();
        data.CoffeeFlavors.forEach((flavor, index) => 
            rootContainer.appendChild(createFlavorElement(flavor, index)));
    } catch (error) {
        console.error('Error loading coffee flavors:', error);
    }
});
