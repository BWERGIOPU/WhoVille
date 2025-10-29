# WhoVille Christmas Lighting Co. - Backend Setup

## Overview
This backend handles Christmas lights quote requests and sends them via email using Nodemailer.

## Files Created
- `server.js` - Express server with all API endpoints
- `email-config.js` - Email configuration (Gmail)
- `package.json` - Node.js dependencies
- Form handler script added to `index.html`

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Settings
Edit `email-config.js` with your Gmail credentials:
- Use a Gmail account for sending emails
- Enable 2-factor authentication
- Generate an App Password (see instructions in the file)
- Update `senderEmail`, `senderPassword`, and `recipientEmail`

### 3. Deploy Backend to AWS

#### Option A: EC2 Instance
1. Launch an EC2 instance (Ubuntu recommended)
2. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. Upload your backend files to the server
4. Install dependencies: `npm install`
5. Install PM2 for process management:
   ```bash
   sudo npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```
6. Configure security group to allow inbound traffic on port 3000
7. Note your EC2 public IP address

#### Option B: AWS Elastic Beanstalk
1. Install AWS EB CLI
2. Initialize: `eb init`
3. Create environment: `eb create`
4. Deploy: `eb deploy`

### 4. Update Frontend for Production

In `index.html`, find the form submission script and replace:
```javascript
const response = await fetch('YOUR_AWS_SERVER_IP/christmas-lights-quote', {
```

With your actual AWS server URL:
```javascript
const response = await fetch('http://YOUR_EC2_IP:3000/christmas-lights-quote', {
```

Or if using a domain:
```javascript
const response = await fetch('https://api.yourdomain.com/christmas-lights-quote', {
```

### 5. Deploy Frontend to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy (Vercel will automatically detect and deploy)

**Important:** Make sure CORS is properly configured. The backend already includes CORS middleware to allow requests from any origin.

### 6. CORS Configuration (if needed)
If you want to restrict CORS to only your Vercel domain, update `server.js`:
```javascript
app.use(cors({
  origin: 'https://your-vercel-domain.vercel.app'
}));
```

## API Endpoints

### POST /christmas-lights-quote
Handles Christmas lights quote requests from the form.

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "559-123-4567",
  "address": "123 Main St, Fresno, CA",
  "appointmentDate": "12/2024",
  "services": "Rooflines, Trees, Walkways"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quote request received! We will contact you within 24 hours with your personalized quote."
}
```

## Testing Locally

1. Start the server:
   ```bash
   node server.js
   ```

2. Update the fetch URL in `index.html` to:
   ```javascript
   const response = await fetch('http://localhost:3000/christmas-lights-quote', {
   ```

3. Open `index.html` in a browser and test the form

## Environment Variables (Optional)
For production, consider using environment variables:
```bash
export EMAIL_SERVICE=gmail
export SENDER_EMAIL=your-email@gmail.com
export SENDER_PASSWORD=your-app-password
export RECIPIENT_EMAIL=recipient@gmail.com
export PORT=3000
```

Then update `email-config.js` and `server.js` to use `process.env` variables.

## Troubleshooting

### Email not sending
- Verify Gmail App Password is correct
- Check that 2FA is enabled on Gmail account
- Check server logs: `pm2 logs` (if using PM2)

### CORS errors
- Ensure CORS middleware is properly configured
- Check that the fetch URL includes the protocol (http:// or https://)

### Form not submitting
- Check browser console for errors
- Verify the AWS server IP/URL is correct
- Ensure port 3000 is open in AWS security group

## Security Notes
- Never commit `email-config.js` with real credentials to public repos
- Add `email-config.js` to `.gitignore`
- Use environment variables in production
- Consider using AWS SES instead of Gmail for production
- Enable HTTPS on your backend (use nginx as reverse proxy)

## Support
For issues, check server logs and browser console for error messages.
