---
sidebar_position: 7
sidebar_label: Testing
title: Testing
---

- Test case follow “***Should - ExpectedBehavior - When/Given/If - StateUnderTest”***
    - “Should render nothing when there is no username”
    - “Should format text as comma separated value when there is multiple selection”
- **Unit Testing (bussiness logics, utils).**
    - **Web → Vitest**
    - React Native → **Jest (only supported framework)**
- **Component Testing.** Unit Test tools combined with **React Testing Library**
- **E2E**
    - Web → Playwright or Cypress
    - React Native → Maestro
- [Storybook](https://storybook.js.org/docs) → Components Catalogue and Visibility, can be hosted so Design Team can see and play around with the components also.  Supported for RN and Web.