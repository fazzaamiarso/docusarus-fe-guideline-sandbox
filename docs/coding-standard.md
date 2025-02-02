---
sidebar_position: 4
sidebar_label: Coding Standards
title: Coding Standards
---

## General Concepts
    
Code is **“Communication”**. Always prioritize **Readability** and **Maintainability**. We are working on a team, so make sure others can easily understand your code.
    
### Principles
        
Reference: https://www.linkedin.com/pulse/best-practices-writing-javascript-code-dry-kiss-yagni-emmanuel/
        
- **DRY** (**Don’t Repeat Yourself)**
- **KISS (Keep It Stupid Simple)**
- **YAGNI (You Aren’t Gonna Need It)**
    
- (YAGNI) Don’t do **premature optimization.** Most modern Javascript frameworks already did a great job on optimizing your code, especially **React**. Optimize only when your app already has noticeable issues with performance like slowness. ***Don’t create a solution for a problem that doesn’t exist yet.***

- (DRY) Before coding something, try to search for existing implementations or solutions in the codebase and use or improve that instead of writing it from scratch.


## Rule of Thumbs
### Use **only very simple, explicit control flow** for clarity. 
Do not use recursion to ensure that all executions that should be bounded are bounded.
    
    ```tsx
    // ❌ BAD: Complex conditional nesting
    function processUserData(user: User | null): string {
      // Hard to follow nested conditions
      if (user) {
        if (user.roles) {
          if (user.roles.length > 0) {
            if (user.roles.includes('admin')) {
              if (user.permissions) {
                if (user.permissions.length > 0) {
                  return 'Valid admin user';
                } else {
                  return 'Admin without permissions';
                }
              } else {
                return 'Admin without permission array';
              }
            } else {
              return 'Non-admin user';
            }
          } else {
            return 'User without roles';
          }
        } else {
          return 'User without roles array';
        }
      } else {
        return 'No user provided';
      }
    }
    
    // ✅ GOOD: Refactored with clear control flow
    function processUserDataBetter(user: User | null): string {
      if (!user) {
        return 'No user provided';
      }
    
      if (!user.roles || user.roles.length === 0) {
        return 'User without roles';
      }
    
      const isAdmin = user.roles.includes('admin');
      if (!isAdmin) {
        return 'Non-admin user';
      }
    
      if (!user.permissions || user.permissions.length === 0) {
        return 'Admin without permissions';
      }
    
      return 'Valid admin user';
    }
    
    class PermissionChecker {
      // ✅ GOOD: Clear early returns, explicit conditions
      hasPermission(user: User, resource: string, action: string): boolean {
        if (user.roles.includes('admin')) {
          return true;
        }
    
        if (!user.permissions || user.permissions.length === 0) {
          return false;
        }
    
        for (const permission of user.permissions) {
          if (permission.resource === resource && 
              permission.action === action) {
            return permission.allowed;
          }
        }
    
        return false;
      }
    ```

### Dont neglect and address all compiler warnings 
 common compiler errors are react compiler, eslint error, typescript compiler

### Declare variables at the **smallest possible scope**
On top of that, **minimize the number of variables in scope**, to reduce the probability that variables are misused

### Centralize Control Flow and Divide responsibility.
When splitting a large function, try to keep all switch/if statements in the "parent" function, and move non-branchy logic fragments to helper functions.

All control flow should be handled by *one* function, the rest shouldn't care about control flow at all. In other words, ["push `if`s up and `for`s down"](https://matklad.github.io/2023/11/15/push-ifs-up-and-fors-down.html).
    
```tsx

function PostIssue (props) {
    function renderServiceForm(serviceId: number) { 
        switch (serviceId):
            case 1:
                return <AirconForm/>
            case 2:
                return <PlumbingForm/>
            default:
                return null;
        }
    
return <main>
        <h1>Service Form</h1>
        <form>
            {renderServiceForm()}
        </form>
        <button>Submit</button>
    </main>
}
```
    
```tsx
type User = {
    id: number;
    name: string;
    lastActive: Date;
};

// Helper function to determine if a user is active
const isUserActive = (lastActive: Date): boolean => {
    const THRESHOLD_DAYS = 30;
    const now = new Date();
    const diffInDays = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= THRESHOLD_DAYS;
};

// Main function that handles control flow
const processUsers = (users: User[]): { active: User[]; inactive: User[] } => {
    const activeUsers: User[] = [];
    const inactiveUsers: User[] = [];

    users.forEach((user) => {
    if (isUserActive(user.lastActive)) {
        activeUsers.push(user);
    } else {
        inactiveUsers.push(user);
    }
    });

    return { active: activeUsers, inactive: inactiveUsers };
};
```
    
### Split Compound conditions
Compound conditions that evaluate multiple booleans make it difficult for the reader to verify that all cases are handled. 

Split into simple conditions using nested `if/else` branches. Split complex `else if` chains into `else { if { } }` trees. This makes the branches and cases clear.
    
```tsx
// X Complex compound conditions
const UserAccessControlBad: React.FC<UserData> = (props) => {
    const handleAccess = () => {
    // Hard to read and verify all cases are handled
    if (props.isLoggedIn && props.hasSubscription && (props.isAdmin || props.isPremiumUser) && !props.hasPendingPayment) {
        return <div>Full Access Granted</div>;
    }
    return <div>Access Denied</div>;
    };

    return handleAccess();
};

//  ✅ Split conditions
const UserAccessControlGood: React.FC<UserData> = (props) => {
    const handleAccess = () => {
    if (!props.isLoggedIn) {
        return <div>Please log in to access this content</div>;
    }

    if (!props.hasSubscription) {
        return <div>Please subscribe to access this content</div>;
    }

    if (props.hasPendingPayment) {
        return <div>Please resolve pending payment to continue</div>;
    }

    // Split user type check into its own condition
    if (props.isAdmin || props.isPremiumUser) {
        return <div>Full Access Granted</div>;
    }  
    
    return <div>Regular User Access Only</div>;
    };

    return handleAccess();
};
```
    
### All errors **MUST** be handled
More details on **Error Handling** section. Some of the examples are:
- Crash prevention
- For UI:
    - Empty states (No data after fetching from API)
    - Loading Error (Failed loading)

## Naming Things
### Do not abbreviate variable names
Use proper capitalization for acronyms (`deeplinkURL` over `deepLinkUrl`)


### Add units or qualifiers to variable names
Put the units or qualifiers last, sorted by descending significance, this way the variable starts with the most significant word, and ends with the least significant word. 

For example, `latency_ms_max` rather than `max_latency_ms`. This will then line up nicely when `latency_ms_min` is added, as well as group all variables that relate to latency.

```tsx
// Bad naming - inconsistent ordering of units and qualifiers
interface BadSalesMetrics {
dailySalesUsd: number;
usdMonthlySales: number;
yearlyUsdSales: number;
maxItemsPerOrder: number;
minOrderItems: number;
averageOrderDurationMin: number;
}

// Good naming - consistent ordering with business concept first, then units/qualifiers
interface GoodSalesMetrics {
// Sales amounts with currency and period
salesUsdDaily: number;
salesUsdMonthly: number;
salesUsdYearly: number;

// Order statistics with units
orderItemsMax: number;
orderItemsMin: number;
orderItemsAvg: number;
orderDurationMinAvg: number;

// Transaction counts by type
transactionsCashDaily: number;
transactionsCardDaily: number;
transactionsMobileDaily: number;
}
```

### Callbacks go last in the list of parameters.
This mirrors control flow: callbacks are also *invoked* last.

You can see this pattern everywhere, `addEventListener` , test runner `it("", callback)`

### Naming convention


|  |  |
| --- | --- |
| **PascalCase** | React components, component file name, Interafaces and types |
| **camelCase** | function, variables, method |
| UPPER_SNAKE_CASE | static constants (value that’s unlikely to change) |

### Importing and Exporting
#### File import Ordering

Order for import would be

1. Core Dependencies
2. 3rd party libraries
3. Our Internal stuff
4. Relative imports
5. Assets

```tsx
// 1️⃣ React and Core Dependencies
import React, { useState, useEffect } from "react";

// 2️⃣ Third-Party Libraries
import axios from "axios";
import { format } from "date-fns";

// 3️⃣ Absolute Imports (Aliased Imports, Utilities, Constants)
import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/utils/formatters";

// 4️⃣ Relative Imports (Project Modules)
import DashboardCard from "../components/DashboardCard";
import useFetchData from "../hooks/useFetchData";

// 5️⃣ Styles and Assets
import "../styles/dashboard.css";
import dashboardIcon from "../assets/dashboard-icon.svg";
```

#### Absolute Import

Use absolute import file path when importing files. This make it easier for us to move things around compare to relative import.

- `@/*`  → Should be reserved for external libraries or dependencies like `@stripe/*` , `@lit/lit-element`
- `#/*` → For modules that we own or created