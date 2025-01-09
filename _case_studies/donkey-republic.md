---
layout: case-study
title: "Donkey Republic"
description: "Mobility design: Unlocking bike sharing"
image: "/assets/images/case-studies/donkey-republic/donkey-republic-cover.jpg"
order: 3
team:
  - Erdem Ovacik
  - Jens Frandsen
  - Rune Kokholm
  - Dara Kilicoglu
role: Product Designer
---

<div class="text-block">
    <h1 class="title-3 mb-2">Mobility design: Unlocking bike sharing</h1>
    <p>Donkey Republic is a bike-sharing company offering a convenient and eco-friendly way to navigate cities around the world. In my role as the designer of the Donkey Republic mobile app, I focused on creating a user-friendly experience for Donkey Republic's global users.</p>
</div>

<img src="{{ page.image | relative_url }}" alt="{{ page.title }}" class="project-image">

<img src="{{ 'assets/images/case-studies/donkey-republic/donkey-republic-bike.jpg' | relative_url }}" alt="Donkey Republic Bike" class="project-image mt-10">

<div class="project-caption">↳ Donkey bikes have special locks that use Bluetooth to talk to the Donkey Republic app on your phone.</div>

<div class="text-block">
    <h2 class="title-3 mb-2">UX Needs</h2>
    <p>Creating a seamless user experience that caters to two critical needs: ¹ Enable users to effortlessly discover available bikes near their location, minimizing search time and maximizing their ride time. ² Ensuring a frictionless rental flow. From finding a bike to unlocking it and starting the ride, the entire process should be smooth and intuitive, free of unnecessary steps or complexities that could disrupt the user's experience.</p>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
    <div class="p-4 md:p-10 bg-[#171717]">
        <h3 class="text-neutral-500">01</h3>
        <h4 class="title-3 mb-8">Commuter</h4>
        <div class="space-y-6">
            <div>
                <h5>Goals</h5>
                <p class="text-sm">Efficiently travel short distances for work or leisure, avoid traffic congestion, and reduce carbon footprint.</p>
            </div>
            <div>
                <h5>Needs</h5>
                <p class="text-sm">Easy-to-find bikes, reliable app functionality, clear instructions, and secure bike locking.</p>
            </div>
            <div>
                <h5>Frustrations</h5>
                <p class="text-sm">Difficulty finding available bikes, bikes with low battery, and inconvenient drop-off locations.</p>
            </div>
        </div>
    </div>
    <div class="p-4 md:p-10 bg-[#121212]">
        <h3 class="text-neutral-500">02</h3>
        <h4 class="title-3 mb-8">Tourist</h4>
        <div class="space-y-6">
            <div>
                <h5>Goals</h5>
                <p class="text-sm">Explore the city in a convenient and affordable way, experience local culture, and stay active.</p>
            </div>
            <div>
                <h5>Needs</h5>
                <p class="text-sm">Clear map interface, easy-to-follow instructions, and secure bike locking.</p>
            </div>
            <div>
                <h5>Frustrations</h5>
                <p class="text-sm">Language barriers, difficulty understanding the app, and issues with bike availability.</p>
            </div>
        </div>
    </div>
    <div class="p-4 md:p-10 bg-[#0f0f0f]">
        <h3 class="text-neutral-500">03</h3>
        <h4 class="title-3 mb-8">Eco-Citizen</h4>
        <div class="space-y-6">
            <div>
                <h5>Goals</h5>
                <p class="text-sm">Reduce carbon footprint, promote public transportation, and support eco-friendly businesses.</p>
            </div>
            <div>
                <h5>Needs</h5>
                <p class="text-sm">Reliable bike availability, well-maintained bikes, and clear communication about environmental impact.</p>
            </div>
            <div>
                <h5>Frustrations</h5>
                <p class="text-sm">Bikes left in inappropriate locations, vandalism of bikes.</p>
            </div>
        </div>
    </div>
</div>
<div class="project-caption">↳ Understanding the audience</div>

<div class="text-block">
    <p>The app should make finding bikes easy by utilizing a map view that allows users to locate available bikes through zooming and panning. It should also offer a reservation system to hold bikes for a limited time, ensuring some level of ride predictability while maintaining bike availability. Additionally, the app should streamline the unlocking process with a user-friendly in-app button, eliminating the need for external tools or codes.</p>
</div>

<div class="image-wrapper">
    <img src="{{ 'assets/images/case-studies/donkey-republic/donkey-republic-case-views.jpg' | relative_url }}" alt="Finding, Reserving and Unlocking. See nearby bikes on a map (left), select and confirm your reservation (center) and unlock (right)." class="project-image mt-10">
</div>
<div class="project-caption">↳ Finding, Reserving and Unlocking. See nearby bikes on a map (left), select and confirm your reservation (center) and unlock (right).</div>

<div class="text-block">
    <h2 class="title-3 mb-2">UX Findings</h2>
    <p>After launching the app successfully, we encountered some concerning user feedback. While the initial app allowed users to locate available bikes on a map and reserve them, upon arriving at the designated location, users frequently couldn't find the specific bike they had reserved.</p>
    <blockquote class="bg-neutral-900 text-neutral-300 mt-12 p-12 border-l-4 border-neutral-800">
        "We wanted to use Donkey Republic to see the city, but the app was confusing and we couldn't find one of the reserved bikes at the pick-up location."
    </blockquote>
    <div class="project-caption">↳ Julia, The Netherlands</div>
    <p class="mt-12">Initially, the app adopted a "free-floating" system where users could leave bikes at any location after their ride. However, this approach presented challenges such as missing bikes, inaccessible bikes left in private areas, and difficulty locating bikes with dead batteries.</p>
</div>

<div class="project-dual-image-container">
    <div>
        <div class="image-wrapper">
            <img src="{{ 'assets/images/case-studies/donkey-republic/donkey-republic-case-study-drop-off-locations.jpg' | relative_url }}" alt="Donkey Republic Drop-off Locations" class="project-image">
        </div>
        <div class="project-caption">↳ Drop-off locations.</div>
    </div>
    <div>
        <div class="image-wrapper">
            <img src="{{ 'assets/images/case-studies/donkey-republic/donkey-republic-ping-button.jpg' | relative_url }}" alt="Introducing the Ping button" class="project-image">
        </div>
        <div class="project-caption">↳ Introducing the Ping button.</div>
    </div>
</div>

<div class="text-block">
    <h2 class="title-3 mb-2">Adapting to Challenges</h2>
    <p>To address these issues, the app design was updated to incorporate designated drop-off locations. This involved:</p>
    <h4 class="mt-8">↳ Highlighted drop-off points</h4>
    <p>The map view was updated to clearly indicate designated drop-off locations.</p>
    <h4 class="mt-8">↳ User guidance</h4>
    <p>In-app instructions and notifications reminded users to return bikes to designated spots. Incentives for responsible parking could also be explored.</p>
</div>

<div>
    <div class="image-wrapper">
        <img src="{{ 'assets/images/case-studies/donkey-republic/donkey-republic-app-icon.jpg' | relative_url }}" alt="Donkey Republic App Icon" class="project-image">
    </div>
    <div class="project-caption">↳ Redesigned Donkey Republic app icon.</div>
</div>

<div class="text-block">
    <h2 class="title-3 mb-2">Conclusion</h2>
    <p>The Donkey Republic mobile app demonstrates a user-centered design approach that prioritizes ease of use and a seamless rental experience. By adapting to user data and business needs, the app continues to evolve to offer a convenient and reliable bike-sharing service. This case study highlights the importance of iterative design and the ability to adapt to changing circumstances to optimize the user experience.</p>
</div>

{% include team_section.html %}
