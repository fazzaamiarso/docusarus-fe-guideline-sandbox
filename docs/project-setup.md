---
sidebar_position: 2
sidebar_label: Project Setup
title: Project Setup
---

For more specific guide or setup, please Refer to your project's README.md as it can be specific to that project

## Project Structure

Generally, we follow the following structure:

## Web
```txt
- public/
- src/
  - assets/
    - image/
      - icons/
        - icon<NAME>.svg
      - index
  - utils/
  - components/
    - [COMPONENT_NAME]/
      - [MAYBE_SOME_VARIANT]/
      - index.tsx
  - pages/
    - [PAGE_NAME]/
      - hooks/
      - components/
      - index.tsx
  - hooks/
    - use<HOOK_NAME>/
  - api/
    - index.ts
  - styles/
  - store/
  - types/
    - [FEATURE_NAME]/
      - index.ts
```

## Expo
```txt
- assets/
  - fonts/
  - images/
  - icons/
    - [ICON_NAME].svg
    - index.ts
- src/
  - api/
    - [FEATURE_NAME]/
      - index.ts
      - queries.ts
      - mutation.ts
      - types.ts
    - index.ts
  - lib/
    - constants/
      - colors.ts
      - app.ts
    - provider.tsx
    - [other-related-library-specific-code].ts
  - routes/
    - (app)/
      - (tabs)/
      - [OTHER_PAGES]/
      - _layout.tsx
    _layout.tsx
    +html.tsx
    +not-found.tsx
  - feature/
    - [FEATURE_NAME]/
      - components/
      - hooks/
      - schema.ts
  - hooks/
    - use<HOOK_NAME>
  - types/
    - [FEATURE_NAME]/
      - index.ts
  - utils/
```