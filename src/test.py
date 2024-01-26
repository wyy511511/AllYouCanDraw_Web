
import requests
 
endpoint = "https://api.midjourneyapi.xyz/mj/v2/fetch"
 
data = {
    "task_id": "afec571d-df67-489c-8b59-7b07c86da4d0"
} 
 
response = requests.post(endpoint, json=data)
 
print(response.status_code)
print(response.json())