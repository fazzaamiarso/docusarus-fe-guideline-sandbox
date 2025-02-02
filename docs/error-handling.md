---
sidebar__position: 5
sidebar_label: Error Handling
title: Error Handling
---


## Form validation
render the error message as close as possible to the relevant field

```tsx
import { z } from 'zod';

// schema
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// component
const LoginForm: React.FC = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log('Form data submitted:', data);
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <label htmlFor="email">Email</label>
        <input
            id="email"
            type="email"
            {...register('email')}
        />
        {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
        <label htmlFor="password">Password</label>
        <input
            id="password"
            type="password"
            {...register('password')}
        />
        {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit">Login</button>
    </form>
    );
};
```

## **Async Executions**
- Wrap asynchronous code in a `try/catch` block to prevent crashes.
- Use `async/await` for better readability and error handling.
- Ensure proper cleanup (e.g., aborting API requests) in case of errors.

```tsx
// Toast notification utility
const showToast = (message) => {
    // Example: Use a library like react-toastify or custom implementation
    console.log(`Toast: ${message}`); // Replace with actual toast implementation
};

// Async function to read a file
const readFileAsync = async (filePath) => {
    const fs = require('fs').promises; // Using Node.js fs.promises for async file operations

    try {
    const data = await fs.readFile(filePath, 'utf-8'); // Read file asynchronously
    console.log('File content:', data);
    showToast('File read successfully!');
    return data;
    } catch (error) {
    console.error('File Read Error:', error); // Log error for debugging
    showToast('Failed to read the file. Please check the file path and try again.'); // User feedback
    throw error; // Re-throw the error if needed
    } finally {
    console.log('File read operation completed.'); // Cleanup or logging
    }
};

// Example usage
const processFile = async () => {
    const filePath = './example.txt'; // Replace with your file path
    try {
    const fileContent = await readFileAsync(filePath);
    console.log('Processing file content:', fileContent);
    } catch (error) {
    console.error('Error processing file:', error);
    }
};

// Run the example
processFile();
```

## **API Call Errors**
- Provide user feedback using **Toast notifications** or **alerts** for API errors.
- Use a **common error-handling function** to centralize error handling logic.
- Include an **error message formatter** to ensure consistent and user-friendly error messages.
- Log errors for debugging purposes on DEVELOPMENT or STAGING only

```tsx
// Common error-handling function
const handleApiError = (error) => {
    const formattedMessage = formatErrorMessage(error);
    showToast(formattedMessage); // Display toast notification
    console.error('API Error:', error); // Log error for debugging
};

// Error message formatter
const formatErrorMessage = (error) => {
    if (error.response) {
    // Server responded with a status code outside 2xx
    return `Error: ${error.response.data.message || 'Something went wrong'}`;
    } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
    } else {
    // Something else happened
    return 'An unexpected error occurred.';
    }
};

// Toast notification utility
const showToast = (message) => {
    // Example: Use a library like react-toastify or custom implementation
    console.log(`Toast: ${message}`); // Replace with actual toast implementation
};

// Example API call
const fetchData = async () => {
    try {
    const response = await axios.get('/api/data');
    return response.data;
    } catch (error) {
    handleApiError(error); // Handle error using common function
    }
};
```