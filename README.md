# Video2DoorTraversal project website

Official project page for **Video2DoorTraversal: Articulated Door Twins for Real-to-Sim-to-Real Wheel-Legged Door Traversal from a Single Video**.

The site is a dependency-free static page hosted with GitHub Pages.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Updating placeholders

- Replace the disabled arXiv and Code controls in `index.html` when the links are public.
- Update author profile links and affiliation superscripts after the final author list is confirmed.
- Replace the provisional BibTeX entry after the arXiv identifier is assigned.

## Media

The page presents the project in the following order:

1. four-door hero video;
2. system overview followed by the paper abstract;
3. the paper pipeline figure;
4. three DoorTwin videos in separate rows;
5. two simulation videos;
6. diverse real-world door types, 10/10 repeated trials, and zero-shot transfer.

Web-ready images live in `assets/images/`. Browser-compatible H.264 videos live in `assets/videos/` and use `preload="metadata"` outside the hero to avoid downloading every experiment video on initial page load.
