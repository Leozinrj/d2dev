# Relatório de Segurança — d2dev.com.br
**Data:** 03/04/2026 | **Analista:** GitHub Copilot (Security Review) | **Escopo:** Superfície pública HTTP

---

## Contexto

| Item | Detalhe |
|---|---|
| **Alvo** | https://d2dev.com.br |
| **Stack** | Next.js / React, TypeScript |
| **Infraestrutura** | Vercel (região gru1 — São Paulo) |
| **Tipo de análise** | Black-box passiva — headers HTTP, HTML público, políticas de segurança |
| **Autenticação testada** | Não (sem área logada visível) |

---

## Resumo Executivo

O site apresenta **postura de segurança acima da média** para um site institucional. HSTS, proteção contra clickjacking, MIME sniffing e Referrer Policy estão corretamente configurados. Foram identificados **2 achados acionáveis** (média severidade) e **2 informativos**. Nenhuma vulnerabilidade crítica ou exploitável diretamente foi encontrada na superfície pública analisada.

---

## Achados

### 🔴 [MÉDIA] #1 — CSP com `unsafe-inline` e `unsafe-eval`

**Causa raiz:** A diretiva `Content-Security-Policy` está configurada com tokens que anulam a proteção contra XSS.

**Evidência observada:**
```
Content-Security-Policy:
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
```

**Exploração possível:**
`unsafe-inline` permite execução de qualquer script inline no DOM. Se surgir um ponto de injeção de HTML (parâmetro de URL refletido, campo de formulário futuro, dependência comprometida), o atacante bypassa a CSP completamente. `unsafe-eval` expõe `eval()`, `Function()`, `setTimeout(string)` — primitivas clássicas de escalada de XSS.

**Impacto:** A CSP existe como header, mas não oferece defesa real contra XSS. Falsa sensação de segurança.

**Correção:** Migrar para CSP baseada em nonces (suportado nativamente pelo Next.js 13+ via middleware):

```js
// middleware.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function middleware(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' data: blob:;
    font-src 'self';
    connect-src 'self';
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim();

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  return response;
}
```

**Validação:**
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) — colar o novo header e confirmar ausência de warnings
- DevTools → Network → Response Headers → verificar ausência de `unsafe-inline`
- Tentar injetar `"><script>alert(1)</script>` em qualquer parâmetro e confirmar bloqueio no console

---

### 🟡 [MÉDIA] #2 — CORS Wildcard (`Access-Control-Allow-Origin: *`)

**Causa raiz:** O servidor retorna wildcard em todas as respostas, sem distinção de rota.

**Evidência observada:**
```
Access-Control-Allow-Origin: *
```

**Exploração possível:**
Qualquer origem maliciosa pode fazer `fetch('https://d2dev.com.br/api/...')` e ler a resposta. Risco atual é baixo (site sem área autenticada visível), mas **torna-se crítico** assim que rotas API com dados de usuários, tokens ou informações de clientes forem adicionadas.

**Impacto:** Cross-origin data leakage em APIs futuras. Difícil de corrigir retroativamente quando há múltiplos consumidores.

**Correção (`next.config.js`):**
```js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://d2dev.com.br',
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET, POST, OPTIONS',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Authorization',
        },
      ],
    },
  ];
},
```

**Validação:**
```bash
curl -H "Origin: https://evil.com" -I https://d2dev.com.br/api/qualquer-rota
# Esperado: sem Access-Control-Allow-Origin, ou valor != *
```

---

### 🔵 [BAIXA] #3 — Information Disclosure via Headers

**Evidência observada:**
```
Server: Vercel
X-Vercel-Id: gru1::59pgd-1775234737081-bc7220ce54bb
X-Nextjs-Prerender: 1
X-Nextjs-Stale-Time: 300
X-Matched-Path: /
```

**Impacto:** Expõe stack (Next.js), plataforma (Vercel) e região (São Paulo). Facilita reconhecimento direcionado e pesquisa de CVEs específicos. Risco isolado é baixo.

**Correção:** Headers `X-Vercel-*` e `Server: Vercel` são injetados pela plataforma e não são controláveis. **Ação recomendada:** aceitar como residual e monitorar CVEs do Next.js ativamente.

---

### ⚪ [INFORMACIONAL] #4 — Telefone exposto no HTML público

**Evidência:**
```html
<a href="https://wa.me/5519988686475">Chamar no WhatsApp</a>
```

Presumivelmente intencional como canal comercial. Registrado apenas para ciência de que é coletável por scrapers de forma automatizada.

---

## O que está corretamente configurado

| Header | Configuração | Avaliação |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Excelente |
| `X-Frame-Options` | `SAMEORIGIN` | Correto — previne clickjacking |
| `X-Content-Type-Options` | `nosniff` | Correto — previne MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Adequado |
| `Permissions-Policy` | camera, mic, geolocation bloqueados | Correto |
| HTTPS | Ativo com redirect | Correto |
| `frame-ancestors: none` (CSP) | Presente | Correto |

---

## Plano de Ação Priorizado

| Prioridade | Achado | Esforço | Quando |
|---|---|---|---|
| 🔴 Alta | Migrar CSP para nonce-based | Médio (~2h) | Imediato |
| 🟡 Média | Restringir CORS para rotas `/api/*` | Baixo (~30min) | Antes de adicionar qualquer API autenticada |
| ⚪ Aceitar | Headers Vercel/Next.js de fingerprinting | Não controlável | Monitorar CVEs |

---

## Limitações desta análise

> Esta análise cobriu **apenas a superfície HTTP pública passiva**. Não foram testados:
> - Rotas de API (se existirem)
> - Autenticação / sessão / JWT
> - Upload de arquivos
> - Injeção em formulários (o formulário de contato não foi submetido)
> - Dependências npm (supply chain)
> - Configurações internas do Vercel (variáveis de ambiente, OIDC, etc.)
>
> Para cobertura completa, uma análise ativa com acesso ao código-fonte e revisão de dependências é recomendada.