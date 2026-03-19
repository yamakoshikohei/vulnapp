import requests

# 脆弱なハードコードされた API キー
API_KEY = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

def make_payment(amount, currency="usd"):
    url = "https://api.paymentgateway.com/v1/charges"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "amount": amount,
        "currency": currency,
        "source": "tok_visa",
        "description": "Test Payment"
    }
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()

if __name__ == "__main__":
    result = make_payment(5000)
    print(result)
