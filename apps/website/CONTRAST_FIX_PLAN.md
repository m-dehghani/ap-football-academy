# Contrast Issues Fix Plan

## Overview
This document outlines the identified contrast/readability issues in the AP Football Academy website and provides a systematic plan to fix them.

## Identified Issues

### High Severity (Must Fix)

| # | Component | File | Line Range | Issue | Current Colors | Fix |
|---|-----------|------|------------|-------|----------------|-----|
| 1 | Hero | `src/components/Hero.tsx` | ~180-190 | Light text on dark gradient | `text-primary-100` on `from-navy-950 via-blue-900 to-blue-700` | Change to `text-white` or `text-primary-50` |
| 2 | PageHero | `src/components/PageHero.tsx` | ~25-30 | Light text on dark gradient | `text-primary-100` on `from-navy-900 via-primary-900 to-primary-700` | Change to `text-white` or `text-primary-50` |
| 3 | Register | `src/pages/register.tsx` | ~140-150 | Low contrast placeholder | `text-gray-500` on `bg-gray-50` | Change to `text-gray-600` or `text-gray-700` |
| 4 | Register | `src/pages/register.tsx` | ~160-170 | Low contrast placeholder | `text-gray-500` on `bg-gray-50` | Change to `text-gray-600` or `text-gray-700` |
| 5 | Register | `src/pages/register.tsx` | ~200-210 | Low contrast placeholder | `text-gray-500` on `bg-gray-50` | Change to `text-gray-600` or `text-gray-700` |

### Medium Severity (Should Fix)

| # | Component | File | Line Range | Issue | Current Colors | Fix |
|---|-----------|------|------------|-------|----------------|-----|
| 6 | Footer | `src/components/Footer.tsx` | ~45-50 | Muted text on dark background | `text-gray-400` on `bg-navy-900` | Change to `text-gray-300` or `text-white` |
| 7 | Footer | `src/components/Footer.tsx` | ~55-60 | Muted text on dark background | `text-gray-300` on `bg-navy-900` | Change to `text-white` for better readability |
| 8 | NewsUpdates | `src/components/NewsUpdates.tsx` | ~450-460 | Low contrast badge | `text-navy-600` on `bg-navy-100` | Change to `text-navy-700` or `text-navy-800` |
| 9 | EnhancedNewsUpdates | `src/components/EnhancedNewsUpdates.tsx` | ~320-330 | Low contrast badge | `text-navy-600` on `bg-navy-100` | Change to `text-navy-700` or `text-navy-800` |

### Low Severity (Nice to Fix)

| # | Component | File | Line Range | Issue | Current Colors | Fix |
|---|-----------|------|------------|-------|----------------|-----|
| 10 | EnhancedNewsUpdates | `src/components/EnhancedNewsUpdates.tsx` | ~350-360 | Low contrast inactive button | `text-gray-600` on white | Change to `text-gray-700` |

## Implementation Plan

### Phase 1: Hero & PageHero Components (High Priority)
1. **Hero.tsx** - Update badge text color from `text-primary-100` to `text-white`
2. **PageHero.tsx** - Update badge text color from `text-primary-100` to `text-white`

### Phase 2: Register Page (High Priority)
1. **register.tsx** - Update all placeholder text colors from `text-gray-500` to `text-gray-600` or `text-gray-700`

### Phase 3: Footer (Medium Priority)
1. **Footer.tsx** - Update contact info text from `text-gray-400`/`text-gray-300` to `text-white` or `text-gray-200`

### Phase 4: News Components (Medium Priority)
1. **NewsUpdates.tsx** - Update badge from `text-navy-600` to `text-navy-700`
2. **EnhancedNewsUpdates.tsx** - Update badge from `text-navy-600` to `text-navy-700`

### Phase 5: Minor Fixes (Low Priority)
1. **EnhancedNewsUpdates.tsx** - Update inactive button text from `text-gray-600` to `text-gray-700`

## Color Contrast Guidelines

### WCAG AA Requirements (Minimum)
- Normal text: 4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): 3:1 contrast ratio

### WCAG AAA Requirements (Enhanced)
- Normal text: 7:1 contrast ratio
- Large text: 4.5:1 contrast ratio

### Recommended Color Pairs for This Project

| Background | Text Color | Contrast Ratio | WCAG Level |
|------------|------------|----------------|------------|
| navy-900/950 | white | ~15:1 | AAA |
| navy-900/950 | primary-50 | ~12:1 | AAA |
| navy-100 | navy-700 | ~6:1 | AA |
| navy-100 | navy-800 | ~9:1 | AAA |
| gray-50 | gray-700 | ~10:1 | AAA |
| gray-50 | gray-600 | ~7:1 | AA |
| white | gray-700 | ~12:1 | AAA |
| white | gray-600 | ~7:1 | AA |

## Testing Checklist

After implementing fixes:
- [ ] Test all pages in browser with DevTools color contrast checker
- [ ] Verify readability in both light and dark environments
- [ ] Test with browser zoom at 125%, 150%, 200%
- [ ] Verify with high contrast mode enabled
- [ ] Test on mobile devices
- [ ] Run existing tests to ensure no regressions

## Files to Modify

1. `src/components/Hero.tsx`
2. `src/components/PageHero.tsx`
3. `src/pages/register.tsx`
4. `src/components/Footer.tsx`
5. `src/components/NewsUpdates.tsx`
6. `src/components/EnhancedNewsUpdates.tsx`

## Notes

- The design uses a dark navy theme for hero sections and footer
- Primary brand color is blue (primary-600: #0284c7)
- Secondary is orange (secondary-600: #ea580c)
- Accent is green (accent-600: #16a34a)
- All fixes should maintain the visual design language while improving accessibility