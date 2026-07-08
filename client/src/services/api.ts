import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://trainee.fidelis.workers.dev/api',
  headers: {
    // ✔️ Cole aqui o seu token pessoal!
    // Acesse trainee.fidelis.workers.dev/inicio para pegar o seu.
    'Authorization': 'Bearer d55d3a63-c330-4fe5-acc9-dad7470dc236',
    'Content-Type': 'application/json',
  },
});