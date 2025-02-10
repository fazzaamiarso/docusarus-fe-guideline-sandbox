---
sidebar_label: Mandatory Readings
title: Mandatory Readings
---
> Make sure to read and at least go through this reading materials to understand better about the tech stack that you are using. Many times, bugs can happen from not knowing the proper way of 
> implementing an API from library. Generally, when not sure, look into the documentation first.

### General
- [react-hook-form](https://react-hook-form.com/). Library for handling form states. On our codebase, we mainly use the controlled component so we can control when dealing with 3rd party component.
- [Zod](https://zod.dev)/[Valibot](https://valibot.dev). Schema/Validation Library. It's worth to read the documentations to understand possible ways to build the schema.
- For Typescript, go through the handbook [https://www.typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html). However for Typing related to React, refer to [https://react-typescript-cheatsheet.netlify.app/docs/basic/setup](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)

### Web
- [Vite](https://vite.dev/guide/). Our module bundler, it's much more simpler than Create-react-app (which already deprecated). Most of the time we won't need to configure vite.
- React docs have many useful tips and common pitfalls on their new docs. [https://react.dev/learn](https://react.dev/learn)
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview). This our API/async library and it's really important to understand the concept as we use it all over our app. Make sure to understand the **Guides & Concepts** section thoroughly.  
- [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/overview) focus on the Guides section and go take a look on th exampes also 
- [Tanstack Table](https://tanstack.com/table/latest/docs/introduction). Headless library to manage the table and it works nicely with Tanstack Query. Basically we can create table with config object.
- [Storybook](https://storybook.js.org/docs). For UI catalog, mostly focus on Stories, Configure, and Essential Addon
- Reference for open source application can checkout [cal.com codebase](https://github.com/calcom/cal.com/tree/main) although using Next.js most concept still the same.

### React Native
- Official React Native docs [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started). If you are new, focus mainly on Basic, Workflow, and UI & Interaction.
- [Tamagui](https://tamagui.dev/docs/intro/introduction). As UI library. The API should be pretty straight-forward but still need to understand the concept behind it.

### Expo 
- Mostly focus on Expo guide and reference section https://docs.expo.dev/guides/overview/. If new to expo or react native, can check out the Learn section
- If want to see real world codebase of Expo with million of users can checkout [Bluesky (Meta) Codebase](https://github.com/bluesky-social/social-app) and [Uniswap](https://github.com/Uniswap/interface/tree/main)