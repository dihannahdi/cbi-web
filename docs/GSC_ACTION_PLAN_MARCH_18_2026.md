# GSC AUDIT ACTION PLAN - March 18, 2026

## EXECUTIVE SUMMARY

**Audit Date:** March 18, 2026  
**Critical Issues Found:** 1 (English blog articles missing)  
**High-Priority Items:** 3  
**Medium-Priority Items:** 4  
**Projected Impact:** +40-100% organic click increase

---

## CRITICAL ACTION ITEMS (THIS WEEK)

### 🔴 ACTION 1: Create English Blog Articles
**Priority:** CRITICAL - DO NOW  
**Status:** Not Started  
**Owner:** Content/Translation Team  
**Timeline:** 3-7 days  
**Effort:** High  

**Current Situation:**
- 1,070 Indonesian blog articles exist ✓
- 0 English blog articles exist ✗
- `/en/blog` pages cannot index without content

**What To Do:**
1. **Phase 1 (Days 1-2):** Translate/create top 100 blog articles
   - Focus on articles with highest potential value
   - Use professional translation service + SEO review
   - Add unique intro paragraphs in English

2. **Phase 2 (Days 3-4):** Add to Strapi database
   - Import with `locale: "en"` field
   - Set publish status: `published`
   - Ensure title, description, body in English

3. **Phase 3 (Day 5):** Validate and submit
   - Verify API returns count of 100+ for `locale=en`
   - Run cache-clear on frontend
   - Trigger sitemap regeneration
   - Manually submit updated `sitemap-blog.xml` to GSC

4. **Phase 3 (Day 7):** Complete remaining 970 articles
   - Batch-process remaining articles
   - Maintain quality standards

**Expected Timeline:**
```
Day 1-2: 100 articles created
Day 3-5: Added to Strapi + submitted
Day 7+: 100% of 1,070 articles in EN
Expected GSC indexing: Mar 25-Apr 1, 2026
```

**Success Criteria:**
- [ ] Strapi API returns: `locale=en` articles ≥ 100
- [ ] `/en/blog` page renders with content
- [ ] Sitemap-blog.xml shows ≥ 2,100 URLs (1,070 ID + 1,070 EN)
- [ ] GSC sitemap status updates to show new URLs
- [ ] First English blog URLs discovered by Google (7-14 days post-submission)

**Commands to Verify:**
```bash
# Check API (should return 100+)
curl "https://cbi-backend.my.id/api/blogs?locale=en"

# Should show 100+ articles in response
# Response should include: total > 100, in pagination metadata

# Check sitemap
curl "https://www.centrabiotechindonesia.com/sitemap-blog.xml?refresh=$(date +%s)"
# Should show 2,100+ URLs
```

---

### 🔴 ACTION 2: Optimize Meta Titles & Descriptions for CTR
**Priority:** HIGH  
**Status:** Not Started  
**Owner:** SEO/Content Team  
**Timeline:** 3-5 days  
**Effort:** Medium  

**Current Situation:**
- "biotech" keyword: 1,234 impressions, 0.24% CTR (only 3 clicks)
-Industry average for position 1.3: 2-4% CTR
- Missing opportunity: +22 additional clicks on this keyword alone

**What To Do:**
1. **Identify Target Pages** (Day 1):
   - Find landing pages for:
     - "biotech" (position 1.3)
     - "pupuk organik cair" (position 10.1)
     - "pupuk organik cair terbaik" (position 6.7)
   - Extract current title/description

2. **Rewrite Titles & Descriptions** (Days 2-3):
   - **Formula:** `[Power Word] + [Main Keyword] + [Secondary Keyword] | [Brand]`
   
   **Current Examples → Optimized:**
   ```
   Keyword: "biotech"
   Current: "Homepage - Centra Biotech Indonesia"
   Optimized: "Best Biotechnology Solutions for Precision Farming | Centra Biotech Indonesia"
   
   Keyword: "pupuk organik cair"
   Current: "Rajabio Pupuk Organik Cair - PT Centra..."
   Optimized: "Rajabio Pupuk Organik Cair Terbaik 2026 | Organik Tinggi | Centra Biotech"
   
   Keyword: "pupuk organik cair terbaik"
   Current: "Product Page..."
   Optimized: "2026 Best Organic Liquid Fertilizer: Rajabio vs Competitors | Centra Biotech"
   ```

3. **Implement Changes** (Day 4):
   - Update meta title in page generation logic
   - Update meta description
   - Push to production
   - Clear any caching

4. **Monitor & Iterate** (Ongoing):
   - Track CTR changes in GSC daily
   - A/B test variations if needed
   - Document what works

**Expected Impact:**
```
Biotech keyword alone:
- Current: 1,234 impressions × 0.24% = 3 clicks
- Target: 1,234 impressions × 2% = 25 clicks
- Gain: +22 clicks (733% improvement)

Total estimated impact: +40-60 clicks/month
```

**Success Criteria:**
- [ ] 3+ high-opportunity keywords have new titles/descriptions
- [ ] Changes published to production
- [ ] CTR trend visible in GSC by March 22
- [ ] No organic traffic decrease (quality maintained)

---

## HIGH-PRIORITY ITEMS (THIS WEEK - PARALLEL)

### 🟠 ACTION 3: Investigate & Fix Blog Main Page Non-Indexing
**Priority:** HIGH  
**Status:** Investigative  
**Owner:** Technical SEO Team  
**Timeline:** 2-3 days  
**Effort:** Low  

**Current Situation:**
- `/id/blog` is crawled (Mar 13) but not indexed
- Status shown as "NEUTRAL" (Excluded/Discovered)
- Could be: pagination issues, duplicate content, thin content

**Steps to Debug:**
1. **Check Canonicalization:**
   ```bash
   curl -s https://www.centrabiotechindonesia.com/id/blog | grep canonical
   # Should only show self-referential canonical
   ```

2. **Check for Pagination Rel Tags:**
   ```bash
   # Should see rel="next" on paginated pages
   curl -s https://www.centrabiotechindonesia.com/id/blog | grep -E 'rel="(next|prev)"'
   ```

3. **Check Content Length:**
   ```bash
   # Main page should have substantial content (>2KB of actual content, not just articles list)
   wc -c <(curl -s https://www.centrabiotechindonesia.com/id/blog)
   ```

4. **Check for Duplicate Content Issues:**
   - Compare `/id/blog` content structure with `/id/news`
   - Ensure unique value proposition on `/blog` page

**Fix Options:**
1. **Option A (Recommended):** Add unique content block to `/blog` page
   - Hero section with blog description
   - Featured articles section (different from main listing)
   - Newsletter signup CTA
   - Blog categories/tags overview

2. **Option B:** Fix pagination structure
   - Ensure page 1 has canonical self-reference
   - Add rel="next" to page 1 pointing to page 2
   - Add rel="prev" to page 2+ pointing to previous

3. **Option C:** Force recrawl
   - Use GSC "Request Indexing" tool
   - Wait 7 days for reprocessing

**Success Criteria:**
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] GSC shows `/id/blog` as "Indexed" (within 7-14 days)
- [ ] Page appears in organic search results

---

## MEDIUM-PRIORITY ITEMS (NEXT 2 WEEKS)

### 🟡 ACTION 4: Mobile UX & CTR Optimization
**Priority:** MEDIUM  
**Timeline:** 7-10 days  
**Effort:** Medium  

**Current Situation:**
- Desktop CTR: 1.98% (2X higher than mobile)
- Mobile CTR: 0.97%
- Mobile traffic: 67% of total (so optimization has big impact)

**Quick Wins:**
1. Check mobile snippet quality in rich results
2. Ensure click-to-call/WhatsApp buttons are prominent
3. Verify font sizes (minimum 16px)
4. Test tap targets (minimum 44px)

**Expected Gains:** +15-25 clicks/month

---

### 🟡 ACTION 5: Keyword Gap Analysis & New Content
**Priority:** MEDIUM  
**Timeline:** 10-14 days  
**Effort:** Medium  

**Identified Gaps:**
- "insektisida hayati" - 1 click, position 3.5 (underexploited)
- "bioteknologi pertanian" - Not ranking
- "agricultural biotechnology" - For English market
- Comparison pages (hayati vs chemical, organic vs synthetic)

**Action:** Create 5-10 new targeted blog posts

**Expected Impact:** +30-50 clicks/month (after 30-day indexing)

---

## ONGOING MONITORING

### Weekly Check-in (Every Monday)
- [ ] Monitor CTR trend in GSC
- [ ] Check new discovered URLs
- [ ] Verify no crawl errors
- [ ] Track position trends for target keywords

### Monthly Analysis (1st of month)
- [ ] Full GSC export
- [ ] Competitor analysis
- [ ] New opportunity identification
- [ ] Update this action plan

---

## SUCCESS METRICS BY DATE

**March 25, 2026 (5-day check-in):**
```
✓ English blog articles: ≥100 in Strapi
✓ Meta titles updated: 3+ pages
✓ Sitemap reprocessing: Started by GSC
✓ CTR trend: Monitoring began
```

**April 1, 2026 (14-day checkpoint):**
```
✓ English blog articles: ≥500 in Strapi
✓ `/id/blog` status: Indexed or fixing in progress
✓ New keywords: 5+ discovered in GSC
✓ Organic clicks: 300+ (if implementations working)
```

**April 15, 2026 (30-day review):**
```
✓ English blog articles: 100% (1,070) complete
✓ CTR improvement: 1.16% → 1.5%+
✓ Average position: 5.0 → 4.5
✓ Monthly clicks: 350+ (from 278)
```

**May 1, 2026 (45-day review):**
```
✓ Full English blog indexing: 500+/1070 indexed
✓ New keyword rankings: 20+ new words
✓ Monthly clicks: 400+ (40% growth)
✓ Position: 4.0-4.5 average
```

---

## RESOURCE REQUIREMENTS

| Resource | Needed | Timeline |
|----------|--------|----------|
| Content writer (English) | Mid-High | Immediate (Actions 1, 5) |
| Translation service | High | Days 1-7 (Action 1) |
| SEO/Meta optimization | Low-Mid | Days 1-5 (Action 2) |
| Technical person | Low | Days 2-3 (Action 3) |
| Mobile tester | Low | Days 5-10 (Action 4) |
| GSC analyst/monitor | Low-Ongoing | Ongoing |

---

## RISK MITIGATION

| Risk | Mitigation |
|------|-----------|
| English content quality poor | Use professional translator + SEO review |
| Duplicate content penalty | Add unique intros/CTAs, proper internal linking |
| Implementation bugs | Test in staging first, use feature flags |
| No indexing improvement | Have backup plan (link building, etc.) |
| Team capacity | Prioritize Actions 1 & 2, defer others if needed |

---

## SIGN-OFF

**Audit Date:** March 18, 2026  
**Prepared By:** GitHub Copilot  
**Confidence Level:** High  
**Next Review:** March 25, 2026  

**Stakeholders to Inform:**
- [ ] SEO Team
- [ ] Content Team  
- [ ] Technical Team
- [ ] Management/Marketing
