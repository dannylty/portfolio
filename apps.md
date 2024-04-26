---
layout: central
title: "apps"
---

<div class="app-grid">
  {% for post in site.categories.apps %}
    <div class="app-tile">
      <a href="{{ post.link }}" target="_blank">
        <img src="{{ post.image_path | prepend: site.baseurl }}" alt="{{ post.title }}">
        <div class="app-title">{{ post.title }}</div>
        <div class="app-description">{{ post.description }}</div>
      </a>
    </div>
  {% endfor %}
</div>
