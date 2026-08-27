/** Core Académico - Gemini Secure Proxy (Cloudflare Worker)
 * Set GEMINI_API_KEY as a Worker secret. Never commit the key.
 */
const ALLOWED_ORIGINS = [
  'http://localhost',
  'https://your-github-user.github.io'
];

function cors(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'Content-Type, X-Core-App',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: cors(origin) });
    if (request.headers.get('X-Core-App') !== 'core-academico') {
      return new Response(JSON.stringify({error:'Cliente no autorizado.'}), {status:403, headers:{'Content-Type':'application/json', ...cors(origin)}});
    }
    if (!env.GEMINI_API_KEY) return new Response(JSON.stringify({error:'GEMINI_API_KEY no está configurada en el servidor.'}), {status:500, headers:{'Content-Type':'application/json', ...cors(origin)}});

    let body;
    try { body = await request.json(); } catch {
      return new Response(JSON.stringify({error:'JSON inválido.'}), {status:400, headers:{'Content-Type':'application/json', ...cors(origin)}});
    }
    const model = body.model || 'gemini-3.7-flash';
    const parts = [];
    if (body.prompt) parts.push({text:String(body.prompt)});
    for (const img of (Array.isArray(body.images) ? body.images : [])) {
      if (!img?.dataUrl) continue;
      const m = String(img.dataUrl).match(/^data:([^;]+);base64,(.*)$/s);
      if (m) parts.push({inlineData:{mimeType:m[1], data:m[2]}});
    }
    if (!parts.length) return new Response(JSON.stringify({error:'No se recibió texto ni imagen.'}), {status:400, headers:{'Content-Type':'application/json', ...cors(origin)}});

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const upstream = await fetch(url, {
      method:'POST',
      headers:{'Content-Type':'application/json', 'x-goog-api-key':env.GEMINI_API_KEY},
      body:JSON.stringify({
        systemInstruction:{parts:[{text:'Eres el tutor de Core Académico. Responde en español. En matemáticas resuelve paso a paso, verifica el resultado y sigue exactamente el método indicado o mostrado en las imágenes. No inventes datos.'}]},
        contents:[{role:'user',parts}]
      })
    });
    const text = await upstream.text();
    return new Response(text, {status:upstream.status, headers:{'Content-Type':'application/json', ...cors(origin), 'Cache-Control':'no-store'}});
  }
};
