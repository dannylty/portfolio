---
layout: about
title: About
---

## <a id="biography" class="anchor"></a>Biography
I graduated with a B.Comp. from the National University of Singapore.

I have experience in and am comfortable with doing back-end development for large microservices.

In my free time, I build and tinker with computer stuff, and also play music as a bassist/drummer.

<br>

## <a id="projects" class="anchor"></a>Projects
<ul class="project-list">
  {% for post in site.categories.projects %}
    <li class="project-list-item">
      <a href="{{ post.url }}">
        <mark>{{ post.title }}</mark>
        <span class="description">{{ post.description }}</span>
      </a>
    </li>
  {% endfor %}
</ul>

<br>

## <a id="experience" class="anchor"></a>Experience

<div class="about-cell-container" markdown="1">
### Software Engineer – TikTok (Search Architecture)
_Oct 2025 – Present_
<div class="tech-stack">C++, Python, Java, Thrift, Kafka, Redis, Flink, Hive, Grafana</div>
- &nbsp;Architected near-line streaming infrastructure for the AI search offline pipeline, resolving dynamic compute bottlenecks, eliminating iteration overhead to sub-minute, accelerating data recency to sub-day, increasing query coverage by 22% and retention duration by 16%.
- &nbsp;Stabilised and scaled the offline pipeline, restoring uptime to 100% while expanding card-building throughput 8x and pushing dynamic GPU utilization from 25% to 70% within one quarter.
- &nbsp;Implemented retrieval-augmented generation for the AI card online pipeline, increasing query coverage by 6.8% and driving high-quality score rate from 42% to 71%.
- &nbsp;Designed the context and AB-parameter subsystems for the greenfield Sorter project, replacing legacy recall microservices. Migrated AI search and TikTok POI search, allowing AB experiment rollouts.
</div>

<div class="about-cell-container" markdown="1">
### Software Engineer – Shopee (Recommendation Architecture)
_Aug 2024 – Aug 2025_
<div class="tech-stack">C++, Golang, bRPC, protobuf, Redis, Hive, Prometheus, Grafana</div>
- &nbsp;Refactored and optimised the mathematical-scoring engine for cache locality and read efficiency across 10+ recommendation scenarios, cutting P99 scoring latency by 40%.
- &nbsp;Integrated eCPM ad cards into 10+ recommendation scenarios, completing rollout within one quarter.
- &nbsp;Proposed and spearheaded a VSCode extension to visualise and manage production DAGs and JSON; adopted across 3 sub-teams by 15+ engineers to minimise misconfigurations and streamline workflows.
- &nbsp;Mentored 2 engineers during team restructuring, reducing ramp-up time and boosting throughput.
</div>

<div class="about-cell-container" markdown="1">
### Software Engineer Intern – Shopee (Marketplace)
_May 2022 – Jan 2023_
<div class="tech-stack">Golang, Python, Django, MySQL, protobuf, Prometheus, Grafana, Redis</div>
- &nbsp;Implemented live database migration, enabling service upgrade with zero downtime.
- &nbsp;Developed and maintained microservices across seller-facing teams, impacting 7 million active sellers.
- &nbsp;Designed and developed business metrics in service, identifying abnormalities within 10 minutes.
</div>

<div class="about-cell-container" markdown="1">
### Software Engineer Intern – Autodesk (AutoCAD)
_Jan 2022 – June 2022_
<div class="tech-stack">C++, LISP, Python, .NET</div>
- &nbsp;Developed 0-to-1 code coverage tool for proprietary LISP in AutoCAD.
- &nbsp;Innovated new approach, reducing coverage CI infrastructure requirement by 90%.
</div>

<div class="about-cell-container" markdown="1">
### Undergraduate Teaching Assistant – NUS
_Aug 2021, Aug 2022_
<div class="tech-stack">C++, LISP, Python, .NET, VS2019</div>
- &nbsp;CS3244 Machine Learning (Aug 2021)
- &nbsp;CS3210 Parallel Computing (Aug 2022)
</div>

<div class="about-cell-container" markdown="1">
### Undergraduate Student Researcher – NUS
_Feb 2021 – May 2021_
- &nbsp;Designed and implemented programs for large-scale text collection from online platforms.
</div>
Updated as of 6 Sep 2026.
