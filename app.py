from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
import datetime

# =========================
# APP CONFIG
# =========================

app = Flask(__name__)
CORS(app)

# =========================
# OPENAI API
# =========================

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# =========================
# SOLTAI DETAILS
# =========================

company_name = "SOLTAI AI"

company_info = """
SOLTAI AI is an advanced AI automation company.
We provide AI chatbots, websites,
business automation and smart solutions.
"""

# =========================
# HOMEPAGE
# =========================

@app.route("/")
def home():
    return render_template("index.html")

# =========================
# CHAT API
# =========================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.json

        msg = data.get("message")

        response = client.chat.completions.create(

            model="gpt-4o-mini",

            messages=[

                {
                    "role":"system",

                    "content":f"""

                    You are the AI assistant of
                    {company_name}.

                    Company Info:
                    {company_info}

                    Speak professionally.
                    Keep replies short and smart.
                    """

                },

                {
                    "role":"user",
                    "content":msg
                }

            ]

        )

        reply = (
            response
            .choices[0]
            .message.content
        )

        # SAVE LEADS

        with open("leads.txt", "a") as f:

            f.write(
                f"\n--- NEW CHAT ---\n"
            )

            f.write(
                f"Time: {datetime.datetime.now()}\n"
            )

            f.write(
                f"User: {msg}\n"
            )

            f.write(
                f"AI: {reply}\n"
            )

        return jsonify({
            "reply": reply
        })

    except Exception as e:

        return jsonify({
            "reply": str(e)
        })

# =========================
# LEADS DASHBOARD
# =========================

@app.route("/leads")
def leads():

    try:

        with open("leads.txt", "r") as f:

            data = f.read()

        return f"<pre>{data}</pre>"

    except:

        return "No leads yet"

# =========================
# RUN SERVER
# =========================

if __name__ == "__main__":

    app.run(host="0.0.0.0", port=8080, debug=True)
