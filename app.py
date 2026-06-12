from flask import Flask, render_template, request, jsonify
import anthropic
import os

app = Flask(__name__)
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

BUSINESS_PROMPTS = {
    "Clinic / Hospital": "You are a professional medical clinic assistant. Be empathetic and caring. Never diagnose or prescribe. For emergencies say: Please call 112 immediately.",
    "Restaurant / Cafe": "You are a friendly restaurant assistant. Be warm and enthusiastic about food.",
    "Retail Shop": "You are a helpful retail store assistant. Guide customers to make the right purchase.",
    "Real Estate": "You are a professional real estate assistant. Be trustworthy and helpful.",
    "Education / Coaching": "You are a knowledgeable education assistant. Be encouraging and motivating.",
    "E-commerce": "You are an efficient e-commerce support assistant. Be quick and precise.",
    "Salon / Spa": "You are a friendly salon assistant. Make clients feel pampered and welcome.",
    "Legal / Finance": "You are a professional assistant. Never give specific legal or financial advice. Always say: Please consult our experts for specific advice.",
    "Other": "You are a professional and helpful business assistant."
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/admin")
def admin():
    return render_template("admin.html")


@app.route("/conversations")
def conversations():
    return render_template("conversations.html")


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")
        business_type = data.get("business_type", "Other")
        bot_name = data.get("bot_name", "Assistant")
        business_name = data.get("business_name", "")
        phone = data.get("phone", "")
        email = data.get("email", "")
        address = data.get("address", "")
        timings = data.get("timings", "")
        days = data.get("days", "")
        services = data.get("services", "")
        pricing = data.get("pricing", "")
        team = data.get("team", "")
        instructions = data.get("instructions", "")
        faqs = data.get("faqs", "")

        base_prompt = BUSINESS_PROMPTS.get(business_type, BUSINESS_PROMPTS["Other"])

        system_prompt = f"""You are {bot_name}, an AI assistant for {business_name}.
Business Type: {business_type}

{base_prompt}

=== BUSINESS INFORMATION ===
Business Name: {business_name}
"""
        if phone:
            system_prompt += f"Phone: {phone}\n"
        if email:
            system_prompt += f"Email: {email}\n"
        if address:
            system_prompt += f"Address: {address}\n"
        if timings:
            system_prompt += f"Timings: {timings}\n"
        if days:
            system_prompt += f"Working Days: {days}\n"
        if services:
            system_prompt += f"\n=== SERVICES / MENU / PRODUCTS ===\n{services}\n"
        if pricing:
            system_prompt += f"\n=== PRICING / FEES ===\n{pricing}\n"
        if team:
            system_prompt += f"\n=== TEAM / DOCTORS / STAFF ===\n{team}\n"
        if faqs:
            system_prompt += f"\n=== FREQUENTLY ASKED QUESTIONS ===\n{faqs}\n"
        if instructions:
            system_prompt += f"\n=== SPECIAL INSTRUCTIONS ===\n{instructions}\n"

        system_prompt += """
=== RULES ===
1. Reply in same language as customer — Hindi, English, or Hinglish
2. Keep responses under 100 words unless detailed explanation needed
3. Be professional yet friendly
4. Never make up information not provided above
5. If you don't know something say: Please contact us directly for this information
6. Never use markdown formatting like **bold** or *asterisks* — plain text only"""

        response = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=1024,
            system=system_prompt,
            messages=[{"role": "user", "content": user_message}]
        )

        return jsonify({"reply": response.content[0].text})

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"reply": "I am having trouble right now. Please try again."}), 500


@app.route("/chat/soltai", methods=["POST"])
def chat_soltai():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        response = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=1024,
            system="""You are SOLTAI Assistant — official AI for SOLTAI company.

SOLTAI provides two services:

1. AI Chatbot Service — Automated 24/7 chatbot for any business website
   - Starter: Rs 4,999/month (1 site, 500 conversations)
   - Growth: Rs 9,999/month (3 sites, 2000 conversations, WhatsApp)
   - Pro: Rs 19,999/month (unlimited everything, Agent Connect included)
   - Setup in under 24 hours
   - Works on WordPress, Wix, Shopify, custom HTML — any website

2. Agent Connect — Real human agents for complex business queries
   - High-level business requirements handled personally
   - Auto ticket if agent does not respond
   - Real-time conversation dashboard

Contact Details:
- Phone / WhatsApp: +91-8750905404
- Email: vasudogra22@gmail.com

Rules:
1. Reply in same language as user — Hindi, English, or Hinglish
2. Be professional, friendly, concise — under 80 words
3. Never use markdown like **bold** or *asterisks* — plain text only
4. When someone wants to buy or contact — always share contact details above""",
            messages=[{"role": "user", "content": user_message}]
        )

        return jsonify({"reply": response.content[0].text})

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"reply": "Something went wrong. Please try again."}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
