require('dotenv').config();
const express = require('express')
const https = require('https')
const app = express()
const port = 3000


app.get('/', (req, res) => {
	https.get(process.env.URL, (resp) => {
	let response = `<html><head><title>Desafio</title></head><body>`

    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      let json = (JSON.parse(data));
			
			json.forEach((item, i) => {
				if ( i <= 100 ){
					response += `<h3>${item.albumId} / ${item.id} - ${item.title}</h3><img src='${item.url}'><br />`
				}
			})
			response += `</body>`
			console.log(response, "response")
			res.send(response)
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
	
})

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`)
})