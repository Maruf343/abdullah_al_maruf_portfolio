// Test file to preview email templates
// Run this to see how the email template looks

import { createContactEmailTemplate, createProjectInquiryTemplate } from './emailTemplates';

// Example usage
const contactEmail = createContactEmailTemplate(
  "John Doe",
  "john@example.com",
  "Hi! I'm interested in working with you on a React project. Please let me know your availability."
);

const projectEmail = createProjectInquiryTemplate(
  "Jane Smith",
  "jane@company.com",
  "Web Application",
  "We need a modern e-commerce platform built with Next.js and Stripe integration."
);

// Save these to HTML files to preview in browser
console.log("Contact email template created successfully!");
console.log("Project inquiry template created successfully!");