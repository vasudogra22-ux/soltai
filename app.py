from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os

app = Flask(__name__)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()
    user_message = data.get("message")

    response = client.chat.completions.create(
        model="gpt-5",
        messages=[
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

Always answer professionally and confidently.
"""
            },
            {
                "role": "user",
                "content": user_message
            }
        ]
    )

    return jsonify({
        "reply": response.choices[0].message.content
    })

if __name__ == "__main__":
    app.run(debug=True)
