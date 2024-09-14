---
layout: about
title: About
---

## <a id="biography" class="anchor"></a>Biography
I graduated with a B.Comp. from the National University of Singapore.

I have experience in and am comfortable with doing back-end development for large microservices.

In my free time, I build and tinker with computer stuff, and also play music as a bassist/drummer.

<br>

## <a id="experience" class="anchor"></a>Experience

<div class="about-cell-container" markdown="1">
### Backend Software Engineer – Shopee
_May 2024 – Present  
<div style="font-size:70%;">C++, Golang, Python, MySQL, protobuf, Redis</div>
- &nbsp;In the Recommendation backend team.
</div>

<div class="about-cell-container" markdown="1">
### Backend Software Engineer Intern – Shopee
_May 2022 – Jan 2023_  
<div style="font-size:70%;">Golang, Python, Django, MySQL, protobuf, Prometheus, Grafana, Redis, Kafka</div>
- &nbsp;Developed and maintained microservices across seller-facing teams, impacting 7 million active sellers.
- &nbsp;Implemented live database migration code, enabling service integration with zero downtime.
- &nbsp;Designed and developed business metrics in service, identifying abnormalities within 10 minutes.
</div>

<div class="about-cell-container" markdown="1">
### Backend Software Engineer Intern – Autodesk
_Jan 2022 – June 2022_  
<div style="font-size:70%;">C++, LISP, Python, .NET, VS2019</div>
- &nbsp;Developed 0-to-1 code coverage tool for AutoCAD.
- &nbsp;Innovated new approach that reduced infrastructure requirement by 90%.
</div>

<div class="about-cell-container" markdown="1">
### Undergraduate Teaching Assistant – NUS
_Aug 2021, Aug 2022_  
<div style="font-size:70%;">C++, LISP, Python, .NET, VS2019</div>
- &nbsp;CS3244 Machine Learning (Aug 2021)
- &nbsp;CS3210 Parallel Computing (Aug 2022)
</div>

<div class="about-cell-container" markdown="1">
### Undergraduate Student Researcher – NUS
_Feb 2021 – May 2021_
- &nbsp;Designed and implemented programs for large-scale text collection from online platforms.
</div>
Updated as of 26 Apr 2024.

<br>

## Projects
<ul>
  {% for post in site.categories.projects %}
    <li class="app-list-item">
      <mark><a href="{{ post.url }}">{{ post.title }}</a></mark>
      <span class="description">{{ post.description }}</span>
    </li>
  {% endfor %}
</ul>
