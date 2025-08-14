import { MVPFormData } from "./mvpSchema";

export function exportToPDF(data: MVPFormData) {
  const printContent = generatePrintContent(data);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${data.title} - MVP Plan</title>
      <meta charset="utf-8">
      <style>
        @media print {
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
          .section { margin-bottom: 25px; border-left: 4px solid #3b82f6; padding-left: 15px; }
          h1 { font-size: 24px; margin-bottom: 10px; color: #1e293b; }
          h2 { font-size: 18px; margin: 20px 0 10px 0; color: #334155; }
          h3 { font-size: 14px; margin: 10px 0 5px 0; color: #64748b; }
          .feature-list { margin-left: 20px; }
          .step-item { margin-bottom: 10px; }
          .step-number { font-weight: bold; color: #3b82f6; }
        }
      </style>
    </head>
    <body>
      ${printContent}
    </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

export function exportToJSON(data: MVPFormData): string {
  return JSON.stringify(data, null, 2);
}

export function copyToClipboard(data: MVPFormData): string {
  const textContent = `
MVP BUILD SPEC: ${data.title}
${'='.repeat(50)}

📋 PROJECT OVERVIEW
Problem: ${data.problem || "Not specified"}
Solution: ${data.solution || "Not specified"} 
Target User: ${data.targetUser || "Not specified"}
Timeline: ${data.timeframe || "Not specified"}

⚙️ FEATURE SPEC
Core Feature: ${data.mainFeature || "Not specified"}
Supporting Features:
${data.supportingFeatures?.filter(f => f.trim()).map(f => `• ${f}`).join('\n') || "None specified"}

🎯 USER FLOW
${data.userSteps?.filter(s => s.trim()).map((step, i) => `${i + 1}. ${step}`).join('\n') || "No steps defined"}

${data.painPoints ? `🚨 POTENTIAL PAIN POINTS\n${data.painPoints}\n` : ''}

${data.successMetrics ? `📊 SUCCESS METRICS\n${data.successMetrics}\n` : ''}

🔨 TECHNICAL SPEC
Platform(s): ${data.platform?.join(', ') || "Not specified"}
Technical Requirements: ${data.techNeeds || "Not specified"}

${data.alternativeFlows && data.alternativeFlows.length > 0 ? 
  `🔄 ALTERNATIVE FLOWS\n${data.alternativeFlows.map(flow => `• ${flow}`).join('\n')}\n` : ''}
  `.trim();

  navigator.clipboard.writeText(textContent);
  return textContent;
}

function generatePrintContent(data: MVPFormData): string {
  return `
    <div class="print-content">
      <h1>${data.title}</h1>
      <p style="color: #64748b; margin-bottom: 30px;">Generated on ${new Date().toLocaleDateString()}</p>
      
      <div class="section">
        <h2>📋 Project Overview</h2>
        <div>
          <h3>Problem:</h3>
          <p>${data.problem || "Not specified"}</p>
        </div>
        <div>
          <h3>Solution:</h3>
          <p>${data.solution || "Not specified"}</p>
        </div>
        <div>
          <h3>Target User:</h3>
          <p>${data.targetUser || "Not specified"}</p>
        </div>
        <div>
          <h3>Timeline:</h3>
          <p>${data.timeframe || "Not specified"}</p>
        </div>
      </div>

      <div class="section">
        <h2>⚙️ Feature Specification</h2>
        <div>
          <h3>Core Feature:</h3>
          <p>${data.mainFeature || "Not specified"}</p>
        </div>
        <div>
          <h3>Supporting Features:</h3>
          <ul class="feature-list">
            ${data.supportingFeatures?.filter(f => f.trim()).map(f => `<li>${f}</li>`).join('') || '<li>None specified</li>'}
          </ul>
        </div>
      </div>

      <div class="section">
        <h2>🎯 User Flow</h2>
        ${data.userSteps?.filter(s => s.trim()).map((step, i) => `
          <div class="step-item">
            <span class="step-number">${i + 1}.</span> ${step}
          </div>
        `).join('') || '<p>No steps defined</p>'}
        
        ${data.painPoints ? `
          <div style="margin-top: 20px;">
            <h3>Potential Pain Points:</h3>
            <p>${data.painPoints}</p>
          </div>
        ` : ''}
        
        ${data.successMetrics ? `
          <div style="margin-top: 20px;">
            <h3>Success Metrics:</h3>
            <p>${data.successMetrics}</p>
          </div>
        ` : ''}
      </div>

      <div class="section">
        <h2>🔨 Technical Specification</h2>
        <div>
          <h3>Platform(s):</h3>
          <p>${data.platform?.join(', ') || "Not specified"}</p>
        </div>
        <div>
          <h3>Technical Requirements:</h3>
          <p>${data.techNeeds || "Not specified"}</p>
        </div>
      </div>

      ${data.alternativeFlows && data.alternativeFlows.length > 0 ? `
        <div class="section">
          <h2>🔄 Alternative Flows</h2>
          <ul class="feature-list">
            ${data.alternativeFlows.map(flow => `<li>${flow}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

export function generateShareableLink(data: MVPFormData): string {
  const encoded = btoa(JSON.stringify(data));
  return `${window.location.origin}/mvp-builder?data=${encoded}`;
}
