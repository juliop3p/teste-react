import { useState, useMemo } from "react";
import { Link } from 'react-router-dom'
import aeroporto from './assets/aeroporto.png';
import chocolate from './assets/chocolate stikadinho.jpg';
import desenho from './assets/desenho-sad.jpg';
import holambraEntrada from './assets/holambra-entrada.jpg';
import marcaCostas from './assets/marca-costas.jpg';
import meuAniversario from './assets/meu-aniversario.jpg';
import moinhoHolambra from './assets/moinho-holambra.jpg';
import porDoSol from './assets/por-do-sol.jpg';
import praiaPernambuco from './assets/praia-pernambuco.jpg';
import praia from './assets/praia.jpg';
import premonicao from './assets/premonicao.jpg';
import tattoPicapau from './assets/tatto de chiclete do picapau.jpg';
import circo from './assets/circo.jpg';

const StylesCelebrate = () => (
  <style>{`
:root{ --bg:#faf6f2; --card:#ffffff; --ink:#1b1b1f; --muted:#6b7280; --brand:#7c3aed; }
*{box-sizing:border-box}
body{margin:0;font-family:Inter,system-ui,Arial,Helvetica,sans-serif;background:var(--bg);color:var(--ink)}
.shell{min-height:100vh;display:flex;flex-direction:column}
.hero{padding:28px 20px}
.h1{font-size:clamp(22px,4vw,34px);margin:0}
.sub{color:var(--muted);margin:6px 0 0}
.content{flex:1;padding:10px 16px 28px}
.grid{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(180px,1fr))}
.item{position:relative;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;background:#fff}
.img{width:100%;height:180px;object-fit:cover;display:block;transition:transform .4s}
.item:hover .img{transform:scale(1.03)}
.cap{position:absolute;left:8px;bottom:8px;background:rgba(255,255,255,.9);padding:6px 10px;border-radius:12px;font-size:12px;color:#374151}
.topbar{display:flex;align-items:center;justify-content:space-between;gap:10px}
.btn{appearance:none;border:1px solid #e5e7eb;background:#fff;border-radius:14px;padding:10px 14px;cursor:pointer}
.btn.primary{background:var(--brand);color:#fff;border:none}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.6);display:grid;place-items:center;}
.frame{width:min(96vw,1080px);background:#000;border-radius:16px;overflow:hidden;position:relative}
.frame img{width:100%;height:auto;display:block}
.frame .legend{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(transparent,rgba(0,0,0,.7));color:#fff;padding:16px 14px;font-size:14px}
.nav{position:absolute;top:50%;transform:translateY(-50%);left:0;right:0;display:flex;justify-content:space-between;padding:0 6px}
.nav button{background:rgba(255,255,255,.85);border:none;border-radius:999px;width:40px;height:40px;cursor:pointer;font-size:18px}
.close{position:absolute;top:8px;right:8px;background:rgba(255,255,255,.9);border:none;border-radius:999px;width:38px;height:38px;cursor:pointer}
`}</style>
);

// Coloque suas fotos em /public/photos e troque os nomes abaixo
const PHOTOS = [
  { src: porDoSol, caption: 'Nosso pôr do sol favorito 🌅' },
  { src: circo, caption: 'Um rolê no circo 🎪' },
  { src: praia, caption: 'Um dia leve na praia 🏖️' },
  { src: praiaPernambuco, caption: 'Pernambuco e o sol perfeito ☀️' },
  { src: aeroporto, caption: 'Aeroporto — onde saudade e reencontro se misturam ✈️' },
  { src: holambraEntrada, caption: 'Entrada de Holambra 🌸' },
  { src: premonicao, caption: 'Premonição — o primeiro cinema juntos 🎬' },
  { src: moinhoHolambra, caption: 'O moinho de Holambra — um dia especial 🌷' },
  { src: meuAniversario, caption: 'Meu aniversário com você 🎂' },
  { src: chocolate, caption: 'O chocolate stikadinho, marca registrada 🍫' },
  { src: desenho, caption: 'Vamos parar com essa bad??? VAMOS?' },
  { src: marcaCostas, caption: 'Um registro simples, mas cheio de carinho 📸' },
  { src: tattoPicapau, caption: 'A tatuagem do chiclete do Pica-Pau 🤭' },
];

export default function Celebrate() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const onOpen = (i) => {
    setIdx(i);
    setOpen(true);
  };
  const onPrev = () => setIdx((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
  const onNext = () => setIdx((i) => (i + 1) % PHOTOS.length);

  const photo = useMemo(() => PHOTOS[idx], [idx]);

  return (
    <div className="shell">
      <StylesCelebrate />
      <header className="hero">
        <div className="topbar">
          <div>
            <h1 className="h1">Bons momentos 🎉</h1>
            <p className="sub">
              Alguns dos nossos momentos favoritos — obrigado por viver tudo
              isso comigo.
            </p>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="grid">
          {PHOTOS.map((p, i) => (
            <button className="item" key={p.src} onClick={() => onOpen(i)}>
              <img className="img" src={p.src} alt={p.caption} />
              <span className="cap">{p.caption}</span>
            </button>
          ))}
        </div>
      </main>

      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="frame" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpen(false)}>
              ✕
            </button>
            <img src={photo.src} alt={photo.caption} />
            <div className="legend">{photo.caption}</div>
            <div className="nav">
              <button onClick={onPrev}>‹</button>
              <button onClick={onNext}>›</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
