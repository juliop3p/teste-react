import React from "react";
import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <>
      <style>{`
:root{--ink:#e8e8e8;--muted:#b3b3b3;--accent:#f59e0b;--bg0:#0a0a0a;--bg1:#0f0f12}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;font-family:Inter,system-ui,Segoe UI,Helvetica,Arial,sans-serif;background:radial-gradient(1200px 800px at 70% -10%,#1a1a1f 0%,var(--bg1) 35%,var(--bg0) 100%);color:var(--ink)}


.shell{min-height:100%;display:grid;place-items:center;}
.card{width:min(920px,94vw);background:rgba(12,12,14,.6);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.08);border-radius:28px;box-shadow:0 20px 60px rgba(0,0,0,.6);overflow:hidden}
.wrap{display:grid;grid-template-columns:1.2fr .9fr;gap:8px}
@media (max-width:880px){.wrap{grid-template-columns:1fr}}


/* Painel visual à direita */
.panel{position:relative;min-height:320px;background:linear-gradient(180deg,#0b0b0d 0%,#0d0d11 60%,#09090b 100%)}
.glow{position:absolute;inset:-40%;background:radial-gradient(520px 320px at 50% 10%,rgba(255,255,255,.06),transparent 60%),radial-gradient(360px 220px at 70% 40%,rgba(245,158,11,.08),transparent 60%)}


/* Símbolo morcego estilizado */
.bat{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(70%,360px);aspect-ratio:3/1;}
.bat svg{filter:drop-shadow(0 6px 18px rgba(0,0,0,.8))}
.halo{position:absolute;inset:auto 50% auto auto;left:50%;top:50%;transform:translate(-50%,-50%);width:72%;height:72%;border-radius:999px;background:radial-gradient(circle,rgba(245,158,11,.35),rgba(245,158,11,.08) 60%,transparent 70%);animation:pulse 3.2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.65}50%{opacity:1}}


/* Conteúdo à esquerda */
.content{padding:32px 28px 28px 28px}
.eyebrow{letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-size:12px}
.title{font-size:clamp(28px,4vw,44px);line-height:1.08;margin:.35rem 0 6px;font-weight:800}
.desc{color:var(--muted);font-size:15px;max-width:52ch;margin:0 0 18px}
.list{margin:14px 0 10px;padding:0;color:#d6d6d6}
.list li{list-style:none;display:flex;gap:10px;align-items:start;margin:8px 0}
.dot{width:8px;height:8px;border-radius:999px;background:linear-gradient(180deg,#ffd27a,#f59e0b)}
.cta{display:flex;gap:12px;align-items:center;margin-top:18px}
.btn{appearance:none;border:none;border-radius:16px;padding:14px 18px;background:linear-gradient(180deg,#ffd27a,#f59e0b);color:#1a1405;cursor:pointer;font-weight:700;box-shadow:0 10px 28px rgba(245,158,11,.25)}
.btn:hover{filter:brightness(1.03)}
.ghost{background:transparent;color:#e7e7e7;border:1px solid rgba(255,255,255,.16)}
.foot{padding:8px 28px 24px;color:#9b9b9b;font-size:12px}
`}</style>

      <div className="shell">
        <section
          className="card"
          aria-label="O Cavaleiro da Pizza – Introdução"
        >
          <div className="wrap">
            {/* Texto */}
            <div className="content">
              <div className="eyebrow">Prólogo</div>
              <h1 className="title">O Cavaleiro da Pizza</h1>
              <p className="desc">
                Entre sombras e risos, <strong>Julio</strong> e{" "}
                <strong>[Nome dela]</strong> descobriram que a melhor dupla é
                feita de <em>código</em> e <em>coração</em>. Este é o nosso
                filme: com cenas de <strong>Batman</strong>, maratonas de{" "}
                <strong>Crepúsculo</strong>, episódios de <strong>Lost</strong>,
                pizzas inesquecíveis e pôres do sol que a gente não esquece.
              </p>
              <ul className="list">
                <li>
                  <span className="dot" />
                  Missão de hoje: iniciar o capítulo que já é nosso 💞
                </li>
                <li>
                  <span className="dot" />
                  Duração prevista: alguns sorrisos e um final doce 🍮
                </li>
                <li>
                  <span className="dot" />
                  Classificação: 100% recomendado pelo coração
                </li>
              </ul>
              <div className="cta">
                <Link className="btn" to="/quiz">
                  Iniciar missão 💞
                </Link>
                <Link className="btn ghost" to="/tbt">
                  Ver lembranças
                </Link>
              </div>
            </div>

            {/* Painel visual */}
            <div className="panel" aria-hidden>
              <div className="glow" />
              <div className="halo" />
              <div className="bat">
                <svg
                  viewBox="0 0 512 170"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="símbolo morcego"
                >
                  <path
                    fill="#ffd27a"
                    d="M256 12c20 32 58 53 98 44-7 20 3 42 23 50 18 7 34 3 49-5-7 22-4 44 9 66-31-11-62-21-94-19-24 2-43 11-58 26-8 8-16 18-27 18s-19-10-27-18c-15-15-34-24-58-26-32-2-63 8-94 19 13-22 16-44 9-66 15 8 31 12 49 5 20-8 30-30 23-50 40 9 78-12 98-44Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="foot">
            Um projeto em 24fps de carinho, pizza e pudim. Desenvolvido por
            você.
          </div>
        </section>
      </div>
    </>
  );
}
