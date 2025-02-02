---
sidebar_position: 8
sidebar_label: State Management
title: State Management
---

## Component level state.
### Most of the time use `useState`  or `useReducer`

Great reference when to use each: https://kentcdodds.com/blog/should-i-usestate-or-usereducer

### Make use of the react re-rendering capabilities to derive state.

Most of the time we can create a derived state based on the state that we have instead of creating new state.

Common mistakes is to create new state to store filtered data. In this case, we actually ensure the original and filtered state stay synchronized. In actual, we can just derived it since we can filter on render 

Read this article for more detail: https://kentcdodds.com/blog/dont-sync-state-derive-it
        
## Global State
    - Context + hooks
    - Zustand

## Server State
    
    We use `tanstack-query` for fetching server related data and it’s currently the general best practice when building with Single Page Application (SPA)
    
    One of the advantage is it manages the in-memory cache for our data and handles edge cases when dealing with async code pretty well.
    
    > IMPORTANT: since by default it uses cache, we MUST invalidate the cache after mutation to prevent stale data.
    > 
    
    For best understanding, it is recommended to read this series of article around the best practices for `tanstack-query` from the Maintainer. References: https://tkdodo.eu/blog/practical-react-query
    
    - infinite scroll function
    
## Form state
    - `react-hook-form`  for managing the state
    - `zod` for building the schema and validation.
    - MUST create the inferred types for from Zod.
    
    Common Pattern is
    
    ```tsx
    const userSchema = z.object({ firstName: z.string(), age: z.number() })
    const UserRegistrationFormValues = z.infer<typeof userSchema>
    
    const form = useForm<UserRegistrationFormValues>({ zodResolver: userSchema, defaultValues: { ... } })
    ```
    
## URL State
    
    We should store shareable state in URL, which is  *any state shared between 2 users that with a link*. 
    
    - If user A shares a link with user B, their account info will be different of course, query parameters or tab selection should be shared as they provide consistent UI.
    - Theme state (light/dark mode), could technically be shared as well, but probably shouldn't be, as it would provide inconsistent UX (eg. user B is in dark mode, opens link which switches to light theme).
    
    Common Use Case:
    
    - Table Pagination, Sorting, Filtering. By using URL, we don’t need manage the save the state like pagination to storage because we can just go back and browser will still have the history intact.