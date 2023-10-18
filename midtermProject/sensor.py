import time

import board

import adafruit_dht


import requests
import base64

import json
from datetime import datetime
#Initial the dht device, with data pin connected to:

dhtDevice = adafruit_dht.DHT11(board.D4)

def insert_str(string, insert, index):
   return string[:index] + insert + string[index:]
   
def upload_data(data_str):
   
   # Replace these with your GitHub repository information
   repo_owner = "philippkk"
   repo_name = "secoms319"
   file_path = "data.json"
   access_token = "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"
   # API URL for updating the file
   url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{file_path}"
   
   # Prepare the request headers
   headers = {
      "Authorization": f"token {access_token}",
   }
   
   # Get the current file content
   response = requests.get(url, headers=headers)
   data = response.json()
   
   # Encode the new content to base64
   new_content_base64 = base64.b64encode(data_str.encode()).decode()
   
   # Prepare the data for the update
   update_data = {
      "message": "Update file via Python",
      "content": new_content_base64,
      "sha": data["sha"],
   }
   
   # Make a PUT request to update the file
   response = requests.put(url, json=update_data, headers=headers)

   if response.status_code == 200:
      print("File updated successfully.")
   else:
      print("Failed to update the file. Status code:", response.status_code)

while True:

    try:

         # Print the values to the serial port

         temperature_c = dhtDevice.temperature

         temperature_f = temperature_c * (9 / 5) + 32

         humidity = dhtDevice.humidity
         timee = datetime.now()
         mydate = timee.strftime("%d/%m/%Y")
         mytime = timee.strftime("%H:%M:%S")
         
         file = open("data.json", 'r')
         pre = file.read()
         file.close()
         
         if(len(pre) < 5):
            pre = "{\"data\": [\n]}";
            data = insert_str(pre, "{\"temp_f\":"+str(temperature_f)+",\n \"temp_c\":"+str(temperature_c)+",\n \"humid\":"+str(humidity)+",\n \"time\":\""+str(mytime)+"\",\n \"date\":\""+str(mydate)+"\"}\n", 11)
         else:
            data = insert_str(pre, "{\"temp_f\":"+str(temperature_f)+",\n \"temp_c\":"+str(temperature_c)+",\n \"humid\":"+str(humidity)+",\n \"time\":\""+str(mytime)+"\",\n \"date\":\""+str(mydate)+"\"},\n", 11)


         
         file = open("data.json", 'w')
         file.write(data)
         file.close()
         
         file = open("data.json", 'r')
         upload_data(file.read())
         file.close()

         print("Temp: {:.1f} F / {:.1f} C    Humidity: {}% "

               .format(temperature_f, temperature_c, humidity))
    except RuntimeError as error:     # Errors happen fairly often, DHT's are hard to read, just keep going

         print(error.args[0])

    time.sleep(600.0)