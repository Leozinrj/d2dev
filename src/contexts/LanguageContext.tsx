"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "pt" | "en";

const translations = {
  pt: {
    navbar: {
      links: [
        { href: "#capacidades", label: "Capacidades" },
        { href: "#processo", label: "Processo" },
        { href: "#stack", label: "Stack" },
        { href: "#sobre", label: "Sobre" },
      ],
      cta: "Falar com a equipe",
      ariaOpen: "Abrir menu",
      ariaClose: "Fechar menu",
    },
    hero: {
      badge: "Disponível para novos projetos",
      h1: ["Engenharia de", "software"],
      h1Accent: "real.",
      subtitle:
        "Construímos sistemas, aplicações web e automações com arquitetura sólida e critério técnico. Blockchain quando resolve problemas reais — não por tendência.",
      ctaPrimary: "Falar com a equipe",
      ctaSecondary: "Ver capacidades",
      metrics: [
        { value: "Full-stack", label: "UI ao protocolo" },
        { value: "0×", label: "Over-engineering" },
        { value: "100%", label: "Foco em resultado" },
      ],
    },
    valueProp: {
      eyebrow: "Por que a D2",
      title: "Como pensamos antes de construir",
      subtitle: "Cada decisão tem uma razão. Cada linha de código, um propósito.",
      items: [
        {
          title: "Orientados a produto",
          description:
            "Pensamos no problema antes de escrever código. Arquitetamos soluções que fazem sentido para o negócio, não apenas tecnicamente.",
        },
        {
          title: "Tecnologia com critério",
          description:
            "Usamos a ferramenta certa para cada problema. Sem modismos, sem over-engineering. A decisão técnica serve ao resultado.",
        },
        {
          title: "Arquitetura preparada",
          description:
            "Estruturamos sistemas pensando em escala, manutenção e evolução. O que construímos hoje não vira dívida técnica amanhã.",
        },
        {
          title: "Integração e automação",
          description:
            "Conectamos sistemas, automatizamos fluxos e eliminamos fricção operacional. Código que trabalha enquanto você foca no que importa.",
        },
      ],
    },
    capabilities: {
      eyebrow: "O que construímos",
      title: "Capacidades completas",
      subtitle:
        "Da interface ao protocolo — cobrimos toda a stack com a mesma exigência técnica.",
      items: [
        {
          tag: "Front-end",
          title: "Aplicações Web",
          description:
            "Interfaces modernas, performáticas e acessíveis com React e Next.js. Arquitetura orientada a componentes, SEO técnico e experiência de usuário de alto nível.",
          highlights: [
            "React & Next.js com TypeScript",
            "SEO técnico e Core Web Vitals",
            "Design system e acessibilidade",
            "Dashboards e painéis de gestão",
          ],
        },
        {
          tag: "Back-end",
          title: "APIs & Sistemas",
          description:
            "Serviços robustos, APIs bem projetadas e arquiteturas que sustentam volume real. REST, GraphQL, filas, eventos — com segurança e observabilidade.",
          highlights: [
            "APIs REST & GraphQL",
            "Microsserviços e filas de mensagem",
            "Segurança e autenticação",
            "Observabilidade e monitoramento",
          ],
        },
        {
          tag: "Automação",
          title: "Automações e Pipelines",
          description:
            "Fluxos automatizados, integrações entre sistemas e pipelines que eliminam trabalho manual e protegem a operação de erros humanos.",
          highlights: [
            "CI/CD e deploy contínuo",
            "RPA e automação de processos",
            "Pipelines de dados",
            "Alertas e recuperação automática",
          ],
        },
        {
          tag: "Integrações",
          title: "Delivery & Alimentação",
          description:
            "Site, cardápio digital e sistema de gestão integrados com iFood, Rappi e Anota AI. Do pedido online ao painel do operador — tudo sincronizado e automatizado.",
          highlights: [
            "Site e cardápio digital próprio",
            "Integração com iFood, Rappi, Anota AI",
            "PDV e gestão de pedidos",
            "Painel operacional em tempo real",
          ],
        },
        {
          tag: "Arquitetura",
          title: "Design de Sistemas",
          description:
            "Modelagem de sistemas distribuídos, decisões de arquitetura fundamentadas e revisão técnica. Pensamos estrutura antes de código.",
          highlights: [
            "Arquitetura de microsserviços",
            "Modelagem de domínio (DDD)",
            "Revisão técnica de código",
            "Planejamento de escala e custo",
          ],
        },
        {
          tag: "Web3",
          title: "Blockchain & Smart Contracts",
          description:
            "Smart contracts auditáveis, dApps e integrações on-chain com rigor de protocolo. Solidity, Foundry e padrões de segurança reais — sem hype.",
          highlights: [
            "Smart contracts em Solidity",
            "Auditorias com Foundry e Slither",
            "dApps e integrações on-chain",
            "Tokenização de ativos reais",
          ],
        },
        {
          tag: "Produto",
          title: "Soluções Sob Medida",
          description:
            "Do MVP ao produto maduro. Desenvolvemos qualquer sistema digital com visão de produto, critério técnico e foco em resultado de negócio.",
          highlights: [
            "MVP estruturado e escalável",
            "Roadmap técnico e priorização",
            "Times dedicados por projeto",
            "Evolução contínua pós-entrega",
          ],
        },
      ],
    },
    blockchain: {
      eyebrow: "Web3 com critério",
      title: ["Blockchain não é", "solução universal."],
      p1: "Usamos quando cria vantagem real — quando a descentralização, imutabilidade ou programabilidade resolve algo que arquiteturas tradicionais não resolvem bem.",
      p2: "Quando a tecnologia faz sentido para o problema, aplicamos com rigor técnico. Quando não faz, dizemos isso claramente.",
      badge: "Implementamos apenas o que podemos auditar e defender",
      useCases: [
        {
          title: "Rastreabilidade imutável",
          description:
            "Cadeias de suprimento, documentos e processos que precisam de histórico auditável e não adulterável.",
        },
        {
          title: "Tokenização de ativos",
          description:
            "Representação digital de ativos reais com liquidez, fracionamento e transferência programável.",
        },
        {
          title: "Automação via contratos",
          description:
            "Regras de negócio executadas on-chain, sem intermediários e com garantias criptográficas.",
        },
        {
          title: "Transparência auditável",
          description:
            "Dados públicos verificáveis por terceiros sem depender de confiança em uma entidade central.",
        },
      ],
    },
    process: {
      eyebrow: "Como trabalhamos",
      title: "Do problema ao produto",
      subtitle:
        "Tecnologia é escolhida com critério, não por hype. O processo reflete isso em cada etapa.",
      steps: [
        {
          number: "01",
          title: "Entendimento",
          description:
            "Mapeamos o problema, o contexto de negócio e as restrições reais. Antes do código, vem a clareza. Fazemos as perguntas que importam.",
        },
        {
          number: "02",
          title: "Arquitetura",
          description:
            "Definimos stack, componentes e estrutura com base no problema — não em preferência ou moda. Cada decisão tem uma razão documentada.",
        },
        {
          number: "03",
          title: "Desenvolvimento",
          description:
            "Entregamos em iterações com comunicação clara. Progresso visível, decisões técnicas compartilhadas e qualidade desde o primeiro commit.",
        },
        {
          number: "04",
          title: "Entrega e evolução",
          description:
            "Deploy, monitoramento e evolução contínua. O produto não termina no go-live — acompanhamos, medimos e melhoramos com base em resultados reais.",
        },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "Ferramentas que conhecemos de verdade",
      subtitle:
        "Não é uma lista de buzzwords. É o que usamos em sistemas em produção, com responsabilidade.",
      groups: [
        {
          label: "Front-end",
          description:
            "Interfaces modernas, responsivas e performáticas com React, Next.js e TypeScript.",
        },
        {
          label: "Back-end",
          description:
            "APIs robustas, bancos de dados e arquiteturas orientadas a serviços escaláveis.",
        },
        {
          label: "Cloud & DevOps",
          description:
            "Infraestrutura em cloud, CI/CD, containers e entrega contínua com segurança.",
        },
        {
          label: "Web3",
          description:
            "Smart contracts auditáveis, integrações on-chain e protocolos quando fazem sentido.",
        },
      ],
    },
    about: {
      eyebrow: "Quem somos",
      title: ["Uma equipe de especialistas,", "não uma fábrica de código."],
      p1: "Somos desenvolvedores e especialistas com experiência em sistemas que operam com volume, pressão e responsabilidade real. Não terceirizamos competência central — quem projeta é quem constrói.",
      p2: "Nossa abordagem combina visão de produto com rigor técnico. Entendemos o problema antes de sugerir qualquer solução e escolhemos a tecnologia em função do resultado — não por preferência ou tendência.",
      p3: "A camada web3 faz parte das nossas capacidades reais, não do nosso marketing. Conhecemos protocolos, segurança on-chain e as limitações dessa arquitetura — o que nos permite usá-la com critério.",
      principlesLabel: "Princípios que guiam o trabalho",
      principles: [
        "Arquitetura antes de código",
        "Comunicação clara em todo o processo",
        "Segurança como requisito, não como feature",
        "Qualidade desde o primeiro commit",
      ],
      stats: [
        { value: "Full-stack", label: "Da interface ao protocolo" },
        { value: "On-demand", label: "Equipe dedicada ao projeto" },
      ],
    },
    cta: {
      eyebrow: "Contato",
      title: ["Tem um projeto", "em mente?"],
      subtitle:
        "Conte o problema. Avaliamos a solução com honestidade técnica e respondemos com clareza — sem promessas vazias.",
      emailBtn: "Enviar e-mail",
      whatsappBtn: "Chamar no WhatsApp",
      trust: [
        "Resposta em até 24h",
        "Avaliação sem compromisso",
        "Proposta clara e objetiva",
      ],
      modal: {
        label: "E-mail",
        copy: "Copiar e-mail",
        copied: "Copiado!",
        close: "Fechar",
      },
    },
    footer: {
      tagline: "Engenharia de Software",
      rights: "Todos os direitos reservados.",
      links: [
        { href: "#capacidades", label: "Capacidades" },
        { href: "#processo", label: "Processo" },
        { href: "#stack", label: "Stack" },
        { href: "#sobre", label: "Sobre" },
        { href: "#contato", label: "Contato" },
      ],
    },
  },

  en: {
    navbar: {
      links: [
        { href: "#capacidades", label: "Capabilities" },
        { href: "#processo", label: "Process" },
        { href: "#stack", label: "Stack" },
        { href: "#sobre", label: "About" },
      ],
      cta: "Talk to the team",
      ariaOpen: "Open menu",
      ariaClose: "Close menu",
    },
    hero: {
      badge: "Available for new projects",
      h1: ["Real", "software"],
      h1Accent: "engineering.",
      subtitle:
        "We build systems, web applications, and automations with solid architecture and technical rigour. Blockchain when it solves real problems — not as a trend.",
      ctaPrimary: "Talk to the team",
      ctaSecondary: "View capabilities",
      metrics: [
        { value: "Full-stack", label: "UI to protocol" },
        { value: "0×", label: "Over-engineering" },
        { value: "100%", label: "Results-focused" },
      ],
    },
    valueProp: {
      eyebrow: "Why D2",
      title: "How we think before we build",
      subtitle: "Every decision has a reason. Every line of code, a purpose.",
      items: [
        {
          title: "Product-driven",
          description:
            "We understand the problem before writing code. We architect solutions that make business sense — not just technical sense.",
        },
        {
          title: "Technology with purpose",
          description:
            "We use the right tool for each problem. No fads, no over-engineering. The technical decision serves the outcome.",
        },
        {
          title: "Future-ready architecture",
          description:
            "We structure systems with scale, maintenance, and evolution in mind. What we build today does not become technical debt tomorrow.",
        },
        {
          title: "Integration and automation",
          description:
            "We connect systems, automate workflows, and eliminate operational friction. Code that works while you focus on what matters.",
        },
      ],
    },
    capabilities: {
      eyebrow: "What we build",
      title: "Full capabilities",
      subtitle:
        "From interface to protocol — we cover the entire stack with the same technical rigour.",
      items: [
        {
          tag: "Front-end",
          title: "Web Applications",
          description:
            "Modern, performant, and accessible interfaces using React and Next.js. Component-driven architecture, technical SEO, and top-tier user experience.",
          highlights: [
            "React & Next.js with TypeScript",
            "Technical SEO and Core Web Vitals",
            "Design system and accessibility",
            "Dashboards and management panels",
          ],
        },
        {
          tag: "Back-end",
          title: "APIs & Systems",
          description:
            "Robust services, well-designed APIs, and architectures that handle real volume. REST, GraphQL, queues, events — with security and observability.",
          highlights: [
            "REST & GraphQL APIs",
            "Microservices and message queues",
            "Security and authentication",
            "Observability and monitoring",
          ],
        },
        {
          tag: "Automation",
          title: "Automations and Pipelines",
          description:
            "Automated workflows, system integrations, and pipelines that eliminate manual work and protect operations from human error.",
          highlights: [
            "CI/CD and continuous deployment",
            "RPA and process automation",
            "Data pipelines",
            "Alerting and automatic recovery",
          ],
        },
        {
          tag: "Integrations",
          title: "Delivery & Food Tech",
          description:
            "Website, digital menu, and management system integrated with iFood, Rappi, and Anota AI. From online order to operator dashboard — all synchronised and automated.",
          highlights: [
            "Custom website and digital menu",
            "Integration with iFood, Rappi, Anota AI",
            "POS and order management",
            "Real-time operations dashboard",
          ],
        },
        {
          tag: "Architecture",
          title: "System Design",
          description:
            "Distributed system modelling, well-grounded architecture decisions, and technical review. We think structure before code.",
          highlights: [
            "Microservices architecture",
            "Domain modelling (DDD)",
            "Code technical review",
            "Scale and cost planning",
          ],
        },
        {
          tag: "Web3",
          title: "Blockchain & Smart Contracts",
          description:
            "Auditable smart contracts, dApps, and on-chain integrations with protocol-level rigour. Solidity, Foundry, and real security standards — no hype.",
          highlights: [
            "Smart contracts in Solidity",
            "Auditing with Foundry and Slither",
            "dApps and on-chain integrations",
            "Real-world asset tokenisation",
          ],
        },
        {
          tag: "Product",
          title: "Custom Solutions",
          description:
            "From MVP to mature product. We develop any digital system with product vision, technical criteria, and a focus on business outcomes.",
          highlights: [
            "Structured and scalable MVP",
            "Technical roadmap and prioritisation",
            "Dedicated teams per project",
            "Continuous post-delivery evolution",
          ],
        },
      ],
    },
    blockchain: {
      eyebrow: "Web3 with purpose",
      title: ["Blockchain is not a", "universal solution."],
      p1: "We use it when it creates real advantage — when decentralisation, immutability, or programmability solves something that traditional architectures don't handle well.",
      p2: "When the technology makes sense for the problem, we apply it with technical rigour. When it doesn't, we say so clearly.",
      badge: "We only implement what we can audit and defend",
      useCases: [
        {
          title: "Immutable traceability",
          description:
            "Supply chains, documents, and processes that require an auditable and tamper-proof history.",
        },
        {
          title: "Asset tokenisation",
          description:
            "Digital representation of real-world assets with liquidity, fractionalisation, and programmable transfer.",
        },
        {
          title: "Contract-driven automation",
          description:
            "Business rules executed on-chain, without intermediaries and with cryptographic guarantees.",
        },
        {
          title: "Auditable transparency",
          description:
            "Publicly verifiable data by third parties without relying on trust in a central entity.",
        },
      ],
    },
    process: {
      eyebrow: "How we work",
      title: "From problem to product",
      subtitle:
        "Technology is chosen with criteria, not hype. The process reflects this at every step.",
      steps: [
        {
          number: "01",
          title: "Understanding",
          description:
            "We map the problem, business context, and real constraints. Before code comes clarity. We ask the questions that matter.",
        },
        {
          number: "02",
          title: "Architecture",
          description:
            "We define the stack, components, and structure based on the problem — not preference or trends. Every decision has a documented reason.",
        },
        {
          number: "03",
          title: "Development",
          description:
            "We deliver in iterations with clear communication. Visible progress, shared technical decisions, and quality from the first commit.",
        },
        {
          number: "04",
          title: "Delivery and evolution",
          description:
            "Deployment, monitoring, and continuous evolution. The product does not end at go-live — we track, measure, and improve based on real outcomes.",
        },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "Tools we truly know",
      subtitle:
        "This is not a list of buzzwords. It's what we use in production systems, with full accountability.",
      groups: [
        {
          label: "Front-end",
          description:
            "Modern, responsive, and performant interfaces with React, Next.js, and TypeScript.",
        },
        {
          label: "Back-end",
          description:
            "Robust APIs, databases, and service-oriented architectures built to scale.",
        },
        {
          label: "Cloud & DevOps",
          description:
            "Cloud infrastructure, CI/CD, containers, and continuous delivery — securely.",
        },
        {
          label: "Web3",
          description:
            "Auditable smart contracts, on-chain integrations, and protocols when they make sense.",
        },
      ],
    },
    about: {
      eyebrow: "Who we are",
      title: ["A team of specialists,", "not a code factory."],
      p1: "We are developers and specialists with experience in systems that operate under real volume, pressure, and responsibility. We do not outsource core competency — those who design are those who build.",
      p2: "Our approach combines product vision with technical rigour. We understand the problem before suggesting any solution and choose technology based on the outcome — not preference or trends.",
      p3: "The Web3 layer is part of our real capabilities, not our marketing. We know protocols, on-chain security, and the limitations of this architecture — which lets us apply it with criteria.",
      principlesLabel: "Principles that guide our work",
      principles: [
        "Architecture before code",
        "Clear communication throughout the process",
        "Security as a requirement, not a feature",
        "Quality from the first commit",
      ],
      stats: [
        { value: "Full-stack", label: "UI to protocol" },
        { value: "On-demand", label: "Dedicated team per project" },
      ],
    },
    cta: {
      eyebrow: "Contact",
      title: ["Have a project", "in mind?"],
      subtitle:
        "Tell us about the problem. We evaluate the solution with technical honesty and respond clearly — no empty promises.",
      emailBtn: "Send an email",
      whatsappBtn: "Message on WhatsApp",
      trust: [
        "Response within 24h",
        "No-commitment evaluation",
        "Clear and straightforward proposal",
      ],
      modal: {
        label: "Email",
        copy: "Copy email",
        copied: "Copied!",
        close: "Close",
      },
    },
    footer: {
      tagline: "Software Engineering",
      rights: "All rights reserved.",
      links: [
        { href: "#capacidades", label: "Capabilities" },
        { href: "#processo", label: "Process" },
        { href: "#stack", label: "Stack" },
        { href: "#sobre", label: "About" },
        { href: "#contato", label: "Contact" },
      ],
    },
  },
} as const;

export type Translations = typeof translations.pt;

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LangContextValue>({
  lang: "pt",
  setLang: () => {},
  t: translations.pt,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
