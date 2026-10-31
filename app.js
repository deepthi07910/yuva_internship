
const viewRegistry = {
    "/": {
        title: "Home Dashboard",
        render: () => `
            <div class="view-fade">
                <h1>Dynamic Native SPA Architecture</h1>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Welcome to the next generation of modular frontend systems built using zero external bundle dependencies.</p>
                <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--border);">
                <h3>Core Framework Foundations</h3>
                <p>This single page application layout completely overrides normal browser client routing workflows. Content maps are compiled using lightweight, responsive functional strings dynamically injected over standard elements.</p>
                <a href="/features" class="btn" data-link>Explore Core Features</a>
            </div>`
    },
    "/features": {
        title: "Engine Features",
        render: () => `
            <div class="view-fade">
                <h1>Application Framework Capabilities</h1>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Explore the structural mechanisms providing fluid rendering across custom components.</p>
                <ul style="margin: 1.5rem 0 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
                    <li><strong>HTML5 Engine:</strong> Leverages window history manipulation APIs directly without page flashes.</li>
                    <li><strong>Hardware Acceleration:</strong> CSS keyframes handle transitions natively on the render thread.</li>
                    <li><strong>Error Control:</strong> Catch-all routers catch faulty asset addresses gracefully.</li>
                </ul>
                <a href="/performance" class="btn" data-link>Analyze Performance Metrics</a>
            </div>`
    },
    "/performance": {
        title: "Performance Metrics",
        render: () => `
            <div class="view-fade">
                <h1>Rendering System Performance</h1>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Experience rapid updates with zero additional network requests.</p>
                <p style="margin-top: 1rem;">Because templates reside natively within precompiled functional blocks in-memory, view paint times drop to near <strong>0ms</strong>, avoiding slow server roundtrips.</p>
                <a href="/" class="btn" data-link>Back to Home Dashboard</a>
            </div>`
    },
    "/404": {
        title: "Resource Not Found",
        render: () => `
            <div class="view-fade" style="text-align: center; padding: 2rem 0;">
                <h1 style="font-size: 3rem; color: var(--text-muted);">404</h1>
                <h2>Target Route Unreachable</h2>
                <p style="color: var(--text-muted); margin: 0.5rem 0 1.5rem 0;">The specific document view pointer you requested cannot be located in our routing table configurations.</p>
                <a href="/" class="btn" data-link>Return to Dashboard</a>
            </div>`
    }
};

const clientRouter = () => {
    const activePath = window.location.pathname;
    const view = viewRegistry[activePath] || viewRegistry["/404"];
    
    // Update structural layout properties
    document.title = `${view.title} | SPA Simulation`;
    document.getElementById("content").innerHTML = view.render();
};

// Intercept Local Link Requests 
document.body.addEventListener("click", event => {
    if (event.target.matches("[data-link]")) {
        event.preventDefault();
        const absoluteUrl = event.target.getAttribute("href");
        window.history.pushState(null, null, absoluteUrl);
        clientRouter();
    }
});

// Synchronize Native Browser Forward/Back Clicks
window.addEventListener("popstate", clientRouter);

// Initialize Router App Context on Boot
document.addEventListener("DOMContentLoaded", clientRouter);
