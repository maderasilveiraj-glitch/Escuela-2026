<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ITM Horizon 2026</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;500;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-glow: #00e5ff;
            --secondary-glow: #7000ff;
            --bg-color: #020617;
            --card-bg: rgba(15, 23, 42, 0.6);
            --border-color: rgba(255, 255, 255, 0.1);
        }

        body {
            background-color: var(--bg-color);
            background-image:
                radial-gradient(circle at 10% 20%, rgba(0, 229, 255, 0.1) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(112, 0, 255, 0.1) 0%, transparent 40%);
            color: #f8fafc;
            font-family: 'Plus Jakarta Sans', sans-serif;
            margin: 0;
            padding: 0; /* Cambiado para que el nav pegue arriba */
            min-height: 100vh;
            line-height: 1.6;
        }

        /* --- NUEVO ESTILO PARA EL MENÚ --- */
        nav {
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 20px;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border-color);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .nav-btn {
            text-decoration: none;
            color: #f8fafc;
            font-size: 0.8rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            padding: 10px 20px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.05);
        }

        .nav-btn:hover {
            border-color: var(--primary-glow);
            color: var(--primary-glow);
            box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
            transform: translateY(-2px);
        }
        /* -------------------------------- */

        header {
            text-align: center;
            margin: 60px 0;
        }

        .logo-text {
            font-size: 0.8rem;
            letter-spacing: 0.5rem;
            color: var(--primary-glow);
            text-transform: uppercase;
            margin-bottom: 10px;
            display: block;
        }

        h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 800;
            background: linear-gradient(135deg, #fff 30%, var(--primary-glow));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
        }

        .calendario-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 30px;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px 40px 20px;
        }

        .mes-card {
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            padding: 24px;
            position: relative;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            overflow: hidden;
        }

        .mes-card::before {
            content: "";
            position: absolute;
            top: 0; left: 0; width: 100%; height: 4px;
            background: linear-gradient(90deg, transparent, var(--primary-glow), transparent);
            opacity: 0;
            transition: opacity 0.5s;
        }

        .mes-card:hover {
            transform: translateY(-10px) scale(1.01);
            border-color: rgba(0, 229, 255, 0.3);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .mes-card:hover::before { opacity: 1; }

        .mes-header {
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .mes-header span {
            font-size: 0.7rem;
            padding: 4px 12px;
            border-radius: 20px;
            background: rgba(255,255,255,0.05);
            color: var(--primary-glow);
            border: 1px solid rgba(0, 229, 255, 0.2);
        }

        .dias-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }

        .dia-nombre {
            font-size: 0.7rem;
            text-align: center;
            color: #64748b;
            font-weight: 800;
            text-transform: uppercase;
        }

        .dia {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            border-radius: 12px;
            transition: 0.3s;
            color: #94a3b8;
            border: 1px solid transparent;
        }

        .con-actividad {
            background: rgba(0, 229, 255, 0.05);
            color: var(--primary-glow);
            border-color: rgba(0, 229, 255, 0.2);
        }

        .inhabil {
            background: rgba(244, 63, 94, 0.1);
            color: #fb7185;
            border-color: rgba(244, 63, 94, 0.2);
        }

        .hoy {
            background: #fff;
            color: var(--bg-color);
            font-weight: 800;
            box-shadow: 0 0 20px rgba(255,255,255,0.4);
        }

        .actividades-box {
            border-top: 1px solid var(--border-color);
            padding-top: 15px;
            margin-top: 10px;
        }

        .actividad-item {
            font-size: 0.8rem;
            padding: 8px;
            border-radius: 8px;
            margin-bottom: 4px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
            transition: background 0.2s;
        }

        .actividad-item:hover {
            background: rgba(255, 255, 255, 0.03);
        }

        .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-top: 6px;
            flex-shrink: 0;
        }

        .dot-blue { background: var(--primary-glow); box-shadow: 0 0 8px var(--primary-glow); }
        .dot-red { background: #fb7185; box-shadow: 0 0 8px #fb7185; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
    </style>
</head>
<body>

    <nav>
        <a href="index.html" class="nav-btn">Inicio</a>
        <a href="admin.html" class="nav-btn">Recursos Tareas</a>
    </nav>

    <header>
        <span class="logo-text">TECNM Mérida • Academic Core</span>
        <h1>Ciclo Escolar 2026</h1>
    </header>

    <div class="calendario-container" id="calendario-render"></div>

    <script>
        const eventos = [
            { fecha: '2026-01-07', desc: 'Inicio de labores administrativas', tipo: 'actividad' },
            { fecha: '2026-01-07', hasta: '2026-01-15', desc: 'Periodo de Inscripciones', tipo: 'actividad' },
            { fecha: '2026-01-26', desc: 'Apertura de Cursos Enero-Junio', tipo: 'actividad' },
            { fecha: '2026-02-02', desc: 'Suspensión: Día de la Constitución', tipo: 'inhabil' },
            { fecha: '2026-02-16', hasta: '2026-02-17', desc: 'Festejos de Carnaval', tipo: 'actividad' },
            { fecha: '2026-03-16', desc: 'Suspensión: Natalicio de Benito Juárez', tipo: 'inhabil' },
            { fecha: '2026-03-30', hasta: '2026-04-10', desc: 'Receso Académico de Primavera', tipo: 'inhabil' },
            { fecha: '2026-05-01', desc: 'Suspensión: Día del Trabajo', tipo: 'inhabil' },
            { fecha: '2026-05-05', desc: 'Suspensión: Batalla de Puebla', tipo: 'inhabil' },
            { fecha: '2026-05-15', desc: 'Día del Maestro', tipo: 'inhabil' },
            { fecha: '2026-05-29', desc: 'Cierre de Sesiones Académicas', tipo: 'actividad' },
            { fecha: '2026-06-01', desc: 'Captura Final de Calificaciones', tipo: 'actividad' }
        ];

        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
        const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

        function render() {
            const container = document.getElementById('calendario-render');
            const hoy = new Date().toISOString().split('T')[0];

            for (let m = 0; m < 6; m++) {
                const card = document.createElement('div');
                card.className = 'mes-card';

                let html = `
                    <div class="mes-header">${meses[m]} <span>2026</span></div>
                    <div class="dias-grid">
                        ${dias.map(d => `<div class="dia-nombre">${d}</div>`).join('')}
                `;

                const start = new Date(2026, m, 1).getDay();
                const total = new Date(2026, m + 1, 0).getDate();

                for (let i = 0; i < start; i++) html += `<div></div>`;

                for (let d = 1; d <= total; d++) {
                    const f = `2026-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                    let cl = 'dia';
                    const ev = eventos.find(e => f >= e.fecha && f <= (e.hasta || e.fecha));

                    if (ev) cl += ev.tipo === 'inhabil' ? ' inhabil' : ' con-actividad';
                    if (f === hoy) cl += ' hoy';
                    html += `<div class="${cl}">${d}</div>`;
                }

                html += `</div><div class="actividades-box">`;

                eventos.filter(e => {
                    const mesE = parseInt(e.fecha.split('-')[1]);
                    return mesE === (m+1);
                }).forEach(e => {
                    const dot = e.tipo === 'inhabil' ? 'dot-red' : 'dot-blue';
                    html += `
                        <div class="actividad-item">
                            <div class="dot ${dot}"></div>
                            <span>${e.desc}</span>
                        </div>`;
                });

                html += `</div>`;
                card.innerHTML = html;
                container.appendChild(card);
            }
        }
        render();
    </script>
</body>
</html>
