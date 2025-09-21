# 🌾 CropMind: AI-Powered Crop Health & Market Support Agent
## Hackathon: Technovation’25 Hackathon, organized by Programming Hero and Josephite IT Club.

## 📌 Introduction
Farmers in Bangladesh face two critical challenges:

1. **Crop Disease Diagnosis** – Lack of access to specialists leads to late or missed detection of crop diseases.  
2. **Market Price Transparency** – Farmers often lack real-time access to agricultural market prices.  

These challenges result in **lower yields, unnecessary losses, and reduced income** for smallholder farmers.

---

## ❗ Problem Statement
- Farmers struggle to identify crop diseases early and apply effective treatments.  
- Even with healthy crops, farmers lose income because they lack **timely, localized market price information**.  
- Current digital tools are fragmented, **not localized for Bangladesh**, or unaffordable for smallholder farmers.  

---

## 💡 Proposed Solution: **CropMind**
CropMind is an **agentic Retrieval-Augmented Generation (RAG) application** that empowers farmers with AI.

### Core Functions
- 📷 **Image-based Disease Diagnosis**: Farmers upload or capture a photo of their crop. AI analyzes the image to detect diseases and suggests localized treatment methods (organic + chemical).  
- 💰 **Market Price Retrieval**: If no disease is detected, the system retrieves real-time **local crop prices in Bangladesh** and suggests nearby markets for better profitability.  
- 🌐 **Localized, Farmer-Friendly Support**: Bilingual interface (**Bangla & English**) with **voice input/output** to support non-literate farmers.  

---

## 🚀 Key Features
- AI-powered **crop disease analysis** from images.  
- **Step-by-step guidance** for treatment & prevention.  
- **Market price checker** with Bangladesh-specific data sources.  
- **Push notifications** for regional outbreaks.  
- **Offline-first design** for areas with poor connectivity.  
- Optional **community support** from experts & other farmers.  

---

## 🎯 Impact
- ✅ Reduce crop losses through **early disease detection**.  
- ✅ Improve incomes via **transparent price awareness**.  
- ✅ Bridge the **digital accessibility gap** for smallholder farmers.  

---

## 🏆 Hackathon MVP Scope
- Crop disease detection using **computer vision + language models**.  
- RAG pipeline mapping disease to treatment solutions.  
- Market price integration with **Bangladesh-specific data sources/APIs**.  
- Simple **/web interface**

---

## 🛣️ Future Roadmap
- 🌦️ **Predictive disease alerts** based on weather & regional data.  
- 🛒 Direct **farmer-to-marketplace integration**.  
- 🤖 **Personalized crop advisory** (fertilizer, irrigation, scheduling).  

---

## ⚙️ Tech Stack (Tentative)
**Frontend:**  
- Nextjs for web

**Backend:**  
- FastAPI  
- LangChain, LangGraph  

**AI/ML:**  
- Plant disease detection model (**CNN / Vision Transformer**, transfer learning)  
- **LLM + RAG** for mapping diseases to solutions  

**Data Sources:**  
- Bangladesh government agricultural price portals/APIs  
- Shawpno, chaldal, menbazar website 
- Curated agricultural disease datasets  

---

## 👥 End Users
- Smallholder **farmers in Bangladesh**  
- **Agricultural extension workers**  
- Local **cooperatives and NGOs** working in rural areas  

---




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
