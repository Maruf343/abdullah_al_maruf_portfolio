// Test file to preview email templates
// Run this to see how the email template looks

import { createContactEmailTemplate } from './emailTemplates';

// Example usage
const contactEmail = createContactEmailTemplate(
  "John Doe",
  "john@example.com",
  "Hi! I'm interested in working with you on a React project. Please let me know your availability."
);

// Save this to HTML files to preview in browser
console.log("Contact email template created successfully!");
console.log(contactEmail);