// Email Configuration Example
// Copy this file to 'email-config.js' and update with your credentials
// DO NOT commit the actual email-config.js file to version control

module.exports = {
  emailService: 'gmail',
  senderEmail: 'your-email@gmail.com',     // Replace with your Gmail address
  senderPassword: 'your-app-password-here', // Replace with your Gmail app password (16 characters)
  recipientEmail: 'recipient@gmail.com'     // Email where quote requests will be sent
};

/* 
Instructions to get Gmail App Password:
1. Go to https://myaccount.google.com/
2. Select "Security" from the left menu
3. Under "Signing in to Google," select "2-Step Verification" (enable it if not already)
4. Scroll to bottom and select "App passwords"
5. Select app: "Mail"
6. Select device: "Other" and name it "WhoVille Backend"
7. Click "Generate"
8. Copy the 16-character password (no spaces) and paste it above
9. Click "Done"

Note: App passwords only work with 2-Step Verification enabled!
*/
