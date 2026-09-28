---
title: Gallery & Animation Demo
order: 3
---

# Gallery & Animation Demo

## Image gallery with lightbox

<ImageGallery :images="[
  { src: '/logo.svg', alt: 'Logo', caption: 'Click to zoom' },
  { src: '/logo.svg', alt: 'Logo again' },
]" />

## Scroll-triggered fade-in

Add `v-reveal` to any element — it fades in once it scrolls into view:

```md
<div v-reveal>
  This block fades in when scrolled into view.
</div>
```

<div v-reveal class="vp-card-hover" style="padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-top: 16px;">
  This block fades in when scrolled into view, and lifts on hover.
</div>
