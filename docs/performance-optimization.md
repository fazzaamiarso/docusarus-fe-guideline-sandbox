---
sidebar_position: 9
sidebar_label: Performance Optimization
title: Performance Optimization
---

### Optimize image with lazy loading technique

Our browsers actually have lazy loading built-in, but for maximum compability we will use library [`react-lazy-load-image-component`](https://www.npmjs.com/package/react-lazy-load-image-component)

[Important note:](https://www.npmjs.com/package/react-lazy-load-image-component) for image that is “above the fold” don’t lazyload because we want it to load ASAP. For example, Hero Image.

### Lazy import components.

```tsx
import React, { Suspense, lazy, useState } from 'react';

// Lazy load multiple components
const LazyComponentA = lazy(() => import('./LazyComponentA'));
const LazyComponentB = lazy(() => import('./LazyComponentB'));
const LazyComponentC = lazy(() => import('./LazyComponentC'));

const App = () => {
    const [showComponent, setShowComponent] = useState({
    A: false,
    B: false,
    C: false,
    });

    const toggleComponent = (component) => {
    setShowComponent((prev) => ({
        ...prev,
        [component]: !prev[component],
    }));
    };

    return (
    <div>
        <h1>Lazy Loading Multiple Components</h1>

        <button onClick={() => toggleComponent('A')}>
        Toggle Component A
        </button>
        <button onClick={() => toggleComponent('B')}>
        Toggle Component B
        </button>
        <button onClick={() => toggleComponent('C')}>
        Toggle Component C
        </button>

        <Suspense fallback={<div>Loading...</div>}>
        {showComponent.A && <LazyComponentA />}
        {showComponent.B && <LazyComponentB />}
        {showComponent.C && <LazyComponentC />}
        </Suspense>
    </div>
    );
};

export default App;
```

### Prefetch data for faster loading

Since we use `tanstack-query` . If we predict that user will go to certain page, we can prefetch it.

**1. Prefetching on Hover or Interaction**

- **Use Case**: When a user hovers over a button, link, or component that will likely
trigger a data fetch (e.g., navigating to a new page or opening a
modal).
- **Why It’s Useful**:
    - Reduces loading time when the user actually performs the action (e.g., clicking the button).
    - Makes the app feel faster and more responsive.
- **Example**:
    - Prefetch user profile data when the user hovers over a "View Profile" button.
    - Prefetch product details when the user hovers over a product card in an e-commerce app.



**2. Prefetching on Route Change (Next Page)**

- **Use Case**: When the user is likely to navigate to a new page or route (e.g., clicking a link or button that leads to another page).
- **Why It’s Useful**:
    - Ensures the data for the next page is already loaded by the time the user navigates to it.
    - Eliminates loading spinners or delays during navigation.
- **Example**:
    - Prefetch blog post data when the user clicks a "Read More" link.
    - Prefetch dashboard data when the user clicks a "Go to Dashboard" button.

**3. Prefetching for Anticipated User Actions**

- **Use Case**: When you can predict the user’s next action based on their current behavior or app flow.
- **Why It’s Useful**:
    - Proactively loads data that the user is likely to need soon, improving perceived performance.
    - Works well for apps with predictable user flows (e.g., onboarding, step-by-step forms, or guided workflows).
- **Example**:
    - Prefetch the next step’s data in a multi-step form while the user is filling out the current step.
    - Prefetch search results as the user types in a search bar (e.g., after a short delay).

#### Optimize Cache Stale time

For things that we get from API that’s unlikely to change on that user session, we should cache it for a long time. For example, list of services that we have, list of currencies that we support. 

**1. Frequent Data Updates (e.g., Real-Time Dashboards)**

- **Scenario**: In applications like real-time dashboards, stock market trackers, or live sports scores, data changes frequently.
- **Why Adjust?**
    - Set a **low `staleTime`** (e.g., `0` or a few seconds) to ensure the data is always fresh and up-to-date.
    - Use a **short `cacheTime`** to avoid storing outdated data in the cache.
- **Example**:
    
    ```tsx
    useQuery({
        queryKey: ['live-scores'],
        queryFn: fetchLiveScores,
        staleTime: 1000 * 5, // 5 seconds
        cacheTime: 1000 * 10, // 10 seconds
    });
    ```

**2. Infrequently Accessed Data (e.g., Archived or Historical Data)**

- **Scenario**: For data that is rarely accessed, such as archived records, old reports, or historical data.
- **Why Adjust?**
    - Set a **long `staleTime`** to avoid refetching data unnecessarily.
    - Use a **long `cacheTime`** to keep the data in the cache for future use without refetching.
- **Example**:
    
    ```tsx
    useQuery({
        queryKey: ['archived-reports'],
        queryFn: fetchArchivedReports,
        staleTime: 1000 * 60 * 60, // 1 hour
        cacheTime: 1000 * 60 * 60 * 24, // 1 day
    });
    ```

**3. Memory Optimization in Large-Scale Apps**

- **Scenario**: In large-scale applications with many queries, memory usage can become
an issue if unused data is kept in the cache for too long.
- **Why Adjust?**
    - Enable **garbage collection** by setting a **short `cacheTime`** for queries that are no longer active.
    - Use `cacheTime` to automatically remove unused data from the cache after a certain period.
- **Example**:
    
    ```tsx
    useQuery({
        queryKey: ['user-sessions'],
        queryFn: fetchUserSessions,
        cacheTime: 1000 * 60 * 5, // 5 minutes (garbage collect after 5 minutes of inactivity)
    });
    ```