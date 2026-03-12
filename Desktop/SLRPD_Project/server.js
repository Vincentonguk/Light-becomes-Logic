const express = require('express');
const app = express();
app.use(express.json());

let lastValue = 0;

// Rota para receber dados do Python
app.post('/ingest', (req, res) => {
    lastValue = req.body.valor || Math.floor(Math.random() * 100);
    console.log("Sinal BCI Recebido:", lastValue);
    res.status(200).send({ status: "Data Secured" });
});

// Interface Visual do Dashboard
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>BrainDev Lab - Telemetry</title>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <style>
                    body { background: #0b0f19; color: #00ff88; font-family: 'Courier New', monospace; text-align: center; }
                    .container { width: 85%; margin: auto; padding-top: 50px; }
                    h1 { letter-spacing: 5px; text-shadow: 0 0 10px #00ff88; }
                </script>
            </head>
            <body>
                <div class="container">
                    <h1>QUANTUM KINETICS - PHASE 2</h1>
                    <p>STATUS: <span style="color:white">LIVE STREAMING</span></p>
                    <canvas id="telemetryChart"></canvas>
                </div>
                <script>
                    const ctx = document.getElementById('telemetryChart').getContext('2d');
                    const chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: Array(20).fill(''),
                            datasets: [{
                                label: 'Neural Activity (Hz)',
                                data: Array(20).fill(0),
                                borderColor: '#00ff88',
                                borderWidth: 3,
                                tension: 0.4,
                                fill: true,
                                backgroundColor: 'rgba(0, 255, 136, 0.1)'
                            }]
                        },
                        options: { scales: { y: { beginAtZero: true, max: 100 } } }
                    });

                    // Simula atualização visual
                    setInterval(() => {
                        chart.data.datasets[0].data.shift();
                        chart.data.datasets[0].data.push(Math.floor(Math.random() * 40) + 30);
                        chart.update();
                    }, 1000);
                </script>
            </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Dashboard Online na Porta ' + PORT));