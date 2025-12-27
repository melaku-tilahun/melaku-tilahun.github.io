# AI Chatbot - Deployment Instructions

## Step 1: Deploy to Vercel

1. **Create Vercel Account** (if you don't have one)

   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Your Repository**

   - Click "Add New Project"
   - Import `melaku-tilahun/melaku-tilahun.github.io`
   - Vercel will auto-detect the configuration

3. **Add Environment Variable**

   - In project settings, go to "Environment Variables"
   - Add: `GEMINI_API_KEY` = `your-api-key-here`
   - Save

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your Vercel URL (e.g., `https://melaku-tilahun.vercel.app`)

## Step 2: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key
4. Add it to Vercel environment variables (see Step 1.3)

## Step 3: Update Chatbot Configuration

1. Open `js/chatbot.js`
2. Find line 8:
   ```javascript
   this.apiEndpoint = "https://YOUR_VERCEL_URL.vercel.app/api/chat";
   ```
3. Replace with your actual Vercel URL:
   ```javascript
   this.apiEndpoint = "https://melaku-tilahun.vercel.app/api/chat";
   ```
4. Save and commit

## Step 4: Test

1. Visit your portfolio: `https://melaku-tilahun.github.io`
2. Click the chat button (bottom-right)
3. Try asking: "What are your main skills?"
4. Verify you get a response

## Step 5: Install Dependencies (for Vercel)

Vercel will automatically install dependencies from `package.json`, but if you're testing locally:

```bash
cd c:\Projects\melaku-tilahun
npm install
```

## Troubleshooting

**Issue: API returns 404**

- Make sure Vercel deployment is complete
- Verify the endpoint URL in `chatbot.js`

**Issue: API returns 500**

- Check Vercel logs for errors
- Verify `GEMINI_API_KEY` is set correctly

**Issue: CORS errors**

- Ensure `Access-Control-Allow-Origin` in `api/chat.js` matches your domain
- Use exact domain: `https://melaku-tilahun.github.io`

**Issue: Chat button not appearing**

- Check browser console for JavaScript errors
- Verify `chatbot.css` and `chatbot.js` are loaded
- Clear browser cache

## Security Notes

- Never commit your API key to the repository
- Vercel environment variables are secure
- API key is only used server-side
- Consider adding rate limiting if you get high traffic

## Next Steps (Optional)

- Monitor usage in Google Cloud Console
- Set up billing alerts
- Add analytics to track chatbot usage
- Customize responses based on user feedback
