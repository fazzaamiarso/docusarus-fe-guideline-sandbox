---
sidebar_position: 10
sidebar_label: Best Practices
title: Best Practices
---

## Use configured design tokens 
for **colors and typography**, make sure to use the variables or constants that’s already setup in the project’s config for consistency. 

It should already configured based on Design System. For example, in tailwindcss we have **tailwind.config.js**


## Make sure to Reset pagination when searching or filtering

When you filter data in a table or list, it's important to reset the current page number back to page 1. Here's why:

Imagine you're on page 10 of your data. When you apply a filter, two things can happen:
1. If there's enough filtered data to fill 10 pages - everything works fine
2. If there's less data and it only fills 5 pages - you'll see an empty page because page 10 doesn't exist anymore

To prevent showing empty pages, always reset to page 1 when applying filters. This ensures users will always see the first page of their filtered results.

## Use Semantic HTML elements

Avoid `<div>` and `<span>` as much as possible. If it’s a button, then use `<button/>`, if it’s a Link then use `<a>` or `<Link>` . This is the basic for Web Accessibility,

Reference: https://web.dev/learn/html/semantic-html

## (DOUBLE EDGE) Barrel Files

Barrel files (index.ts/js files that re-export contents) are a common pattern for organizing and simplifying imports, but they come with important tradeoffs to consider.

### Pros:
- Cleaner imports (import from one file instead of many)
- Easier refactoring when moving files
- More organized public API surface

### Cons:
- Can impact build optimization and tree-shaking
- May increase bundle size
- Potential circular dependency issues

Here are references to different opinions

Pro barrel files: [Why and How to use Barrel Files](https://adrianfaciu.dev/posts/barrel-files/)

Against barrel files: [Please Stop Using Barrel Files](https://tkdodo.eu/blog/please-stop-using-barrel-files)

## Colocate state to closely to where it being used

We can keep in mind to put things that are related as close as possible to where it being it used. This will make it easier to find things.

Great Reference: [https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)

## Implementing Acessibility is HARD 

We use component libraries to build components that have A11y builtin and tested. Reach for `shadcn` , `radix-ui` for building blocks of your component.

## [NEED MORE Exploration] Ideally Business and Domain logic needs to be separated from UI.

Can extract it to its own function or custom hook so it can be tested easily.

##  Extract or encapsulate functionality to custom hooks

## Typescript
Refer to this for Do’s and Don’ts [https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

## Security
Refer to this for general security guideline [https://wiki.mozilla.org/WebAppSec/Secure_Coding_Guidelines](https://wiki.mozilla.org/WebAppSec/Secure_Coding_Guidelines)

## Components
For elements, create base components or Atoms

This should be purely a presenter and view only without external dependencies

For Example for Input we can have the `<BaseInput>` that is for UI that will handle the UI for hover, focused, active, etc.

To add logic like integrate it with form, we cam create a wrapper `<TextField>` 

```tsx
// example from https://github.com/calcom/cal.com/blob/main/packages/ui/components/form/inputs/TextField.tsx
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
{ isFullWidth = true, ...props },
ref
) {
return (
<input
    {...props}
    ref={ref}
    className={classNames(
    "hover:border-emphasis dark:focus:border-emphasis border-default bg-default placeholder:text-muted text-emphasis disabled:hover:border-default disabled:bg-subtle focus:ring-brand-default focus:border-subtle mb-2 block h-9 rounded-md border px-3 py-2 text-sm leading-4 transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed",
    isFullWidth && "w-full",
    props.className
    )}
/>
);
});

const Addon = ({ isFilled, children, className, error, onClickAddon }: AddonProps) => (
);

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(props, ref) {
const id = useId();
const { t: _t, isLocaleReady, i18n } = useLocale();
const t = props.t || _t;
const name = props.name || "";
const {
label = t(name),
labelProps,
labelClassName,
disabled,
LockedIcon,
placeholder = isLocaleReady && i18n.exists(`${name}_placeholder`) ? t(`${name}_placeholder`) : "",
className,
addOnLeading,
addOnSuffix,
addOnFilled = true,
addOnClassname,
inputIsFullWidth,
hint,
type,
hintErrors,
labelSrOnly,
noLabel,
containerClassName,
readOnly,
showAsteriskIndicator,
onClickAddon,
t: __t,
dataTestid,
...passThrough
} = props;

const [inputValue, setInputValue] = useState<string>("");

return (
<div className={classNames(containerClassName)}>
    {!!name && !noLabel && (
    <Skeleton
        as={Label}
        htmlFor={id}
        loadingClassName="w-16"
        {...labelProps}
        className={classNames(labelClassName, labelSrOnly && "sr-only", props.error && "text-error")}>
        {label}
        {showAsteriskIndicator && !readOnly && passThrough.required ? (
        <span className="text-default ml-1 font-medium">*</span>
        ) : null}
        {LockedIcon}
    </Skeleton>
    )}
    {addOnLeading || addOnSuffix ? (
    <div
        dir="ltr"
        className="focus-within:ring-brand-default group relative mb-1 flex items-center rounded-md transition focus-within:outline-none focus-within:ring-2">
        {addOnLeading && (
        <Addon
            isFilled={addOnFilled}
            className={classNames("ltr:rounded-l-md rtl:rounded-r-md", addOnClassname)}>
            {addOnLeading}
        </Addon>
        )}
        <Input
        data-testid={`${dataTestid}-input` ?? "input-field"}
        id={id}
        type={type}
        placeholder={placeholder}
        isFullWidth={inputIsFullWidth}
        className={classNames(
            className,
            "disabled:bg-subtle disabled:hover:border-subtle disabled:cursor-not-allowed",
            addOnLeading && "rounded-l-none border-l-0",
            addOnSuffix && "rounded-r-none border-r-0",
            type === "search" && "pr-8",
            "!my-0 !ring-0"
        )}
        {...passThrough}
        {...(type == "search" && {
            onChange: (e) => {
            setInputValue(e.target.value);
            props.onChange && props.onChange(e);
            },
            value: inputValue,
        })}
        disabled={readOnly || disabled}
        ref={ref}
        />
        {addOnSuffix && (
        <Addon
            onClickAddon={onClickAddon}
            isFilled={addOnFilled}
            className={classNames("ltr:rounded-r-md rtl:rounded-l-md", addOnClassname)}>
            {addOnSuffix}
        </Addon>
        )}
        {type === "search" && inputValue?.toString().length > 0 && (
        <Icon
            name="x"
            className="text-subtle absolute top-2.5 h-4 w-4 cursor-pointer ltr:right-2 rtl:left-2"
            onClick={(e) => {
            setInputValue("");
            props.onChange && props.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
        />
        )}
    </div>
    ) : (
    <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={classNames(
        className,
        "disabled:bg-subtle disabled:hover:border-subtle disabled:cursor-not-allowed"
        )}
        {...passThrough}
        readOnly={readOnly}
        ref={ref}
        isFullWidth={inputIsFullWidth}
        disabled={readOnly || disabled}
    />
    )}
    <HintsOrErrors hintErrors={hintErrors} fieldName={name} t={t} />
    {hint && <div className="text-default mt-2 flex items-center text-sm">{hint}</div>}
</div>
);
});
```

## AVOID components with large props

This may be a sign to split it into another component or use composition pattern

## AVOID passing feature specific props to general or reusable components

We do this to avoid coupling of the component to the feature, make it easier to test and easier to maintain.

**Good Pattern** would be to pass in general props that it’s or composition.

**Bad Pattern** would be passing one of props like `isEditPromocode` to a  generic `Navbar` 

```tsx
// Bad Pattern Example - Tightly coupled with feature-specific props
interface BadNavbarProps {
title: string;
isEditPromocode?: boolean;  // 🚫 Feature-specific prop
isManageInventory?: boolean; // 🚫 Feature-specific prop
showOrderHistory?: boolean;  // 🚫 Feature-specific prop
}

const BadNavbar: React.FC<BadNavbarProps> = ({ 
title, 
isEditPromocode, 
isManageInventory, 
showOrderHistory 
}) => {
return (
<nav className="flex items-center justify-between p-4 bg-gray-800">
    <h1 className="text-white text-xl">{title}</h1>
    <div className="flex gap-4">
    {isEditPromocode && (
        <button className="text-white">Edit Promocode</button>
    )}
    {isManageInventory && (
        <button className="text-white">Manage Inventory</button>
    )}
    {showOrderHistory && (
        <button className="text-white">Order History</button>
    )}
    </div>
</nav>
);
};

// Good Pattern Example - Using composition and generic props
interface NavbarProps {
title: string;
actions?: React.ReactNode; // ✅ Generic prop that accepts any content
}

const Navbar: React.FC<NavbarProps> = ({ title, actions }) => {
return (
<nav className="flex items-center justify-between p-4 bg-gray-800">
    <h1 className="text-white text-xl">{title}</h1>
    {actions && <div className="flex gap-4">{actions}</div>}
</nav>
);
};

// Feature-specific components using composition
const PromocodePage: React.FC = () => {
const navbarActions = (
<>
    <button className="text-white">Edit Promocode</button>
    <button className="text-white">View History</button>
</>
);

return (
<div>
    <Navbar 
    title="Promocode Management"
    actions={navbarActions} // ✅ Passing content via composition
    />
    {/* Rest of the page content */}
</div>
);
};

const InventoryPage: React.FC = () => {
const navbarActions = (
<>
    <button className="text-white">Add Item</button>
    <button className="text-white">Export Inventory</button>
</>
);

return (
<div>
    <Navbar 
    title="Inventory Management"
    actions={navbarActions} // ✅ Different actions for different features
    />
    {/* Rest of the page content */}
</div>
);
};

export { Navbar, PromocodePage, InventoryPage };
```

## Prefer to use shared utils and components first

Before creating or building your UI, check first for existing implementation, most likely it’s already implemented. This will make our code DRY.

## SHOULD have styling for different UI interactions
Implement Focus, Disabled, Hover, Error styles on Interactive elements (e.g. `<input/>`, `<button/>`, `<link/>`). Design system usually provide the UI already.

Let’s say for `<Button/>` components variants we should have all the state

```tsx
// Variant styles including hover, focus, and disabled states
const variantStyles = {
    primary: clsx(
    'bg-blue-600 text-white',
    'hover:bg-blue-700',
    'focus-visible:ring-blue-500',
    'disabled:bg-blue-300',
    'active:bg-blue-800'
    ),
    secondary: clsx(
    'bg-gray-100 text-gray-700 border border-gray-300',
    'hover:bg-gray-200 hover:text-gray-900',
    'focus-visible:ring-gray-500',
    'disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200',
    'active:bg-gray-300'
    ),
    danger: clsx(
    'bg-red-600 text-white',
    'hover:bg-red-700',
    'focus-visible:ring-red-500',
    'disabled:bg-red-300',
    'active:bg-red-800'
    ),
    ghost: clsx(
    'bg-transparent text-gray-700',
    'hover:bg-gray-100',
    'focus-visible:ring-gray-500',
    'disabled:text-gray-300 disabled:bg-transparent disabled:hover:bg-transparent',
    'active:bg-gray-200'
    )
};
```

## Handle possible states for a UI
### Loading
#### Spinners/Loading Indicators
- Circular spinners (most common)
- Linear progress bars at the top of pages/components
- Skeleton loading animations that mimic the content layout
- Pulsing/shimmer effects over placeholder content
- Custom animated icons or branded loaders

#### Component-Level Loading States
- Disabled buttons with spinner inside
- Opacity changes on the loading content area
- Blurred content with overlay
- Loading text replacement ("Save" → "Saving...")
- Progress indicators within forms or upload components

#### Full-Page Loading Indicators
- Splash screens for initial app load
- Overlay with centered spinner
- Dimmed background with modal-style loader
- Progress bars at the top of the browser (like YouTube)
- Transitional screens between major navigation changes

#### Content-Specific Approaches
- Table/List row shimmer effects
- Card placeholder layouts
- Image thumbnails with loading state
- Inline loading indicators (like chat messages sending)
- Progressive loading of images/media

#### Feedback Mechanisms
- Loading messages or tooltips
- Estimated time remaining
- Progress percentage
- Step indicators for multi-stage processes
- Status messages explaining the current operation

#### Error State Handling
- Retry buttons for failed operations
- Error messages with loading state reset options
- Fallback content display
- Partial content loading with error boundaries
- Offline indicators with recovery options

#### Smart Loading Patterns
- Optimistic UI updates (showing expected state before confirmation)
- Stale-while-revalidate (showing old data while fetching new)
- Progressive enhancement (loading critical content first)
- Infinite scroll with load-more indicators
- Lazy loading with placeholder content
- Most of the time we also want to disable the UI to prevent spam, duplicate request, and uninteded actions
- Success indicator

### Success

#### Toast Notifications
- A small, temporary message that appears on the screen (usually at the bottom or top).
- Example: *"Your changes have been saved successfully!"*

#### Alert Banners
- A noticeable banner at the top or within a section of the UI.
- Example: *"Profile updated successfully."*

#### Checkmarks and Success Icons
- Visual indicators like a **✔️ checkmark** or **✅ green tick** next to completed actions.
- Example: Showing a green checkmark next to a filled form field after validation.

#### Progress Indicators
- Showing progress completion (like a progress bar reaching 100% and turning green).
- Example: File upload completion with a success state.

#### Modals or Dialog Boxes
- Used for significant success messages (e.g., after completing a major task).
- Example: *"Congratulations! Your order has been placed successfully."*

#### Button States (Success Feedback on Click)
- Changing a button's label to indicate success (e.g., "Saved!" instead of "Save").
- Example: A disabled green button with a checkmark after submission.

#### Status Badges
- Small tags showing status updates (e.g., **"Completed"** in green).
- Example: A dashboard with **"Success"** status indicators.

#### Animations & Microinteractions
- Confetti ffects 🎉, subtle green glow, or success transitions to reinforce action completion.
- Example: A **subtle bounce effect** on a success icon.

#### Sound or Haptic Feedback *(For Mobile/Web Apps)*
- A success chime or vibration on mobile to indicate success.
- Example: A "ding" sound after a successful payment.

#### Celebration Screens *(For Major Milestones)*
- Full-screen success messages with illustrations (e.g., after account setup).
- Example: *"You're all set! Welcome aboard!"*
