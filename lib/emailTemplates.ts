// lib/emailTemplates.ts

export function createContactEmailTemplate(name: string, email: string, message: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Contact Form Message</title>
<style>
  /* Base styles */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f4f6f8;
    color: #333;
  }

  a { text-decoration: none; }

  /* Container */
  .container {
    max-width: 600px;
    margin: 20px auto;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }

  /* Header */
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px 20px;
    text-align: center;
  }
  .header h1 {
    font-size: 24px;
    margin: 0;
  }
  .header p {
    margin: 8px 0 0;
    font-size: 16px;
    opacity: 0.85;
  }

  /* Content */
  .content {
    padding: 32px 24px;
  }
  .field {
    margin-bottom: 24px;
  }
  .field-label {
    display: block;
    font-weight: 600;
    font-size: 14px;
    color: #555;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .field-value {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
    font-size: 16px;
    color: #111827;
    line-height: 1.5;
  }
  .field-value a { color: #667eea; }
  .message-field .field-value { min-height: 120px; white-space: pre-wrap; }

  /* Footer */
  .footer {
    background: #f9fafb;
    padding: 24px;
    border-top: 1px solid #e5e7eb;
    text-align: center;
    font-size: 14px;
    color: #6b7280;
  }
  .footer .highlight {
    font-weight: 600;
    color: #667eea;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .content { padding: 24px 16px; }
    .header { padding: 24px 16px; }
    .field-value { font-size: 15px; padding: 14px; }
  }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>📬 New Contact Message</h1>
    <p>You have received a new message from your portfolio website</p>
  </div>
  <div class="content">
    <div class="field">
      <span class="field-label">👤 Name</span>
      <div class="field-value">${name}</div>
    </div>
    <div class="field">
      <span class="field-label">📧 Email</span>
      <div class="field-value">
        <a href="mailto:${email}">${email}</a>
      </div>
    </div>
    <div class="field message-field">
      <span class="field-label">💬 Message</span>
      <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
    </div>
  </div>
  <div class="footer">
    This message was sent from your portfolio contact form.<br>
    <span class="highlight">Mohammad Abdullah Al Maruf</span> - Full-Stack Developer
  </div>
</div>
</body>
</html>
`;
}