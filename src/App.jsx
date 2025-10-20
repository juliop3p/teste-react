import React, { useMemo, useState, useEffect } from "react";
import { Link } from 'react-router-dom'

/**
 * Pudim ou Pizza? – Quiz do Pedido (sem dependências externas)
 * - Single-file React component
 * - CSS-in-JS embutido
 * - Animações leves + "confetti" de emojis
 *
 * Dica rápida de uso (Vite):
 * 1) npm create vite@latest pedido -- --template react
 * 2) cd pedido && npm i && npm run dev
 * 3) Substitua src/App.jsx por este arquivo
 */

const QUESTIONS = [
  {
    title: "Primeiro, a verdade que importa:",
    q: "Qual escolha te representa agora?",
    a: [
      { label: "🍮 Pudim", value: "pudim" },
      { label: "🍕 Pizza", value: "pizza" },
      { label: "🍝 Lasanha", value: "lasanha" },
      { label: "🍔 Hambúrguer", value: "hamburguer" },
    ],
  },
  {
    title: "Sessão de cinema",
    q: "Hoje é…",
    a: [
      { label: "😱 Terror (Premonição 6)", value: "premonicao" },
      { label: "🫶 Romance (Crepúsculo)", value: "crepusculo" },
      { label: "🦇 Super-heróis (Batman)", value: "batman" },
      { label: "🧭 Série (Lost)", value: "lost" },
    ],
  },
  {
    title: "Cenário perfeito",
    q: "Onde a gente se vê?",
    a: [
      { label: "🌅 Praia no pôr do sol", value: "praia" },
      { label: "🎪 Circo com risadas", value: "circo" },
      { label: "🌳 Parque com sorvete", value: "parque" },
      { label: "🍿 Sofá com pipoca", value: "sofa" },
    ],
  },
  {
    title: "Sobremesa ou lanchinho extra",
    q: "Qual fecha a noite?",
    a: [
      { label: "🍮 Pudim (aprovado 100%)", value: "pudim2" },
      { label: "🍦 Sorvete de casquinha", value: "sorvete" },
      { label: "🍿 Pipoca doce", value: "pipoca" },
      { label: "🍫 Chocolate", value: "choco" },
    ],
  },
  {
    title: "Clímax do nosso filme",
    q: "E o final da noite?",
    a: [
      { label: "🗣️ Conversa longa", value: "conversa" },
      { label: "🤗 Abraço demorado", value: "abraco" },
      { label: "🎟️ Planejar o próximo filme", value: "planejar" },
      { label: "🚶 Caminhada leve", value: "caminhada" },
    ],
  },
];

// CSS embutido (escopo simples)
const Styles = () => (
  <style>{`
    :root{ --bg:#faf6f2; --card:#ffffff; --ink:#1b1b1f; --muted:#6b7280; --brand:#7c3aed; --brand-soft:#ede9fe; }
    *{box-sizing:border-box}
    html,body,#root{height:100%}
    body{margin:0;font-family:Inter,system-ui,Arial,Helvetica,sans-serif;background:var(--bg);color:var(--ink)}
    .wrap{min-height:100%;display:grid;place-items:center;padding:24px}
    .card{width:min(720px,92vw);background:var(--card);border:1px solid #e5e7eb;border-radius:24px;padding:28px 22px;box-shadow:0 10px 30px rgba(0,0,0,.05)}
    .title{font-size:clamp(22px,3.6vw,32px);font-weight:700;margin:0 0 6px}
    .sub{color:var(--muted);margin:0 0 16px;font-size:15px}
    .btn{appearance:none;border:none;border-radius:16px;padding:14px 18px;font-size:16px;cursor:pointer;background:var(--brand);color:#fff;box-shadow:0 6px 18px rgba(124,58,237,.22)}
    .btn:hover{filter:brightness(1.05)}
    .btn.secondary{background:transparent;color:var(--brand);border:1px solid var(--brand)}
    .grid{display:grid;gap:12px}
    .opt{width:100%;text-align:left;border-radius:16px;border:1px solid #e5e7eb;background:#fff;padding:14px 16px;font-size:16px;cursor:pointer}
    .opt:hover{background:var(--brand-soft);border-color:#c4b5fd}
    .row{display:flex;align-items:center;gap:10px}
    .progress{height:8px;background:#e5e7eb;border-radius:999px;overflow:hidden}
    .bar{height:100%;background:var(--brand);transition:width .5s cubic-bezier(.2,.7,.2,1)}
    .center{text-align:center}
    .muted{color:var(--muted)}

    /* telinha de processamento */
    .dots{display:inline-block}
    .dots:after{content:"";display:inline-block;animation:d 1.3s infinite steps(4);width:20px;vertical-align:baseline}
    @keyframes d{to{content:"···"}}

    /* Confetti emoji */
    .confetti{position:fixed;inset:0;pointer-events:none;overflow:hidden}
    .confetti span{position:absolute;top:-10vh;font-size:24px;animation:fall 3.5s linear forwards}
    @keyframes fall{to{transform:translateY(110vh) rotate(360deg);opacity:.9}}
  `}</style>
);

const Progress = ({ step, total }) => {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="row" style={{ gap: 12 }}>
      <div className="progress" style={{ flex: 1 }}>
        <div className="bar" style={{ width: `${pct}%` }} />
      </div>
      <span
        className="muted"
        style={{ minWidth: 48, textAlign: "right", fontSize: 13 }}
      >
        {step} / {total}
      </span>
    </div>
  );
};

function useConfetti() {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!pieces.length) return;
    const t = setTimeout(() => setPieces([]), 3600);
    return () => clearTimeout(t);
  }, [pieces]);
  const fire = () => {
    const emojis = ["🎉", "❤️", "🍮", "🍕", "🎬", "🌅", "🍦", "🍿", "🦇", "🫶"];
    const arr = Array.from({ length: 28 }, () => ({
      id: Math.random().toString(36).slice(2),
      x: Math.random() * 100,
      d: 0.8 + Math.random() * 0.8,
      e: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setPieces(arr);
  };
  const node = (
    <div className="confetti" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{ left: `${p.x}%`, animationDuration: `${p.d * 3.5}s` }}
        >
          {p.e}
        </span>
      ))}
    </div>
  );
  return { fire, node };
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const total = QUESTIONS.length;
  const { fire, node } = useConfetti();

  const onPick = (v) => {
    const next = [...answers, v];
    setAnswers(next);
    if (i + 1 < total) setI(i + 1);
    else setProcessing(true);
  };

  useEffect(() => {
    if (!processing) return;
    const t = setTimeout(() => {
      setProcessing(false);
      setStarted(false);
    }, 3000);
    return () => clearTimeout(t);
  }, [processing]);

  const restart = () => {
    setStarted(false);
    setI(0);
    setAnswers([]);
    setProcessing(false);
    setAccepted(false);
  };

  const foodChoice = useMemo(() => answers[0], [answers]);

  return (
    <>
      <Styles />
      {node}
      <main className="wrap">
        <section
          className="card"
          role="dialog"
          aria-label="Pudim ou Pizza – Quiz do Pedido"
        >
          {!started && !processing && !accepted && answers.length < total && (
            <div className="center">
              <h1 className="title">Pudim ou Pizza?</h1>
              <p className="sub">
                Um quiz curtinho sobre a nossa vibe — com final doce. Pronto
                para jogar?
              </p>
              <button className="btn" onClick={() => setStarted(true)}>
                Iniciar
              </button>
            </div>
          )}

          {started && i < total && (
            <div className="grid" style={{ gap: 18 }}>
              <Progress step={i + 1} total={total} />
              <div>
                <div className="sub" style={{ marginBottom: 6 }}>
                  {QUESTIONS[i].title}
                </div>
                <h2
                  className="title"
                  style={{
                    fontSize: "clamp(18px,3.2vw,26px)",
                    marginBottom: 14,
                  }}
                >
                  {QUESTIONS[i].q}
                </h2>
              </div>
              <div className="grid">
                {QUESTIONS[i].a.map((opt) => (
                  <button
                    key={opt.value}
                    className="opt"
                    onClick={() => onPick(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button className="btn secondary" onClick={restart}>
                Recomeçar
              </button>
            </div>
          )}

          {processing && (
            <div className="center" style={{ padding: "32px 0" }}>
              <h2 className="title">
                Analisando escolhas
                <span className="dots" />
              </h2>
              <p className="sub">
                Conectando preferências, lembranças e finais felizes…
              </p>
            </div>
          )}

          {!started && !processing && accepted && (
            <div className="center" style={{ paddingTop: 6 }}>
              <h2 className="title">💞 Conexão aprovada!</h2>
              <p className="sub">
                Obrigado por dizer <strong>sim</strong>. Próxima sessão: pizza,
                pudim e um pôr do sol?
              </p>
              <div
                className="row center"
                style={{ justifyContent: "center", gap: 12, marginTop: 10 }}
              >
                <button className="btn secondary" onClick={restart}>
                  Repetir
                </button>
                <Link className="btn" to="/tbt">TBT 🎉</Link>
              </div>
            </div>
          )}

          {/* Tela final com o pedido */}
          {!started && !processing && !accepted && answers.length === total && (
            <div className="center" style={{ paddingTop: 6 }}>
              <h2 className="title">Independente das escolhas…</h2>
              <p className="sub">
                seja{" "}
                {foodChoice === "pudim" || foodChoice === "pudim2"
                  ? "pudim"
                  : foodChoice}
                , Lost, Crepúsculo, Batman, praia ou parque… a minha escolha é
                você.
              </p>
              <p style={{ fontSize: 20, margin: "12px 0 18px" }}>
                Acho que já sabemos o que somos… mas quero deixar oficial:{" "}
                <br /> você topa ser minha namorada oficialmente? ❤️
              </p>
              <div
                className="row center"
                style={{ justifyContent: "center", gap: 12 }}
              >
                <button
                  className="btn"
                  onClick={() => {
                    setAccepted(true);
                    fire();
                  }}
                >
                  Sim
                </button>
                <button
                  className="btn secondary"
                  onClick={() => {
                    setAccepted(true);
                    fire();
                  }}
                >
                  Claro que sim
                </button>
              </div>
              <button
                className="btn secondary"
                style={{ marginTop: 12 }}
                onClick={restart}
              >
                Voltar ao início
              </button>
            </div>
          )}
        </section>
        <footer
          className="center muted"
          style={{ marginTop: 14, fontSize: 12 }}
        >
          Feito sob medida: Lost × Batman × Crepúsculo × Praia × Pizza × Pudim.
        </footer>
      </main>
    </>
  );
}
