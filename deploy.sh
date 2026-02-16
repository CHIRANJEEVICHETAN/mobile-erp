#!/bin/bash

echo "🚀 Deploying Mobile ERP to Vercel..."
echo ""

# Check if logged in to Vercel (using npx)
if ! npx vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel:"
    npx vercel login
fi

# Deploy to Vercel using npx (no global install needed)
echo "📦 Deploying to Vercel..."
npx vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your Mobile ERP app is now live on Vercel!"