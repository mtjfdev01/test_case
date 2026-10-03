# Brandsface — sitemap & robots crawl URLs

Origin used in code: `https://www.Brandsface.com`  
(If `NEXT_PUBLIC_APP_URL` is set, that origin is used instead.)

Sitemap file: `https://www.Brandsface.com/sitemap.xml`  
Robots file: `https://www.Brandsface.com/robots.txt`

These are the URLs listed in the sitemap (the set we ask crawlers to index). Robots allows the public site, including all sitemap URLs. It only **blocks** `/admin`, `/invoice`, `/api`, and `/checkout`. Non-featured product pages are not in the sitemap and use `noindex` (they stay followable).

---

## Marketing / legal

- https://www.Brandsface.com/
- https://www.Brandsface.com/about
- https://www.Brandsface.com/catalog
- https://www.Brandsface.com/quote
- https://www.Brandsface.com/audit
- https://www.Brandsface.com/studio
- https://www.Brandsface.com/case-studies
- https://www.Brandsface.com/support
- https://www.Brandsface.com/sale
- https://www.Brandsface.com/privacy-policy
- https://www.Brandsface.com/terms-and-conditions
- https://www.Brandsface.com/refund-policy
- https://www.Brandsface.com/shipping-policy
- https://www.Brandsface.com/whistleblowing-policy

## Category hubs

- https://www.Brandsface.com/category/christmas-packaging
- https://www.Brandsface.com/category/art_card_boxes
- https://www.Brandsface.com/category/corrugated_boxes
- https://www.Brandsface.com/category/custom_pouches
- https://www.Brandsface.com/category/carry_bags
- https://www.Brandsface.com/category/kraft_boxes
- https://www.Brandsface.com/category/labels_and_tags
- https://www.Brandsface.com/category/rigid_boxes

## Featured products (3 per category — sitemap + indexable)

### Christmas packaging
- https://www.Brandsface.com/products/custom-christmas-gift-bags
- https://www.Brandsface.com/products/custom-christmas-wrapping-paper
- https://www.Brandsface.com/products/christmas-sweet-boxes

### Art card boxes
- https://www.Brandsface.com/products/tuck-end-art-card-box
- https://www.Brandsface.com/products/reverse-tuck-end-art-card-box
- https://www.Brandsface.com/products/straight-tuck-end-art-card-box

### Corrugated boxes
- https://www.Brandsface.com/products/corrugated-regular-slotted
- https://www.Brandsface.com/products/corrugated-die-cut
- https://www.Brandsface.com/products/corrugated-mailer

### Custom pouches
- https://www.Brandsface.com/products/pouch-stand-up
- https://www.Brandsface.com/products/pouch-flat
- https://www.Brandsface.com/products/pouch-spout

### Carry bags
- https://www.Brandsface.com/products/carry-bag-paper
- https://www.Brandsface.com/products/carry-bag-kraft
- https://www.Brandsface.com/products/carry-bag-luxury

### Kraft boxes
- https://www.Brandsface.com/products/kraft-tuck-end
- https://www.Brandsface.com/products/kraft-reverse-tuck-end
- https://www.Brandsface.com/products/kraft-straight-tuck-end

### Labels and tags
- https://www.Brandsface.com/products/labels-apparel-tags
- https://www.Brandsface.com/products/labels-bottle-labels
- https://www.Brandsface.com/products/labels-custom-product-labels

### Rigid boxes
- https://www.Brandsface.com/products/magnetic-closure-rigid-box
- https://www.Brandsface.com/products/drawer-slide-out-rigid-box
- https://www.Brandsface.com/products/lift-off-lid-rigid-box

---

## Blocked by robots (not for ranking)

- `/admin` and `/admin/...`
- `/invoice` and `/invoice/...`
- `/api/...`
- `/checkout` and `/checkout/...`

Non-featured `/products/...` pages are crawlable but `noindex` so they do not compete with the 24 sitemap PDPs.
