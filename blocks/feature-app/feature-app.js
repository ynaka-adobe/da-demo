/**
 * Feature App block - Audi-style lease offer / promotional feature.
 * Recreates the feature-app from https://www.audiusa.com/en/
 *
 * Expected structure (2 rows from table):
 * Row 1: Background image (picture)
 * Row 2: Headline (h2), detail text (p), CTA links (a)
 */
export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];
  const fg = rows.pop();
  const bg = rows.pop();

  if (bg) {
    bg.classList.add('feature-app-background');
    const picture = bg.querySelector('picture');
    if (picture) {
      const picPara = picture.closest('p');
      if (picPara) picPara.replaceWith(picture);
    }
  }

  if (fg) {
    fg.classList.add('feature-app-foreground');

    const heading = fg.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) heading.classList.add('feature-app-heading');

    fg.querySelectorAll('p').forEach((p) => {
      if (!p.querySelector('a')) p.classList.add('feature-app-detail');
    });

    const links = fg.querySelectorAll('a');
    if (links.length > 0) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'feature-app-ctas';
      links.forEach((link, idx) => {
        const isPrimary = link.classList.contains('btn-primary') || link.closest('strong') || idx === 0;
        link.classList.add('feature-app-cta', isPrimary ? 'primary' : 'secondary');
        const p = link.closest('p');
        if (p && p.children.length === 1) p.replaceWith(link);
        ctaWrapper.appendChild(link);
      });
      fg.appendChild(ctaWrapper);
    }
  }
}
