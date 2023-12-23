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
 * Version: 1.1.0
 * Maintained by: Dara Kilicoglu
 */

document.addEventListener("DOMContentLoaded", async () => {
    const rootContainer = createFlavorContainer('flavor-container');
    document.body.appendChild(rootContainer);

    function isColorDark(hexColor) {
        const [r, g, b] = hexColor.match(/\w\w/g).map(hex => parseInt(hex, 16));
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance < 102;
    }

    function humanize(string) {
        return string.replace(/(?:^|\W)\w/g, match => match.toUpperCase());
    }

    function toggleFlavorExpansion(flavorElement) {
        const isExpanded = flavorElement.classList.toggle('expanded');
        flavorElement.parentElement.classList.toggle('active', isExpanded);
    }

    function handleFlavorClick(event) {
        event.stopPropagation();
        const flavorElement = event.currentTarget;
        const isCurrentlyExpanded = flavorElement.classList.contains('expanded');

        Array.from(flavorElement.parentElement.children).forEach(child => {
            child.classList.remove('expanded');
        });

        flavorElement.classList.toggle('expanded', !isCurrentlyExpanded);
        flavorElement.parentElement.classList.toggle('active', !isCurrentlyExpanded);
    }

    function createFlavorElement(flavor, index = 0, level = 0) {
        const textColor = isColorDark(flavor.color) ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.8)';
        const element = createElementWithClass(`flavor level-${level}`);
        element.style.backgroundColor = flavor.color;
        element.style.animation = `fadeIn 0.6s ease ${index * 0.1}s forwards`;

        const label = createElementWithClass('label');
        label.style.color = textColor;

        const nameLabel = document.createElement('span');
        nameLabel.textContent = humanize(flavor.name);
        label.appendChild(nameLabel);

        const description = createElementWithClass('description');
        description.style.color = textColor;
        description.textContent = flavor.description;

        element.appendChild(label);
        element.appendChild(description);

        if (flavor.children?.length > 0) {
            const countLabel = createElementWithClass('count-label');
            countLabel.textContent = `(${flavor.children.length})`;
            label.appendChild(countLabel);

            const childrenContainer = createFlavorContainer('flavor-container');
            flavor.children.forEach((childFlavor, childIndex) => {
                childrenContainer.appendChild(createFlavorElement(childFlavor, childIndex, level + 1));
            });
            element.appendChild(childrenContainer);
        }

        element.addEventListener('click', handleFlavorClick);

        return element;
    }

    function createFlavorContainer(className) {
        const container = createElementWithClass(className);
        return container;
    }

    function createElementWithClass(className) {
        const element = document.createElement('div');
        element.className = className;
        return element;
    }

    try {
        const response = await fetch('coffee-flavors.json');
        const data = await response.json();
        data.CoffeeFlavors.forEach((flavor, index) => {
            rootContainer.appendChild(createFlavorElement(flavor, index));
        });
    } catch (error) {
        console.error('Error loading coffee flavors:', error);
    }
});
