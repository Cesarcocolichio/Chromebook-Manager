// js/api.js
const BASE_URL = "https://script.google.com/macros/s/AKfycbwy2JvVfE1vZ_Tp2LAEfsSoOlgzgCCCKotsVTUOWY6CFPloFrgvt_mpQ8VVQoeqN0QF/exec";

// Função utilitária para facilitar as chamadas fetch
async function chamarAPI(params) {
    const url = `${BASE_URL}?${params}`;
    try {
        const response = await fetch(url);
        if (params.includes("listar")) {
            return await response.json();
        }
        return await response.text();
    } catch (error) {
        console.error("Erro na chamada da API:", error);
        return "Erro de conexão";
    }
}