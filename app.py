from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os

app = Flask(__name__)

# OpenAI Client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# Home Page
@app.route("/")
def home():
    return render_template("index.html")

# Chat API
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        response = client.responses.create(
            model="gpt-5",
            input=[
                {
                    "role": "system",
                    "content": """
You are SOLTAI Assist.

SOLTAI is an AI solutions and services provider.

We help businesses with:
- AI Automation
- AI Agents
- Websites
- SaaS Development
- Business Automation
- Customer Support Systems

Always answer professionally, confidently and helpfully.
"""
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        )

        return jsonify({
            "reply": response.output_text
        })

    except Exception as e:
        print("ERROR:", str(e))

        return jsonify({
            "reply": f"Error: {str(e)}"
        }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
