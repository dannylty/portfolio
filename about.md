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
### Software Engineer (Backend) – ByteDance
_Oct 2025 – Present_
<div class="tech-stack">Python, Java, Kafka, Redis, Hive, Flink, HDFS, Spark, SQL</div>
- &nbsp;Architected the real-time data infrastructure for TikTok’s AI Search Cards, replacing legacy batch indexing. Orchestrated the end-to-end ingestion and cross-region replication of search impression data, stabilising GPU compute usage, improving data freshness, reducing maintenance overhead by 40%.
- &nbsp;Unified the architecture for different TikTok AI Search Cards under a Flink framework. Designed a polymorphic, strategy-driven pipeline with robust AB-testing support to cut iteration time cost by 95%.
</div>

<div class="about-cell-container" markdown="1">
### Software Engineer (Backend) – Shopee
_Aug 2024 – Aug 2025_  
<div class="tech-stack">C++, Golang, bRPC, protobuf, CI/CD, Prometheus, Grafana, Kafka, Redis, Hive</div>
- &nbsp;Maintained recommendation architecture services to ensure high availability and low latency, integrating data flows across 20+ cross-functional teams to support >300 million users.
- &nbsp;Optimised and refactored core math library for cache locality and read efficiency, cutting P99 feature-processing latency by 40%.
- &nbsp;Drove end-to-end delivery of features, actively managing cross-team execution, reducing delivering time of 10+ business features by 20%.
- &nbsp;Mentored 2+ engineers during team restructuring, reducing ramp-up time and boosting throughput.
</div>

<div class="about-cell-container" markdown="1">
### Backend Software Engineer Intern – Shopee
_May 2022 – Jan 2023_  
<div class="tech-stack">Golang, Python, Django, MySQL, protobuf, Prometheus, Grafana, Redis, Kafka</div>
- &nbsp;Developed and maintained microservices across seller-facing teams, impacting 7 million active sellers.
- &nbsp;Implemented live database migration code, enabling service integration with zero downtime.
- &nbsp;Designed and developed business metrics in service, identifying abnormalities within 10 minutes.
</div>

<div class="about-cell-container" markdown="1">
### Backend Software Engineer Intern – Autodesk
_Jan 2022 – June 2022_  
<div class="tech-stack">C++, LISP, Python, .NET, VS2019</div>
- &nbsp;Developed 0-to-1 code coverage tool for AutoCAD.
- &nbsp;Innovated new approach that reduced infrastructure requirement by 90%.
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
Updated as of 12 Jan 2026.

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