/**
 * Coffee Flavor Tree: A simple D3.js tree visualization
 * 
 * This script creates a static tree to display the hierarchical 
 * structure of coffee flavors using D3.js tree layout.
 * 
 * Based on D3 Tree Layout examples
 * Author: Dara Kilicoglu
 * Copyright: 2023
 * License: MIT
 * Version: 4.0.0
 */

class D3TreeVisualization {
    constructor() {
        this.margin = {top: 40, right: 40, bottom: 40, left: 40};
        this.width = 1200;
        this.height = 800;
        
        this.data = null;
        this.root = null;
        this.svg = null;
        this.g = null;
        this.tree = null;
        
        this.init();
    }
    
    init() {
        this.setupSVG();
        this.setupTree();
        this.loadData();
    }
    
    setupSVG() {
        this.svg = d3.select("#tree-svg")
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("width", "100%")
            .style("height", "auto");
        
        this.g = this.svg.append("g");
    }
    
    setupTree() {
        this.tree = d3.tree()
            .size([this.height * 2.5, this.width * 1.2])
            .separation((a, b) => {
                return a.parent === b.parent ? 2 : 2.5;
            });
    }
    
    async loadData() {
        try {
            const response = await fetch('coffee-flavors.json');
            const data = await response.json();
            this.data = this.transformData(data.CoffeeFlavors);
            this.createVisualization();
        } catch (error) {
            console.error('Error loading coffee flavors:', error);
            // Fallback to test data
            this.data = {
                name: "Coffee Flavors",
                color: "#ffffff",
                children: [
                    {
                        name: "Roasted",
                        color: "#ba7d38",
                        children: [
                            { name: "Pipe Tobacco", color: "#967758" },
                            { name: "Tobacco", color: "#956E50" },
                            { name: "Burnt", color: "#261816" }
                        ]
                    },
                    {
                        name: "Spices",
                        color: "#b90d41",
                        children: [
                            { name: "Pungent", color: "#734864" },
                            { name: "Pepper", color: "#9C1C30" },
                            { name: "Brown Spice", color: "#99642B" }
                        ]
                    },
                    {
                        name: "Nutty/Cocoa",
                        color: "#9a7b79",
                        children: [
                            { name: "Nutty", color: "#b59287" },
                            { name: "Cocoa", color: "#6B5042" }
                        ]
                    },
                    {
                        name: "Sweet",
                        color: "#E8A022",
                        children: [
                            { name: "Brown Sugar", color: "#A27248" },
                            { name: "Vanilla", color: "#F0EAD9" },
                            { name: "Vanillin", color: "#ECDBC4" }
                        ]
                    }
                ]
            };
            this.createVisualization();
        }
    }
    
    transformData(coffeeFlavors) {
        const transformedData = {
            name: "Flavor tree",
            color: "#ffffff", // Default color for root
            children: coffeeFlavors.map(flavor => ({
                name: flavor.name,
                color: flavor.color,
                children: flavor.children ? flavor.children.map(child => ({
                    name: child.name,
                    color: child.color,
                    children: child.children ? child.children.map(grandchild => ({
                        name: grandchild.name,
                        color: grandchild.color
                    })) : null
                })) : null
            }))
        };
        
        return transformedData;
    }
    
    createVisualization() {
        this.root = d3.hierarchy(this.data);
        
        this.tree(this.root);
        
        const nodes = this.root.descendants();
        const links = this.root.links();
        
        // Create links
        this.g.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d => {
                return `M${d.source.y},${d.source.x}
                        C${(d.source.y + d.target.y) / 2},${d.source.x}
                         ${(d.source.y + d.target.y) / 2},${d.target.x}
                         ${d.target.y},${d.target.x}`;
            });
        
        // Create nodes
        const node = this.g.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.y},${d.x})`);
        
        node.append("circle")
            .attr("r", 7)
            .style("fill", d => d.data.color || "#f5f5f5");
        
        node.append("text")
            .attr("dy", "0.25em")
            .attr("x", d => d.children ? -14 : 14)
            .style("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name);
        
        // Calculate dynamic bounds and update viewBox
        this.updateViewBox();
    }
    
    updateViewBox() {
        // Get the bounding box of all content
        const bbox = this.g.node().getBBox();
        
        // Add margin around the content
        const margin = 50;
        const x = bbox.x - margin;
        const y = bbox.y - margin;
        const width = bbox.width + (margin * 2);
        const height = bbox.height + (margin * 2);
        
        // Update the viewBox to fit all content
        this.svg.attr("viewBox", `${x} ${y} ${width} ${height}`);
    }
}

// Initialize the D3 tree visualization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new D3TreeVisualization();
}); 