---
sidebar_position: 2
sidebar_label: Project Setup
title: Project Setup
---

Refer to your project's README.md. Should've been setup.

## Project Structure

Generally, we follow the following structure:

```text
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
    - index.ts
  - api/
    - index.ts
  - styles/
  - store/
  - types/
```