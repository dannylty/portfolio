---
layout: central
title: "apps"
---

<ul>
  {% for post in site.posts %}
    <li class="app-list-item">
      <mark><a href="{{ post.link }}" target="_blank">{{ post.title }}</a></mark>
      <span class="description">{{ post.description }}</span>
    </li>
  {% endfor %}
</ul>
