const sendQuestions = document.getElementById("sendQuestions");
const resultsIA = document.getElementById("resultsIA");

const OPENAI_API_KEY = "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";

function EnviarPergunta() {
	var valorPergunta = sendQuestions.value;

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", 
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: valorPergunta,
      max_tokens: 2048, // tamanho da resposta
      temperature: 1, // criatividade na resposta
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (resultsIA.value) resultsIA.value += "\n";

      if(json.error?.message){
        resultsIA.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";

        resultsIA.value += "Chat GPT: " + text;
      }

      resultsIA.scrollTop = resultsIA.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      sendQuestions.value = "";
      sendQuestions.disabled = false;
      sendQuestions.focus();
    });

	if (resultsIA.value) resultsIA.value += "\n\n\n";

	resultsIA.value += `Eu: ${valorPergunta} \n`;
	sendQuestions.value = "Aguardando a resposta da IA";
	sendQuestions.disabled = true;

  resultsIA.scrollTop = resultsIA.scrollHeight;
}

document.getElementById("EnviarPergunta").addEventListener("click", EnviarPergunta)
