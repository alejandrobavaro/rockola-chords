import { useState } from "react";
import "../assets/scss/_03-Componentes/_FormateoPartituras.scss";

const ES_ACORDE = /^[A-G][#b]?(m|maj7|m7|7|sus|dim|add)?/;
const ES_SECCION = /^[A-ZÁÉÍÓÚÑ\s-]+:/;

export default function FormateoPartituras() {
  const [raw, setRaw] = useState("");
  const [modo, setModo] = useState("vertical"); // vertical | horizontal

  const parsear = () => {
    const lineas = raw.split("\n");

    let titulo = "";
    let tono = "";
    let bloques = [];
    let bloqueActual = null;
    let acordesPendientes = [];

    lineas.forEach((l) => {
      const linea = l.trim();
      if (!linea) return;

      // TÍTULO + TONO
      if (!titulo) {
        titulo = linea;
        const match = linea.match(/tono\s*([A-G][#b]?m?)/i);
        if (match) tono = match[1];
        return;
      }

      // SECCIÓN
      if (ES_SECCION.test(linea)) {
        bloqueActual = {
          seccion: linea.replace(":", ""),
          lineas: []
        };
        bloques.push(bloqueActual);
        return;
      }

      // ACORDES
      if (ES_ACORDE.test(linea)) {
        acordesPendientes = linea.split(/\s+/);
        return;
      }

      // TEXTO
      if (!bloqueActual) {
        bloqueActual = { seccion: null, lineas: [] };
        bloques.push(bloqueActual);
      }

      bloqueActual.lineas.push({
        acordes: acordesPendientes,
        texto: linea
      });

      acordesPendientes = [];
    });

    const todas = bloques.flatMap(b =>
      b.seccion
        ? [{ tipo: "seccion", texto: b.seccion }, ...b.lineas]
        : b.lineas
    );

    const columnasCantidad = modo === "vertical" ? 2 : 3;
    const porColumna = Math.ceil(todas.length / columnasCantidad);

    return {
      titulo,
      tono,
      columnas: Array.from({ length: columnasCantidad }, (_, i) =>
        todas.slice(i * porColumna, (i + 1) * porColumna)
      )
    };
  };

  const data = raw ? parsear() : null;

  return (
    <div className="formateo-layout">
      {/* INPUT */}
      <div className="formateo-input">
        <h3>Pegar chord</h3>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="Pegá acá el chord sin formato..."
        />

        <div className="modo-toggle">
          <button
            className={modo === "vertical" ? "activo" : ""}
            onClick={() => setModo("vertical")}
          >
            Vertical
          </button>
          <button
            className={modo === "horizontal" ? "activo" : ""}
            onClick={() => setModo("horizontal")}
          >
            Horizontal
          </button>
        </div>
      </div>

      {/* HOJA */}
      {data && (
        <section className={`partitura-a4 ${modo}`}>
          <h1 className="partitura-titulo">
            {data.titulo}
            {data.tono && <span className="tono"> – TONO {data.tono}</span>}
          </h1>

          <div className="partitura-columnas">
            {data.columnas.map((col, i) => (
              <div className="partitura-columna" key={i}>
                <div className="partitura-bloque">
                  {col.map((l, k) =>
                    l.tipo === "seccion" ? (
                      <div className="partitura-seccion" key={k}>
                        <span className="seccion-titulo">{l.texto}</span>
                      </div>
                    ) : (
                      <p className="partitura-linea" key={k}>
                        {l.acordes?.length > 0 && (
                          <span className="partitura-acordes">
                            {l.acordes.map((a, x) => (
                              <span className="acorde" key={x}>{a}</span>
                            ))}
                          </span>
                        )}
                        {l.texto}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
