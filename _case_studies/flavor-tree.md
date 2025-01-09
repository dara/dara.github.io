---
layout: case-study
title: "Flavor Tree"
description: "Exploring coffee flavor structures"
image: "/assets/images/case-studies/flavor-tree/flavor-tree-cover.png"
order: 4
team:
  - Dara Kilicoglu
role: Product Designer & Developer
---

<div class="text-block">
    <h1 class="title-3 mb-2">Exploring coffee flavor structures</h1>
    <p>The world of coffee offers a symphony of flavors, from the bright acidity of a Kenyan single-origin to the rich chocolatey notes of a Sumatran roast. Flavor Tree, an interactive tool built upon the <a href="https://worldcoffeeresearch.org/resources/sensory-lexicon" class="text-link">World Coffee Research</a>'s lexicon, offers a comprehensive and accessible way to navigate this nuanced flavor landscape.</p>
</div>

<img src="{{ page.image | relative_url }}" alt="{{ page.title }}" class="project-image">

<div class="text-block">
    <h2 class="title-3 mb-2">Challenge: Beyond the static wheel</h2>
    <p>For coffee enthusiasts, the quest to understand and appreciate the intricate flavors of their favorite beverage is an ongoing journey. A longstanding tool in this pursuit has been the <a href="https://sca.coffee/research/coffee-tasters-flavor-wheel" class="text-link">Coffee Flavor Wheel</a>, a beautiful static image developed by the Specialty Coffee Association (SCA) in 1995. The wheel effectively categorizes a wide range of coffee taste profiles, from fruity and floral to nutty and spicy.</p>
    <p>However, the Coffee Flavor Wheel's strength as a reference chart also presents limitations. Its sunburst diagram format can be cumbersome to navigate, particularly on mobile devices. The static nature of the wheel hinders the ability to explore the relationships and nuances between flavors in an interactive way. This poses a challenge for coffee enthusiasts who want to delve deeper into their coffee experience on the go.</p>
</div>

<div class="project-dual-image-container">
    <div>
        <div class="image-wrapper">
            <img src="{{ 'assets/images/case-studies/flavor-tree/aroma-wheel.jpg' | relative_url }}" alt="Coffee Aroma Wheel" class="project-image">
        </div>
        <div class="project-caption">↳ Specialty Coffee Association's Coffee Aroma Wheel (1995)</div>
    </div>
    <div>
        <div class="image-wrapper">
            <img src="{{ 'assets/images/case-studies/flavor-tree/icicle-diagram.jpg' | relative_url }}" alt="Icicle Diagram" class="project-image">
        </div>
        <div class="project-caption">↳ Icicle diagram is a space-filling visualization, the Cartesian equivalent to a sunburst, shows the cumulative values of subtrees.</div>
    </div>
</div>

<div class="text-block">
    <h2 class="title-3 mb-2">Solution</h2>
    <p>Flavor Tree addresses sunburst's limitation by translating the lexicon into an interactive mobile application, utilizing an icicle-like visualization, the space-filling equivalent to a sunburst chart, to represent the cumulative relationships between coffee flavors in a clear and intuitive manner.</p>
</div>

<div class="project-iframe-container">
    <iframe src="{{ '/assets/apps/flavor-tree/index.html' | relative_url }}" loading="lazy"></iframe>
</div>
<div class="project-caption">↳ Flavor Tree</div>

<div class="text-block">
    <h2 class="title-3 mb-2">Key Features</h2>
    <div class="space-y-8">
        <div>
            <h4 class="mb-2">↳ Explore and discover</h4>
            <p>Flavor Tree starts with the core flavor profiles and allows users to explore further by clicking on specific flavors. This hierarchical structure guides users through the complexities of coffee taste in a user-friendly manner.</p>
        </div>
        <div>
            <h4 class="mb-2">↳ Universally available</h4>
            <p>Flavor Tree is built as a lightweight JavaScript application, ensuring a smooth and responsive experience across all mobile devices. It utilizes a space-filling algorithm to efficiently utilize screen real estate, adapting effectively even to the smallest phone displays.</p>
        </div>
    </div>
</div>

<div class="text-block">
    <h2 class="title-3 mb-2">Next Steps</h2>
    <p>I envision transforming Flavor Tree into a comprehensive coffee logging journal. This would allow users to track their coffee experiences, record flavor profiles, and potentially discover new flavor combinations they enjoy.</p>
</div>

<div>
    <div class="image-wrapper">
        <img src="{{ 'assets/images/case-studies/flavor-tree/flavor-tree-next.jpg' | relative_url }}" alt="Flavor Tree Next Steps" class="project-image">
    </div>
    <div class="project-caption">↳ Flavor Tree future development ideas.</div>
</div>

<div class="text-block">
    <h2 class="title-3 mb-2">Conclusion</h2>
    <p>Flavor Tree successfully translates the rich vocabulary of coffee flavors into an accessible and interactive mobile experience. It empowers coffee enthusiasts of all levels to explore the nuances of coffee taste and elevate their coffee appreciation journey.</p>
</div>

{% include team_section.html %}
