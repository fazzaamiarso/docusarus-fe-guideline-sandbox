---
sidebar_position: 3
sidebar_label: Workflow
title: Workflow
---

Some of the rules that we need to follow and how we do our day-to-day tasks

## Git
    ### ALWAYS Perform work in a feature branch.
        
        This is to avoid polluting the `main` branch
        
    ### Branch out from `develop`
        
        This ensures `master` branch is always clean an have no problem when merging
        
    ### NEVER push into  `develop` or `main` branch. Make a Pull Request
        - All changes must go through code review from either Peer or Senior.
    ### Delete local and remote feature branches after merging.
        
        This way it prevents cluttering your local branch and confusing us with DEAD branch
        
    ### ALWAYS follow commit convention for Git commit message
        
        We follow **Conventional Commits. Reference:** https://www.conventionalcommits.org/en/v1.0.0/
        
        > This convention should already be enforced on your project’s commit hooks, so don’t be surprised if your commit could fail.
        
## Pull Request
    - If you just want to get high-level feedback on your approach and don't want to actually merge your PR yet, you can submit a "Request For Comment" PR, otherwise known as an RFC.
    - **[NOT SURE]** Attach test plan when submitting PR for review, can be screenshots or videos. or on our flow since mosy likelyhave ticket related to it, can link the ticket instead indicating that the test plan is there. [Further Reading](https://www.jointaro.com/lesson/HXo9fS3ZwvYY1dCiTJEd/what-a-test-plan-is-and-why-every-code-review-needs-one/)
    - Breaking up your PRs. Every commit and PR you put out should have a singular focus. Don't just dump your entire feature into 1 massive 2,500 line PR; it's extremely difficult to review and you are robbing yourself of real technical feedback.

## Documentation
    ### Comment your code for complex logic, business requirements, TODO.
        
        ```tsx
        /**
           * Calculates multi-year contract discounts.
           * 
           * Contract Length Discounts:
           * - 24 months (2 years): 5% additional discount
           * - 36 months (3 years): 10% additional discount
           * - Custom lengths may have special negotiated rates
           * 
           * @param months - Length of contract in months
           * @returns Additional discount percentage as a decimal
           */
          private calculateContractDiscount(months: number): number {
            if (months >= 36) return 0.10;  // 10% for 3+ years
            if (months >= 24) return 0.05;  // 5% for 2+ years
            return 0;  // No contract length discount
          }
        ```
        
        ```tsx
        /**
         * Custom error class for pricing-related errors.
         * Used to distinguish pricing errors from other runtime errors.
         */
        class PricingError extends Error {
          constructor(
            public code: string,
            message: string,
            public details?: Record<string, unknown>
          ) {
            super(message);
            this.name = 'PricingError';
          }
        }
        ```
        
    ### Document Assumptions and Preconditions in Your Code with comment.
        
        document assumptions and preconditions to ensure that your code is used correctly and efficiently. This helps other developers understand the context and limitations of your code.
        
        Additionally, append your name at the end of yuor assumptions
        
        Example
        
        > It seems like this component will re-render too much time everytime the “onSelectItem” called, which shouldn’t because supposingly “onSelectItem“ is stable accroding to the library.
        > 
    ### When commenting, **Explain the 'Why', Not Just the 'What'**
        - Provide context and reasoning behind the code
        - Explain the intent and purpose of the code
        - Help other developers understand the code's intent and make informed decisions
        
        > For example, instead of commenting a code block with "This function reverses a string," you could explain the reasoning behind it, such as "This function reverses a string to ensure compatibility with a specific API requirement.”
        > 
    ### Cite reference to solutions that have long discussions
    If you use solution that have open or long running discussion on Github or Stackoverflow, include the link your comment
    
    Example:
        ```jsx
        // must use this work around for time being
        // discussion: https://github.com/some-link
        function stripeHandlerHacks() {}
        ```

## Development
### Test User Convention 
When creating accounts for testing, always append your name with `DT_` , `dt_` , `dt.dev@widatech.com`

### Understanding Requirements
Before coding, make sure to understand the requirements clearly from **PRD,** where possible clarify with design team or PM if you have any doubts or suggestion.

    - analyze and gather requirements of the UI first. Check for its viability, is it already matched the requirements in PRD, how does it flow, what are the states, what should happen if we do a certain action.
    - A great mental model is to think that as If you are a user trying to use the feature for the first time. By doing this, you will see is it make sense, can I find action easily, what do I expect to happen after I interact with something.

### (Conditional) For Web, Generally follow **Mobile First Approach**
    
    For customer facing app, Mobile First Approach is crucial to ensure that user’s experience is smooth on mobile. As most users access Websites from their smarthphones.
    
    Also, It’s easier to start minimally and add things rather than starting from Desktop then removing things. So implement it first in the mobile viewport and make sure it looks good, then gradually increase the viewport size and see if anything breaks then start to apply styling from that breakpoint.
    
    > IMPORTANT: It also depends on the interfaces that we’re building, if it’s primarily used for desktop like Admin, POS then we don’t really need to support Mobile since it will be wasted effort.
    > 
### Be mindful when following the sizing or spacing in the UI
    
    Especially sizing, assess first and see if the sizing makes sense. For example font size, sometimes the design will have it too big or too small on certain viewport.
    
    We understand that not all people have deep understanding on UI, but we can practice it slowly.
    
### Use things in Design System
Most likely, we have a design system that’s made by the design team such as the typography, colors, and components. We should translate this Design System into the project config when setting up the project.
    
    ![design system preview](/img/workflow/design-system-preview.png)