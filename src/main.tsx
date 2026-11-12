import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  Github,
  Mail,
  Check,
  Copy,
  Code2,
  Database,
  Layers,
  ShieldCheck,
  Terminal,
  GraduationCap,
  MapPin,
  Network,
  Landmark,
  CheckCheck,
} from "lucide-react";
import "./styles.css";

type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  repo: string;
  problem: string;
  approach: string;
  features: string[];
};

const github = "https://github.com/gustavoverenka";
const projects: Project[] = [
  {
    id: "taskflow",
    name: "TaskFlow",
    category: "API REST · Gestão de tarefas",
    description:
      "Cada tarefa no seu lugar. Uma API com autenticação, recuperação de acesso e tarefas privadas por usuário.",
    tags: ["Node.js", "Express", "PostgreSQL", "Prisma"],
    repo: `${github}/taskFlow`,
    problem:
      "Organizar tarefas individuais exige associar cada registro ao seu usuário e cuidar de todo o ciclo de acesso à conta.",
    approach:
      "O projeto reúne autenticação JWT, verificação de e-mail e recuperação de senha. As tarefas incluem prioridade, prazo e status, com operações de criação, consulta, atualização e exclusão.",
    features: [
      "Autenticação com JWT",
      "Verificação de e-mail e recuperação de senha",
      "Tarefas privadas por usuário",
      "Filtros por prioridade e status",
    ],
  },
  {
    id: "senai-connect",
    name: "Senai Connect",
    category: "Comunidade · Back-end",
    description:
      "Uma comunidade conectada por publicações, conversas e oportunidades. Com acesso definido pelo perfil de cada pessoa.",
    tags: ["Node.js", "Express", "Prisma", "Zod"],
    repo: `${github}/Senai-Connect`,
    problem:
      "Uma comunidade acadêmica precisa reunir interações e oportunidades com regras claras sobre quem pode publicar cada conteúdo.",
    approach:
      "A API organiza feed, curtidas, comentários, mensagens e oportunidades. As rotas de oportunidades exigem autenticação e permitem a criação por ex-alunos, professores e administradores.",
    features: [
      "Feed com publicações e comentários",
      "Curtidas e denúncias de publicações",
      "Oportunidades com permissões por perfil",
      "Validação de entradas com Zod",
    ],
  },
  {
    id: "minibanco",
    name: "MiniBanco .NET",
    category: "C# · Orientação a objetos",
    description:
      "Regras de negócio traduzidas em código. Contas, movimentações e fechamento mensal em uma aplicação de console.",
    tags: ["C#", ".NET", "POO"],
    repo: `${github}/MiniBanco---dotnet`,
    problem:
      "Contas correntes, poupança e salário compartilham operações bancárias, mas possuem regras específicas para saques, tarifas e rendimentos.",
    approach:
      "A aplicação usa encapsulamento e polimorfismo para organizar o comportamento de cada conta. Também registra transações, processa o fechamento mensal e calcula um índice de saúde financeira.",
    features: [
      "Três modalidades de contas",
      "Depósitos e saques com validação",
      "Fechamento mensal polimórfico",
      "Histórico e relatório gerencial",
    ],
  },
];

function ProjectArtwork({ id }: { id: string }) {
  return (
    <div className={`artwork artwork-${id}`} aria-hidden="true">
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      {id === "taskflow" ? ( //operador ternario
        <div className="task-composition">
          <div className="floating-chip">
            <ShieldCheck size={15} /> Autenticação JWT
          </div>
          <div className="task-sheet">
            <div className="sheet-heading">
              <span className="mini-logo">
                <CheckCheck size={21} />
              </span>
              <span>
                TaskFlow<small>Organize. Priorize. Conclua.</small>
              </span>
            </div>
            {[
              "Estruturar a API",
              "Conectar o banco de dados",
              "Validar autenticação",
            ].map((task, i) => (
              <div className="task-row" key={task}>
                <span className={i < 2 ? "task-check done" : "task-check"}>
                  {i < 2 && <Check size={12} />}
                </span>
                <span>{task}</span>
                <span className={`priority priority-${i}`} />
              </div>
            ))}
            <div className="sheet-footer">
              <span>3 tarefas de exemplo</span>
              <span>2 concluídas</span>
            </div>
          </div>
          <div className="floating-code">
            <Code2 size={15} />
            <span>API REST</span>
            <span className="code-dot" />
          </div>
        </div>
      ) : id === "senai-connect" ? (
        <div className="network-composition">
          <div className="network-line line-one" />
          <div className="network-line line-two" />
          <div className="network-line line-three" />
          <div className="network-center">
            <Network size={36} strokeWidth={1.3} />
          </div>
          <span className="network-node node-one">
            <GraduationCap size={22} />
          </span>
          <span className="network-node node-two">
            <Code2 size={21} />
          </span>
          <span className="network-node node-three">
            <Layers size={21} />
          </span>
          <span className="art-caption">Pessoas. Ideias. Conexões.</span>
        </div>
      ) : (
        <div className="bank-composition">
          <div className="bank-tile tile-back" />
          <div className="bank-tile tile-front">
            <Landmark size={42} strokeWidth={1} />
            <span>
              MiniBanco<small>.NET</small>
            </span>
            <div className="bank-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
          <span className="bank-terminal">
            <Terminal size={15} /> C# / Console application
          </span>
        </div>
      )}
    </div>
  );
}

function App() { //gerenciamento de estados
  const [hash, setHash] = useState(window.location.hash);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const selected = projects.find(
    (project) => hash === `#/projeto/${project.id}`,
  );

  useEffect(() => { //gerenciamento do estado hash
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => { //titulo da aba
    document.title = selected
      ? `${selected.name} — Gustavo Verenka`
      : "Gustavo Verenka — Desenvolvimento back-end";
    if (selected || hash === "#/") {
      window.scrollTo(0, 0);
      document.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
    } else if (hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "auto" }),
      );
    }
  }, [hash, selected]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyEmail() { //função de copiar email
    try {
      await navigator.clipboard.writeText("falcgugu@gmail.com"); //api do navegador
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }

  return (//fragment do react
    <> 
      <div className="ambient" aria-hidden="true">
        <div className="ambient-blue" />
        <div className="ambient-purple" />
        <div className="ambient-ribbon" />
      </div>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="header shell">
        <a className="wordmark" href="#/" aria-label="Gustavo Verenka, início">
          gv<span>.</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
        <a
          className="github-nav glass"
          href={github}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={16} />
          <span>GitHub</span>
          <ArrowUpRight size={14} />
        </a>
      </header>
      <main id="conteudo" className="shell">
        {selected ? (//condição
          <article className="project-detail">
            <a href="#projetos" className="back-link">
              <ArrowLeft size={16} /> Todos os projetos
            </a>
            <p className="eyebrow">{selected.category}</p>
            <h1 tabIndex={-1}>{selected.name}</h1>
            <p className="detail-intro">{selected.description}</p>
            <div className="detail-visual glass">
              <ProjectArtwork id={selected.id} />
              <p className="visual-note">Ilustração conceitual do projeto</p>
            </div>
            <div className="detail-body">
              <section>
                <h2>O problema</h2>
                <p>{selected.problem}</p>
                <h2>A abordagem</h2>
                <p>{selected.approach}</p>
              </section>
              <aside className="glass feature-panel">
                <h2>No projeto</h2>
                <ul>
                  {selected.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="tags">
                  {selected.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a
                  className="button primary"
                  href={selected.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} /> Explorar código{" "}
                  <ArrowUpRight size={16} />
                </a>
              </aside>
            </div>
          </article>
        ) : (
          <>
            <section className="hero" aria-labelledby="hero-title">
              <div className="hero-intro">
                <span className="intro-line" /> Desenvolvimento back-end
              </div>
              <h1 id="hero-title" tabIndex={-1}>
                Gustavo
                <br />
                <span>Verenka</span>
                <span className="name-period">.</span>
              </h1>
              <div className="hero-bottom">
                <p>
                  Curiosidade para entender.
                  <br />
                  Código para construir.
                </p>
                <div className="hero-description">
                  <p>
                    Estudante de desenvolvimento back-end, explorando APIs,
                    bancos de dados e a lógica por trás de cada aplicação.
                  </p>
                  <a href="#projetos" className="button primary">
                    Conheça meus projetos <ArrowDown size={16} />
                  </a>
                </div>
              </div>
              <div className="hero-object" aria-hidden="true">
                <div className="glass-slab slab-back" />
                <div className="glass-slab slab-mid" />
                <div className="glass-slab slab-front">
                  <Code2 strokeWidth={0.8} />
                </div>
                <span className="object-spark" />
              </div>
            </section>
            <section
              id="projetos"
              className="projects-section"
              aria-labelledby="projects-title"
            >
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Da ideia à implementação</p>
                  <h2 id="projects-title">
                    O que venho construindo<span>.</span>
                  </h2>
                </div>
                <a
                  className="text-link"
                  href={`${github}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Todos no GitHub <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="projects-grid">
                {projects.map((project, index) => (//renderização automatica dos cards
                  <article
                    className={`project-card glass ${index === 0 ? "featured" : ""}`}//primeiro projeto
                    key={project.id}//identificação unica
                  >
                    <a
                      className="project-cover"
                      href={`#/projeto/${project.id}`}
                      aria-label={`Conhecer ${project.name}`}
                    >
                      <ProjectArtwork id={project.id} />
                      <span className="cover-label">Ilustração conceitual</span>
                    </a>
                    <div className="project-info">
                      <p className="project-category">{project.category}</p>
                      <h3>
                        <a href={`#/projeto/${project.id}`}>
                          {project.name}
                          <span className="round-arrow">
                            <ArrowUpRight size={22} />
                          </span>
                        </a>
                      </h3>
                      <p className="project-description">
                        {project.description}
                      </p>
                      <div className="tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section
              id="sobre"
              className="about-section"
              aria-labelledby="about-title"
            >
              <div className="about-title">
                <p className="eyebrow">Um pouco sobre mim</p>
                <h2 id="about-title">
                  Aprender.
                  <br />
                  Experimentar.
                  <br />
                  <span>Construir.</span>
                </h2>
              </div>
              <div className="about-content">
                <div className="profile-line">
                  <img
                    src="/avatar.jpg"
                    alt="Avatar de Gustavo Verenka no GitHub"
                    width="56"
                    height="56"
                    loading="lazy"
                  />
                  <div>
                    <strong>Gustavo Verenka</strong>
                    <span>
                      <MapPin size={13} /> Joinville, SC
                    </span>
                  </div>
                </div>
                <p>
                  Estudo desenvolvimento back-end e curso o Ensino Médio com
                  Técnico em Informática no SENAI. Meu foco está em APIs REST,
                  autenticação, modelagem de dados e arquitetura de sistemas.
                </p>
                <p>
                  Nos projetos, exploro como transformar regras de negócio em
                  aplicações organizadas. Também estudo React e TypeScript para
                  conectar essa lógica às interfaces.
                </p>
                <div className="skill-list">
                  <div>
                    <Database size={18} />
                    <span>Back-end e dados</span>
                    <p>Node.js · Express · PostgreSQL · Prisma · C#</p>
                  </div>
                  <div>
                    <Layers size={18} />
                    <span>Interfaces</span>
                    <p>React · TypeScript · HTML · CSS</p>
                  </div>
                </div>
              </div>
            </section>
            <section id="contato" className="contact-section glass">
              <div>
                <p className="eyebrow">Vamos conversar</p>
                <h2>
                  Uma boa ideia começa
                  <br />
                  com uma conversa<span>.</span>
                </h2>
                <a className="email-link" href="mailto:falcgugu@gmail.com">
                  falcgugu@gmail.com <ArrowUpRight size={20} />
                </a>
              </div>
              <button className="copy-button glass" onClick={copyEmail}>
                {copied ? <Check size={20} /> : <Copy size={20} />}
                <span aria-live="polite">
                  {copied ? "E-mail copiado" : "Copiar e-mail"}
                </span>
              </button>
              {copyError && (
                <p role="status" className="copy-error">
                  Selecione o endereço acima para copiá-lo.
                </p>
              )}
            </section>
          </>
        )}
      </main>
      <footer className="shell footer">
        <a className="wordmark" href="#/">
          gv<span>.</span>
        </a>
        <span>Gustavo Verenka · {new Date().getFullYear()}</span>
        <div>
          <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="mailto:falcgugu@gmail.com" aria-label="Enviar e-mail">
            <Mail size={18} />
          </a>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(//inicia o site 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
