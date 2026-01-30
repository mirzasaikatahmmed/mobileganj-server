import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { Public } from './common/decorators';

@Controller()
export class AppController {
  @Public()
  @Get()
  getHome(@Res() res: Response): void {
    const html = `
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mobile GANJ - API Server</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --bg-primary: #0f172a;
      --bg-secondary: #1e293b;
      --bg-card: #1e293b;
      --border-color: #334155;
      --text-primary: #f1f5f9;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      --accent: #3b82f6;
      --accent-hover: #2563eb;
      --success-bg: rgba(16, 185, 129, 0.1);
      --success-border: rgba(16, 185, 129, 0.3);
      --success-text: #34d399;
      --success-dot: #10b981;
    }

    [data-theme="light"] {
      --bg-primary: #f8fafc;
      --bg-secondary: #ffffff;
      --bg-card: #ffffff;
      --border-color: #e2e8f0;
      --text-primary: #0f172a;
      --text-secondary: #334155;
      --text-muted: #64748b;
      --accent: #3b82f6;
      --accent-hover: #2563eb;
      --success-bg: #ecfdf5;
      --success-border: rgba(16, 185, 129, 0.3);
      --success-text: #059669;
      --success-dot: #10b981;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg-primary);
      min-height: 100vh;
      color: var(--text-primary);
      line-height: 1.6;
      transition: background 0.3s, color 0.3s;
    }

    .header {
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: background 0.3s, border-color 0.3s;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--text-primary);
    }

    .brand-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .theme-toggle {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .theme-toggle:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    .theme-toggle svg {
      width: 20px;
      height: 20px;
    }

    .icon-sun, .icon-moon { display: none; }
    [data-theme="dark"] .icon-sun { display: block; }
    [data-theme="light"] .icon-moon { display: block; }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--success-bg);
      color: var(--success-text);
      padding: 0.5rem 1rem;
      border-radius: 100px;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid var(--success-border);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: var(--success-dot);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(0.95); }
    }

    .main {
      max-width: 1000px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .hero {
      text-align: center;
      margin-bottom: 3rem;
    }

    .hero h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .hero p {
      font-size: 1.125rem;
      color: var(--text-muted);
      max-width: 500px;
      margin: 0 auto;
    }

    .quick-links {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.5rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.9375rem;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-primary {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: #fff;
      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }

    .btn-secondary {
      background: var(--bg-card);
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
    }

    .btn-secondary:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
      margin-bottom: 2.5rem;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.2s;
    }

    .card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .card-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
    }

    .card-icon.blue { background: rgba(59, 130, 246, 0.15); }
    .card-icon.green { background: rgba(16, 185, 129, 0.15); }
    .card-icon.purple { background: rgba(139, 92, 246, 0.15); }
    .card-icon.orange { background: rgba(249, 115, 22, 0.15); }
    .card-icon.pink { background: rgba(236, 72, 153, 0.15); }
    .card-icon.cyan { background: rgba(6, 182, 212, 0.15); }

    .card-title {
      font-weight: 600;
      font-size: 1rem;
      color: var(--text-primary);
    }

    .card-desc {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .api-info {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.2s;
    }

    .api-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border-color);
    }

    .api-row:last-child {
      border-bottom: none;
    }

    .api-label {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .api-value {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.875rem;
      color: var(--text-primary);
      background: var(--bg-primary);
      padding: 0.375rem 0.75rem;
      border-radius: 6px;
    }

    .api-value a {
      color: var(--accent);
      text-decoration: none;
    }

    .api-value a:hover {
      text-decoration: underline;
    }

    .footer {
      text-align: center;
      padding: 2rem;
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    @media (max-width: 640px) {
      .header {
        padding: 1rem;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .hero h1 {
        font-size: 1.75rem;
      }
      .main {
        padding: 2rem 1rem;
      }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-left">
      <div class="brand">
        <div class="brand-icon">📱</div>
        <span>Mobile GANJ</span>
      </div>
    </div>
    <div class="header-right">
      <div class="status-badge">
        <span class="status-dot"></span>
        Server Online
      </div>
      <button class="theme-toggle" onclick="toggleTheme()" title="Toggle theme">
        <svg class="icon-sun" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        <svg class="icon-moon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      </button>
    </div>
  </header>

  <main class="main">
    <section class="hero">
      <h1>Mobile GANJ API</h1>
      <p>Complete mobile shop management system with inventory, sales, customers, and more.</p>
      <div class="quick-links">
        <a href="/api/docs" class="btn btn-primary">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          API Documentation
        </a>
        <a href="/health" class="btn btn-secondary">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Health Check
        </a>
      </div>
    </section>

    <p class="section-title">Features</p>
    <div class="card-grid">
      <div class="card">
        <div class="card-header">
          <div class="card-icon blue">📊</div>
          <span class="card-title">Dashboard</span>
        </div>
        <p class="card-desc">Real-time analytics, sales reports, and business insights at a glance.</p>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-icon green">📦</div>
          <span class="card-title">Products</span>
        </div>
        <p class="card-desc">Manage phones, accessories, IMEI tracking, and barcode generation.</p>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-icon purple">💰</div>
          <span class="card-title">Sales</span>
        </div>
        <p class="card-desc">Invoice creation, payment tracking, and due management system.</p>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-icon orange">👥</div>
          <span class="card-title">Customers</span>
        </div>
        <p class="card-desc">Customer database, purchase history, and due collection tracking.</p>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-icon pink">🔧</div>
          <span class="card-title">Servicing</span>
        </div>
        <p class="card-desc">Mobile repair jobs, parts management, and service tracking.</p>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-icon cyan">🌍</div>
          <span class="card-title">Overseas Tracking</span>
        </div>
        <p class="card-desc">Track imported phones from carriers with status timeline.</p>
      </div>
    </div>

    <p class="section-title">API Endpoints</p>
    <div class="api-info">
      <div class="api-row">
        <span class="api-label">Base URL</span>
        <span class="api-value">/api</span>
      </div>
      <div class="api-row">
        <span class="api-label">Documentation</span>
        <span class="api-value"><a href="/api/docs">/api/docs</a></span>
      </div>
      <div class="api-row">
        <span class="api-label">Public API</span>
        <span class="api-value"><a href="/api/public/shop">/api/public/*</a></span>
      </div>
      <div class="api-row">
        <span class="api-label">Health Check</span>
        <span class="api-value"><a href="/health">/health</a></span>
      </div>
    </div>
  </main>

  <footer class="footer">
    <p>Mobile GANJ v1.0.1 &bull; &copy; 2026</p>
  </footer>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }

    // Load saved theme or default to dark
    (function() {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
    })();
  </script>
</body>
</html>
    `;
    res.type('html').send(html);
  }

  @Public()
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
